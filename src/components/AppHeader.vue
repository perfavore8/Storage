<template>
  <header class="z-[46]">
    <NavBar />
    <HomeMenu class="z-[46]" />
  </header>
  <HomeModals :selectedWH="selectedWH" />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HomeMenu from "@/components/HomeMenu.vue";
import HomeModals from "@/components/HomeModals.vue";
export default {
  components: { NavBar, HomeMenu, HomeModals },
  props: { selectedWH: { type: Object, required: false } },
  setup() {},
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  max-width: calc(100vw - 20px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
