import { computed } from "vue";
import { reactive } from "vue";
console.log(123);

const tabs = reactive({
  selected: { name: "Товары", value: "products", code: "ProductsTab" },
  list: [
    { name: "Товары", value: "products", code: "ProductsTab" },
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
