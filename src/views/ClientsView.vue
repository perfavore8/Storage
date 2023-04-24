<template>
  <div class="app">
    <div class="header">
      <AppHeader />
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: "AnalyticsView",
  components: {
    AppHeader,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: 100vw;
  height: 100vh;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .header {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    z-index: 50;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
}
</style>
