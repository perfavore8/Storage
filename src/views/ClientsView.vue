<template>
  <div class="app">
    <div class="header">
      <AppHeader />
    </div>
    <div class="content">
      <AppRadioBtnsGroupUnderlined
        class="w-1/2 mx-auto"
        :list="tabs.list"
        :selected="tabs.selected"
        @select="(option) => tabs.select(option)"
      />
      <ClientsSection />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import ClientsSection from "@/components/ClientSection/ClientsSections.vue";
import { useClientsTabs } from "@/composables/clientsTabs";
export default {
  name: "AnalyticsView",
  components: {
    AppHeader,
    AppRadioBtnsGroupUnderlined,
    ClientsSection,
  },
  setup() {
    const { tabs } = useClientsTabs();

    return { tabs };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 8px);
  height: 100vh;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .header {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    z-index: 50;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
}
</style>
