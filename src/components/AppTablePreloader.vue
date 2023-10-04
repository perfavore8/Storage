<template>
  <div class="w-full">
    <table class="border-collapse mx-auto w-full">
      <thead>
        <tr class="h-[66px]">
          <slot name="customCellHeadStart" />
          <th
            v-for="(col, idx) in titles.length ? titles : countCols"
            :key="col"
            class="cell_table_preloader bg-[#e5e5e5] align-middle !text-center text-base text-[#3f3f3f]"
          >
            <span v-if="titles.length">{{ col }}</span>
            <div
              v-else
              class="skeleton_table_preloader h-4"
              :style="{ animationDelay: (0.1 * idx) / 2 + 's' }"
            />
          </th>
          <slot name="customCellHeadEnd" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in countRows" :key="row">
          <slot name="customCellStart" />
          <td
            v-for="(col, idx) in titles.length ? titles : countCols"
            :key="col"
            class="cell_table_preloader h-12"
          >
            <div
              class="skeleton_table_preloader h-3.5"
              :style="{ animationDelay: (0.1 * (row + idx + 1)) / 2 + 's' }"
            />
          </td>
          <slot name="customCellEnd" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    titles: { type: Array, required: false, default: () => [] },
  },
  setup() {
    const countCols = 8;
    const countRows = 9;

    return { countCols, countRows };
  },
};
</script>

<style lang="scss">
.cell_table_preloader {
  @apply p-2.5 pl-4 border border-[#c9c9c9] min-w-[50px] text-start;
}
.head_cell_table_preloader {
  @apply cell_table_preloader bg-[#e5e5e5] align-middle text-base text-[#3f3f3f];
  text-align: center;
}
.skeleton_table_preloader {
  @apply w-28 bg-neutral-400/50 rounded-full animate-pulse duration-500;
}
</style>
