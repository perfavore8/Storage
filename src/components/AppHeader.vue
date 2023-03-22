<template>
  <header>
    <NavBar />
    <HomeMenu />
  </header>
  <HomeModals />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HomeMenu from "@/components/HomeMenu.vue";
import HomeModals from "@/components/HomeModals.vue";
export default {
  components: { NavBar, HomeMenu, HomeModals },
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
  z-index: 50;
}
</style>
