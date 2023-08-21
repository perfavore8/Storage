<template>
  <div class="btns_group">
    <button
      class="section"
      :class="{ selected: selected.value === item.value }"
      v-for="(item, idx) in list"
      :key="item.value"
      @click="select(item)"
    >
      {{ item.name }}
      <slot :name="'item' + idx"></slot>
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    list: Array,
    selected: Object,
  },
  setup(props, context) {
    const select = (val) => context.emit("select", val);

    const list_length = computed(() => props.list.length);
    const selected_index = computed(() =>
      props.list.indexOf(props.selected.value)
    );

    return {
      select,
      list_length,
      selected_index,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns_group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 8px;
  background-color: transparent;
  position: relative;

  .section {
    width: 100%;
    position: relative;
    font-weight: 500;
    white-space: nowrap;
    background-color: transparent;
    border-bottom: 2px solid #f4f4f4;
    outline: none;
    padding: 12px;
    color: #828282;
    transition: all 0.2s ease-out;
    @apply dark:text-white dark:text-opacity-80;
  }
  .section:hover {
    @apply dark:text-white;
  }
  .section:focus-visible {
    color: #1f2937;
    border-color: #1f293770;
    @apply dark:text-slate-200 dark:border-slate-600;
  }
  .selected {
    font-weight: 500;
    color: #434343;
    border-bottom: 2px solid #606060;
  }
}
</style>
