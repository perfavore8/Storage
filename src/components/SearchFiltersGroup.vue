<template>
  <div class="filters2">
    <template v-for="(filter, idx) in filters" :key="idx">
      <div class="item bg-transparent" :class="{ special: special }">
        <div class="title" @click="special ? (filter.selected = false) : null">
          {{ filter.name }}
        </div>
        <component
          :is="filter.component"
          :item="filter"
          :idx="filter.code"
          :selector_options="filter.selector_options"
          @change_filter_value="change_filter_value"
        />
      </div>
    </template>
  </div>
</template>

<script>
import FilterNumber from "./FiltersSelections/FilterNumber.vue";
import FilterText from "./FiltersSelections/FilterText.vue";
import FilterList from "./FiltersSelections/FilterList.vue";
import FilterDate from "./FiltersSelections/FilterDate.vue";
import FilterFlag from "./FiltersSelections/FilterFlag.vue";
import FilterDoubleNumber from "./FiltersSelections/FilterDoubleNumber.vue";
export default {
  components: {
    FilterNumber,
    FilterText,
    FilterList,
    FilterDate,
    FilterFlag,
    FilterDoubleNumber,
  },
  props: {
    special: { type: Boolean, required: false, default: () => false },
    filters: { type: Array, required: false, default: () => [] },
  },
  setup(props, context) {
    const change_filter_value = (new_obj, code) =>
      context.emit("change_filter_value", new_obj, code);

    return { change_filter_value };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters2 {
  display: grid;
  grid-template-columns: auto;
  justify-items: stretch;
  align-items: start;
  gap: 5px;
  // background-color: rgba(0, 0, 0, 0.05);
  .item {
    // max-width: 23%;
    // width: min-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    justify-content: space-between;
    // flex-grow: 1;
    // border: 1px solid #c9c9c9;
    // border-radius: 5px;
    padding: 12px 5px;
    height: 52px;
    // background-color: #fff;
    gap: 5px;
    .title {
      text-align: left;
      @include font(400, 14px, 1.5);
    }
  }
}
.special {
  .title {
    width: 100%;
    cursor: pointer;
    &:hover {
      text-decoration: line-through;
    }
  }
}
.item:deep(.filter) {
  min-width: 80px;
  // width: min-content;
  margin: 0;
  width: 100%;
  // max-width: none;
  .type_btn {
    background-color: white;
    border: 1px solid #c4c4c4;
    border-radius: 4px 0 0 4px;
    display: none;

    > span {
      @apply text-slate-800;
    }
  }
  input {
    margin-left: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
  input[type="text"] {
    background: transparent;
  }
  input[type="date"] {
    background: transparent;
  }
}
</style>
