<template>
  <div
    class="grid grid-cols-3 gap-10 mx-auto justify-items-stretch items-start w-4/5"
  >
    <div>
      <h2 class="font-semibold text-gray-700 mb-4">Список позиций</h2>
      <main-page />
    </div>
    <ProductsTabFields />
    <ProductsTabCastomFields />
  </div>
</template>

<script>
import MainPage from "../WidgetAddToDeal/src/components/MainPage.vue";
import ProductsTabFields from "./ProductsTabFields.vue";
import ProductsTabCastomFields from "./ProductsTabCastomFields.vue";
export default {
  components: { MainPage, ProductsTabFields, ProductsTabCastomFields },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
