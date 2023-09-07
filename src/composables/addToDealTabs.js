import { computed } from "vue";
import { reactive } from "vue";
import { useSaveLS } from "./saveLS";

const { saveLSParam, getSavedLSParam } = useSaveLS();

const tabs = reactive({
  selected: { name: "Товары", value: "products", code: "ProductsTab" },
  list: [
    { name: "Товары", value: "products", code: "ProductsTab" },
    { name: "Документы", value: "documents", code: "DocumentsTab" },
    { name: "Клиент", value: "client", code: "ClientTab" },
  ],
  select: function (option) {
    this.selected = option;
    saveLSParam("addToDealTab", this.selected.value);
  },
  dropToSaved: function () {
    const savedValue = getSavedLSParam("addToDealTab");
    const item = this.list.find((el) => el.value === savedValue);
    if (!item) return;
    this.select(item);
  },
});

export function useAddToDealTabs() {
  const isProductTab = computed(() => tabs.selected.value === "products");

  return { tabs, isProductTab };
}
