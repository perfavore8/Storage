import { reactive, computed } from "vue";
import { useClientsTabs } from "./clientsTabs";
import { useLangConfiguration } from "./langConfiguration";

export function useSearchFiltersConfig() {
  const { t } = useLangConfiguration();
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
          title: t("search.orders"),
          getFieldsUrl: `getOrdersFields`,
          stateName: "orders",
          stateFieldsName: "fields",
        },
        {
          code: "product",
          title: t("search.products"),
          getFieldsUrl: `get_all_fields`,
          stateName: "fields",
          stateFieldsName: "all_fields",
        },
        {
          code: "contacts",
          title: t("search.contacts"),
          getFieldsUrl: "getClientsContactsFields",
          stateName: "clientsContacts",
          stateFieldsName: "fields",
        },
        {
          code: "company",
          title: t("search.companies"),
          getFieldsUrl: "getClientsCompanyFields",
          stateName: "clientsCompany",
          stateFieldsName: "fields",
        },
      ],
    },
  });

  return { config };
}
