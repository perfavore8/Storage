<template>
  <div
    class="gap-10 mx-auto w-4/5"
    :class="[
      isPublicOrder
        ? 'flex flex-col items-center'
        : 'grid grid-cols-3 justify-items-start items-start',
    ]"
  >
    <ProductsTabFields
      :total="total"
      :class="[isPublicOrder ? 'order-1' : 'order-1']"
    />
    <ProductsTabCastomFields :class="[isPublicOrder ? 'order-3' : 'order-2']" />
    <div
      class="w-full cont px-1 h-full rounded-xl bg-slate-50 shadow-xl shadow-slate-100"
      :class="[isPublicOrder ? 'order-2' : 'order-3']"
    >
      <h2
        class="font-semibold text-gray-700 mb-10 w-full text-start"
        v-if="!isPublicOrder"
      >
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
import { isPublicOrder } from "@/components/PublicOrder";
import { computed, ref } from "vue";
export default {
  components: { MainPage, ProductsTabFields, ProductsTabCastomFields },
  setup() {
    const widjet = ref(null);
    const total = computed(() => widjet.value?.total);

    return { widjet, total, isPublicOrder };
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
