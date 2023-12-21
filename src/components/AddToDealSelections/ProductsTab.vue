<template>
  <div
    class="gap-10 mx-auto lg:w-4/5"
    :class="[
      isPublicOrder
        ? 'flex flex-col items-center'
        : 'flex flex-col items-center md:grid md:grid-cols-3 md:justify-items-start md:items-start',
    ]"
  >
    <ProductsTabFields
      :total="total"
      :class="[isPublicOrder ? 'order-1 px-1 sm:px-0' : 'order-1']"
    />
    <div
      class="w-full"
      :class="[isPublicOrder ? 'order-3 px-1 sm:px-0' : 'order-3 md:order-2']"
    >
      <ProductsTabCastomFields />
    </div>
    <div
      class="w-full cont px-1 h-full rounded-xl bg-slate-50 shadow-xl shadow-slate-100"
      :class="[isPublicOrder ? 'order-2' : 'order-2 md:order-3']"
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
  <DocumentsTab v-if="isPublicOrder" class="my-10 mx-auto lg:w-4/5" />
</template>

<script>
import MainPage from "../WidgetAddToDeal/src/components/MainPage.vue";
import ProductsTabFields from "./ProductsTabFields.vue";
import ProductsTabCastomFields from "./ProductsTabCastomFields.vue";
import { isPublicOrder } from "@/components/PublicOrder";
import { computed, ref } from "vue";
import { isTest } from "@/composables/isTest";
import DocumentsTab from "./DocumentsTab.vue";
export default {
  components: {
    MainPage,
    ProductsTabFields,
    ProductsTabCastomFields,
    DocumentsTab,
  },
  setup() {
    const widjet = ref(null);
    const total = computed(() => widjet.value?.total);

    return { widjet, total, isPublicOrder, isTest };
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
