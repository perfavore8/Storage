import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    orders: {},
    meta: {},
    filters: {
      page: 1,
    },
    isLoading: false,
  },
  getters: {},
  mutations: {
    updateOrders(state, value) {
      state.orders = [...value];
    },
    updateOrdersFilters(state, value) {
      Object.assign(state.filters, value);
    },
    updateIsLoading(state, value) {
      state.isLoading = value;
    },
    updateMeta(state, value) {
      delete value.data;
      state.meta = { ...value };
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
      context.commit("updateMeta", json);
      context.commit("updateIsLoading", false);
    },
  },
};
