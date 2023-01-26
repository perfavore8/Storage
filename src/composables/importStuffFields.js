import store from "@/store";
import { reactive } from "vue";

export function useImportStuffFields() {
  const selectedImportStuffFields = reactive([]);

  const importStuffFields = reactive([]);

  const getFields = async () => {
    importStuffFields.push(
      { name: "Не импортировать поле", value: -1, code: "not to import" },
      { name: "Создать новое поле", value: 0, code: "new field" }
    );
    await store.dispatch("get_types");
    const types = store.state.fields.types;
    const fields = Object.entries(await store.dispatch("importStuffFields"));
    fields.forEach((field) => {
      importStuffFields.push({ name: types[field[0]], value: "optgroup" });
      field[1].map(
        (item) => ((item.value = item.code), (item.optgroup = true))
      );
      importStuffFields.push(...field[1]);
    });
  };
  getFields();

  const fillSelectedImportStuffFields = (count) => {
    for (let i = 0; i < count; i++)
      selectedImportStuffFields.push(importStuffFields[0]);
  };

  return {
    selectedImportStuffFields,
    importStuffFields,
    fillSelectedImportStuffFields,
  };
}
