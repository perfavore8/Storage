<template>
  <div class="app">
    <div class="header">
      <AppHeader
        :selectedWH="{
          name: 'Заказы',
          value:
            displayType.selected.name === 'kanban' ? 'ordersKanBan' : 'orders',
          maxCountSelected: displayType.selected.name === 'kanban' ? 5 : 999999,
        }"
      />
    </div>
    <div class="wrapper">
      <div
        class="filters w-full flex justify-between items-center relative"
        v-if="isTest"
      >
        <div class="flex flex-row items-center gap-2 h-fit basis-1/3">
          <button class="cursor-pointer h-7" @click="displayType.selectNext()">
            <transition name="modal" mode="out-in" :duration="100">
              <span
                class="material-icons-round !font-semibold !text-[28px] !text-[#757575] select-none"
                :key="displayType.selected.name"
              >
                {{ displayType.nextItem.icon }}
              </span>
            </transition>
          </button>
          <OrdersKanbanPipelineSelect />
          <div class="flex items-center" v-if="isMain || isTest">
            <input
              type="checkbox"
              id="hideFinalSteps"
              class="checkbox"
              v-model="hideFinalSteps"
            />
            <label for="hideFinalSteps">Скрыть финальные этапы</label>
          </div>
        </div>
        <AppSearchWithFilters
          class="grow basis-1/3"
          :setOfInstructions="'orders'"
          :key="selectedTabComp"
          @emitParams="emitParams"
        />
        <div class="basis-1/3 flex justify-end">
          <button class="btn btn_dark_blue" @click="addToDeal()">
            Создать заказ
          </button>
        </div>
        <div
          class="absolute top-[70px] right-0 flex flex-row gap-3 items-center"
        >
          <button
            class="sync_icon btn"
            :disabled="isLocked"
            @click="updateList()"
            title="Обновить список"
          >
            <span class="material-icons-outlined"> sync </span>
          </button>
          <div v-if="isTest" @click="openTableSettings()" class="tableSettings">
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
        </div>
        <div
          class="absolute top-[90px] left-0 flex flex-row gap-3 items-center"
          v-if="displayType.selected.name === 'grid'"
        >
          Сделок: {{ grid?.meta?.meta?.total || 0 }} |
          {{ grid?.meta?.meta?.sum || 0 }} ₽
        </div>
      </div>
      <OrdersFilters v-if="false" />
      <!-- <OrdersGrid ref="grid" /> -->
      <transition name="modal">
        <component
          :is="displayType.selected.component"
          ref="grid"
          :key="displayType.selected.name"
          :hideFinalSteps="hideFinalSteps"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import OrdersFilters from "@/components/OrdersFilters.vue";
import OrdersGrid from "@/components/OrdersGrid.vue";
import KanbanBoard from "@/components/Kanban/KanbanBoard.vue";
import AppSearchWithFilters from "@/components/AppSearchWithFilters.vue";
import OrdersKanbanPipelineSelect from "@/components/OrdersKanbanPipelineSelect.vue";
import router from "@/router";
import store from "@/store";
import { useRoute } from "vue-router";
import { computed, reactive, ref, watch } from "vue";
import { useLockBtn } from "@/composables/lockBtn";
import { useSaveLS } from "@/composables/saveLS";
import { useToggle } from "@vueuse/core";
export default {
  components: {
    AppHeader,
    OrdersFilters,
    OrdersGrid,
    KanbanBoard,
    AppSearchWithFilters,
    OrdersKanbanPipelineSelect,
  },
  setup() {
    const Route = useRoute();
    const isTest = computed(
      () =>
        store.state.account?.account?.id == 1 || Route?.query?.test === "test"
    );
    const { saveAllQueryParams, saveLSParam, getSavedLSParam } = useSaveLS();
    saveAllQueryParams();

    const addToDeal = () => router.push("/addToDeal");

    const grid = ref(null);
    const emitParams = (params) => grid.value.emitParams(params);

    const displayType = reactive({
      selected: {},
      list: [
        {
          name: "grid",
          component: "OrdersGrid",
          default: true,
          icon: "format_list_bulleted",
        },
        {
          name: "kanban",
          component: "KanbanBoard",
          icon: "view_kanban",
        },
      ],
      select: function (option) {
        this.selected = option;
        saveLSParam("ordersDT", this.selected.name);
      },
      nextItem: computed(() => {
        const item = displayType.list.find((el) => el == displayType.selected);
        if (!item) return;
        let idx = displayType.list.indexOf(item) + 1;
        if (idx == displayType.list.length) idx = 0;
        const nextItem = displayType.list[idx];
        return nextItem;
      }),
      selectNext: function () {
        this.select(this.nextItem);
      },
      dropToDefault: function () {
        const item = this.list.find((el) => el.default);
        if (!item) return;
        this.select(item);
      },
      dropToSaved: function () {
        const savedName = getSavedLSParam("ordersDT");
        const item = this.list.find((el) => el.name === savedName);
        if (!item) {
          this.dropToDefault();
          return;
        }
        this.select(item);
      },
    });
    displayType.dropToSaved();

    const { isLocked, lockBtn } = useLockBtn();
    const updateList = () => {
      lockBtn("timer", 2250);
      grid.value?.updateList();
    };

    const openTableSettings = () => store.commit("open_table_settings");

    const [hideFinalSteps] = useToggle(
      getSavedLSParam("hide_final_statuses") || false
    );
    watch(hideFinalSteps, () => {
      store.commit("updateOrdersFilters", {
        hide_final_statuses: hideFinalSteps.value,
      });
      saveLSParam("hide_final_statuses", hideFinalSteps.value);
      if (displayType.selected.name === "kanban") return;
      grid.value?.updateList();
    });

    return {
      addToDeal,
      isTest,
      grid,
      emitParams,
      displayType,
      updateList,
      isLocked,
      openTableSettings,
      hideFinalSteps,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  padding: 0 30px;
  left: 0;
  width: calc(100vw - 20px);
  z-index: 50;
  &_left {
    .header_row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
.grid {
  grid-template-columns: 1fr auto 1fr;
}
.wrapper {
  margin-top: 80px;
  padding: 0 30px;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.sync_icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #757575;
  transform: scaleX(-1);
  > span {
    transition: all 0.2s ease-out;
  }
}
.sync_icon:hover {
  > span {
    transform: rotateZ(-90deg);
  }
}
.sync_icon:disabled,
.sync_icon:disabled:hover {
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }
  > span {
    animation: rotating 0.75s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  }
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
