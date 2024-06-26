<template>
  <div class="filters" v-if="show_filter">
    <div
      class="item"
      v-for="(filter, idx) in filtersValue"
      :key="idx"
      v-show="filter.table_config?.filtered"
    >
      <div class="title">
        {{ filter.name }}
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
      <filter-list
        v-if="filter.type == 12"
        :item="filter"
        :idx="idx"
        :selector_options="categories_options"
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
    fields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    sortedFields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    tableConfig: {
      type: Object,
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
      categories_options: [],
      isConfirmFilters: false,
      filter: {},
    };
  },

  computed: {
    ...mapGetters(["show_filter"]),
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    productsParams() {
      return this.$store.state.products.productsParams;
    },
  },

  async mounted() {
    await this.$store.dispatch("get_fields_properties");
    this.get_categories_options();
    this.feelFilters();
  },

  methods: {
    clearFilters() {
      this.feelFilters();
    },
    confirmFilters() {
      this.isConfirmFilters = true;
      const filter = {};
      this.filtersValue
        .filter((val) => val.value != null)
        .forEach((val) => {
          if (val.type == 1 || val.type == 2)
            filter[val.code] = {
              compare: val.option,
              query: val.value,
            };
          if (val.type == 3 || val.type == 4)
            filter[val.code] = {
              compare: val.option,
              query: val.value,
            };
          if (val.type == 5 || val.type == 6 || val.type == 12)
            if (val.value?.length)
              filter[val.code] = {
                compare: "in",
                query: val.value,
              };
          if (val.type == 7) {
            const date = val.value.split("~");
            date.forEach((val, idx) => (date[idx] = val.split("-").join(".")));
            filter[val.code] = {
              from: date[0],
              to: date[1],
            };
          }
          if (val.type == 8) {
            const date = val.value.split("~");
            date.forEach((val, idx) => {
              const split = val.split("T");
              split[0] = split[0].split("-").join(".");
              date[idx] = split.join(" ");
            });
            filter[val.code] = {
              from: date[0],
              to: date[1],
            };
          }
        });
      this.filter = filter;
      this.$store.commit("updateProductsParams", { filter: filter, page: 1 });
      this.$store.dispatch("get_products", this.productsParams);
    },
    change_filter_value(new_obj, idx) {
      Object.assign(this.filtersValue[idx], new_obj);
    },
    setFalseIsConfirmFilters() {
      this.isConfirmFilters = false;
    },
    setTrueIsConfirmFilters() {
      this.isConfirmFilters = true;
    },
    feelFilters() {
      this.filtersValue = [];
      const copyFields = [];
      this.sortedFields.forEach((val) => {
        let item = {};
        item = {
          ...this.fields.filter((value) => {
            return value.code.split(".")[0] == val[0].split(".")[0];
          })[0],
        };
        item.type = val[1].type;
        item.name = val[1].name;
        item.code = val[0];

        copyFields.push(item);
      });
      copyFields.forEach((val) => {
        const preparation_data = (arr) => {
          const result = [];
          if (arr != null)
            arr.forEach((val, idx) => result.push({ name: val, value: idx }));
          return result;
        };
        let value = null;
        if (val.type == 5 || val.type == 6) {
          value = [];
        }
        if (val.type == 9) {
          value = 1;
        }
        if (val.type == 12) {
          value = [];
        }
        const obj = {
          type: val.type,
          code: val.code,
          name: val.name,
          option: "=",
          selector_options: preparation_data(val.data),
          value: value,
          table_config: val.table_config,
        };
        this.filtersValue.push(obj);
      });
    },
    get_categories_options() {
      this.$store.state.categories.fields_properties.forEach((val) => {
        let spaces = "";
        for (let i = 1; i < val.level; i++) spaces = spaces + "    ";
        this.categories_options.push({
          // name: spaces + val.name,
          name: val.name,
          value: val.id,
        });
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
    justify-content: space-evenly;
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
