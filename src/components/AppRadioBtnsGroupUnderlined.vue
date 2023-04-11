<template>
  <div class="btns_group" ref="listRef">
    <button
      class="section"
      :class="{ selected: selected.value === item.value }"
      :ref="(el) => (selected.value === item.value ? (selectedRef = el) : null)"
      v-for="(item, idx) in list"
      :key="item.value"
      @click="select(item)"
    >
      {{ item.name }}
      <slot :name="'item' + idx"></slot>
    </button>
    <template v-if="selectedRef">
      <Teleport :to="selectedRef">
        <div class="underlined"></div>
      </Teleport>
    </template>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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

    const selectedRef = ref(null);
    const listRef = ref(null);
    const rect = computed(() => selectedRef.value.getBoundingClientRect());
    const rectList = computed(() => listRef.value.getBoundingClientRect());
    const width = computed(() => rect.value.width + "px");
    const left = computed(
      () => rect.value.left - rectList.value.left + 8 + "px"
    );

    return {
      select,
      list_length,
      selected_index,
      selectedRef,
      listRef,
      width,
      left,
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
  // width: 50%;

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
  }
  .underlined {
    background-color: #606060;
    height: 2px;
    position: absolute;
    top: 100%;
    // width: v-bind(width);
    // left: v-bind(left);
    width: 100%;
    left: 0;
  }
}
</style>
