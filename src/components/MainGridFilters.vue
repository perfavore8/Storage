<template>
  <transition name="mdl1">
    <tr class="filters" v-show="show_filter">
      <transition-group name="mdl">
        <th
          class="item"
          key="b1"
          v-if="!oneC && currentSetSettingsInFolder.editItem"
        ></th>
        <template v-for="(filter, idx) in filtersValue" :key="idx">
          <th class="item" v-show="show_filter">
            <template v-if="filter.table_config?.filtered">
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
            </template>
          </th>
        </template>
        <th class="item" key="2b" />
      </transition-group>
    </tr>
  </transition>
</template>

<script>
import FilterNumber from "@/components/FiltersSelections/FilterNumber.vue";
import FilterText from "@/components/FiltersSelections/FilterText.vue";
import FilterList from "@/components/FiltersSelections/FilterList.vue";
import FilterDate from "@/components/FiltersSelections/FilterDate.vue";
import FilterFlag from "@/components/FiltersSelections/FilterFlag.vue";
import { waitForNonAsyncFunction } from "@/composables/waitForNonAsyncFunction";
import { mapGetters } from "vuex";
import { computed } from "vue";
import { useRoleSettings } from "@/composables/roleSettings";
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
  setup() {
    const { currentSetSettingsInFolder } = useRoleSettings("products");

    return { currentSetSettingsInFolder };
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
    await waitForNonAsyncFunction(computed(() => this.fields.length));
    this.feelFilters();
  },
  watch: {
    sortedFields: {
      handler: function () {
        this.feelFilters();
      },
      deep: true,
    },
  },
  methods: {
    clearFilters() {
      this.feelFilters();
    },
    confirmFilters() {
      this.isConfirmFilters = true;
      const filter = {};
      this.filtersValue
        .filter((val) => val.value != null && val.value !== "")
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
        for (let i = 1; i < val.level; i++) spaces = spaces + "-    ";
        this.categories_options.push({
          name: spaces + val.name,
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
.mdl1-enter-active,
.mdl1-leave-active {
  transition: all 0.15s ease-out;
}
.mdl1-enter-from,
.mdl1-leave-to {
  opacity: 0;
}
</style>
