import { computed } from "vue";
import { reactive } from "vue";
import { useLangConfiguration } from "./langConfiguration";

const { t } = useLangConfiguration();

const tabs = reactive({
  selected: {
    name: t("newOrder.products"),
    value: "products",
    code: "ProductsTab",
  },
  list: [
    {
      name: t("newOrder.products"),
      value: "products",
      code: "ProductsTab",
      default: true,
    },
    { name: t("newOrder.documents"), value: "documents", code: "DocumentsTab" },
    { name: t("newOrder.client"), value: "client", code: "ClientTab" },
  ],
  select: function (option) {
    this.selected = option;
  },
  dropToDefault: function () {
    const item = this.list.find((el) => el.default);
    if (!item) return;
    this.select(item);
  },
});

export function useAddToDealTabs() {
  const isProductTab = computed(() => tabs.selected.value === "products");

  return { tabs, isProductTab };
}
