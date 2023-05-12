import store from "@/store";
import { computed, reactive, onMounted } from "vue";

const selected_fields_properties = reactive([]);

export function useEntitiesFieldsProperties() {
  const copy_fields_properties = reactive([]);
  const data_fields_properties = reactive({
    items: null,
    selected: { name: "Выбор подкатегории", value: -1 },
  });

  onMounted(async () => {
    if (!store.state.categories.fields_properties.length) {
      await store.dispatch("get_fields_properties");
    }
    Object.assign(copy_fields_properties, [
      ...store.state.categories.fields_properties,
    ]);
    selected_fields_properties.length = 0;
    option_select_fields_properties({
      value: copy_fields_properties.find((val) => val.parent_id === 0),
    });
  });

  const option_select_fields_properties = (val) => {
    const value = JSON.parse(JSON.stringify(val));
    selected_fields_properties.push(value.value);
    feel_data_fields_properties(val.value.id);
  };
  const feel_data_fields_properties = (id) => {
    data_fields_properties.items = preparing_fields_properties(id);
    // get_fields();
  };
  const preparing_fields_properties = (id) => {
    const new_arr = [];
    const arr = copy_fields_properties.filter((val) => val.parent_id == id);
    arr.forEach((val) => new_arr.push({ name: val.name, value: val }));
    return new_arr;
  };
  const prev_cat = (idx) => {
    selected_fields_properties.splice(idx + 1);
    feel_data_fields_properties(selectedFieldProperty.value.id);
  };

  const selectedFieldProperty = computed(() =>
    selected_fields_properties.at(-1)
  );
  const selectedFieldPropertyIsBasic = computed(
    () => selectedFieldProperty.value?.parent_id === 0
  );

  return {
    copy_fields_properties,
    selected_fields_properties,
    data_fields_properties,
    option_select_fields_properties,
    prev_cat,
    selectedFieldProperty,
    selectedFieldPropertyIsBasic,
  };
}
