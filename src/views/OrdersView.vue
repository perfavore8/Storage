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
        <button
          class="sync_icon btn"
          :disabled="isLocked"
          @click="updateList()"
          title="Обновить список"
        >
          <span class="material-icons-outlined"> sync </span>
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
import { useLockBtn } from "@/composables/lockBtn";
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

    const { isLocked, lockBtn } = useLockBtn();
    const updateList = () => {
      lockBtn("timer", 2250);
      grid.value?.updateList();
    };

    return {
      addToDeal,
      isTest,
      grid,
      emitParams,
      displayType,
      updateList,
      isLocked,
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
  position: absolute;
  top: 70px;
  right: 0px;
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
</style>
