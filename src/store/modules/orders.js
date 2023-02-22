import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    orders: {},
    isLoading: false,
  },
  getters: {},
  mutations: {
    updateOrders(state, value) {
      state.orders = { ...value };
    },
    updateIsLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async getOrders(context, params) {
      context.commit("updateIsLoading", true);
      const url = BaseURL + "orders/list";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateOrders", json.data);
      context.commit("updateIsLoading", false);
    },
  },
};
