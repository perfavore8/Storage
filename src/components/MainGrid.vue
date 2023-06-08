<template>
  <div class="wrapper" :class="{ blur: isDataLoading }">
    <teleport to="body">
      <edit-item v-if="show_edit_modal" :edit_data="edit_data" />
    </teleport>
    <teleport to="body">
      <GridEditPrice
        v-if="showEditPrice"
        :editPrice="editPrice"
        @close="get_products(productsParams)"
      />
    </teleport>
    <div class="main">
      <table class="table" :class="{ blur: show_edit_modal }" ref="table">
        <thead>
          <main-grid-bar
            ref="bar"
            :fields="all_fields"
            @sort="sort"
            @changeAllSelectedProducts="changeAllSelectedProducts"
            :tableConfig="tableConfig"
            :sortedFields="sortedFields"
            class="main-grid-bar"
          />
          <main-grid-filters
            ref="filters"
            :fields="all_fields"
            :tableConfig="tableConfig"
            :sortedFields="sortedFields"
          />
        </thead>
        <tbody v-if="products.length">
          <tr class="row" v-for="(row, idx) in products" :key="row.id">
            <td class="item" v-if="!oneC">
              <input
                type="checkbox"
                class="checkbox"
                :id="row.id"
                v-if="selectedProducts[idx] != undefined"
                v-model="selectedProducts[idx].value"
                @change="selectedProducts[idx].item = row"
              />
              <label :for="row.id"></label>
            </td>
            <template v-for="item in sortedFields" :key="item">
              <td class="item">
                <span v-if="item[0].split('.').length < 2">
                  {{
                    item[0] === "free_4_reserve" && row.fields[item[0]] == -1
                      ? "&infin;"
                      : item[0] == "category"
                      ? categories[row.fields[item[0]]]
                      : item[1].type == 9
                      ? !!row.fields[item[0]]
                        ? "Да"
                        : "Нет"
                      : item[0] == "cost_price"
                      ? row.fields[item[0]]
                        ? Math.round(row.fields[item[0]] * 100) / 100
                        : "0"
                      : row.fields[item[0]]
                  }}
                </span>
                <span v-else>
                  {{
                    item[0].split(".")[1] == "cost"
                      ? row.fields?.[item[0].split(".")[0]]?.[
                          item[0].split(".")[1]
                        ] == undefined
                        ? "0"
                        : row.fields?.[item[0].split(".")[0]]?.[
                            item[0].split(".")[1]
                          ] +
                          " " +
                          (row.fields?.[item[0].split(".")[0]]?.currency ==
                            undefined ||
                          row.fields?.[item[0].split(".")[0]]?.currency == null
                            ? ""
                            : row.fields?.[item[0].split(".")[0]]?.currency)
                      : item[1].type == 9
                      ? !!row.fields?.[item[0].split(".")[0]]?.[
                          item[0].split(".")[1]
                        ]
                        ? "Да"
                        : "Нет"
                      : row.fields?.[item[0].split(".")[0]]?.[
                          item[0].split(".")[1]
                        ]
                  }}
                </span>
                &nbsp;
                <button
                  class="edit_icon"
                  style="width: 16px; heigth: 16px"
                  v-if="item[0].split('.')[1] == 'cost'"
                  @click="openGridEditPrice(row, item[0].split('.')[0])"
                  title="Редактирование цены"
                ></button>
              </td>
            </template>
            <td class="item">
              <div
                class="edit_icon"
                @click="open_edit_modal(row)"
                title="Редактирование товара"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <label v-if="products.length == 0" class="text">
        Ничего не найдено
      </label>
    </div>
    <grid-bottom
      :page="page"
      :blur="show_edit_modal"
      :show="products.length != 0"
      :count="count"
      :showBtns="showGridBottom"
      @changePage="changePage"
      @changeCount="changeCount"
    />
  </div>
  <div class="arrow" v-if="showArrow" @click="scrollUp()"></div>
</template>

<script>
import EditItem from "@/components/EditItem.vue";
import GridBottom from "@/components/GridBottom.vue";
import MainGridFilters from "@/components/MainGridFilters.vue";
import MainGridBar from "@/components/MainGridBar.vue";
import GridEditPrice from "@/components/GridEditPrice.vue";
import { mapGetters } from "vuex";
import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    EditItem,
    GridBottom,
    MainGridFilters,
    MainGridBar,
    GridEditPrice,
  },
  props: {
    selectedWH: {
      type: Object,
    },
  },
  inject: ["isServicePage"],

  data() {
    return {
      updateKey: 0,
      selectedProducts: [],
      edit_data: {},
      showArrow: false,
      editPrice: {},
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.commit("updateIsLoading", true);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    this.$store.commit("open_close_buttons", false);
  },
  async mounted() {
    this.$store.commit("toggleIsNavBarDisabled", true);
    await Promise.all([
      this.$store.dispatch("get_fields_properties"),
      this.$store.dispatch(
        "getTableConfig",
        this.selectedWH.value != "whs" ? this.selectedWH.value : ""
      ),
      this.$store.dispatch("get_all_fields"),
      this.get_products(this.productsParams),
    ]);
    this.setSelectedProducts();
    this.bar?.dropAllSelectedProducts();
    this.$store.commit("toggleIsNavBarDisabled", false);
  },

  computed: {
    sortedFields() {
      const list = Object.entries(this.tableConfig);
      return list
        .sort((a, b) => {
          if (a[1].sort > b[1].sort) return 1;
          if (a[1].sort == b[1].sort) return 0;
          if (a[1].sort < b[1].sort) return -1;
        })
        .filter((val) => val[1].visible);
    },
    tableConfig() {
      return this.$store.state.account.tableConfig;
    },
    categories() {
      const obj = {};
      this.$store.state.categories.fields_properties.forEach(
        (val) => (obj[val.id] = val.name)
      );
      return obj;
    },
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    count() {
      return this.$store.state.account.user.config?.per_page;
    },
    meta() {
      return this.$store.state.products.meta;
    },
    all_fields() {
      return this.$store.state.fields.all_fields;
    },
    filters() {
      return this.$refs.filters;
    },
    show_buttons() {
      const value = this.selectedProducts.filter((val) => val.value).length > 0;
      return value;
    },
    showEditPrice() {
      return this.$store.state.shows.showEditPrice;
    },
    products() {
      return this.$store.state.products.products;
    },
    bar() {
      return this.$refs.bar;
    },
    page() {
      const obj = {
        first: this.getPageFromLink(this.meta?.links?.first),
        prev: this.getPageFromLink(this.meta?.links?.prev),
        current: this.meta?.meta?.current_page,
        next: this.getPageFromLink(this.meta?.links?.next),
        last: this.getPageFromLink(this.meta?.links?.last),
      };
      return obj;
    },
    showGridBottom() {
      return this.meta.meta.total >= this.meta.meta.per_page;
    },
    table() {
      return this.$refs.table;
    },
    productsParams() {
      return this.$store.state.products.productsParams;
    },
    isDataLoading() {
      return this.$store.state.products.isLoading;
    },
    isServicePageValue() {
      return this.isServicePage.value;
    },
    ...mapGetters(["show_edit_modal"]),
  },

  watch: {
    isServicePageValue() {
      this.$store.commit("updateProductsParams", {
        is_service: this.isServicePageValue ? 1 : 0,
      });
    },
    products: {
      handler: function () {
        this.updateKey += 1;
        nextTick(() => {
          if (!this.filters?.isConfirmFilters) this.filters?.clearFilters();
          this.filters?.setFalseIsConfirmFilters();
        });
      },
      deep: true,
    },
    show_buttons() {
      this.$store.commit("open_close_buttons", this.show_buttons);
    },
    async selectedWH() {
      await this.$store.dispatch(
        "getTableConfig",
        this.selectedWH.value != "whs" ? this.selectedWH.value : ""
      );
      this.bar?.dropOrder();
      this.get_products(this.productsParams);
    },
  },

  methods: {
    getPageFromLink(link) {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    },
    scrollUp() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      const yDis =
        Math.round(this.bar?.$el?.getBoundingClientRect()?.y) -
          Math.round(this.table?.getBoundingClientRect()?.y) >
        10;
      yDis ? (this.showArrow = true) : (this.showArrow = false);
    },
    async clearFilters() {
      await this.filters?.clearFilters();
      this.filters?.confirmFilters();
    },
    confirmFilters() {
      this.filters?.confirmFilters();
    },
    isShow(code) {
      const res = { value: false, second: "" };
      Object.entries(this.tableConfig).forEach((val) => {
        if (val[0].split(".")[0] == code && val[1]?.visible)
          (res.value = true), (res.second = val[0].split(".")[1]);
      });
      return res;
    },
    async changeCount(count) {
      this.setTrueIsConfirmFilters();
      await this.$store.dispatch("update_user", { per_page: count });
      // this.changePage(this.meta.current_page);
      this.drop_page();
    },
    changePage(val) {
      this.setTrueIsConfirmFilters();
      const params = { page: val };
      this.$store.commit("updateProductsParams", params);
      this.get_products(this.productsParams);
    },
    setSelectedProducts() {
      this.selectedProducts = [];
      for (let i = 0; i < this.count; i++)
        this.selectedProducts.push({ value: false, item: {} });
    },
    changeAllSelectedProducts(newValue) {
      this.selectedProducts.map((product, idx) => {
        product.value = newValue;
        newValue ? (product.item = this.products[idx]) : (product.item = {});
      });
    },
    async get_products(params) {
      if (this.isServicePage.value) params = { ...params, is_service: 1 };
      await this.$store.dispatch("get_products", params);
      this.setSelectedProducts();
      this.bar?.dropAllSelectedProducts();
    },
    drop_page() {
      this.changePage(1);
    },
    open_edit_modal(row) {
      this.setTrueIsConfirmFilters();
      this.edit_data = { ...row };
      this.$store.commit("open_edit_modal", row.fields.category);
    },
    openGridEditPrice(item, code) {
      this.editPrice = {
        name: item.fields.name,
        price:
          item.fields?.[code]?.cost == undefined ? 0 : item.fields[code].cost,
        product_id: item.id,
        price_field_code: code,
      };
      this.$store.commit("openCloseEditPrice", true);
    },
    setTrueIsConfirmFilters() {
      nextTick(() => this.filters?.setTrueIsConfirmFilters());
    },
    sort(code, order) {
      this.setTrueIsConfirmFilters();
      const params = {
        page: 1,
        sort: {
          by: code,
          order: order,
        },
      };
      this.$store.commit("updateProductsParams", params);
      this.get_products(this.productsParams);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.item {
  padding: 10px;
  padding-left: 15px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  min-width: 50px;
}
.edit_icon {
  border: none;
  outline: none;
  background-color: transparent;
  width: 20px;
  height: 20px;
  cursor: pointer;
  @include bg_image("@/assets/edit.svg");
}
.table {
  border-collapse: collapse;
  margin: 0 auto;
  // overflow-x: scroll;
  // width: calc(100% + 42px);
  width: 100%;
  // height: 550px;
  // display: block;
  .main-grid-bar {
    z-index: 105;
    position: sticky;
    top: -1px;
  }
}
.main {
  width: 100%;
}
.item:first-child {
  width: 17px !important;
  text-align: center;
  font-size: 16px;
  .checkbox + label::before {
    margin-right: 0;
  }
  .filter {
    display: none;
  }
}
.item:last-child {
  width: 20px !important;
  text-align: center;
  .edit_icon {
    margin: 0 auto;
  }
  .filter {
    display: none;
  }
}
.blur {
  transition: filter 0.2s ease-out;
  filter: blur(5px);
}
.text {
  position: relative;
  top: 20px;
  margin: 0 auto;
  @include font(500, 18px);
}
.rows-enter-active,
.rows-leave-active {
  transition: opacity 0.15s ease-in-out;
}
.rows-enter-from,
.rows-leave-to {
  opacity: 0;
}
.arrow {
  position: fixed;
  bottom: 20px;
  left: 50%;
  z-index: 2;
  width: 40px;
  height: 40px;
  cursor: pointer;
  opacity: 0.7;
  @include bg_image("@/assets/arrow_circle_up.svg");
}
</style>
