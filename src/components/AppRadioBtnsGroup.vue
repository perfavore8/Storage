<template>
  <div class="btns_group" :class="{ small: small }">
    <button
      class="btn relative flex justify-center items-center"
      :class="{ selected: selected.value === item.value, small_btn: small }"
      v-for="(item, idx) in list"
      :key="item.value"
      @click="select(item)"
      :disabled="disabled"
    >
      {{ item.name }}
      <slot :name="'item' + idx"></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    selected: Object,
    disabled: { type: Boolean, required: false },
    small: { type: Boolean, required: false },
  },
  setup(props, context) {
    const select = (val) => context.emit("select", val);

    return { select };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns_group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 6px;
  padding: 8px;
  background-color: #e5e7eb;
  @apply dark:bg-[#374151];
  .btn {
    white-space: nowrap;
    border-radius: 6px;
    background-color: transparent;
    color: rgb(75, 85, 99);
    @apply dark:text-white dark:text-opacity-80;
  }
  .btn:hover {
    color: rgb(31, 41, 55);
    @apply dark:text-white;
  }
  .btn:focus-visible:not(:active) {
    color: rgb(31, 41, 55);
    background-color: rgba(125, 125, 125, 0.2);
    @apply dark:text-white;
  }
  .selected {
    color: hsl(209, 62%, 40%);
    background-color: white;
    padding-left: 24px;
    padding-right: 24px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    @apply dark:bg-[#1e2229];
  }
  .selected:hover {
    color: hsl(209, 62%, 40%);
  }
  button.selected:focus-visible:not(:active) {
    background-color: rgba(250, 250, 250, 0.8);
  }
}
.small {
  padding: 4px;
  .btn {
    padding: 4px 8px;
  }
  .selected {
    padding: 4px 16px;
  }
}
</style>
