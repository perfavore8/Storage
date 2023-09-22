<template>
  <div
    class="grid grid-cols-3 gap-10 mx-auto justify-items-start items-start w-4/5"
  >
    <ProductsTabFields :total="total" />
    <ProductsTabCastomFields />
    <div
      class="w-full cont px-1 h-full rounded-xl bg-slate-50 shadow-xl shadow-slate-100"
    >
      <h2 class="font-semibold text-gray-700 mb-10 w-full text-start">
        {{ $t("newOrder.spis") }}
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
.shadow-xl {
  box-shadow: 0px 0px 8px 12px #f8fafc;
}
</style>
