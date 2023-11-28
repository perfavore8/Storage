<template>
  <div
    class="w-fit mt-12 pb-2 md:mt-20 md:pb-10 mx-auto text-left overflow-x-scroll max-w-[95vw] limit_height"
    :class="{ blur: isDataLoading }"
  >
    <div class="w-full flex flex-row gap-2">
      <template v-for="column in pipelines.selected.statuses" :key="column.id">
        <div
          class="flex flex-col shrink-0 w-80 rounded-md h-fit bg-slate-900/10"
          :style="{
            'background-color':
              column.type === 1
                ? 'rgba(68, 255, 0, 0.19)'
                : column.type === 2
                ? 'rgba(255, 13, 0, 0.19)'
                : column.type === 3
                ? 'rgba(68, 68, 68, 0.19)'
                : 'rgba(255, 170, 0, 0.19)',
          }"
          v-if="
            !(
              column.type === 3 ||
              (hideFinalSteps && (column.type === 2 || column.type == 1))
            )
          "
        >
          <div class="h10 flex flex-row items-baseline p-2 px-4 gap-2">
            <h2 class="font-semibold text-lg">
              {{ column.name }}
            </h2>
            <small class="text-slate-700">
              ({{ $t("orders.sd") }} {{ column?.res?.meta?.total }} |
              {{ formatNumber(column?.res?.meta?.sum) }} ₽)
            </small>
          </div>
          <draggable
            v-if="column.res"
            class="flex flex-col gap-2 h-full p-2 pt-0 overflow-y-scroll max-h-[87vh] min-h-[20px]"
            :list="column.res.data"
            group="people"
            :handle="isMobile ? '.handle' : null"
            :item-key="id"
            :ref="(ref) => (column.ref = ref)"
          >
            <template #item="{ element, index }">
              <div
                class="p-2 rounded-md bg-white flex flex-col gap-1 relative"
                :class="{
                  collapse:
                    index > column.lastVisibleElIdx + 5 ||
                    index < column.lastVisibleElIdx - 10,
                  'cursor-move': !isMobile,
                  'pt-5': isMobile,
                }"
                :ref="(ref) => (element.visible.ref = ref)"
                @dragend="() => move()"
                @dragstart="() => saveDragEl(element)"
              >
                <div
                  class="absolute top-0 left-0 w-full bg-transparent flex justify-center items-center handle"
                >
                  <span
                    v-if="isMobile"
                    class="material-icons-outlined cursor-move text-slate-500"
                  >
                    drag_handle
                  </span>
                </div>
                <div class="card-header flex flex-row justify-between">
                  <a
                    target="_self"
                    class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline cursor-pointer"
                    @click="routeToOrder(element.id)"
                  >
                    <h4 class="font-medium">
                      {{ element.fieldsForRender.order_name }}
                    </h4>
                  </a>
                  <span class="text-end text-xs">
                    {{ element.fieldsForRender.order_created_at }}
                  </span>
                </div>
                <div
                  class="card-wrapper flex flex-col gap-0.5 leading-5 text-sm"
                >
                  <span class="text-base mb-0.5">
                    {{ element.fieldsForRender.order_responsible }}
                  </span>
                  <span class="text-base mb-0.5">
                    {{ element.fieldsForRender.contact_name }}
                  </span>
                  <span class="text-base mb-0.5">
                    {{ element.fieldsForRender.company_name }}
                  </span>
                  <span class="text-base mb-0.5">
                    {{ element.fieldsForRender.order_user }}
                  </span>
                  <span v-for="castomField in castomFields" :key="castomField">
                    {{ element.fieldsForRender?.[castomField] }}
                  </span>
                </div>
                <div
                  class="card-futter flex flex-row justify-between items-center"
                >
                  <span>
                    {{ formatNumber(element.sum || element.budget || 0) }} ₽
                  </span>
                  <div class="img_wrapper">
                    <img
                      :src="
                        element.lead_id
                          ? 'https://www.digiseller.ru/preview/571523/p1_3380359_3410fdc6.png'
                          : require('@/assets/favicon2.png')
                      "
                      class="img"
                    />

                    <div class="handle_cross" v-if="false"></div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref } from "vue";
import draggable from "vuedraggable";
import { useColor } from "@/composables/color";
import { useElementVisibility, useToggle, watchThrottled } from "@vueuse/core";
import store from "@/store";
import { useOrdersPipelinesSelect } from "@/composables/ordersPipelinesSelect";
import router from "@/router";
import { useValidate } from "@/composables/validate";
import { useCheckMobile } from "@/composables/checkMobile";
export default {
  components: {
    draggable,
  },
  props: { hideFinalSteps: Boolean },
  setup() {
    const { getRandomColor3 } = useColor();
    const { pipelines, startPromise } = useOrdersPipelinesSelect();
    const { formatNumber } = useValidate();

    const params = computed(() => store.state.orders.filters);
    const orders = computed(() => store.state.orders.orders);

    const getStatusesLists = async () => {
      toggleIsDataLoading2(true);
      await startPromise;
      const promiseList = [];
      pipelines.selected.statuses.forEach((stat) => {
        promiseList.push(getStatusesList(stat));
      });
      await Promise.all(promiseList);
      toggleIsDataLoading2(false);
    };

    const getStatusesList = async (stat) => {
      const res = await store.dispatch("getOrders", {
        ...params.value,
        dontSaveMeta: true,
        hide_final_statuses: false,
        status_id: stat.id,
      });

      stat.res = res;
      stat.ref = null;

      stat.res.data.map((item) => (item.visible = { ref: null, value: null }));

      stat.lastVisibleElIdx = computed(() => {
        const reversed = stat.res.data.toReversed();
        const last = reversed.find((el) => el.visible.value);
        const idx = stat.res.data.indexOf(last);

        return idx;
      });

      stat.needDownloadNext = computed(() => {
        return (
          stat.res.data.length < stat.lastVisibleElIdx + 5 &&
          stat.res.total > stat.res.data.length
        );
      });
    };

    const addStatusesList = async (stat) => {
      stat.isLoading = true;
      if (stat.res.next_page_url) {
        const res = await store.dispatch("getOrders", {
          ...params.value,
          dontSaveMeta: true,
          status_id: stat.id,
          page: stat.res.current_page + 1,
        });

        const prevData = stat.res.data;

        stat.res = res;
        stat.res.data.map(
          (item) => (item.visible = { ref: null, value: null })
        );
        stat.res.data = [...prevData, ...stat.res.data];
      }
      stat.isLoading = false;
    };

    onMounted(async () => {
      await store.dispatch("getOrdersTableConfig", { for: "pipeline" });
      updateList();
    });

    const updateList = async () => {
      await getStatusesLists();
      nextTick(() => {
        setColors();
        setVisible();
      });
    };

    const setColors = () => {
      pipelines.selected.statuses.map(
        (el) => (el.bgColor = computed(() => getRandomColor3("30")))
      );
    };

    const setVisible = () => {
      pipelines.selected.statuses.forEach((col) =>
        col.res?.data?.forEach((item) => {
          if (item.visible.value === null)
            item.visible.value = useElementVisibility(item.visible.ref, {
              scrollTarget: col.ref,
            });
        })
      );
    };

    watchThrottled(
      () => pipelines.selected.statuses,
      () => {
        pipelines.selected.statuses.forEach(async (stat) => {
          if (stat.needDownloadNext && !stat.isLoading) {
            await addStatusesList(stat);
            nextTick(() => setVisible());
          }
        });
      },
      { deep: true, throttle: 500 }
    );

    const [isDataLoading2, toggleIsDataLoading2] = useToggle(false);
    const isDataLoading = computed(
      () => store.state.orders.isLoading || isDataLoading2.value
    );

    const savedDragEl = ref(null);
    const savedDragCol = ref(null);
    const saveDragEl = (el) => {
      const col = pipelines.selected.statuses.find((el2) =>
        el2.res.data.includes(el)
      );
      if (col) savedDragCol.value = col;
      savedDragEl.value = el;
    };

    const move = () => {
      const col = pipelines.selected.statuses.find((el) =>
        el.res.data.includes(savedDragEl.value)
      );

      if (col && savedDragEl.value) {
        store.dispatch("updateOrderStatus", {
          order_id: savedDragEl.value.id,
          status_id: col.id,
        });
      }

      pipelines.selected.statuses.forEach((stat) => {
        stat.res.data.map((el) => (el.visible.value = null));
      });

      nextTick(() => setVisible());
      savedDragEl.value = null;
    };

    const castomFields = computed(
      () => store.state.account.account?.config?.kanBanConfig
    );

    const routeToOrder = (id) => {
      router.push("addToDeal?order_id=" + id);
    };

    const emitParams = (params) => {
      store.commit("updateOrdersFilters", params);
      updateList();
    };

    return {
      isDataLoading,
      updateList,
      params,
      orders,
      pipelines,
      move,
      saveDragEl,
      castomFields,
      routeToOrder,
      emitParams,
      formatNumber,
      ...useCheckMobile(),
    };
  },
};
</script>

<style lang="scss" scoped>
.sortable-ghost {
  @apply bg-slate-50 text-slate-400 border-slate-400/50;
}
.limit_height {
  min-height: calc(100vh - 262px);
}
.blur {
  transition: filter 0.2s ease-out;
  filter: blur(5px);
}
.img_wrapper {
  position: relative;
  // z-index: -1;
}
.img {
  object-fit: cover;
  width: 46px;
  padding: 4px;
  border: 1px solid #aeaeae;
  border-radius: 50%;
  object-fit: scale-down;
}
</style>
