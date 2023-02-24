<template>
  <!-- <div class="row">
    <img :src="i" v-for="i in src" :key="i" />
  </div> -->
  <div class="wrapper" v-if="true">
    <div class="main">
      <table class="table" ref="table">
        <thead>
          <tr class="bar_row">
            <!-- <th class="bar_item item" style="min-width: 17px">
              <input
                type="checkbox"
                class="checkbox"
                id="all"
                v-model="allSelectedProducts"
                @change="changeAllSelectedProducts()"
              />
              <label for="all"></label>
            </th> -->
            <th
              class="bar_item item"
              :style="{
                width:
                  ((collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) /
                    collsCount) *
                    title.width +
                  '%',
              }"
              v-for="title in products.titles"
              :key="title"
              :colspan="title.isGroup ? 2 : 1"
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
              <!-- <td class="item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="row + idx"
                  v-if="selectedProducts[idx] != undefined"
                  v-model="selectedProducts[idx].value"
                />
                <label :for="row + idx"></label>
              </td> -->
              <template v-for="title in products.titles" :key="title">
                <td
                  class="item"
                  v-if="title.code === 'name'"
                  style="padding: 5px 10px 5px 15px"
                >
                  <div class="stat">
                    <div class="relative">
                      <img :src="row.img" class="img" />
                      <div
                        class="handle_cross"
                        v-if="
                          statList.find((el) => el.name === row.stat).value ===
                          2
                        "
                      ></div>
                    </div>
                    <a
                      target="black"
                      class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline"
                      :href="
                        'https://' +
                        accountSubdomain +
                        '.amocrm.ru/leads/detail/' +
                        row.lead_id
                      "
                    >
                      {{ row.name }}
                    </a>
                  </div>
                </td>
                <!-- <td class="item" v-else-if="title.code === 'poz'">
                  <div class="flex flex-row gap-4 items-center">
                    <span class="font-medium text-base">{{
                      row.poz.list.length
                    }}</span>
                  </div>
                </td> -->
                <!-- <td class="item" v-else-if="title.type === 2">
                  <div class="flex flex-row gap-4 items-center justify-center">
                    <button
                      class="btn btn_grey"
                      @click="openModal(row.poz.list)"
                    >
                      Подробнее
                    </button>
                  </div>
                </td> -->
                <td
                  class="item"
                  v-else
                  :colspan="title.isGroup ? 2 : 1"
                  @click="row.isOpen = !row.isOpen"
                >
                  {{ row[title.code] }}
                </td>
              </template>
            </tr>

            <template v-if="row.isOpen">
              <tr
                class="row hidden-row"
                v-for="row2 in row.list.slice(
                  (row.page.current - 1) * maxCount,
                  row.page.current * maxCount
                )"
                :key="row2"
              >
                <!-- <td class="item"></td> -->
                <template v-for="title in selectedOrder.title" :key="title">
                  <td class="item">{{ row2[title.code] }}</td>
                </template>
              </tr>
              <tr v-if="row.list.length > maxCount">
                <td :colspan="Object.values(row.list?.[0])?.length">
                  <div class="w-full flex items-center justify-center mt-2">
                    <AppPaginator
                      :page="row.page"
                      @changePage="(page) => changePageRow(page, idx)"
                    />
                  </div>
                </td>
              </tr>
              <tr class="space" />
            </template>
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
  <!-- <Teleport to="body">
    <ReportGridModal
      v-if="selectedOrder?.isOpen"
      :title="selectedOrder?.title"
      :list="selectedOrder?.list"
      @close="closeOrderGridModal"
    >
      <template v-slot:title>Позиции</template>
    </ReportGridModal>
  </Teleport> -->
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
import AppPaginator from "./AppPaginator.vue";
// import ReportGridModal from "./ReportGridModal.vue";
// import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    GridBottom,
    AppPaginator,
    // ReportGridModal,
  },

  data() {
    return {
      selectedProducts: [],
      showArrow: false,
      allSelectedProducts: false,
      maxCount: 10,
      whOptions: [],
      priceCatOptions: [],
      selectedOrder: {
        isOpen: false,
        title: [
          { name: "Название", code: "name" },
          { name: "Артикул", code: "article" },
          // { name: "Партия", code: "batch" },
          { name: "Склад", code: "wh" },
          { name: "Цена", code: "price" },
          { name: "Валюта", code: "price_currency" },
          { name: "Количество", code: "count" },
          // { name: "Тип цены", code: "price_type" },
          { name: "Сума", code: "sum" },
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
        {
          name: "Удален",
          value: 2,
        },
        // {
        //   name: "Отмененный",
        //   value: 3,
        // },
      ],
      products: {
        titles: [
          {
            name: "Название сделки",
            code: "name",
            width: 2,
          },
          {
            name: "Статус заказа",
            code: "stat",
            width: 1,
          },
          {
            name: "Ответственные",
            code: "otv",
            width: 1,
          },
          {
            name: "Дата создания",
            code: "date",
            width: 1,
            // isGroup: true,
          },
          {
            name: "Сумма заказа",
            code: "sum",
            width: 1,
          },
          {
            name: "Позиции",
            code: "poz",
            width: 1,
          },
          {
            name: "Клиент",
            code: "client",
            width: 1,
          },
          // {
          //   name: "",
          //   code: "btns",
          //   type: 2,
          // },
        ],
        list: [],
      },
      filters: {},
    };
  },
  async mounted() {
    await this.$store.dispatch("get_all_fields");
    await this.$store.dispatch("get_account");
    await this.$store.dispatch("getOrders", this.$store.state.orders.filters);
    this.fillWhs();
    this.fillPriceCat();
    this.filters = { ...this.$store.state.orders.filters };
    this.fillOrders();
    this.setSelectedProducts();
  },

  computed: {
    collsCount() {
      return this.products.titles.length;
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
    orders() {
      return this.$store.state.orders.orders;
    },
    accountSubdomain() {
      return this.$store.state.account.account.subdomain;
    },
  },

  methods: {
    dateFormater(date) {
      const [dateTime] = date.split(".");
      const [day, time] = dateTime.split("T");
      return day + " " + time;
    },
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
    async getOrders() {
      await this.$store.dispatch("getOrders", this.$store.state.orders.filters);
      this.fillOrders();
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
    // openModal(list) {
    //   this.selectedOrder.list = list;
    //   this.selectedOrder.isOpen = true;
    // },
    // closeOrderGridModal() {
    //   this.selectedOrder.isOpen = false;
    // },
    changePageRow(page, idx) {
      const obj = {
        prev: page === 1 ? null : page - 1,
        current: page,
        next: page === this.products?.list?.[idx]?.page?.last ? null : page + 1,
      };
      Object.assign(this.products?.list?.[idx]?.page, obj);
    },
    fillOrders() {
      this.products.list = [];
      this.orders.forEach((order) => {
        const poz = [];
        order.positions.forEach((pos) => {
          const a = {
            name: pos?.name,
            article: pos?.article,
            batch: pos?.batch,
            wh_field: pos?.wh_field,
            count: pos?.count,
            sum: pos?.sum,
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
          page: {
            first: 1,
            prev: null,
            current: 1,
            next: Math.ceil(poz.length / this.maxCount) > 1 ? 2 : null,
            last: Math.ceil(poz.length / this.maxCount),
          },
          isOpen: false,
          name: order.lead_name,
          lead_id: order.lead_id,
          client: order.client,
          otv: order.responsible_name,
          date: this.dateFormater(order.created_at),
          sum: order.sum + " " + order.price_currency,
          stat: this.statList.find((el) => el.value == order.is_active).name,
          poz: poz.length,
          img: "https://www.digiseller.ru/preview/571523/p1_3380359_3410fdc6.png",
          list: [...poz],
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
.handle_cross {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  @include bg_image("@/assets/handle_cross2.svg", 65%);
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
    text-align: start;
    // cursor: pointer;
    label {
      cursor: inherit;
    }

    .bar_item_group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;
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
  background-color: #dde8f082;
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
  // text-align: center;
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
