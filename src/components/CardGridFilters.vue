<template>
  <div class="filters" v-if="show_filter">
    <div
      class="item"
      v-show="show_filter && (collval[idx] === false ? false : true)"
      v-for="(filter, idx) in filtersValue"
      :key="idx"
    >
      <div class="title">
        {{ params[idx + 1] }}
      </div>
      <filter-number
        v-if="filter.type == 1 || filter.type == 2"
        :item="filter"
        :idx="idx"
        @change_filter_value="change_filter_value"
      />
      <filter-text
        v-if="filter.type == 3 || filter.type == 4"
        :item="filter"
        :idx="idx"
        @change_filter_value="change_filter_value"
      />
      <filter-list
        v-if="filter.type == 5 || filter.type == 6"
        :item="filter"
        :idx="idx"
        :selector_options="filter.selector_options"
        @change_filter_value="change_filter_value"
      />
      <filter-date
        v-if="filter.type == 7 || filter.type == 8"
        :item="filter"
        :idx="idx"
        @change_filter_value="change_filter_value"
      />
      <filter-flag
        v-if="filter.type == 9"
        :item="filter"
        :idx="idx"
        @change_filter_value="change_filter_value"
      />
    </div>
  </div>
</template>

<script>
import FilterNumber from "@/components/FiltersSelections/FilterNumber.vue";
import FilterText from "@/components/FiltersSelections/FilterText.vue";
import FilterList from "@/components/FiltersSelections/FilterList.vue";
import FilterDate from "@/components/FiltersSelections/FilterDate.vue";
import FilterFlag from "@/components/FiltersSelections/FilterFlag.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    collval: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    params: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  components: {
    FilterNumber,
    FilterText,
    FilterList,
    FilterDate,
    FilterFlag,
  },
  data() {
    return {
      filtersValue: [],
    };
  },
  computed: {
    ...mapGetters(["fields", "show_filter"]),
  },
  mounted() {
    this.feelFilters();
  },
  methods: {
    reset_filtersValue() {
      this.filtersValue = [];
    },
    change_filter_value(new_obj, idx) {
      Object.assign(this.filtersValue[idx], new_obj);
    },
    feelFilters() {
      this.params.forEach((val, idx) => {
        if (idx != 0 && idx != this.params.length - 1) {
          let type = null;
          let selector_options = [];
          this.fields.forEach((value) =>
            value.field == val
              ? ((type = value.type.value),
                (selector_options = value.selector_options))
              : null
          );
          let value = null;
          if (type == 5 || type == 6) {
            value = [true];
          }
          if (type == 9) {
            value = 1;
          }
          const obj = {
            type: type,
            option: 1,
            selector_options: selector_options,
            value: value,
          };
          this.filtersValue.push(obj);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  flex-wrap: wrap;
  gap: 5px;
  padding: 30px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    gap: 10px;
    max-width: 300px;
    .title {
      @include font(500, 16px, 19px);
    }
  }
}
</style>
