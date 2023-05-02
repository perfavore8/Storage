<template>
  <div
    ref="container"
    class="bg-gray-200 rounded relative w-full h-full m-auto flex items-center justify-center overflow-hidden"
  >
    <button
      class="btn text-white bg-red-600"
      tabindex="-1"
      @click="del(), reset()"
    >
      Удалить
    </button>
    <div
      ref="target"
      class="absolute w-full h-full top-0 left-0 bg-slate-100 bg-opacity-20 backdrop-blur-[2px] flex items-center justify-center select-none"
      :class="{ 'transition-all duration-200 ease-linear': !isSwiping }"
      :style="{ left, opacity }"
    >
      <p class="flex text-slate-800 items-center">
        <span class="material-icons-outlined"> arrow_forward </span>
      </p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { usePointerSwipe } from "@vueuse/core";
export default {
  setup(props, context) {
    const target = ref(null);
    const container = ref(null);
    const containerWidth = computed(() => container.value?.offsetWidth);
    const left = ref("0");
    const opacity = ref(1);
    function reset() {
      left.value = "0";
      opacity.value = 1;
    }
    const { distanceX, isSwiping } = usePointerSwipe(target, {
      threshold: 0,
      onSwipe() {
        if (containerWidth.value) {
          if (distanceX.value < 0) {
            const distance = Math.abs(distanceX.value);
            left.value = `${distance}px`;
            opacity.value = 1.25 - distance / containerWidth.value;
          } else {
            left.value = "0";
            opacity.value = 1;
          }
        }
      },
      onSwipeEnd() {
        if (
          distanceX.value < 0 &&
          containerWidth.value &&
          Math.abs(distanceX.value) / containerWidth.value >= 0.5
        ) {
          left.value = "100%";
          opacity.value = 0;
          setTimeout(() => {
            left.value = "0";
            opacity.value = 1;
          }, 5000);
        } else {
          left.value = "0";
          opacity.value = 1;
        }
      },
    });

    const del = () => {
      context.emit("del");
    };

    return {
      reset,
      isSwiping,
      left,
      opacity,
      target,
      container,
      containerWidth,
      del,
    };
  },
};
</script>

<style lang="scss">
@import "@/app.scss";
</style>
