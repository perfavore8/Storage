import { reactive, computed } from "vue";
import { useClientsTabs } from "./clientsTabs";

export function useSearchFiltersConfig() {
  const { tabs } = useClientsTabs();
  const selectedTab = computed(() => tabs.selected);

  const config = reactive({
    clients: {
      getFieldsUrl: `getClients${selectedTab.value.value}Fields`,
      stateName: `clients${selectedTab.value.value}`,
      stateFieldsName: "fields",
      needCategories: true,
    },
    orders: {
      needCategories: false,
      hasDifferentSources: true,
      sources: [
        {
          code: "orders",
          title: "Заказы",
          getFieldsUrl: `getOrdersFields`,
          stateName: "orders",
          stateFieldsName: "fields",
        },
        {
          code: "contacts",
          title: "Контакты",
          getFieldsUrl: "getClientsContactsFields",
          stateName: "clientsContacts",
          stateFieldsName: "fields",
        },
        {
          code: "company",
          title: "Компании",
          getFieldsUrl: "getClientsCompanyFields",
          stateName: "clientsCompany",
          stateFieldsName: "fields",
        },
      ],
    },
  });

  return { config };
}
