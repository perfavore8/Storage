<template>
  <!-- <div class="row">
    <img :src="i" v-for="i in src" :key="i" />
  </div> -->
  <div class="wrapper" v-if="true">
    <div class="main">
      <table class="table" ref="table">
        <thead>
          <tr class="bar_row">
            <th class="bar_item item" style="min-width: 17px">
              <input
                type="checkbox"
                class="checkbox"
                id="all"
                v-model="allSelectedProducts"
                @change="changeAllSelectedProducts()"
              />
              <label for="all"></label>
            </th>
            <th
              class="bar_item item"
              :style="{
                minWidth:
                  (collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) /
                    collsCount +
                  '%',
              }"
              v-for="title in products.titiles"
              :key="title"
            >
              <div class="bar_item_group">
                <label>{{ title.name }}</label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="products.list.length">
          <template v-for="(row, idx) in products.list" :key="row">
            <tr class="row" @click="row.isOpen = !row.isOpen">
              <td class="item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="row + idx"
                  v-if="selectedProducts[idx] != undefined"
                  v-model="selectedProducts[idx].value"
                />
                <label :for="row + idx"></label>
              </td>
              <template v-for="title in products.titiles" :key="title">
                <td class="item" v-if="title.code === 'stat'">
                  <div class="stat">
                    <img :src="row.img" class="img" />
                    <span>{{ row.stat }}</span>
                  </div>
                </td>
                <td class="item" v-else>
                  {{ row[title.code] }}
                </td>
              </template>
            </tr>
            <tr
              class="row hidden-row"
              v-for="row2 in row.list"
              :key="row2"
              v-show="row.isOpen"
            >
              <td class="item"></td>
              <td class="item"></td>
              <template v-for="title in products.titiles" :key="title">
                <td class="item">{{ row2[title.code] }}</td>
              </template>
            </tr>
            <tr v-if="row.isOpen" class="space" />
          </template>
        </tbody>
      </table>
      <label v-if="products.length == 0" class="text">
        Ничего не найдено
      </label>
    </div>
    <grid-bottom
      :previous="meta?.prev_page_url != null"
      :next="meta?.next_page_url != null"
      :page="meta?.current_page"
      :show="products.list.length != 0"
      :showSelector="false"
      :count="meta?.per_page"
      @changePage="changePage"
    />
  </div>
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
// import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    GridBottom,
  },

  data() {
    return {
      selectedProducts: [],
      showArrow: false,
      allSelectedProducts: false,
      src: [
        "https://www.logobank.ru/images/ph/ru/v/vtb_new_logo_2018.png",
        "https://www.logobank.ru/images/ph/ru/k/kamaz.png",
        "https://www.logobank.ru/images/ph/en/s2/logo_stone_island-600x607.png",
        "https://www.logobank.ru/images/ph/en/t/tele2.png",
        "https://www.logobank.ru/images/ph/en/v/versace.png",
        "https://www.logobank.ru/images/ph/en/n/nike.png",
        "https://www.logobank.ru/images/ph/ru/0-9/1kanal.png",
        "https://www.logobank.ru/images/ph/en/a/apple.png",
      ],
      products: {
        titiles: [
          {
            name: "Статус заказа",
            code: "stat",
          },
          {
            name: "Ответственные",
            code: "otv",
          },
          {
            name: "Дата создания",
            code: "date",
          },
          {
            name: "Сумма заказа",
            code: "sum",
          },
          {
            name: "Список позиций",
            code: "poz",
          },
        ],
        list: [
          {
            isOpen: false,
            otv: "Егор Кондратенко",
            date: "22.12.2022",
            sum: "123123 RUB",
            stat: "Открытый",
            poz: "Заготовка обсадная 127х9,199999999999999, гр.пр. М, треугольная удлиненная  ",
            img: "https://www.logobank.ru/images/ph/ru/v/vtb_new_logo_2018.png",
            list: [
              {
                otv: "Егор Кондратенко",
                sum: "123123 RUB",
                poz: "Заготовка обсадная 127х9,199999999999999, гр.пр. М, треугольная удлиненная  ",
              },
            ],
          },
          {
            isOpen: false,
            otv: "Ефим Ефимович, Александр Заболотный",
            date: "22.12.2022",
            sum: "3500 RUB",
            stat: "Закрытый",
            poz: "Треники, Стол",
            img: "https://www.logobank.ru/images/ph/en/a/apple.png",
            list: [
              {
                otv: "Ефим Ефимович",
                sum: "500 RUB",
                poz: "Треники",
              },
              {
                otv: "Александр Заболотный",
                sum: "3000 RUB",
                poz: "Стол",
              },
            ],
          },
        ],
      },
      orders: {},
      filters: {},
    };
  },
  async mounted() {
    this.setSelectedProducts();
    await this.$store.dispatch("getOrders", this.$store.state.orders.filters);
    this.orders = { ...this.$store.state.orders.orders };
    this.filters = { ...this.$store.state.orders.filters };
  },

  computed: {
    collsCount() {
      return this.products.titiles.length;
    },
    count() {
      return this.products.list.length;
    },
    meta() {
      return this.$store.state.orders.meta;
    },
  },

  methods: {
    changePage(val) {
      const params = { page: val };
      this.$store.commit("updateOrdersFilters", params);
      this.getOrders();
    },
    setSelectedProducts() {
      this.selectedProducts = [];
      for (let i = 0; i < this.count; i++)
        this.selectedProducts.push({ value: false, item: {} });
    },
    changeAllSelectedProducts() {
      this.selectedProducts.map((product, idx) => {
        product.value = this.allSelectedProducts;
        this.allSelectedProducts
          ? (product.item = this.products[idx])
          : (product.item = {});
      });
    },
    getOrders() {
      this.$store.dispatch("getOrders", this.$store.state.orders.filters);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.img {
  object-fit: cover;
  width: 24px;
  padding: 4px;
  border: 1px solid #aeaeae;
  border-radius: 50%;
  object-fit: scale-down;
}
.stat {
  display: flex;
  flex-direction: row;
  align-items: center;
  @include font(500, 16px);
  gap: 8px;
}

.bar_row {
  height: 66px;
  .item {
    padding: 10px;
    padding-left: 15px;
    border: 1px solid #c9c9c9;
    @include font(400, 14px, 17px);
    color: #3f3f3f;
    text-align: start;
    min-width: 50px;
  }
  .bar_item {
    background: #e5e5e5;
    @include font(500, 16px, 19px);
    color: #000000;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    label {
      cursor: inherit;
    }

    .bar_item_group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
  .bar_item:first-child {
    cursor: default;
    width: 17px !important;
  }
}
.row {
  cursor: pointer;
}
.space {
  height: 16px;
  border: none;
}
.hidden-row {
  background-color: #dde8f0;
  cursor: default;
}
.item {
  padding: 10px;
  padding-left: 15px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  min-width: 50px;
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
</style>
