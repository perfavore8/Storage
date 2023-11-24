<template>
  <NotificationCenter />
  <!-- <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view> -->
  <router-view />
</template>

<script>
import { computed, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import NotificationCenter from "./components/NotificationCenter.vue";
export default {
  components: { NotificationCenter },
  setup() {
    const route = useRoute();

    const isDarkTest = computed(() => route.query.test === "dark");
    watch(isDarkTest, () => {
      isDarkTest.value
        ? document.body.classList.add("dark")
        : document.body.classList.remove("dark");
    });
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
  width: fit-content;
  overflow: auto;
  font-family: "Inter";
  // width: 100%;
}
html {
  scroll-behavior: smooth;
}
#app {
  background: white;
  min-height: 100vh;
}
*::-webkit-scrollbar {
  // width: 8px;
  // height: 8px;
  @apply w-0 h-0 sm:w-2 sm:h-2;
}

*::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

*::-webkit-scrollbar-track {
  // background: #ddd;
  border-radius: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(3px);
}
ul > li:not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: 0;
  margin-bottom: 0;
}
ol > li {
  height: auto;
}
</style>
