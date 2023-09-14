import { useLangConfiguration } from "@/composables/langConfiguration";
const { i18n } = useLangConfiguration();

export default {
  state: {
    isNavBarDisabled: false,
    catalog: [
      {
        name: i18n.global.t("NavBar.orders"),
        value: "orders",
        isTest: false,
        hideId: [148],
        testOrder: 1,
      },
      {
        name: i18n.global.t("NavBar.documents"),
        value: "documents",
        isTest: false,
        testOrder: 4,
      },
      {
        name: i18n.global.t("NavBar.remnants"),
        value: "remnants",
        testOrder: 2,
      },
      {
        name: i18n.global.t("NavBar.analytics"),
        value: "analytics",
        isAdmin: true,
        testOrder: 5,
      },
      {
        name: i18n.global.t("NavBar.archive"),
        value: "archive",
        isProduction: true,
      },
      {
        name: i18n.global.t("NavBar.clients"),
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
