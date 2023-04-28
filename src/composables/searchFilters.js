import store from "@/store";
import { computed, watch } from "vue";
import { ref } from "vue";
import { reactive } from "vue";

export function useSearchFilters(showFilters, selectedTab) {
  const searchValue = ref("");

  watch(showFilters, () => {
    if (!showFilters.value) return;
    if (fields.value.some((field) => field.type === 12))
      get_categories_options();
    fillFilters();
  });

  const fields = computed(
    () => store.state?.[`clients${selectedTab.value.value}`].fields
  );
  store.dispatch(`getClients${selectedTab.value.value}Fields`);

  const filteredFiltersValue = computed(() =>
    filtersValue.filter((filter) =>
      filter.name.toUpperCase().includes(searchValue.value.toUpperCase())
    )
  );
  const change_filter_value = (new_obj, idx) => {
    Object.assign(filtersValue[idx], new_obj);
  };

  const baseFilteredfiltersValue = computed(() =>
    filteredFiltersValue.value.filter((filter) => filter.is_system)
  );
  const spacialFilteredfiltersValue = computed(() =>
    filteredFiltersValue.value.filter((filter) => !filter.is_system)
  );
  const spacialFilteredfiltersValueNotSelected = computed(() =>
    filtersValue.filter(
      (filter) =>
        !filter.selected &&
        !filter.is_system &&
        filter.name
          .toUpperCase()
          .includes(specialFiltersSearchValue.value.toUpperCase())
    )
  );
  const specialFilteredfiltersValueSelected = computed(() =>
    spacialFilteredfiltersValue.value.filter((filter) => filter.selected)
  );

  const specialFiltersSearchValue = ref("");

  const categories_options = reactive([]);
  const get_categories_options = async () => {
    await this.$store.dispatch("get_fields_properties");
    store.state.categories.fields_properties.forEach((val) => {
      let spaces = "";
      for (let i = 1; i < val.level; i++) spaces = spaces + "-    ";
      categories_options.push({
        name: spaces + val.name,
        value: val.id,
      });
    });
  };

  const filterComponents = {
    1: "FilterNumber",
    2: "FilterNumber",
    3: "FilterText",
    4: "FilterText",
    5: "FilterList",
    6: "FilterList",
    7: "FilterDate",
    8: "FilterDate",
    9: "FilterFlag",
    12: "FilterList",
  };

  const filtersValue = reactive([]);
  const fillFilters = () => {
    filtersValue.length = 0;
    const copyFields = [];
    fields.value.forEach((val) => {
      let item = {};
      item = { ...val };

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
        is_system: !!val.is_system,
        selected: !!val.is_system,
        component: filterComponents[val.type],
        type: val.type,
        code: val.code,
        option: "=",
        selector_options:
          val.type == 12 ? categories_options : preparation_data(val.data),
        value: value,
        name: val.name,
      };
      filtersValue.push(obj);
    });
  };

  return {
    searchValue,
    fields,
    filtersValue,
    filteredFiltersValue,
    change_filter_value,
    fillFilters,
    baseFilteredfiltersValue,
    spacialFilteredfiltersValue,
    spacialFilteredfiltersValueNotSelected,
    specialFilteredfiltersValueSelected,
    specialFiltersSearchValue,
    categories_options,
    filterComponents,
  };
}
