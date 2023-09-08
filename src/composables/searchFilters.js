import store from "@/store";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import { reactive } from "vue";
import { useSearchFiltersConfig } from "./searchFiltersConfig";

export function useSearchFilters(setOfInstructions) {
  const { config } = useSearchFiltersConfig();
  const Config = config?.[setOfInstructions];

  const searchValue = ref("");
  const dropSearchValue = () => (searchValue.value = "");

  const fields = computed(() => {
    let res = [];
    if (Config.hasDifferentSources) {
      Config.sources.forEach((source) =>
        store.state?.[source.stateName][source.stateFieldsName].forEach(
          (field) =>
            res.push({
              ...field,
              title: source.title,
              titleCode: source.code,
              code: field.code + "_" + source.code,
            })
        )
      );
    } else {
      res = store.state?.[Config.stateName][Config.stateFieldsName];
    }
    return res;
  });

  const filteredFiltersValue = computed(() =>
    filtersValue.filter((filter) =>
      filter.name.toUpperCase().includes(searchValue.value.toUpperCase())
    )
  );
  const change_filter_value = (new_obj, code) => {
    const item = filtersValue.find(
      (el) => el.code === code
      //  && (titleCode ? el.titleCode === titleCode : true)
    );
    Object.assign(item, new_obj);
  };

  const baseFilteredfiltersValue = computed(() =>
    filteredFiltersValue.value.filter((filter) => filter.is_system)
  );
  const specialFilteredfiltersValue = computed(() =>
    filteredFiltersValue.value.filter((filter) => !filter.is_system)
  );
  const specialFilteredfiltersValueNotSelected = computed(() =>
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
    specialFilteredfiltersValue.value.filter((filter) => filter.selected)
  );

  const specialFiltersSearchValue = ref("");

  const categories_options = reactive([]);
  const get_categories_options = async () => {
    await store.dispatch("get_fields_properties");
    store.state.categories.fields_properties.forEach((val) => {
      let spaces = "";
      for (let i = 1; i < val.level; i++) spaces = spaces + "-    ";
      categories_options.push({
        name: spaces + val.name,
        value: val.id,
      });
    });
  };

  const confirmFilters = () => {
    const filter = {};
    const addToFilter = (val, value) => {
      const code = val.code.split("_")[0];
      if (Config.hasDifferentSources) {
        if (!filter[val.titleCode]) filter[val.titleCode] = {};
        filter[val.titleCode][code] = value;
      } else {
        filter[code] = value;
      }
    };

    filtersValue
      .filter((val) => val.value != null && val.value !== "")
      .forEach((val) => {
        if (val.type == 1 || val.type == 2)
          addToFilter(val, {
            compare: val.option,
            query: val.value,
          });
        if (val.type == 3 || val.type == 4 || val.type == 11)
          addToFilter(val, {
            compare: val.option,
            query: val.value,
          });
        if (val.type == 5 || val.type == 6 || val.type == 12)
          if (val.value?.length)
            addToFilter(val, {
              compare: "in",
              query: val.value,
            });
        if (val.type == 7) {
          const date = val.value.split("~");
          date.forEach((val, idx) => (date[idx] = val.split("-").join(".")));
          addToFilter(val, {
            from: date[0],
            to: date[1],
          });
        }
        if (val.type == 8) {
          const date = val.value.split("~");
          date.forEach((val, idx) => {
            const split = val.split("T");
            split[0] = split[0].split("-").join(".");
            date[idx] = split.join(" ");
          });
          addToFilter(val, {
            from: date[0],
            to: date[1],
          });
        }
      });

    return filter;
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
    11: "FilterDoubleNumber",
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
      if (val.type == 13) return;

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
        title: val.title,
        titleCode: val.titleCode,
      };
      filtersValue.push(obj);
    });
  };

  onMounted(async () => {
    if (Config.hasDifferentSources) {
      const res = [];
      Config.sources.forEach((source) =>
        res.push(store.dispatch(source.getFieldsUrl))
      );
      await Promise.all(res);
    } else {
      await store.dispatch(Config.getFieldsUrl);
    }
    if (Config.needCategories) await get_categories_options();
    fillFilters();
  });

  return {
    searchValue,
    fields,
    filtersValue,
    filteredFiltersValue,
    change_filter_value,
    fillFilters,
    baseFilteredfiltersValue,
    specialFilteredfiltersValue,
    specialFilteredfiltersValueNotSelected,
    specialFilteredfiltersValueSelected,
    specialFiltersSearchValue,
    categories_options,
    filterComponents,
    confirmFilters,
    dropSearchValue,
    Config,
  };
}
