import { reactive } from "vue";

export function useSearchFiltersConfig(selectedTab) {
  const config = reactive({
    clients: {
      getFieldsUrl: `getClients${selectedTab.value.value}Fields`,
      stateName: `clients${selectedTab.value.value}`,
      stateFieldsName: "fields",
      needCategories: true,
    },
    orders: {
      getFieldsUrl: `getOrdersFields`,
      stateName: "orders",
      stateFieldsName: "fields",
      needCategories: false,
    },
  });

  return { config };
}
