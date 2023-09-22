import store from "@/store";
import { reactive } from "vue";
import { useLangConfiguration } from "./langConfiguration";

export function useImportStuffFields() {
  const { t } = useLangConfiguration();
  const selectedImportStuffFields = reactive([]);

  const importStuffFields = reactive([]);

  const getFields = async () => {
    importStuffFields.push({
      name: t("import.noimp"),
      value: -1,
      code: "not to import",
    });
    await store.dispatch("get_types");
    const types = store.state.fields.types;
    const fields = Object.entries(await store.dispatch("importStuffFields"));
    fields.forEach((field) => {
      importStuffFields.push({ name: types[field[0]], value: "optgroup" });
      const isList = field[0] == 5 || field[0] == 6;
      field[1].map((item) => {
        item.value = item.code;
        item.optgroup = true;
        item.isList = isList;
        if (isList) item.listAdd = false;
      });
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
