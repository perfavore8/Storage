<template>
  <transition name="fade">
    <small v-if="show" class="text-red-700 text-sm origin-top">
      {{ text }}
    </small>
  </transition>
</template>

<script>
export default { props: { text: String, show: Boolean } };
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
