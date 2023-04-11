<template>
  <div class="grid grid-cols-2 gap-10 mx-auto justify-items-stretch">
    <main-page />
    <ProductsTabFields />
  </div>
</template>

<script>
import MainPage from "../WidgetAddToDeal/src/components/MainPage.vue";
import ProductsTabFields from "./ProductsTabFields.vue";
export default {
  components: { MainPage, ProductsTabFields },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
