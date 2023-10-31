<template>
  <div class="list flex flex-col items-end gap-2 w-full ml-4">
    <div
      class="item flex flex-row items-center justify-between w-full rounded-md h-[58px] py-2 px-4 border border-slate-300"
      :style="{ width: `calc(100% - ${item * 16}px )` }"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <div
        class="w-full skeleton_categories"
        :style="{ animationDelay: (0.1 * (item + idx + 1)) / 2 + 's' }"
      />
      <div
        class="w-5/6 skeleton_categories"
        :style="{ animationDelay: (0.1 * (item + 0.5 + idx + 1)) / 2 + 's' }"
      />
      <slot name="btns" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";
export default {
  setup() {
    const list = computed(
      () =>
        store.state.categories.fields_properties.reduce((acc, cat) => {
          acc.push(cat.level - 1);
          return acc;
        }, []) || [0, 1, 2, 1, 2, 3, 1, 1]
    );

    return { list };
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: calc(100% - 16px);
}
.skeleton_categories {
  @apply h-4 my-[9px] mx-3 bg-neutral-400/50 rounded-full animate-pulse duration-500;
}
</style>
