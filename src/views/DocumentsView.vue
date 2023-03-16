<template>
  <div class="app">
    <div class="header">
      <AppHeader />
    </div>
    <div class="wrapper">
      <DocumentsGrid />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import DocumentsGrid from "@/components/DocumentsGrid.vue";
export default {
  components: { AppHeader, DocumentsGrid },
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
  width: calc(100vw - 20px);
}
.wrapper {
  margin-top: 80px;
  padding: 0 30px;
}
</style>
