<template>
  <div class="app">
    <div class="header">
      <button
        class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-0 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
        @click="back()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
          />
        </svg>
      </button>
      <AppRadioBtnsGroupUnderlined
        class="w-4/5"
        :list="tabs.list"
        :selected="tabs.selected"
        @select="(option) => tabs.select(option)"
      />
    </div>
    <div class="content mt-4">
      <keep-alive>
        <component :is="tabs.selected.code" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import router from "@/router";
import ProductsTab from "@/components/AddToDealSelections/ProductsTab.vue";
import DocumentsTab from "@/components/AddToDealSelections/DocumentsTab.vue";
import ClientTab from "@/components/AddToDealSelections/ClientTab.vue";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import { useNewDeal } from "@/composables/newDeal";
import { useAddToDealTabs } from "@/composables/addToDealTabs";
export default {
  components: {
    ProductsTab,
    DocumentsTab,
    ClientTab,
    AppRadioBtnsGroupUnderlined,
  },
  setup() {
    const { add } = useNewDeal();
    const { tabs } = useAddToDealTabs();

    const back = () => router.push("/");

    onMounted(async () => {
      add();
    });

    return { tabs, back };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 8px);
  min-height: 100vh;
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .header {
    position: sticky;
    top: 0;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
