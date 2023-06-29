<template>
  <div class="app">
    <div class="header">
      <AppHeader :selectedWH="{ name: 'Заказы', value: 'orders' }" />
    </div>
    <div class="wrapper">
      <div
        class="w-full flex justify-between items-center relative"
        v-if="isTest"
      >
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
      <OrdersGrid ref="grid" />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import OrdersFilters from "@/components/OrdersFilters.vue";
import OrdersGrid from "@/components/OrdersGrid.vue";
import AppSearchWithFilters from "@/components/AppSearchWithFilters.vue";
import router from "@/router";
import store from "@/store";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
export default {
  components: { AppHeader, OrdersFilters, OrdersGrid, AppSearchWithFilters },
  setup() {
    const Route = useRoute();
    const isTest = computed(
      () =>
        store.state.account?.account?.id == 1 || Route?.query?.test === "test"
    );

    const addToDeal = () => router.push("/addToDeal");

    const grid = ref(null);
    const emitParams = (params) => grid.value.emitParams(params);

    return { addToDeal, isTest, grid, emitParams };
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
</style>
