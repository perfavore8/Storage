<template>
  <div class="wrapper">
    <teleport to="body">
      <edit-item v-if="show_edit_modal" :edit_data="edit_data" />
    </teleport>
    <teleport to="body">
      <GridEditPrice
        v-if="showEditPrice"
        :editPrice="editPrice"
        @close="get_products()"
      />
    </teleport>
    <label v-if="products.length == 0" class="text"> Ничего не найдено </label>
    <div class="main" v-else>
      <table class="table" :class="{ blur: show_edit_modal }" ref="table">
        <thead>
          <main-grid-bar
            ref="bar"
            :fields="all_fields"
            @sort="sort"
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
        <tbody>
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
                    item[0] == "category"
                      ? categories[row.fields[item[0]]]
                      : row.fields[item[0]]
                  }}
                </span>
                <span v-else>
                  {{
                    item[0].split(".")[1] == "cost"
                      ? row.fields?.[item[0].split(".")[0]]?.[
                          item[0].split(".")[1]
                        ] === undefined
                        ? "0"
                        : row.fields?.[item[0].split(".")[0]]?.[
                            item[0].split(".")[1]
                          ] +
                          " " +
                          (row.fields?.[item[0].split(".")[0]]?.currency ==
                          undefined
                            ? ""
                            : row.fields?.[item[0].split(".")[0]]?.currency)
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
                ></button>
              </td>
            </template>
            <td class="item">
              <div class="edit_icon" @click="open_edit_modal(row)"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <grid-bottom
      :previous="meta.links.prev != null"
      :next="meta.links.next != null"
      :page="meta.meta.current_page"
      :blur="show_edit_modal"
      :show="products.length != 0"
      :count="count"
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
import { nextTick } from "process";
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
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  async mounted() {
    this.$store.dispatch("get_fields_properties");
    await this.$store.dispatch(
      "getTableConfig",
      this.selectedWH.value != "whs" ? this.selectedWH.value : ""
    );
    await this.$store.dispatch("get_all_fields");
    await this.get_products();
    this.setSelectedProducts();
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
    table() {
      return this.$refs.table;
    },
    ...mapGetters(["show_edit_modal"]),
  },

  watch: {
    products: {
      handler: function () {
        this.updateKey += 1;
        this.selectedProducts = [];
        if (!this.filters?.isConfirmFilters)
          nextTick(() => {
            this.filters?.clearFilters();
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
      this.bar.dropOrder();
      this.get_products();
    },
  },

  methods: {
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
    clearFilters() {
      this.filters?.clearFilters();
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
      await this.$store.dispatch("update_user", { per_page: count });
      this.changePage(this.meta.current_page);
    },
    changePage(val) {
      const params = { page: val };
      this.get_products(params);
    },
    setSelectedProducts() {
      this.selectedProducts = [];
      for (let i = 0; i < this.count; i++)
        this.selectedProducts.push({ value: false, item: {} });
    },
    async get_products(params) {
      if (this.isServicePage.value) params = { ...params, is_service: 1 };
      if (this.selectedWH.value != "whs" && !this.isServicePage.value)
        params = { ...params, warehouse: this.selectedWH.value };
      await this.$store.dispatch("get_products", params);
      this.setSelectedProducts();
    },
    drop_page() {
      this.changePage(1);
    },
    open_edit_modal(row) {
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
    sort(code, order) {
      const params = {
        page: this.meta.current_page,
        sort: {
          by: code,
          order: order,
        },
      };
      this.get_products(params);
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
    z-index: 5;
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
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80%;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.checkbox:checked + label::before {
  border-color: #757575;
  background-color: #757575;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #75757591;
}
.checkbox:not(:disabled):active + label::before {
  background-color: #75757591;
  border-color: #75757591;
}
.blur {
  filter: blur(5px);
}
.text {
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
