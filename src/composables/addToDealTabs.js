import { computed } from "vue";
import { reactive } from "vue";

const tabs = reactive({
  selected: { name: "Заказ", value: "products", code: "ProductsTab" },
  list: [
    { name: "Заказ", value: "products", code: "ProductsTab" },
    { name: "Документы", value: "documents", code: "DocumentsTab" },
    { name: "Клиент", value: "client", code: "ClientTab" },
  ],
  select: function (option) {
    this.selected = option;
  },
});

export function useAddToDealTabs() {
  const isProductTab = computed(() => tabs.selected.value === "products");

  return { tabs, isProductTab };
}
