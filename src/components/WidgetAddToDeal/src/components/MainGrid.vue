<template>
  <Teleport to="body">
    <transition name="modal">
      <TableSettings @close="closeTableSettings" v-if="showTableSettings" />
    </transition>
  </Teleport>
  <div class="wrapper">
    <MainGridFilters
      ref="filters"
      v-if="all_fields.length && tableConfig != {} && sortedFields.length"
      :fields="all_fields"
      :tableConfig="tableConfig"
      :sortedFields="sortedFields2"
      @confirm="() => get_products(productsParams)"
    />
    <div class="main">
      <AppTablePreloader
        class="overflow-scroll"
        :titles="titlesForPreloader"
        v-if="showSpinner || isLoading"
      />

      <table class="table" ref="table" v-else>
        <thead>
          <main-grid-bar
            ref="bar"
            :fields="all_fields"
            @sort="sort"
            :tableConfig="tableConfig"
            :sortedFields="sortedFields"
            class="main-grid-bar"
          />
        </thead>
        <tbody v-if="products.length">
          <tr class="row" v-for="(row, idx) in products" :key="row.id">
            <td class="item">
              <div v-if="row.is_service">
                <input
                  v-if="allWhsList?.[idx]?.length"
                  type="number"
                  class="sls_input"
                  style="min-width: 70px"
                  v-model="allWhsList[idx][0].specialValue"
                />
              </div>
              <div v-else>
                <AppInputSelect
                  style="min-width: 70px"
                  :list="
                    allWhsList?.[idx]?.filter(
                      (val) =>
                        (row.allow_add_with_zero_count || !(val?.count < 1)) &&
                        (selectedWirePerLead.value
                          ? val.code == selectedWirePerLead.value
                          : true)
                    )
                  "
                  :special="true"
                  :requestDelay="0"
                  :countLettersReq="0"
                  :allow_add_with_zero_count="row.allow_add_with_zero_count"
                  :one_wh_per_lead="row.one_wh_per_lead"
                  :placeholder="
                    allWhsList?.[idx]?.reduce(
                      (sum, wh) => (sum += Number(wh?.specialValue)),
                      0
                    )
                  "
                  @changeInputValue="(value) => (inputValues[idx] = value)"
                />
              </div>
            </td>
            <template v-for="item in sortedFields" :key="item">
              <td class="item" v-if="item[1].type === 15">
                <AppImagesCarusel :imagesList="row.fields[item[0]]" />
              </td>
              <td class="item" v-else>
                <span v-if="item[0].split('.').length < 2">
                  {{
                    item[0] === "free_4_reserve" && row.fields[item[0]] == -1
                      ? "&infin;"
                      : item[0] == "category"
                      ? categories?.[row.fields?.[item?.[0]]]
                      : item?.[1]?.type == 9
                      ? !!row.fields?.[item[0]]
                        ? $t("global.yes")
                        : $t("global.no")
                      : item[0] == "cost_price"
                      ? row.fields?.[item[0]]
                        ? Math.round(row.fields?.[item[0]] * 100) / 100
                        : "0"
                      : row.fields?.[item[0]]
                  }}
                </span>
                <span v-else>
                  {{
                    item[0].split(".")[1] == "cost"
                      ? row.fields?.[item[0].split(".")[0]]?.[
                          item[0]?.split(".")?.[1]
                        ] == undefined
                        ? "0"
                        : row.fields?.[item[0]?.split(".")?.[0]]?.[
                            item[0]?.split(".")?.[1]
                          ] +
                          " " +
                          (row.fields?.[item[0]?.split(".")?.[0]]?.currency ==
                            undefined ||
                          row.fields?.[item[0]?.split(".")?.[0]]?.currency ==
                            null
                            ? ""
                            : row.fields?.[item[0]?.split(".")?.[0]]?.currency)
                      : item[1].type == 9
                      ? !!row.fields?.[item[0]?.split(".")?.[0]]?.[
                          item[0]?.split(".")?.[1]
                        ]
                        ? $t("global.yes")
                        : $t("global.no")
                      : row.fields?.[item[0]?.split(".")?.[0]]?.[
                          item[0]?.split(".")?.[1]
                        ]
                  }}
                </span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <label v-if="products.length == 0" class="text">
        {{ $t("global.nothingFound") }}
      </label>
    </div>
    <div class="right">
      <grid-bottom
        :page="page"
        :blur="show_edit_modal"
        :show="products.length != 0"
        :count="count"
        @changePage="changePage"
        @changeCount="changeCount"
      />
    </div>
  </div>
</template>

<script>
import TableSettings from "../components/TableSettings.vue";
import MainGridFilters from "../components/MainGridFilters.vue";
import MainGridBar from "../components/MainGridBar.vue";
import GridBottom from "../components/GridBottom.vue";
import AppInputSelect from "./AppInputSelect.vue";
import AppTablePreloader from "@/components/AppTablePreloader.vue";
import AppImagesCarusel from "@/components/AppImagesCarusel.vue";
export default {
  name: "MainGrid",
  components: {
    TableSettings,
    MainGridFilters,
    MainGridBar,
    GridBottom,
    AppInputSelect,
    AppTablePreloader,
    AppImagesCarusel,
  },
  props: {},
  emits: {
    accept: null,
  },
  data() {
    return {
      isLoading: false,
      inputValues: [],
      allWhsList: [],
      savedAllWhsList: [],
      showSpinner: false,
    };
  },
  computed: {
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
    count() {
      return this.productsParams?.per_page;
    },
    meta() {
      return this.$store.state.widjetProducts.meta;
    },
    products() {
      return this.$store.state.widjetProducts.allProducts;
    },
    productsParams() {
      return this.$store.state.widjetProducts.productsParams;
    },
    all_fields() {
      return this.$store.state.widjetFields.all_fields;
    },
    tableConfig() {
      return this.$store.state.widjetFields.tableConfig;
    },
    selectedWirePerLead() {
      return this.$store.state.widjetProducts.selectedWirePerLead;
    },
    showTableSettings() {
      return this.$store.state.widjetFields.showTableSettings;
    },
    sortedFields() {
      const list = Object.entries(this.tableConfig);
      return list
        .sort((a, b) => {
          if (a[1].sort > b[1].sort) return 1;
          if (a[1].sort == b[1].sort) return 0;
          if (a[1].sort < b[1].sort) return -1;
        })
        .filter((val) => val[1]?.visible);
    },
    sortedFields2() {
      const list = Object.entries(this.tableConfig);
      return list.sort((a, b) => {
        if (a[1].sort > b[1].sort) return 1;
        if (a[1].sort == b[1].sort) return 0;
        if (a[1].sort < b[1].sort) return -1;
      });
    },
    categories() {
      const obj = {};
      this.$store.state.widjetCategories.fields_properties2.forEach(
        (val) => (obj[val.id] = val.name)
      );
      return obj;
    },
    savedAllWhsListIds() {
      const res = [];
      this.savedAllWhsList.forEach((whs) => res.push(whs[0].product_id));
      return res;
    },
    titlesForPreloader() {
      return Object.values(this.tableConfig).reduce((acc, field) => {
        if (field.visible) acc.push(field.name);
        return acc;
      }, []);
    },
  },
  async activated() {
    this.isLoading = true;
    await Promise.all([
      this.$store.dispatch("getTableConfigW", {
        code: "widget",
      }),
      this.$store.dispatch("get_fields_properties2W"),
      this.$store.dispatch("getAllFieldsW"),
      this.get_products(this.productsParams),
    ]);
    this.isLoading = false;
  },
  deactivated() {},
  watch: {
    products: {
      handler: function () {
        this.fillAllWhsList();
      },
      deep: true,
    },
    allWhsList: {
      handler: function () {
        this.saveAllWhsList();
        this.saveSelectedWirePerLead();
      },
      deep: true,
    },
  },
  methods: {
    async accept() {
      const arr = [];
      this.savedAllWhsList.forEach((whs) => {
        whs?.forEach((wh) => {
          if (wh.specialValue) {
            const params = {
              product_id: wh.is_service
                ? wh.product_id
                : wh.product_id + "%%%" + wh.code,
              count: wh.specialValue,
            };
            arr.push(this.$store.dispatch("addProduct3W", params));
          }
        });
      });
      await Promise.all(arr);

      this.savedAllWhsList = [];
      this.allWhsList = [];
      this.$emit("changeSavedAllWhsList", this.savedAllWhsList);
      this.$emit("accept");
    },
    fillAllWhsList() {
      this.saveAllWhsList();

      const res = [];

      this.products.forEach((product) => {
        const whs = this.savedAllWhsList.find(
          (whs) => whs[0].product_id === product.id
        );
        if (whs) {
          res.push(whs);
        } else {
          const copyArr = product.whs?.map((a) => ({ ...a }));
          copyArr.map((wh) => {
            wh.name = wh.name + "   |   " + wh.count;
            wh.value = wh.code;
            wh.specialValue = null;
            wh.product_id = product.id;
            wh.is_service = product.is_service;
            wh.product_name = product.fields?.name;
          });
          res.push(copyArr);
        }
      });

      this.allWhsList = res;
    },
    saveAllWhsList() {
      const list = this.allWhsList.filter((whs) => {
        const total = whs.reduce(
          (sum, wh) => (sum += Number(wh.specialValue)),
          0
        );
        return total;
      });
      if (this.savedAllWhsList.length) {
        const newItems = {};
        this.savedAllWhsList.forEach((saved_whs, idx) => {
          const id = saved_whs[0].product_id;
          list.forEach((whs) => {
            if (whs[0].product_id === id) {
              this.savedAllWhsList[idx] = whs;
            } else {
              if (!this.savedAllWhsListIds.includes(whs[0].product_id))
                newItems[whs[0].product_id] = whs;
            }
          });
        });
        this.savedAllWhsList = [
          ...this.savedAllWhsList,
          ...Object.values(newItems),
        ];

        this.savedAllWhsList = this.savedAllWhsList.filter((whs) =>
          whs.reduce((sum, wh) => (sum += Number(wh.specialValue)), 0)
        );
      } else {
        this.savedAllWhsList = [...this.savedAllWhsList, ...list];
      }
      this.$emit("changeSavedAllWhsList", this.savedAllWhsList);
    },
    deleteSavedAllWhsList(idx) {
      const product_id = this.savedAllWhsList[idx]?.[0]?.product_id;
      const item = this.allWhsList.find(
        (whsList) => whsList[0]?.product_id === product_id
      );
      if (item) item.map((wh) => (wh.specialValue = null));

      this.savedAllWhsList.splice(idx, 1);
      this.$emit("changeSavedAllWhsList", this.savedAllWhsList);
    },
    fillInputValues() {
      this.products.forEach(() => this.inputValues.push(""));
    },
    getPageFromLink(link) {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    },
    async clearFilters() {
      await this.filters?.clearFilters();
      this.filters?.confirmFilters();
    },
    confirmFilters() {
      this.filters?.confirmFilters();
    },
    async changeCount(count) {
      this.$store.commit("updateProductsParamsW", { per_page: count });
      this.drop_page();
    },
    changePage(val) {
      const params = { page: val };
      this.$store.commit("updateProductsParamsW", params);
      this.get_products(this.productsParams);
    },
    async get_products(params) {
      this.showSpinner = true;
      await this.$store.dispatch("getAllProductsW", {
        ...params,
        leadId: 29768593,
      });
      this.fillInputValues();
      this.showSpinner = false;
    },
    drop_page() {
      this.changePage(1);
    },
    sort(code, order) {
      const params = {
        page: 1,
        sort: {
          by: code,
          order: order,
        },
      };
      this.$store.commit("updateProductsParamsW", params);
      this.get_products(this.productsParams);
    },
    async closeTableSettings() {
      this.isLoading = true;
      await Promise.all([
        this.$store.dispatch("getTableConfigW", {
          code: "widget",
        }),
        this.$store.dispatch("getAllFieldsW"),
        this.get_products(this.productsParams),
      ]);
      this.isLoading = false;
    },
    saveSelectedWirePerLead() {
      let res = null;
      if (this.products[0]?.one_wh_per_lead) {
        res = this.savedAllWhsList[0]?.find((wh) => wh?.specialValue > 0)?.code;
      }
      if (
        res != this.selectedWirePerLead.value ||
        !this.selectedWirePerLead.sources.includes("MG")
      )
        this.$store.commit("updateSelectedWirePerLeadW", {
          source: "MG",
          value: res,
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
* {
  box-sizing: border-box;
}
.item {
  padding: 10px;
  padding-left: 15px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  min-width: 50px;
  .input-select:deep(.item) {
    justify-content: flex-start;
    gap: 8px;
  }
  .input {
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    outline: none;
    border: none;
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    padding: 5px;
    background: transparent;
    appearance: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .modal_form {
    width: 40px;
    height: 28px;
    margin-left: 10px;
    background: #f0f0f0;
    position: relative;
    border-radius: 4px;
  }
}
.row {
}
.table {
  border-collapse: collapse;
  margin: 0 auto;
  width: 100%;
  display: block;
  overflow: scroll;
}
.bar_row {
  height: 66px;
}
.bar_item {
  background: #e5e5e5;
  @include font(500, 16px, 19px);
  color: #000000;
  vertical-align: middle;
  cursor: pointer;
}
.bar_item_group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}
.count {
  margin-left: 5px;
  height: 26px;
  width: 100px;
}
.item:first-child {
  padding-left: 5px;
}
.bar_item:first-child {
  width: 17px !important;
}

.right {
  // margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  height: 115px;
}
.blur {
  filter: blur(5px);
}
.text {
  margin: 0 auto;
  @include font(500, 18px);
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
.spinner {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
