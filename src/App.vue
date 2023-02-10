<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
  width: fit-content;
  overflow: auto;
  font-family: "Inter";
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(3px);
}
</style>
