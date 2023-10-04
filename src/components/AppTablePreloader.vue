<template>
  <div class="w-full">
    <table class="border-collapse mx-auto w-full">
      <thead>
        <tr class="h-[66px]">
          <th
            v-for="(col, idx) in titles.length ? titles : countCols"
            :key="col"
            class="cell bg-slate-200 align-middle !text-center text-base"
          >
            <span v-if="titles.length">{{ col }}</span>
            <div
              v-else
              class="skeleton h-4"
              :style="{ animationDelay: (0.1 * idx) / 2 + 's' }"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in countRows" :key="row">
          <td
            v-for="(col, idx) in titles.length ? titles : countCols"
            :key="col"
            class="cell h-12"
          >
            <div
              class="skeleton h-3.5"
              :style="{ animationDelay: (0.1 * (row + idx + 1)) / 2 + 's' }"
            />
          </td>
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

<style lang="scss" scoped>
.cell {
  @apply p-2.5 pl-4 border border-slate-300 min-w-[50px] text-start;
}
.skeleton {
  @apply w-28 bg-slate-400/50 rounded-full animate-pulse duration-500;
}
</style>
