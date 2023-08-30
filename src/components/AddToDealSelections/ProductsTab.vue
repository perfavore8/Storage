<template>
  <div
    class="grid grid-cols-3 gap-10 mx-auto justify-items-start items-start w-4/5"
  >
    <ProductsTabFields :total="total" />
    <ProductsTabCastomFields />
    <div class="w-full cont px-1">
      <h2 class="font-semibold text-gray-700 mb-4 w-full text-start">
        Список позиций
      </h2>
      <main-page ref="widjet" />
    </div>
  </div>
</template>

<script>
import MainPage from "../WidgetAddToDeal/src/components/MainPage.vue";
import ProductsTabFields from "./ProductsTabFields.vue";
import ProductsTabCastomFields from "./ProductsTabCastomFields.vue";
import { computed, ref } from "vue";
export default {
  components: { MainPage, ProductsTabFields, ProductsTabCastomFields },
  setup() {
    const widjet = ref(null);
    const total = computed(() => widjet.value?.total);

    return { widjet, total };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.cont {
  // overflow-y: scroll;
  // height: calc(100vh - 122px);
}
</style>
