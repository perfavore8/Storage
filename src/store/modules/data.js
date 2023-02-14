export default {
  state: {
    catalog: [
      {
        name: "Заказы",
        value: "orders",
        isTest: true,
      },
      {
        name: "Остатки",
        value: "",
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
  mutations: {},
  actions: {},
};
