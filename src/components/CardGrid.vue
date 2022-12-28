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
  <div class="wrapper" :class="{ blur: show_edit_modal }">
    <div class="header">
      <transition name="mdl">
        <card-grid-filters
          ref="filters"
          :fields="all_fields"
          :tableConfig="tableConfig"
          :sortedFields="sortedFields"
        />
      </transition>
      <!-- <card-grid-links ref="links" @emit_link="emit_link" /> -->
    </div>
    <div class="grid" ref="grid" :class="{ blur: isDataLoading }">
      <label v-if="products.length == 0" class="text">
        Ничего не найдено
      </label>
      <div
        class="card"
        :class="{ card__flip: flip[idx] }"
        @click="flip[idx] = !flip[idx]"
        v-for="(row, idx) in products"
        :key="row.id"
      >
        <div class="bg_image">
          <img
            :src="src[idx % src.length]"
            class="img"
            v-show="!isDataLoading"
          />
          <img
            src="https://img2.freepng.ru/20180518/rpa/kisspng-parcel-computer-icons-package-tracking-mail-5aff95be3be2a8.2770409315266994542453.jpg"
            class="img"
            v-show="isDataLoading"
          />
        </div>
        <div class="back">
          <div class="row" v-for="item in sortedFields" :key="item">
            <div class="name">{{ item[1].name }}<span> :</span></div>
            <div class="value">
              <span v-if="item[0].split('.').length < 2">
                {{
                  item[0] == "category"
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
            </div>
          </div>
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
              @click="open_edit_modal(row)"
              title="Редактирование товара"
            />
          </div>
        </div>
      </div>
    </div>
    <grid-bottom
      :previous="meta.links.prev != null"
      :next="meta.links.next != null"
      :page="meta.meta.current_page"
      :blur="show_edit_modal"
      :show="products.length != 0"
      :count="count"
      v-if="showGridBottom"
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
// import CardGridLinks from "@/components/CardGridLinks.vue";
import { mapGetters } from "vuex";
import { nextTick } from "@vue/runtime-core";
export default {
  name: "Main_grid",
  components: {
    EditItem,
    GridBottom,
    CardGridFilters,
    // CardGridLinks,
    GridEditPrice,
  },
  props: {
    selectedWH: {
      type: Object,
    },
  },
  inject: ["isServicePage"],
  emits: {},
  data() {
    return {
      edit_data: {},
      selectedProducts: [],
      showArrow: false,
      flip: [],
      src: [
        "https://spb.wadoo.ru/upload/iblock/370/370d7dd8a236c788f7f7758e5b342ed0.jpg",
        "https://diamondelectric.ru/images/3809/3808559/ydarnaya_akkymylyatornaya_drelshyrypovert_bosch_gsb_180li_liion_1.jpg",
        "https://redhome.by/image/cache/catalog/i/nk/ka/1023c718bea479e2011bcb8107182120-1000x1000.jpg",
        "https://skladom.ru/images/detailed/282/SKRZYNKA-NARZEDZIOWA-NA-KOLKACH-QBRICK-TWO-BIG-SET.jpg",
        "https://media.garwin.ru/images/products/09/2e/092e4949-c7e3-4315-9f24-8e0fce706885-w768p.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/52/525000874-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/52/525000719-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/64/643000059-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/64/643000055-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/50/507000318-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/50/507000694-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/50/507000656-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/70/700000627-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/70/700000504-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/70/700000626-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/51/515000914-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/35/351003750-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/35/351003527-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/45/453000554-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/45/453000555-0.webp",
        "https://baucenter.ru/preview/r/200x200/c/200x200/q/95/upload/pictures/40/405002166-0.webp",
      ],
      // link: {
      //   path: null,
      //   selected_categoryes: null,
      //   sel_idx: null,
      //   show_categoryes: null,
      //   categoryes: null,
      // },
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
    this.$store.dispatch("get_fields_properties");
    await this.$store.dispatch(
      "getTableConfig",
      this.selectedWH.value != "whs" ? this.selectedWH.value : ""
    );
    await this.$store.dispatch("get_all_fields");
    await this.get_products(this.productsParams);
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
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
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
    emit_link(obj) {
      Object.assign(this.link, obj);
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
    width: 300px;
    // border: 1px solid #c9c9c9;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    transition: 1s ease-in-out;
    transform-style: preserve-3d;
    &__flip {
      transform: rotateY(0.5turn);
      // background: #c4c4c433;
      box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);
    }
    .bg_image {
      box-sizing: border-box;
      object-fit: cover;
      // background-color: #c4c4c433;
      box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);
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
      backface-visibility: hidden;
      object-fit: cover;
      transform: rotateY(0.5turn);
    }
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
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
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
