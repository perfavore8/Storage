<template>
  <div class="app">
    <div class="header">
      <div class="header_left">
        <NavBar />
      </div>
    </div>
    <div class="wrapper">
      <OrdersFilters />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import OrdersFilters from "@/components/OrdersFilters.vue";
export default {
  components: { NavBar, OrdersFilters },
  setup() {},
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
  width: calc(100vw - 80px);
  &_left {
    .header_row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
.wrapper {
  margin-top: 20px;
  padding: 0 30px;
}
</style>
