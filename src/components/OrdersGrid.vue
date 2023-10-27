<template>
  <div class="main mt-20 relative overflow-y-scroll">
    <AppTablePreloader :titles="titlesForPreloader" v-if="isDataLoading" />
    <table class="table relative" ref="table" v-else>
      <thead>
        <tr class="bar_row">
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
                    sorting.order == 'desc' &&
                    title.value.split(/_(.*)/s)[1] === sorting.order_by,
                  bar_item_icon_down:
                    sorting.order == 'asc' &&
                    title.value.split(/_(.*)/s)[1] === sorting.order_by,
                }"
                v-if="title.sortable && title.isOrder"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="products.list.length">
        <template v-for="row in products.list" :key="row">
          <tr class="row">
            <template v-for="title in products.titles" :key="title">
              <td
                class="item"
                v-if="title.value === 'order_name'"
                style="padding: 5px 10px 5px 15px"
              >
                <div class="stat">
                  <div class="img_wrapper">
                    <a
                      :href="
                        row.fieldsForRender.statusType !== 4 && row.lead_id
                          ? 'https://' +
                            accountSubdomain +
                            '.amocrm.ru/leads/detail/' +
                            row.lead_id
                          : null
                      "
                      target="_blank"
                    >
                      <img :src="row.fieldsForRender.img" class="img" />
                    </a>
                    <div
                      class="handle_cross"
                      v-if="row.fieldsForRender.statusType === 4"
                    ></div>
                  </div>
                  <a
                    target="_blank"
                    class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline cursor-pointer"
                    :href="
                      row.lead_id
                        ? 'https://' +
                          accountSubdomain +
                          '.amocrm.ru/leads/detail/' +
                          row.lead_id
                        : null
                    "
                    @click="row.lead_id ? null : routeToOrder(row.id)"
                    v-if="row.fieldsForRender.statusType !== 4"
                  >
                    {{
                      (row.fieldsForRender?.[title.value] || "") +
                      (row.lead_id ? ` (${row.lead_id})` : "")
                    }}
                  </a>
                  <span v-else>
                    {{
                      (row.fieldsForRender?.[title.value] || "") +
                      ` (${row.lead_id || ""})`
                    }}
                  </span>
                </div>
              </td>
              <td
                class="item"
                v-else-if="
                  title.code === 'status' &&
                  row.fieldsForRender.statusType === 2
                "
              >
                <div class="flex flex-row gap-4 items-center">
                  <span class="">
                    {{ row.fieldsForRender?.[title.value] }}
                  </span>
                  <button
                    class="btn small_btn order-1 max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-normal leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                    @click="refundOrder(row.id)"
                  >
                    {{ $t("orders.woz") }}
                  </button>
                </div>
              </td>
              <td class="item" v-else>
                {{ row.fieldsForRender?.[title.value] }}
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
    <label v-if="products.length == 0" class="text">
      {{ $t("global.nothingFound") }}
    </label>
  </div>
  <grid-bottom
    :page="page"
    :show="products.list.length != 0"
    :showSelector="false"
    :count="meta?.per_page"
    @changePage="changePage"
    v-if="!isDataLoading && products.list.length"
  />
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { isTest2 } from "@/composables/isTest";
import store from "@/store";
import { useRouter } from "vue-router";
import { useOrdersPipelinesSelect } from "@/composables/ordersPipelinesSelect";
import AppTablePreloader from "./AppTablePreloader.vue";
export default {
  name: "Main_grid",
  components: {
    GridBottom,
    AppTablePreloader,
  },
  setup() {
    const router = useRouter();
    const maxCount = ref(10);
    const sorting = reactive({
      order_by: null,
      order: "",
    });
    const products = reactive({
      titles: [],
      list: computed(() => orders.value),
    });

    onMounted(() => {
      updateList();
    });

    const updateList = async () => {
      await setTitles();
      await Promise.all([store.dispatch("get_account"), getOrders()]);
    };

    const collsCount = computed(() => products.titles.length);
    const meta = computed(() => store.state.orders.meta);
    const orders = computed(() => store.state.orders.orders);
    const accountSubdomain = computed(
      () => store.state.account.account.subdomain
    );
    const params = computed(() => store.state.orders.filters);
    const page = computed(() => {
      const obj = {
        first: getPageFromLink(
          meta.value?.links?.first || meta.value?.first_page_url
        ),
        prev: getPageFromLink(
          meta.value?.links?.prev || meta.value?.prev_page_url
        ),
        current: meta.value?.meta?.current_page || meta.value?.current_page,
        next: getPageFromLink(
          meta.value?.links?.next || meta.value?.next_page_url
        ),
        last: getPageFromLink(
          meta.value?.links?.last || meta.value?.last_page_url
        ),
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
    const changePage = (val) => {
      const params = { page: val };
      store.commit("updateOrdersFilters", params);
      getOrders();
    };
    const { pipelines } = useOrdersPipelinesSelect(true);
    const getOrders = async () => {
      const params1 = {};
      if (pipelines.selected.id !== -1)
        params1.pipeline_id = pipelines.selected.id;
      await store.dispatch("getOrders", {
        ...params1,
        ...params.value,
      });
    };
    const sort = (code) => {
      if (sorting.order_by != code.split(/_(.*)/s)[1]) {
        sorting.order = "";
        sorting.order_by = code.split(/_(.*)/s)[1];
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

    const setTitles = async () => {
      await store.dispatch("getOrdersTableConfig", { for: "table" });
      products.titles = computed(() => store.getters.sortedFilteredTableConfig);
    };

    const routeToOrder = (id) => {
      router.push("addToDeal?order_id=" + id);
    };

    const refundOrder = async (orderId) => {
      await store.dispatch("refundOrder", { order_id: orderId });
      getOrders();
    };

    const isDataLoading = computed(() => store.state.orders.isLoading);

    const titlesForPreloader = computed(() => {
      return products.titles.reduce((acc, field) => {
        if (field.visible) acc.push(field.name);
        return acc;
      }, []);
    });

    return {
      maxCount,
      sorting,
      products,
      collsCount,
      meta,
      orders,
      accountSubdomain,
      isTest2,
      page,
      changePage,
      getOrders,
      sort,
      emitParams,
      routeToOrder,
      refundOrder,
      updateList,
      isDataLoading,
      titlesForPreloader,
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
.blur {
  transition: filter 0.2s ease-out;
  filter: blur(5px);
}
</style>
