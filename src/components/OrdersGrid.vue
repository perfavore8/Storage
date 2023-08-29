<template>
  <div class="main mt-20 relative">
    <div
      v-if="isTest"
      @click="openTableSettings()"
      class="tableSettings absolute top-2 right-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 512 512"
      >
        <path
          fill="#757575"
          d="M495.9 166.6c3.2 8.7.5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4l-55.6 17.8c-8.8 2.8-18.6.3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4c-1.1-8.4-1.7-16.9-1.7-25.5s.6-17.1 1.7-25.4l-43.3-39.4c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160a80 80 0 1 0 0 160z"
        />
      </svg>
    </div>
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
            :class="{ cursor_pointer: title.sortable }"
            :style="{
              width:
                ((collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) /
                  collsCount) *
                  title.width +
                '%',
            }"
            v-for="title in products.titles"
            @click="title.sortable ? sort(title.value) : null"
            :key="title"
            :colspan="title.isGroup ? 2 : 1"
          >
            <div class="bar_item_group">
              <label>{{ title.name }}</label>
              <button
                class="bar_item_icon"
                :class="{
                  bar_item_icon_up:
                    sorting.order == 'desc' && title.value === sorting.order_by,
                  bar_item_icon_down:
                    sorting.order == 'asc' && title.value === sorting.order_by,
                }"
                v-if="title.sortable"
              ></button>
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
                  <div class="img_wrapper">
                    <a
                      :href="
                        isTest &&
                        statList.find((el) => el.name === row.stat)?.value !== 3
                          ? 'https://' +
                            accountSubdomain +
                            '.amocrm.ru/leads/detail/' +
                            row.lead_id
                          : null
                      "
                      target="_blank"
                    >
                      <img :src="row.img" class="img" />
                    </a>
                    <div
                      class="handle_cross"
                      v-if="
                        statList.find((el) => el.name === row.stat)?.value === 3
                      "
                    ></div>
                  </div>
                  <a
                    :target="isTest ? '_self' : '_blank'"
                    class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline cursor-pointer"
                    :href="
                      isTest
                        ? null
                        : 'https://' +
                          accountSubdomain +
                          '.amocrm.ru/leads/detail/' +
                          row.lead_id
                    "
                    @click="isTest ? routeToOrder(row.id) : null"
                    v-if="
                      statList.find((el) => el.name === row.stat)?.value !== 3
                    "
                  >
                    {{ row.name }}
                  </a>
                </div>
              </td>
              <td
                class="item"
                v-else-if="title.code === 'stat' && row.stat === 'Успешный'"
              >
                <div class="flex flex-row gap-4 items-center">
                  <span class="">
                    {{ row[title.code] }}
                  </span>
                  <button
                    class="btn small_btn order-1 max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-normal leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                    @click="refundOrder(row.id)"
                  >
                    Возврат
                  </button>
                </div>
              </td>
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
                :class="{ 'cursor-pointer': !isTest }"
                v-else
                :colspan="title.isGroup ? 2 : 1"
                @click="isTest ? null : (row.isOpen = !row.isOpen)"
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
    <label v-if="products.length == 0" class="text"> Ничего не найдено </label>
  </div>
  <grid-bottom
    :page="page"
    :show="products.list.length != 0"
    :showSelector="false"
    :count="meta?.per_page"
    @changePage="changePage"
  />
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
import { computed, onMounted, reactive, ref } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
// import ReportGridModal from "./ReportGridModal.vue";
// import { nextTick } from "vue";
export default {
  name: "Main_grid",
  components: {
    GridBottom,
    AppPaginator,
    // ReportGridModal,
  },
  setup() {
    const router = useRouter();

    const selectedProducts = reactive([]);
    const allSelectedProducts = ref(false);
    const maxCount = ref(10);
    const sorting = reactive({
      order_by: null,
      order: "",
    });
    const whOptions = reactive([]);
    const priceCatOptions = reactive([]);
    const selectedOrder = reactive({
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
        { name: "Сумма", code: "sum" },
      ],
      list: [],
    });
    const statList = reactive([
      {
        name: "Открытый",
        value: 0,
      },
      {
        name: "Удален",
        value: 3,
      },
      {
        name: "Отменен",
        value: 2,
      },
      {
        name: "Успешный",
        value: 1,
      },
    ]);
    const products = reactive({
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
          sortable: true,
          value: "status",
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
          sortable: true,
          value: "created_at",
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
    });

    onMounted(async () => {
      await Promise.all([
        store.dispatch("get_all_fields"),
        store.dispatch("get_account"),
        store.dispatch("getOrders", store.state.orders.filters),
      ]);
      fillWhs();
      fillPriceCat();
      fillOrders();
      setSelectedProducts();
    });

    const collsCount = computed(() => products.titles.length);
    const count = computed(() => products.list.length);
    const meta = computed(() => store.state.orders.meta);
    const fields = computed(() => store.state.fields.all_fields);
    const orders = computed(() => store.state.orders.orders);
    const accountSubdomain = computed(
      () => store.state.account.account.subdomain
    );
    const isTest = computed(() => store.state.account?.account?.id == 1);
    const params = computed(() => store.state.orders.filters);
    const page = computed(() => {
      const obj = {
        first: getPageFromLink(meta.value?.first_page_url),
        prev: getPageFromLink(meta.value?.prev_page_url),
        current: meta.value?.current_page,
        next: getPageFromLink(meta.value?.next_page_url),
        last: getPageFromLink(meta.value?.last_page_url),
      };
      return obj;
    });

    const getPageFromLink = (link) => {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    };
    const dateFormater = (date) => {
      const [dateTime] = date.split(".");
      const [day, time] = dateTime.split("T");
      return day + " " + time;
    };
    const changePage = (val) => {
      const params = { page: val };
      store.commit("updateOrdersFilters", params);
      getOrders();
    };
    const setSelectedProducts = () => {
      selectedProducts.length = 0;
      for (let i = 0; i < count.value; i++)
        selectedProducts.push({ value: false, item: {} });
    };
    const changeAllSelectedProducts = () => {
      selectedProducts.map((product, idx) => {
        product.value = allSelectedProducts.value;
        allSelectedProducts.value
          ? (product.item = products[idx])
          : (product.item = {});
      });
    };
    const getOrders = async () => {
      await store.dispatch("getOrders", params.value);
      fillOrders();
    };
    const fillWhs = () => {
      fields.value
        .filter((val) => val.type == 13 && val.code != "whs")
        .forEach((val) => whOptions.push({ name: val.name, value: val.code }));
    };
    const fillPriceCat = () => {
      fields.value
        .filter((val) => val.type == 11)
        .forEach((val) =>
          priceCatOptions.push({ name: val.name, value: val.code })
        );
    };
    const sort = (code) => {
      if (sorting.order_by != code) {
        sorting.order = "";
        sorting.order_by = code;
      }
      if (sorting.order === "desc" || !sorting.order) {
        sorting.order = "asc";
      } else {
        if (sorting.order === "asc") sorting.order = "desc";
      }
      store.commit("updateOrdersFilters", sorting);
      getOrders();
    };
    const emitParams = (params) => {
      store.commit("updateOrdersFilters", params);
      getOrders();
    };
    const changePageRow = (page, idx) => {
      const obj = {
        prev: page === 1 ? null : page - 1,
        current: page,
        next: page === products?.list?.[idx]?.page?.last ? null : page + 1,
      };
      Object.assign(products?.list?.[idx]?.page, obj);
    };
    const fillOrders = () => {
      products.list = [];
      orders.value.forEach((order) => {
        const poz = [];
        let posTotalSum = 0;
        order.positions?.forEach((pos) => {
          posTotalSum += pos?.sum;
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
            wh: whOptions.find((el) => el.value == pos.wh_field)?.name,
            price_type: priceCatOptions.find(
              (el) => el.value == pos.price_field
            )?.name,
          };
          poz.push(a);
        });
        let client = "";
        if (order.company_name == null && order.contact_name != null)
          client = order.contact_name;
        if (order.company_name != null && order.contact_name == null)
          client = order.company_name;
        if (order.company_name != null && order.contact_name != null)
          client = order.company_name + ", " + order.contact_name;
        const obj = {
          id: order.id,
          page: {
            first: 1,
            prev: null,
            current: 1,
            next: Math.ceil(poz.length / maxCount.value) > 1 ? 2 : null,
            last: Math.ceil(poz.length / maxCount.value),
          },
          isOpen: false,
          name: isTest.value ? order.fields?.name : order.lead_name,
          lead_id: order.lead_id,
          client: client,
          otv: order.responsible_name,
          date: dateFormater(order.created_at),
          sum:
            (posTotalSum ? Math.round(Number(posTotalSum) * 100) / 100 : "") +
            " " +
            order.price_currency
              ? order.price_currency
              : "",
          stat: statList.find((el) => el.value == order.status)?.name,
          poz: poz.length,
          img: "https://www.digiseller.ru/preview/571523/p1_3380359_3410fdc6.png",
          list: [...poz],
        };
        products.list.push(obj);
      });
    };
    const routeToOrder = (id) => {
      router.push("addToDeal?order_id=" + id);
    };

    const openTableSettings = () => store.commit("open_table_settings");

    const refundOrder = async (orderId) => {
      await store.dispatch("refundOrder", { order_id: orderId });
      await store.dispatch("getOrders", store.state.orders.filters);
      fillOrders();
    };

    return {
      selectedProducts,
      allSelectedProducts,
      maxCount,
      sorting,
      selectedOrder,
      statList,
      products,
      collsCount,
      count,
      meta,
      orders,
      accountSubdomain,
      isTest,
      page,
      changePage,
      setSelectedProducts,
      changeAllSelectedProducts,
      getOrders,
      fillWhs,
      fillPriceCat,
      sort,
      emitParams,
      changePageRow,
      routeToOrder,
      openTableSettings,
      refundOrder,
    };
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
  .img_wrapper {
    position: relative;
    // z-index: -1;
  }
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

      .bar_item_icon {
        margin: 0 auto;
        height: 16px;
        width: 16px;
        background-color: transparent;
        @include bg_image("@/assets/sort.svg");
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
.cursor_pointer {
  cursor: pointer;
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
.tableSettings {
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  padding: 6px;
  cursor: pointer;
  margin: 0 auto;
  border-radius: 50%;
  transition: all 0.2s ease-out;
}
.tableSettings:hover {
  transform: rotate(90deg) scale(1.1);
}
</style>
