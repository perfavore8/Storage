export default {
  state: {
    isNavBarDisabled: false,
    catalog: [
      {
        name: "Заказы",
        value: "orders",
        isTest: false,
      },
      {
        name: "Остатки",
        value: "",
      },
      {
        name: "Документы",
        value: "documents",
        isTest: false,
      },
      {
        name: "Аналитика",
        value: "analytics",
        isAdmin: true,
      },
      {
        name: "Архив",
        value: "archive",
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
