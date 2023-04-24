export default {
  state: {
    isNavBarDisabled: false,
    catalog: [
      {
        name: "Заказы",
        value: "orders",
        isTest: false,
        hideId: [148],
        testOrder: 1,
      },
      {
        name: "Документы",
        value: "documents",
        isTest: false,
        testOrder: 4,
      },
      {
        name: "Остатки",
        value: "remnants",
        testOrder: 2,
      },
      {
        name: "Аналитика",
        value: "analytics",
        isAdmin: true,
        testOrder: 5,
      },
      {
        name: "Архив",
        value: "archive",
        isProduction: true,
      },
      {
        name: "Клиенты",
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
