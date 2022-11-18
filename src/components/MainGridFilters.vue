<template>
  <tr class="filters" v-show="show_filter">
    <transition-group name="mdl">
      <transition name="mdl" key="1b">
        <th class="item" key="b1"></th>
      </transition>
      <th
        class="item"
        v-show="fields[idx].table_config.visible"
        v-for="(filter, idx) in filtersValue"
        :key="idx"
      >
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
      </th>
      <th class="item" key="2b" />
    </transition-group>
  </tr>
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
    fields: {
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
    ...mapGetters(["show_filter"]),
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
      this.fields.forEach((val) => {
        const preparation_data = (arr) => {
          const result = [];
          if (arr != null)
            arr.forEach((val, idx) => result.push({ name: val, value: idx }));
          return arr;
        };
        let value = null;
        if (val.type == 5 || val.type == 6) {
          value = [];
        }
        if (val.type == 9) {
          value = 1;
        }
        const obj = {
          type: val.type,
          option: 1,
          selector_options: preparation_data(val.data),
          value: value,
        };
        this.filtersValue.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  .item {
    padding: 10px;
    border: 1px solid #c9c9c9;
    @include font(400, 14px, 17px);
    color: #3f3f3f;
    text-align: start;
    min-width: 50px;
  }
}
.mdl-enter-active,
.mdl-leave-active {
  transition: all 0.15s ease-out;
}
.mdl-enter-from,
.mdl-leave-to {
  opacity: 0;
  transform: scale(0.5, 0.5);
}
</style>
