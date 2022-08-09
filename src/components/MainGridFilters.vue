<template>
  <tr class="filters">
    <transition-group name="mdl">
      <transition name="mdl" key="1b">
        <th class="item" v-show="show_filter" key="b1"></th>
      </transition>
      <th
        class="item"
        v-show="show_filter && (collval[idx] === false ? false : true)"
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
      <th class="item" v-show="show_filter" key="2b" />
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
