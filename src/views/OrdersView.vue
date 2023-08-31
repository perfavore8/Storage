<template>
  <div class="app">
    <div class="header">
      <AppHeader :selectedWH="{ name: 'Заказы', value: 'orders' }" />
    </div>
    <div class="wrapper">
      <div
        class="filters w-full flex justify-between items-center relative"
        v-if="isTest"
      >
        <div class="absolute left-0 flex flex-row items-end gap-2 h-fit">
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
          <div class="flex items-center" v-if="isMain || isTest">
            <input
              type="checkbox"
              id="hideFinalSteps"
              class="checkbox"
              v-model="hideFinalSteps"
            />
            <label for="hideFinalSteps">Скрыть финальные этапы</label>
          </div>
          <OrdersKanbanPipelineSelect
            v-if="displayType.selected.name === 'kanban'"
            class="absolute -left-full translate-x-full top-full translate-y-[130%]"
          />
        </div>
        <AppSearchWithFilters
          class="absolute left-1/2 -translate-x-1/2"
          :setOfInstructions="'orders'"
          :key="selectedTabComp"
          @emitParams="emitParams"
        />
        <button class="btn btn_dark_blue" @click="addToDeal()">
          Создать заказ
        </button>
      </div>
      <OrdersFilters v-if="false" />
      <!-- <OrdersGrid ref="grid" /> -->
      <transition name="modal">
        <component
          :is="displayType.selected.component"
          ref="grid"
          :key="displayType.selected.name"
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
import { computed, reactive, ref } from "vue";
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

    const addToDeal = () => router.push("/addToDeal");

    const grid = ref(null);
    const emitParams = (params) =>
      console.log(1) || grid.value.emitParams(params);

    const displayType = reactive({
      selected: {},
      list: [
        {
          name: "grid",
          component: "OrdersGrid",
          default: true,
          icon: " grid_view",
        },
        {
          name: "kanban",
          component: "KanbanBoard",
          icon: "view_kanban",
        },
      ],
      select: function (option) {
        this.selected = option;
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
    });
    displayType.dropToDefault();

    return { addToDeal, isTest, grid, emitParams, displayType };
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
.wrapper {
  margin-top: 80px;
  padding: 0 30px;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
</style>
