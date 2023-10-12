<template>
  <div class="group/help" :class="{ relative: !separateWindow }">
    <span
      class="material-icons-outlined text-slate-500 !text-xl"
      :class="{ 'cursor-pointer': separateWindow }"
      @click="toggleFullTip()"
    >
      help_outline
    </span>
    <div
      class="backdrop z-[252]"
      v-if="separateWindow && showFullTip"
      @click="toggleFullTip(false)"
    />
    <div
      class="h-fit w-fit hidden z-[252] px-4 py-6 ring-1 ring-slate-500/50 rounded-md bg-white"
      :class="{
        'left-0': float === 'right' && !separateWindow,
        'right-0': float === 'left' && !separateWindow,
        '!top-5 mx-auto max-h-[90vh] overflow-y-auto !fixed left-1/2 -translate-x-1/2':
          separateWindow,
        '-translate-y-1/2 top-1/2 absolute group-hover/help:block':
          !separateWindow,
        '!block': separateWindow && showFullTip,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { watch } from "vue";
export default {
  props: {
    float: {
      type: String,
      default: () => "right",
      validator(value) {
        // The value must match one of these strings
        return ["right", "left"].includes(value);
      },
    },
    separateWindow: { type: Boolean, default: () => false },
  },
  setup() {
    const [showFullTip, toggleFullTip] = useToggle(false);
    watch(showFullTip, (val) =>
      val
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto")
    );

    return { showFullTip, toggleFullTip };
  },
};
</script>

<style lang="scss" scoped></style>
