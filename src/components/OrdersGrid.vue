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
            <tr class="row">
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
                <td
                  class="item"
                  v-if="title.code === 'names'"
                  style="padding: 5px 10px 5px 15px"
                >
                  <div class="stat">
                    <img :src="row.img" class="img" />
                    <a
                      target="black"
                      class="underline text-indigo-500 hover:text-indigo-600"
                      :href="
                        'https://' +
                        accountSubdomain +
                        '.amocrm.ru/leads/detail/' +
                        row.names
                      "
                    >
                      {{ row.names }}
                    </a>
                  </div>
                </td>
                <td class="item" v-else-if="title.code === 'poz'">
                  <div class="flex flex-row gap-4 items-center">
                    <span class="font-medium text-base">{{
                      row.poz.list.length
                    }}</span>
                    <button
                      class="btn btn_grey"
                      @click="openModal(row.poz.list)"
                    >
                      Показать
                    </button>
                  </div>
                </td>
                <td class="item" v-else>
                  {{ row[title.code] }}
                </td>
              </template>
            </tr>
            <!-- <tr
              class="row hidden-row"
              v-for="row2 in row.list"
              :key="row2"
              v-show="row.isOpen"
            >
              <td class="item"></td>
              <template v-for="title in products.titiles" :key="title">
                <td class="item">{{ row2[title.code] }}</td>
              </template>
            </tr>
            <tr v-if="row.isOpen" class="space" /> -->
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
  <Teleport to="body">
    <ReportGridModal
      v-if="selectedOrder?.isOpen"
      :title="selectedOrder?.title"
      :list="selectedOrder?.list"
      @close="closeOrderGridModal"
    >
      <template v-slot:title>Позиции</template>
    </ReportGridModal>
  </Teleport>
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
import ReportGridModal from "./ReportGridModal.vue";
// import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    GridBottom,
    ReportGridModal,
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
      whOptions: [],
      priceCatOptions: [],
      selectedOrder: {
        isOpen: false,
        title: [
          { name: "Название", code: "name" },
          { name: "Артикул", code: "article" },
          { name: "Партия", code: "batch" },
          { name: "Количество", code: "count" },
          { name: "Склад", code: "wh" },
          { name: "Цена", code: "price" },
          { name: "Валюта", code: "price_currency" },
          { name: "Тип цены", code: "price_type" },
        ],
        list: [],
      },
      statList: [
        {
          name: "Открытый",
          value: 1,
        },
        {
          name: "Закрытый",
          value: 0,
        },
        // {
        //   name: "Отмененный",
        //   value: 3,
        // },
      ],
      products: {
        titiles: [
          {
            name: "Название сделки",
            code: "names",
          },
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
            type: 2,
          },
        ],
        list: [
          // {
          //   isOpen: false,
          //   otv: "Егор Кондратенко",
          //   date: "22.12.2022",
          //   sum: "123123 RUB",
          //   stat: "Открытый",
          //   poz: "Заготовка обсадная 127х9,199999999999999, гр.пр. М, треугольная удлиненная  ",
          //   img: "https://www.logobank.ru/images/ph/ru/v/vtb_new_logo_2018.png",
          //   list: [
          //     {
          //       otv: "Егор Кондратенко",
          //       sum: "123123 RUB",
          //       poz: "Заготовка обсадная 127х9,199999999999999, гр.пр. М, треугольная удлиненная  ",
          //     },
          //   ],
          // },
          // {
          //   isOpen: false,
          //   otv: "Ефим Ефимович, Александр Заболотный",
          //   date: "22.12.2022",
          //   sum: "3500 RUB",
          //   stat: "Закрытый",
          //   poz: "Треники, Стол",
          //   img: "https://www.logobank.ru/images/ph/en/a/apple.png",
          //   list: [
          //     {
          //       otv: "Ефим Ефимович",
          //       sum: "500 RUB",
          //       poz: "Треники",
          //     },
          //     {
          //       otv: "Александр Заболотный",
          //       sum: "3000 RUB",
          //       poz: "Стол",
          //     },
          //   ],
          // },
        ],
      },
      orders: {},
      filters: {},
    };
  },
  async mounted() {
    await this.$store.dispatch("get_all_fields");
    await this.$store.dispatch("get_account");
    await this.$store.dispatch("getOrders", this.$store.state.orders.filters);
    this.fillWhs();
    this.fillPriceCat();
    this.orders = [...this.$store.state.orders.orders];
    this.filters = { ...this.$store.state.orders.filters };
    this.fillOrders();
    this.setSelectedProducts();
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
    fields() {
      return this.$store.state.fields.all_fields;
    },
    accountSubdomain() {
      return this.$store.state.account.account.subdomain;
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
    fillWhs() {
      this.fields
        .filter((val) => val.type == 13 && val.code != "whs")
        .forEach((val) =>
          this.whOptions.push({ name: val.name, value: val.code })
        );
    },
    fillPriceCat() {
      this.fields
        .filter((val) => val.type == 11)
        .forEach((val) =>
          this.priceCatOptions.push({ name: val.name, value: val.code })
        );
    },
    openModal(list) {
      this.selectedOrder.list = list;
      this.selectedOrder.isOpen = true;
    },
    closeOrderGridModal() {
      this.selectedOrder.isOpen = false;
    },
    fillOrders() {
      this.orders.forEach((order) => {
        const poz = [];
        order.positions.forEach((pos) => {
          const a = {
            name: pos?.name,
            article: pos?.article,
            batch: pos?.batch,
            wh_field: pos?.wh_field,
            count: pos?.count,
            price_field: pos?.price_field,
            price: pos?.price,
            price_currency: pos?.price_currency,
            wh: this.whOptions.find((el) => el.value == pos.wh_field)?.name,
            price_type: this.priceCatOptions.find(
              (el) => el.value == pos.price_field
            )?.name,
          };
          poz.push(a);
        });
        const obj = {
          // isOpen: false,
          names: order.lead_id,
          otv: order.responsible_name,
          date: order.created_at,
          sum: order.sum + " " + order.price_currency,
          stat: this.statList.find((el) => el.value == order.is_active).name,
          poz: {
            list: [...poz],
          },
          img: "https://www.digiseller.ru/preview/571523/p1_3380359_3410fdc6.png",
          // list: [
          //   {
          //     otv: "Егор Кондратенко",
          //     sum: "123123 RUB",
          //     poz: "Заготовка обсадная 127х9,199999999999999, гр.пр. М, треугольная удлиненная  ",
          //   },
          // ],
        };
        this.products.list.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.img {
  object-fit: cover;
  width: 46px;
  padding: 4px;
  border: 1px solid #aeaeae;
  border-radius: 50%;
  object-fit: scale-down;
}
.stat {
  width: max-content;
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
    // cursor: pointer;
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
  // cursor: pointer;
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
