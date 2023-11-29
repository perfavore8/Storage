<template>
  <div
    class="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <AppImagesCaruselPreloader :square="false" class="!rounded-lg" />
    <div class="p-5">
      <div class="mb-2 h-5 preloader" />
      <div class="mb-2 h-5 preloader" />
      <div class="mb-3.5 h-5 preloader w-1/2" />
      <template v-for="i in 5" :key="i">
        <div class="mb-1 h-4 preloader w-1/3" />
        <div class="mb-3.5 h-8 preloader !rounded-md" />
      </template>
      <div class="flex flex-row justify-end gap-2">
        <span class="material-icons-outlined text-red-600"> delete </span>
        <span>{{ $t("widjet.del") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppImagesCaruselPreloader from "@/components/AppImagesCaruselPreloader.vue";

export default {
  setup() {},
  components: { AppImagesCaruselPreloader },
};
</script>

<style lang="scss" scoped>
.preloader {
  @apply bg-neutral-400/50 rounded-full animate-pulse duration-500;
}
</style>
