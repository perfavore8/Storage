<template>
  <div
    class="grid grid-cols-4 gap-10 mx-auto justify-items-stretch items-start"
  >
    <div class="col-span-2">
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
