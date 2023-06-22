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
      needCategories: false,
      hasDifferentSources: true,
      sources: [
        {
          title: "Заказы",
          getFieldsUrl: `getOrdersFields`,
          stateName: "orders",
          stateFieldsName: "fields",
        },
        {
          title: "Контакты",
          getFieldsUrl: "getClientsContactsFields",
          stateName: "clientsContacts",
          stateFieldsName: "fields",
        },
        {
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
