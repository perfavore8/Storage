<template>
  <div class="app">
    <div class="header">
      <AppRadioBtnsGroup
        :list="tabs.list"
        :selected="tabs.selected"
        @select="(option) => tabs.select(option)"
      />
    </div>
    <div class="content">
      <component :is="tabs.selected.code" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import AppRadioBtnsGroup from "@/components/AppRadioBtnsGroup.vue";
import ProductsTab from "@/components/AddToDealSelections/ProductsTab.vue";
import DocumentsTab from "@/components/AddToDealSelections/DocumentsTab.vue";
import ClientTab from "@/components/AddToDealSelections/ClientTab.vue";
export default {
  components: { AppRadioBtnsGroup, ProductsTab, DocumentsTab, ClientTab },
  setup() {
    const tabs = reactive({
      selected: { name: "Товары", value: "products", code: "ProductsTab" },
      list: [
        { name: "Товары", value: "products", code: "ProductsTab" },
        { name: "Документы", value: "documents", code: "DocumentsTab" },
        { name: "Клиент", value: "client", code: "ClientTab" },
      ],
      select: function (option) {
        this.selected = option;
      },
    });

    return { tabs };
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
    z-index: 50;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
