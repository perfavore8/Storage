import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    autocomplete: [],
    customers: {},
    customersResponsible: [],
    customersProducts: [],
    sales: {},
    salesProducts: [],
    salesTotal: {},
  },
  getters: {},
  mutations: {
    updateAutocomplete(state, value) {
      if (value) state.autocomplete = [...value];
    },
    updateCustomers(state, value) {
      if (value) state.customers = { ...value };
    },
    updateCustomersResponsible(state, value) {
      if (value) state.customersResponsible = [...value];
    },
    updateCustomersProducts(state, value) {
      if (value) state.customersProducts = [...value];
    },
    updateSales(state, value) {
      if (value) state.sales = { ...value };
    },
    updateSalesProducts(state, value) {
      if (value) state.salesProducts = [...value];
    },
    updateSalesTotal(state, value) {
      if (value) state.salesTotal = { ...value };
    },
  },
  actions: {
    async getAutocompleteAnalytics(context, params) {
      const url = BaseURL + "analytics/autocomplete/"; // <----- слэш не трогай!!!
      const res = await fetch(
        url + params.field + preparation_params(params.value)
      );
      const json = await res.json();
      context.commit("updateAutocomplete", json);
    },
    async getCustomers(context, params) {
      const url = BaseURL + "analytics/customers";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCustomers", json);
    },
    async getCustomersResponsible(context, params) {
      const url = BaseURL + "analytics/customers/responsible";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCustomersResponsible", json);
    },
    async getCustomersProducts(context, params) {
      const url = BaseURL + "analytics/customers/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCustomersProducts", json);
    },
    async getSales(context, params) {
      const url = BaseURL + "analytics/sales";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateSales", json);
    },
    async getSalesProducts(context, params) {
      const url = BaseURL + "analytics/sales/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateSalesProducts", json);
    },
    async getSalesTotal(context, params) {
      const url = BaseURL + "analytics/sales/total";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateSalesTotal", json);
    },
  },
};
