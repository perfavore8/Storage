<template>
  <div class="wrapper">
    <div class="main">
      <table class="table" ref="table">
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
        </thead>
        <tbody v-if="products.length">
          <tr class="row" v-for="(row, idx) in products" :key="row.id">
            <td class="item">
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
              <td class="item">{{ row.fields[item[0]] }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <label v-if="products.length == 0" class="text">
        Ничего не найдено
      </label>
    </div>
    <!-- <grid-bottom
      :previous="meta.links.prev != null"
      :next="meta.links.next != null"
      :page="meta.meta.current_page"
      :blur="show_edit_modal"
      :show="products.length != 0"
      :count="count"
      :showBtns="showGridBottom"
      @changePage="changePage"
      @changeCount="changeCount"
    /> -->
  </div>
  <div class="arrow" v-if="showArrow" @click="scrollUp()"></div>
</template>

<script>
// import GridBottom from "@/components/GridBottom.vue";
import MainGridBar from "@/components/MainGridBar.vue";
import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    // GridBottom,
    MainGridBar,
  },

  data() {
    return {
      selectedProducts: [],
      showArrow: false,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  async mounted() {
    this.setSelectedProducts();
    this.bar?.dropAllSelectedProducts();
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
  },

  watch: {
    products: {
      handler: function () {
        nextTick(() => {
          if (!this.filters?.isConfirmFilters) this.filters?.clearFilters();
          this.filters?.setFalseIsConfirmFilters();
        });
      },
      deep: true,
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
    async clearFilters() {
      await this.filters?.clearFilters();
      this.filters?.confirmFilters();
    },
    confirmFilters() {
      this.filters?.confirmFilters();
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
      if (this.selectedWH.value != "whs" && !this.isServicePage.value)
        params = { ...params, warehouse: this.selectedWH.value };
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
