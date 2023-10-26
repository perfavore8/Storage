<template>
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
  <div class="wrapper" :class="{ blur: show_edit_modal || isDataLoading }">
    <div class="header">
      <transition name="mdl">
        <card-grid-filters
          v-if="false"
          ref="filters"
          :fields="all_fields"
          :tableConfig="tableConfig"
          :sortedFields="sortedFields"
        />
      </transition>
      <!-- <card-grid-links ref="links" @emit_link="emit_link" /> -->
      <div class="sort">
        <span>{{ $t("ostatki.sortBy") }}</span>
        <SelectorVue
          :options_props="sortedFieldsForSort"
          :selected_option="selectedSort.value"
          @select="selectSort"
        />
        <button
          class="bar_item_icon"
          :class="{
            bar_item_icon_up: selectedSort?.order === 0,
            bar_item_icon_down: selectedSort?.order === 1,
          }"
          @click="selectOrder()"
        ></button>
        <button class="btn btn_blue" @click="sort()">
          {{ $t("global.apply2") }}
        </button>
      </div>
    </div>
    <CardGridCategories @selectCat="selectCat" />
    <div class="grid" ref="grid">
      <label v-if="products.length == 0" class="text">
        {{ $t("global.nothingFound") }}
      </label>
      <div class="card shadow-lg" v-for="(row, idx) in products" :key="row.id">
        <template v-for="item in sortedFields" :key="item">
          <div
            class="row"
            v-if="getAllFieldsInSubCat(selectedCatId).includes(item[1].id)"
          >
            <div class="name">{{ item[1].name }}<span> :</span></div>
            {{ item[1].id }}
            <div class="value" v-if="item[1].type === 15">
              <AppImagesCarusel
                :imagesList="row.fields[item[0]]"
                :float="'right'"
              />
            </div>
            <div class="value" v-else>
              <span v-if="item[0].split('.').length < 2">
                {{
                  item[0] === "free_4_reserve" && row.fields[item[0]] == -1
                    ? "&infin;"
                    : item[0] == "category"
                    ? categories[row.fields[item[0]]]
                    : item[1].type == 9
                    ? !!row.fields[item[0]]
                      ? $t("global.yes")
                      : $t("global.no")
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
                      ? $t("global.yes")
                      : $t("global.no")
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
                @click.stop="openGridEditPrice(row, item[0].split('.')[0])"
                :title="t('ostatki.changePrice')"
              ></button>
            </div>
          </div>
        </template>
        <div class="card_footer">
          <template v-if="!oneC">
            <input
              type="checkbox"
              class="checkbox"
              :id="row.id"
              v-if="selectedProducts[idx] != undefined"
              v-model="selectedProducts[idx].value"
              @change="selectedProducts[idx].item = row"
            />
            <label :for="row.id"></label>
          </template>
          <div
            class="edit_icon"
            @click.stop="open_edit_modal(row)"
            :title="t('ostatki.changePoz')"
          />
        </div>
      </div>
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
  <button class="arrow" v-if="showArrow" @click="scrollUp()" />
</template>

<script>
import EditItem from "@/components/EditItem.vue";
import GridBottom from "@/components/GridBottom.vue";
import CardGridFilters from "@/components/CardGridFilters.vue";
import GridEditPrice from "@/components/GridEditPrice.vue";
import SelectorVue from "@/components/SelectorVue.vue";
// import CardGridLinks from "@/components/CardGridLinks.vue";
import { mapGetters } from "vuex";
import { nextTick } from "@vue/runtime-core";
import CardGridCategories from "./CardGridCategories.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
import AppImagesCarusel from "./AppImagesCarusel.vue";
import { useCats } from "@/composables/cats";

const { t } = useLangConfiguration();

export default {
  name: "CardGrid",
  components: {
    EditItem,
    GridBottom,
    CardGridFilters,
    // CardGridLinks,
    GridEditPrice,
    SelectorVue,
    CardGridCategories,
    AppImagesCarusel,
  },
  props: {
    selectedWH: {
      type: Object,
    },
  },
  inject: ["isServicePage"],
  emits: {},
  setup() {
    return { t, ...useCats() };
  },
  data() {
    return {
      selectedCatId: 1,
      edit_data: {},
      selectedProducts: [],
      showArrow: false,
      orderList: ["desc", "asc"],
      selectedSort: {
        value: { name: t("global.notSelected"), value: -1 },
        order: 1,
      },
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.commit("updateIsLoadingProducts", true);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    this.$store.commit("open_close_buttons", false);
  },
  async mounted() {
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
  },
  computed: {
    sortedFields() {
      return this.sortedFieldsRow.filter((val) => val[1].visible);
    },
    sortedFieldsRow() {
      const allFieldsObj = {};
      this.all_fields.forEach((field) => (allFieldsObj[field.code] = field));
      const list = Object.entries(this.tableConfig);
      list.map(
        ([code, val]) => (val.id = allFieldsObj[code.split(".")[0]]?.id)
      );
      return list.sort((a, b) => {
        if (a[1].sort > b[1].sort) return 1;
        if (a[1].sort == b[1].sort) return 0;
        if (a[1].sort < b[1].sort) return -1;
      });
    },
    sortedFieldsForSort() {
      const arr = [{ name: t("global.notSelected"), value: -1 }];
      this.sortedFieldsRow
        .filter((field) => field[1].sortable && field[1].type != 9)
        .forEach((field) => arr.push({ name: field[1].name, value: field[0] }));
      return arr;
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
    showGridBottom() {
      return this.meta.meta.total >= this.meta.meta.per_page;
    },
    grid() {
      return this.$refs.grid;
    },
    productsParams() {
      return this.$store.state.products.productsParams;
    },
    isDataLoading() {
      return this.$store.state.products.isLoading;
    },
    ...mapGetters(["show_edit_modal"]),
    ref_links() {
      return this.$refs.links;
    },
  },
  watch: {
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
      const yDis = Math.round(this.grid?.getBoundingClientRect()?.y) < 0;
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
    async get_products(params) {
      if (this.isServicePage) params = { ...params, is_service: 1 };
      await this.$store.dispatch("get_products", params);
      this.setSelectedProducts();
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
    selectSort(option) {
      this.selectedSort.value = option;
    },
    selectOrder() {
      this.selectedSort.order
        ? (this.selectedSort.order = 0)
        : (this.selectedSort.order = 1);
    },
    sort() {
      let code;
      let order;
      if (this.selectedSort.value.value != -1) {
        code = this.selectedSort.value.value;
        order = this.orderList[this.selectedSort.order];
      } else {
        code = "";
        order = "";
      }
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
    emit_link(obj) {
      Object.assign(this.link, obj);
    },
    selectCat(cat) {
      this.selectedCatId = cat.id;
      const params = {
        filter: { category: { compare: "in", query: [cat.id] } },
      };
      this.$store.commit("updateProductsParams", params);
      this.get_products(this.productsParams);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  .sort {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    @include font(400, 16px);
    .bar_item_icon {
      height: 20px;
      width: 20px;
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-out;
      &_up {
        @include bg_image("@/assets/sort_up.svg");
      }
      &_down {
        @include bg_image("@/assets/sort_down.svg");
      }
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    .button {
      cursor: pointer;
      color: #ffffff;
      border-radius: 4px;
      border: none;
      transition: background-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      @include font(400, 14px);
      width: 124px;
      height: 35px;
      background: #ea9197;
    }
    .button:hover {
      background: rgb(226, 101, 109);
      box-shadow: 0 0 5px 2px rgb(226 101 109 / 25%);
    }
  }
}
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  @include font(400, 14px);
  .text {
    margin: 0 auto;
    @include font(500, 18px);
  }
  .card {
    width: 340px;
    // border: 1px solid #c9c9c9;
    border-radius: 8px;
    padding: 20px;
    // background: #c4c4c433;
    // box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 8px;
      border-bottom: 1px dotted #c9c9c9;
      padding-top: 5px;
      .value:first-child {
        display: none;
      }
      .name {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-end;
        justify-content: flex-start;
      }
    }
    .row:first-child {
      justify-content: center;
      @include font(500, 18px);
      padding: 20px 0;
      .name {
        display: none;
      }
    }
  }
}
.card_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
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
.blur {
  filter: blur(5px);
}
.mdl-enter-active,
.mdl-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.mdl-enter-from,
.mdl-leave-to {
  opacity: 0;
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
  border: none;
  background-color: transparent;
  outline: none;
  @include bg_image("@/assets/arrow_circle_up.svg");
}
</style>
