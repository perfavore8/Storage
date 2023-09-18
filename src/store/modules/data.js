import { useLangConfiguration } from "@/composables/langConfiguration";
const { t } = useLangConfiguration();

export default {
  state: {
    isNavBarDisabled: false,
    catalog: [
      {
        name: t("NavBar.orders"),
        value: "orders",
        isTest: false,
        hideId: [148],
        testOrder: 1,
      },
      {
        name: t("NavBar.documents"),
        value: "documents",
        isTest: false,
        testOrder: 4,
      },
      {
        name: t("NavBar.remnants"),
        value: "remnants",
        testOrder: 2,
      },
      {
        name: t("NavBar.analytics"),
        value: "analytics",
        isAdmin: true,
        testOrder: 5,
      },
      {
        name: t("NavBar.archive"),
        value: "archive",
        isProduction: true,
      },
      {
        name: t("NavBar.clients"),
        value: "clients",
        isTest: true,
        testOrder: 3,
      },
    ],
  },
  getters: {
    catalog(state) {
      return state.catalog;
    },
  },
  mutations: {
    toggleIsNavBarDisabled(state, value) {
      if (value !== undefined) {
        state.isNavBarDisabled = value;
      } else {
        state.isNavBarDisabled = !state.isNavBarDisabled;
      }
    },
  },
  actions: {},
};
