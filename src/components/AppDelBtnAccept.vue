<template>
  <div class="relative flex justify-center">
    <button
      ref="btn"
      class="btn text-white bg-red-600"
      :class="[btnClass]"
      tabindex="1"
      @click="toggleAccept()"
    >
      <slot name="label">Удалить</slot>
    </button>
    <transition name="fade">
      <div
        v-if="showAccept"
        class="absolute bottom-full mb-2 z-10 px-4 py-2 flex flex-col items-center gap-2 origin-bottom transform scale-100 rounded-md bg-white opacity-100 shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition-all in"
        ref="target"
      >
        <span class="whitespace-nowrap text-gray-900">Точно удалить?</span>
        <div class="flex flex-row gap-2">
          <button
            class="btn small_btn btn_light_dark_blue"
            @click="confirm()"
            tabindex="2"
          >
            Да
          </button>
          <button class="btn small_btn btn_grey" @click="reset()" tabindex="2">
            Нет
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { onClickOutside, useToggle } from "@vueuse/core";
import { ref } from "vue";
export default {
  props: { btnClass: { type: String, required: false } },
  setup(props, context) {
    const target = ref(null);
    const btn = ref(null);
    onClickOutside(target, () => reset(), { ignore: [btn] });

    const [showAccept, toggleAccept] = useToggle(false);

    const confirm = () => context.emit("confirm");
    const reset = () => toggleAccept(false);

    return { showAccept, toggleAccept, target, confirm, reset, btn };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.btn {
  line-height: 1.2;
}
</style>
