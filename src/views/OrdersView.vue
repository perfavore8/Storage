<template>
  <div class="app">
    <div class="header">
      <AppHeader />
    </div>
    <div class="wrapper">
      <div class="w-full flex justify-end" v-if="isTest">
        <button class="btn btn_dark_blue" @click="addToDeal()">
          Создать заказ
        </button>
      </div>
      <OrdersFilters v-if="false" />
      <OrdersGrid />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import OrdersFilters from "@/components/OrdersFilters.vue";
import OrdersGrid from "@/components/OrdersGrid.vue";
import router from "@/router";
import store from "@/store";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  components: { AppHeader, OrdersFilters, OrdersGrid },
  setup() {
    const Route = useRoute();
    const isTest = computed(
      () =>
        store.state.account?.account?.id == 1 || Route?.query?.test === "test"
    );

    const addToDeal = () => router.push("/addToDeal");

    return { addToDeal, isTest };
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
