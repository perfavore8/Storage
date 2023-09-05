<template>
  <div class="app">
    <div class="container1">
      <div class="header"></div>
      <div class="content">
        <div class="flex flex-col">
          <ProductCard
            v-for="(product, idx) in addedProducts"
            :key="product.id"
            :fields="fields"
            :copyItem="product"
            @change_value="(...args) => change_value(idx, ...args)"
            @del="() => deleteAddedProduct(idx)"
          />
        </div>
        <div class="top">
          <AppInputSelect
            :list="search.list"
            :value="search.value"
            :placeholder="'Добавление (поиск на складе по названию или артикулу)...'"
            :countLettersReq="3"
            :disabled="disableAddToDeal"
            @changeInputValue="getProductsAutocomplete"
            @select="(value) => addToLeadAutocomplete(value.id)"
          />
          <div class="btns">
            <input
              type="checkbox"
              class="sls_checkbox"
              v-model="show_cards"
              id="grid"
            />
            <label for="grid"></label>
            <div
              class="sls_btn"
              id="sls_btn_open_filter"
              :class="{ sls_btn_disable: disableAddToDeal }"
              @click="disableAddToDeal ? null : openModal()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M12 19q-.425 0-.713-.288T11 18v-5H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <transition name="rows">
          <div class="bottom" v-if="show_cards">
            <div class="links">
              <div
                class="triangle"
                :class="{
                  triangle_last:
                    !categories.length && selectedCategories.length - 1 == idx,
                }"
                :disabled="
                  !categories.length && selectedCategories.length - 1 == idx
                "
                v-for="(cat, idx) in selectedCategories"
                :key="cat"
                @click="selectCategories(cat)"
              >
                {{ cat?.name }}
              </div>
            </div>
            <div class="spinner" v-if="showSpinner">
              <img
                src="https://usagif.com/wp-content/uploads/loading-58.gif.webp"
                alt="spinner"
              />
            </div>
            <template v-else>
              <div class="path">
                <div class="categories sls_grid">
                  <div
                    class="card group/card"
                    v-for="cat in categories"
                    :key="cat"
                    @click="selectCategories(cat)"
                  >
                    <div
                      class="sls_row title relative z-20"
                      :class="{ 'text-white': cat.img_url }"
                    >
                      <div class="name"></div>
                      <div class="value">{{ cat.name }}</div>
                    </div>
                    <div class="sls_row" v-if="!cat.img_url" />
                    <div
                      v-if="cat.img_url"
                      class="w-full h-full bg-black/30 absolute left-0 top-0 z-10"
                    />
                    <img
                      v-if="cat.img_url"
                      :src="cat.img_url"
                      class="aspect-auto w-3/4 z-[3] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover/card:scale-[0.6]"
                    />
                    <img
                      v-if="cat.img_url"
                      :src="cat.img_url"
                      class="aspect-auto w-3/4 z-[2] blur2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover/card:scale-[0.6]"
                    />
                  </div>
                </div>
              </div>
              <AppPaginator
                class="sls_paginator"
                v-if="products.length != 0"
                :page="page"
                @changePage="changePage"
              />
              <div class="products sls_grid">
                <label v-if="products.length == 0" class="text">
                  Ничего не найдено
                </label>
                <template v-else>
                  <template v-if="!useSkeletonCard">
                    <div
                      class="card"
                      :class="{ card__flip: flip[idx] }"
                      @click="flip[idx] = !flip[idx]"
                      v-for="(product, idx) in products"
                      :key="product"
                    >
                      <div class="bg_image">
                        <img
                          src="https://img2.freepng.ru/20180518/rpa/kisspng-parcel-computer-icons-package-tracking-mail-5aff95be3be2a8.2770409315266994542453.jpg"
                          class="img"
                        />
                      </div>
                      <div class="back">
                        <div class="sls_row title">
                          <div class="name"></div>
                          <div class="value">{{ product?.fields?.name }}</div>
                        </div>
                        <div class="rows">
                          <div class="sls_row">
                            <div class="name" style="font-weight: 500">
                              Тип :
                            </div>
                            <div class="value">
                              {{ product.is_service ? "Услуга" : "Товар" }}
                            </div>
                          </div>
                          <template v-for="field in sortedFields" :key="field">
                            <template v-if="field.type === 11">
                              <div class="sls_row">
                                <div class="name" style="font-weight: 500">
                                  {{ field.name }} :
                                </div>
                                <div class="value">
                                  {{
                                    product?.fields[field.code]?.cost
                                      ? product?.fields[field.code]?.cost
                                      : "" +
                                        " " +
                                        product?.fields[field.code]?.currency
                                      ? product?.fields[field.code]?.currency
                                      : ""
                                  }}
                                </div>
                              </div>
                              <template
                                v-if="product?.fields[field.code]?.is_nds"
                              >
                                <div class="sls_row" style="margin-left: 8px">
                                  <div class="name">НДС :</div>
                                  <div class="value">
                                    {{ product?.fields[field.code]?.nds }}
                                  </div>
                                </div>
                                <div class="sls_row" style="margin-left: 8px">
                                  <div class="name">НДС включен в цену :</div>
                                  <div class="value">
                                    {{
                                      product?.fields[field.code]
                                        ?.is_price_include_nds
                                        ? "Да"
                                        : "Нет"
                                    }}
                                  </div>
                                </div>
                              </template>
                            </template>
                            <template v-else-if="field.type === 13">
                              <div class="sls_row">
                                <div class="name" style="font-weight: 500">
                                  {{ field.name }}:
                                </div>
                                <div class="value"></div>
                              </div>
                              <div class="sls_row" style="margin-left: 8px">
                                <div class="name">Свободно для резерва:</div>
                                <div class="value">
                                  {{
                                    Number(
                                      product?.fields[field.code]?.count
                                        ? product?.fields[field.code]?.count
                                        : 0
                                    ) +
                                    Number(
                                      product?.fields[field.code]?.reserve
                                        ? product?.fields[field.code]?.reserve
                                        : 0
                                    )
                                  }}
                                </div>
                              </div>
                            </template>
                            <template v-else-if="field.type === 12">
                              <div class="sls_row">
                                <div class="name" style="font-weight: 500">
                                  {{ field.name }}:
                                </div>
                                <div class="value">
                                  {{
                                    categoriesForCard?.[
                                      product?.fields?.[field.code]
                                    ]
                                  }}
                                </div>
                              </div>
                            </template>
                            <template v-else-if="field.code === 'name'" />
                            <div class="sls_row" v-else>
                              <div class="name">{{ field.name }}:</div>
                              <div class="value">
                                {{ product?.fields[field.code] }}
                              </div>
                            </div>
                          </template>
                        </div>
                        <div class="card_footer">
                          <template v-if="product.is_service">
                            <input
                              v-if="allWhsList?.[idx]?.length"
                              type="number"
                              class="sls_input"
                              style="min-width: 70px"
                              v-model="allWhsList[idx][0].specialValue"
                            />
                          </template>
                          <template v-else>
                            <AppInputSelect
                              @click.stop=""
                              style="min-width: 70px; width: 100%"
                              v-if="allWhsList?.[idx]?.length"
                              :list="
                                allWhsList?.[idx]?.filter(
                                  (val) =>
                                    (product.allow_add_with_zero_count ||
                                      !(val.count < 1)) &&
                                    (selectedWirePerLead.value
                                      ? val.code == selectedWirePerLead.value
                                      : true)
                                )
                              "
                              :special="true"
                              :requestDelay="0"
                              :countLettersReq="0"
                              :allow_add_with_zero_count="
                                product.allow_add_with_zero_count
                              "
                              :one_wh_per_lead="product.one_wh_per_lead"
                              :placeholder="
                                allWhsList?.[idx]?.reduce(
                                  (sum, wh) =>
                                    (sum += Number(wh?.specialValue)),
                                  0
                                )
                              "
                              @changeInputValue="
                                (value) => (inputValues[idx] = value)
                              "
                            />
                          </template>
                          <div
                            class="sls_btn btn_green btn_del"
                            @click.stop="
                              () =>
                                disableAddToDeal
                                  ? null
                                  : (
                                      product.is_service
                                        ? !allWhsList[idx][0].specialValue
                                        : allWhsList?.[idx]?.reduce(
                                            (sum, wh) =>
                                              (sum += Number(wh?.specialValue)),
                                            0
                                          ) == 0
                                    )
                                  ? null
                                  : addToLead(product.id)
                            "
                            :class="{
                              btn_del_disabled: disableAddToDeal
                                ? true
                                : product.is_service
                                ? !allWhsList[idx][0].specialValue
                                : allWhsList?.[idx]?.reduce(
                                    (sum, wh) =>
                                      (sum += Number(wh?.specialValue)),
                                    0
                                  ) == 0,
                            }"
                          >
                            Добавить к сделке
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      class="card skeleton"
                      v-for="product in products"
                      :key="product"
                    >
                      <div class="sls_row title">
                        <div class="name"></div>
                        <div class="value"></div>
                      </div>
                      <div class="rows">
                        <template v-for="i in 7" :key="i">
                          <div class="sls_row">
                            <div class="name"></div>
                            <div class="value"></div>
                          </div>
                        </template>
                      </div>
                      <div class="card_footer">
                        <div class="sls_btn btn_green btn_del"></div>
                        <div class="sls_btn btn_green btn_del"></div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
              <AppPaginator
                class="sls_paginator"
                v-if="products.length != 0"
                :page="page"
                @changePage="changePage"
              />
            </template>
          </div>
        </transition>
      </div>
      <div class="footer"></div>
    </div>
  </div>
  <teleport to="body">
    <transition name="rows">
      <keep-alive>
        <filters-modal
          v-if="show_filters"
          @close="close_filters"
          @accept="accept_filters"
        ></filters-modal>
      </keep-alive>
    </transition>
  </teleport>
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
import FiltersModal from "./FiltersModal.vue";
import AppPaginator from "./AppPaginator.vue";
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    AppInputSelect,
    FiltersModal,
    AppPaginator,
    ProductCard,
  },
  data() {
    return {
      show_cards: false,
      show_filters: false,
      selectedCategories: [],
      search: {
        value: "",
        list: [],
      },
      inputValues: [],
      allWhsList: [],
      showSpinner: false,
      useSkeletonCard: false,
      addedProducts: [],
      routeWatcher: null,
      flip: [],
    };
  },
  computed: {
    categories() {
      return this.$store.state.widjetCategories.categories;
    },
    addedProductsId() {
      const arr = [];
      this.addedProducts.forEach((val) => arr.push(val.id));
      return arr;
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
    meta() {
      return this.$store.state.widjetProducts.meta2;
    },
    productsParams() {
      return this.$store.state.widjetProducts.productsParams2;
    },
    categoriesForCard() {
      const obj = {};
      this.$store.state.widjetCategories.fields_properties2.forEach(
        (val) => (obj[val.id] = val.name)
      );
      return obj;
    },
    selectedWirePerLead() {
      return this.$store.state.widjetProducts.selectedWirePerLead;
    },
    savedAllWhsList() {
      const list = this.allWhsList.filter((whs) => {
        const total = whs.reduce(
          (sum, wh) => (sum += Number(wh.specialValue)),
          0
        );
        return total;
      });
      if (list) {
        return list;
      } else {
        return [];
      }
    },
    products() {
      return this.$store.state.widjetProducts.products;
    },
    fields() {
      return this.$store.state.widjetFields.fields;
    },
    disableAddToDeal() {
      return this.$store.state.widjetProducts.disableAddToDeal;
    },
    sortedFields() {
      return this.fields?.filter((field) => field.lead_config?.visible > 0);
    },
    productsLength() {
      return this.products.length;
    },
    isLastProductPerPage() {
      return this.meta.meta.from === this.meta.meta.to;
    },
    total() {
      const res = {
        cost_price: 0,
        price: 0,
        prib: 0,
        user_name: "",
        price_currency: "",
      };
      this.addedProducts.forEach((prod) => {
        res.cost_price += prod.cost_price * prod.count;
        res.price += prod.price * prod.count;
        res.prib += prod.price * prod.count - prod.cost_price * prod.count;
        res.user_name = prod.user_name;
        res.price_currency = prod.price_currency;
      });
      res.cost_price += " " + res.price_currency;
      res.price += " " + res.price_currency;
      res.prib += " " + res.price_currency;
      return res;
    },
  },
  async mounted() {
    this.routeWatcher = this.$router.beforeResolve((to, from, next) => {
      if (
        (to.query?.order_id != from.query?.order_id || to.path != from.path) &&
        from.query?.order_id
      )
        this.checkSave();

      next();
    });
    // this.get_data_categories();
    // this.feel_available_data();
    await Promise.all([
      this.getCategoriesW(0),
      this.$store.dispatch("getAllFieldsW"),
      this.$store.dispatch("get_fields_properties2W"),
    ]);
    await this.selectCategories(this.categories[0]);
    setTimeout(() => {
      this.updateAddedProducts();
    }, 500);
  },
  watch: {
    async show_cards() {
      if (!this.show_cards) {
        this.selectedCategories = [];
        await this.getCategoriesW(0);
        this.selectCategories(this.categories[0]);
      }
    },
    allWhsList: {
      handler: function () {
        this.saveSelectedWirePerLead();
      },
      deep: true,
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
    changePage(newPage) {
      this.$store.commit("updateProductsParams2", { page: newPage });
      this.getProducts(this.selectedCategories.at(-1)?.id);
      window.scrollTo(0, 0);
    },
    dropPage() {
      this.changePage(1);
    },
    fillAllWhsList() {
      const res = [];

      this.products.forEach((product) => {
        const copyArr = product.whs?.map((a) => ({ ...a }));
        copyArr.map((wh) => {
          wh.name = wh.name + "   |   " + wh.count;
          wh.value = wh.code;
          wh.specialValue = null;
        });
        res.push(copyArr);
      });

      this.allWhsList = res;
    },
    fillInputValues() {
      this.products.forEach(() => this.inputValues.push(""));
    },
    async addToLeadAutocomplete(id) {
      await this.$store.dispatch("addProductW", {
        product_id: id,
      });
      this.updateProductsList();
      this.updateAddedProducts();
    },
    async addToLead(id) {
      const product = this.products.find((product) => product.id === id);
      const idx = this.products.indexOf(product);

      if (await product.is_service) {
        await this.$store.dispatch("addProduct2W", {
          product_id: id,
          count: this.allWhsList[idx][0].specialValue,
        });
      } else {
        const arr = [];
        this.allWhsList[idx].forEach((wh) => {
          if (wh.specialValue) {
            const params = {
              product_id: [id, wh.code].join("%%%"),
              count: wh.specialValue,
            };
            arr.push(this.$store.dispatch("addProduct3W", params));
          }
        });
        await Promise.all(arr);
      }
      this.updateProductsList();
      this.updateAddedProducts();
    },
    updateProductsList() {
      if (this.show_cards) {
        if (this.isLastProductPerPage && this.page.current > 1) {
          this.changePage(this.page.current - 1);
        } else {
          this.getProducts(this.selectedCategories.at(-1)?.id);
        }
      }
    },
    async updateAddedProducts() {
      const order = await this.$store.dispatch("getOrder");
      order.positions?.forEach((item) =>
        !this.addedProductsId.includes(item.id)
          ? this.addedProducts.push(item)
          : null
      );
    },
    async getProductsAutocomplete(q) {
      this.search.value = q;
      const category_id = this.selectedCategories.at(-1)?.id;
      const params = { q: q };
      if (this.selectedWirePerLead.value)
        params.selected_wh = this.selectedWirePerLead.value;
      if (category_id) params.category_id = category_id;
      await this.$store.dispatch("getProductsAutocompleteW", params);
      const res = this.$store.state.widjetProducts.productsAutocomplete;
      res.map((val) => (val.name = val.label));
      this.search.list = res;
    },
    async selectCategories(cat) {
      this.showSpinner = true;
      const idx = this.selectedCategories?.indexOf(cat);
      if (idx !== -1) {
        this.selectedCategories.splice(idx, 9999);
      }
      this.selectedCategories.push(cat);
      this.dropPage();
      await Promise.all([
        this.getCategoriesW(cat.id),
        this.getProducts(cat.id),
      ]);
      if (this.selectedCategories.length === 1) await this.getFields(cat.id);
      this.showSpinner = false;
    },
    async getCategoriesW(id) {
      await this.$store.dispatch("getCategoriesW", {
        parent_id: id,
      });
    },
    async getProducts(id) {
      this.useSkeletonCard = true;
      await this.$store.dispatch("getProducts2W", {
        category_id: id,
        ...this.productsParams,
      });
      this.fillInputValues();
      this.fillAllWhsList();
      this.useSkeletonCard = false;
    },
    async getFields(id) {
      await this.$store.dispatch("getFieldsW", {
        category_id: id,
        with_parents: 1,
      });
    },
    close_filters() {
      this.show_filters = false;
    },
    accept_filters() {
      this.updateProductsList();
      this.updateAddedProducts();
    },
    feel_available_data() {
      this.data.forEach((val, idx) => {
        const obj = {
          name: this.short_value(val),
          data: val,
          value: idx,
        };
        this.available_data.push(obj);
      });
    },
    search_value(str, row) {
      const idx = this.search_idx(str);
      if (idx != -2) {
        return row[idx];
      }
    },
    search_idx(str) {
      const idx = this.params.indexOf(str) - 1;
      return idx;
    },
    toggleShowData(idx) {
      const val = this.show_data[idx];
      this.show_data = [];
      this.show_data[idx] = !val;
    },
    openModal() {
      this.show_filters = true;
      return false;
    },
    saveSelectedWirePerLead() {
      let res = null;
      if (this.products[0]?.one_wh_per_lead) {
        res = this.savedAllWhsList[0]?.find((wh) => wh?.specialValue > 0)?.code;
      }
      if (
        res != this.selectedWirePerLead.value ||
        !this.selectedWirePerLead.sources.includes("MP")
      )
        this.$store.commit("updateSelectedWirePerLead", {
          source: "MP",
          value: res,
        });
    },
    change_value(idx, value, code) {
      this.addedProducts[idx][code] = value;
    },
    checkSave() {
      this.$store.dispatch("updateOrder", {
        positions: this.addedProducts,
      });
    },
    deleteAddedProduct(idx) {
      this.addedProducts.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../app.scss";
* {
  box-sizing: border-box;
}
.app {
  height: fit-content;
  .container1 {
    box-sizing: border-box;
    // overflow-y: auto;
    width: 100%;
    height: 100%;
    .header {
      margin-bottom: 30px;
    }
    .content::-webkit-scrollbar {
      width: 0;
    }
    .content {
      height: 100%;
      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .input-select {
          width: 80%;
          margin: 2px;
        }
        .input-select:deep(.item) {
          justify-content: start;
        }
        .btns {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;
          .sls_checkbox + label::before {
            width: 32px;
            height: 32px;
            margin-left: 17px;
            border: none;
            transition: all 0.15s ease-ount;
            filter: contrast(0.5);
            transform: rotateX(180deg);
            @include bg_image(
              "https://www.svgrepo.com/show/510838/arrow-up-sm.svg",
              100%
            );
          }
          .sls_checkbox:checked + label::before {
            border-color: transparent;
            background-color: transparent;
            @include bg_image(
              "https://www.svgrepo.com/show/510838/arrow-up-sm.svg",
              100%
            );
            transform: rotateX(0deg);
            background-position: center center;
          }
          .sls_checkbox:not(:checked) + label:hover::before {
            background-size: 110%;
          }
          .sls_checkbox:checked + label:hover::before {
            background-size: 110%;
            background-position: center center;
          }
          .sls_checkbox:not(:disabled):active + label::before {
            background-color: transparent;
          }
          .sls_btn {
            width: 32px;
            height: 32px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            // background: #018361;
            background: linear-gradient(135deg, #00cc8f, #40bf99, #018360db);
            border-radius: 8px;
            padding: 0;
            .icon {
              height: 20px;
              width: 20px;
              @include bg_image(
                "https://www.svgrepo.com/show/510785/add-plus.svg",
                100%
              );
            }
          }
          .sls_btn:hover,
          .sls_btn:focus-visible {
            background: #40bf99;
            box-shadow: 0 0 5px 2px rgb(64 191 153 / 25%);
          }
          .sls_btn:active {
            background: #00cc8f;
            box-shadow: 0 0 5px 2px rgb(0 204 143 / 25%);
            transform: scale(0.95);
          }
          .sls_btn_disable {
            box-shadow: none !important;
            cursor: default !important;
            background: #a2a9ae !important;
          }
          .sls_btn_disable:hover,
          .sls_btn::focus-visible {
            background: #a2a9ae !important;
            box-shadow: none !important;
          }
          .sls_btn_disable:active {
            transform: none;
            animation: shake 0.2s linear normal;
            @keyframes shake {
              0% {
                transform: translateX(0);
              }
              25% {
                transform: translateX(-3px);
              }
              50% {
                transform: translateX(3px);
              }
              75% {
                transform: translateX(-3px);
              }
              100% {
                transform: translateX(0);
              }
            }
          }
        }
      }
      .bottom {
        margin-top: 30px;
        .links {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: 10px;
          $step: 12px;

          .triangle {
            cursor: pointer;
            padding: 5px 10px 5px 15px;
            height: 30px;
            margin: 5px 0;
            border: none;
            @include font(400, 15px);
            -webkit-clip-path: polygon(
              0 0,
              calc(100% - $step) 0,
              100% 50%,
              calc(100% - $step) 100%,
              0% 100%,
              $step 50%
            );
            clip-path: polygon(
              0 0,
              calc(100% - $step) 0,
              100% 50%,
              calc(100% - $step) 100%,
              0% 100%,
              $step 50%
            );
            display: flex;
            justify-content: start;
            align-items: center;
            color: #000;
          }
          .triangle:hover {
            padding: 5px 12px 5px 17px;
            margin-left: -2px;
            margin-right: -2px;
            background: #e6e6e6 !important;
          }
          .triangle:first-child:hover {
            margin-left: 0;
          }
          .triangle_last {
            cursor: default;
            color: #fff;
            background: rgba(27, 53, 70, 0.9) !important;
          }
          .triangle_last:hover {
            background: rgba(27, 53, 70, 0.8) !important;
          }
          .triangle_last:active {
            background: rgba(27, 53, 70, 0.6) !important;
          }
          .triangle:active {
            background: #d6d6d6;
          }

          .triangle:nth-child(3n + 1) {
            background: linear-gradient(
              45deg,
              hsl(0, 0%, 90%),
              hsl(0, 0%, 84%)
            );
          }
          .triangle:nth-child(3n + 2) {
            background: linear-gradient(
              45deg,
              hsl(0, 0%, 84%),
              hsl(0, 0%, 83%),
              hsl(0, 0%, 84%)
            );
          }
          .triangle:nth-child(3n + 3) {
            background: linear-gradient(
              45deg,
              hsl(0, 0%, 84%),
              hsl(0, 0%, 90%)
            );
          }
          .triangle:first-child {
            padding-left: 5px;
            -webkit-clip-path: polygon(
              0 0,
              calc(100% - $step) 0,
              100% 50%,
              calc(100% - $step) 100%,
              0% 100%
            );
            clip-path: polygon(
              0 0,
              calc(100% - $step) 0,
              100% 50%,
              calc(100% - $step) 100%,
              0% 100%
            );
          }
        }
        > .sls_row {
          width: calc(100% - 30px);
          margin-bottom: 5px;
          @include font(400, 15px);

          .rows {
            display: flex;
            flex-direction: column;
            gap: 5px;
            width: calc(100% - 2px);
            padding: 15px;
            border: 1px solid #f1f1f1;
            .sls_row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: flex-end;
              height: 34px;
              .name {
                width: 40%;
              }
              .value {
                width: 60%;
              }
              .input {
                width: 60%;
                height: 90%;
                border: 1px solid #dbdedf;
                border-radius: 3px;
                padding: 8px 9px 7px;
                box-sizing: border-box;
                color: #313942;
                background: #fff;
                @include font(400, 15px);
                outline: 0;
                appearance: 0;
              }
              input::-webkit-outer-spin-button,
              input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
              }
            }
          }
          .footer {
            display: flex;
            justify-content: end;
            .btn1 {
              padding: 0 12px;
              height: 32px;
              color: #fff;
              background-color: #6c757d;
              background: linear-gradient(
                135deg,
                hsl(208, 7%, 66%),
                hsl(208, 7%, 58%),
                hsl(206, 7%, 50%)
              );
            }
            .btn1:hover {
              background-color: #5f676d;
              box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
            }
          }
        }

        .sls_grid {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 30px;
          @include font(400, 14px);
          .text {
            margin: 0 auto;
            @include font(500, 18px);
          }
          .skeleton {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

            @keyframes pulse {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0.3;
              }
            }
            .title {
              height: 30px;
              background-color: #d1d5db;
              border-radius: 9999px;
              margin-bottom: 10px;
              width: 70% !important;
              padding: 0 !important;
            }
            .rows {
              min-height: 220px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .sls_row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              border-bottom: 1px dotted #c9c9c9;
              padding-top: 5px;
              padding-bottom: 5px;
              .name,
              .value {
                text-align: start;
                height: 14px;
                background-color: #d1d5db;
                border-radius: 9999px;
              }
              .value {
                text-align: end;
              }
            }
            .sls_row:nth-child(1) {
              .name {
                width: 23%;
              }
              .value {
                width: 15%;
              }
            }
            .sls_row:nth-child(2) {
              .name {
                width: 48%;
              }
              .value {
                width: 6%;
              }
            }
            .sls_row:nth-child(3) {
              .name {
                width: 29%;
              }
              .value {
                width: 41%;
              }
            }
            .sls_row:nth-child(4) {
              .name {
                width: 4%;
              }
              .value {
                width: 50%;
              }
            }
            .sls_row:nth-child(5) {
              .name {
                width: 37%;
              }
              .value {
                width: 9%;
              }
            }
            .sls_row:nth-child(6) {
              .name {
                width: 42%;
              }
              .value {
                width: 19%;
              }
            }
            .sls_row:nth-child(7) {
              .name {
                width: 23%;
              }
              .value {
                width: 39%;
              }
            }
            .card_footer {
              display: flex;
              flex-direction: row;
              gap: 16px;
              .btn_del {
                color: #d1d5db;
                background-color: #d1d5db;
                width: 100%;
              }
            }
          }
          .card {
            min-width: 178px;
            width: calc(50% - 58px);
            border: 1px solid #c9c9c9;
            border-radius: 5px;
            padding: 20px;
            position: relative;
            transition: 0.3s ease-in-out;
            // transform-style: preserve-3d;
            overflow: hidden;
            &__flip {
              // transform: rotateY(0.5turn);
              // background: #c4c4c433;
              // box-shadow: 0 8px 16px rgb(0 0 0 / 20%),
              //   0 8px 8px rgb(0 0 0 / 22%);
              width: 100%;
              .bg_image {
                transform: translateY(-100%);
              }
            }
            .bg_image {
              background: white;
              z-index: 10;
              box-sizing: border-box;
              object-fit: cover;
              // background-color: #c4c4c433;
              // box-shadow: 0 8px 16px rgb(0 0 0 / 20%),
              //   0 8px 8px rgb(0 0 0 / 22%);
              border-radius: 8px;
              position: absolute;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              height: 100%;
              width: 100%;
              backface-visibility: hidden;
              transition: 1s ease-in-out;
              .img {
                width: 90%;
                border-radius: 16px;
                max-height: 90%;
                // box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);
              }
            }
            .back {
              // backface-visibility: hidden;
              object-fit: cover;
              // transform: rotateY(0.5turn);
            }
            .rows::-webkit-scrollbar {
              display: none;
            }
            .rows {
              max-height: 220px;
              overflow: auto;
            }
            .sls_row {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              border-bottom: 1px dotted #c9c9c9;
              padding-top: 5px;
              .name {
                max-width: 50%;
                text-align: start;
              }
              .value {
                text-align: end;
              }
              .value:first-child {
                display: none;
              }
            }
            .title {
              justify-content: center;
              @include font(500, 18px);
              padding: 20px 0;
              width: 100%;
              .name {
                display: none;
              }
              .value {
                text-align: center;
              }
            }
          }
        }
        .categories {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          .card {
            cursor: pointer;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 12px 18px;
            .sls_row {
              width: 100%;
              .value {
                text-align: center;
              }
            }
            .title {
              padding: 0;
            }
            .sls_row:first-child {
              border-bottom: none;
              height: 100%;
              .value {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2; /* number of lines to show */
                line-clamp: 2;
                -webkit-box-orient: vertical;
                min-height: 54px;
              }
            }
          }
        }
        .products {
          margin-top: 30px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          .card {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            .title {
              @include font(600, 20px);
            }
            .rows {
              width: 100%;
            }
          }
        }
        .card_footer {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 8px;
          align-items: flex-end;
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
          .btn_del {
            white-space: nowrap;
            color: #fff;
            background: #4e964d;
          }
          .btn_del:hover {
            background: rgb(105, 177, 104);
            box-shadow: 0 0 5px 2px rgb(105 177 104 / 25%);
          }
          .btn_del_disabled {
            cursor: default !important;
            background-color: #a2a9ae !important;
          }
          .btn_del_disabled:hover {
            background-color: #a2a9ae !important;
            box-shadow: none !important;
          }
        }
      }
    }
  }
}
.disable {
  pointer-events: none;
}
.rows-enter-active,
.rows-leave-active {
  transition: all 0.15s ease-out;
}
.rows-enter-from,
.rows-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.spinner {
  width: 100%;
  display: flex;
  justify-content: center;
}
.sls_paginator {
  width: fit-content;
  margin: 20px auto;
}
.blur2 {
  filter: blur(20px);
}
</style>
