import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, TOKEN } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    autocomplete: [],
    customers: {},
    customersResponsible: [],
    customersProducts: [],
    customersTotal: {},
    sales: {},
    salesProducts: [],
    salesTotal: {},
    stuffMove: {},
    stuffMoveTotal: {},
  },
  getters: {},
  mutations: {
    updateAutocomplete(state, value) {
      state.autocomplete = [...value];
    },
    updateCustomers(state, value) {
      state.customers = { ...value };
    },
    updateCustomersResponsible(state, value) {
      state.customersResponsible = [...value];
    },
    updateCustomersProducts(state, value) {
      state.customersProducts = [...value];
    },
    updateCustomersTotal(state, value) {
      state.customersTotal = { ...value };
    },
    updateSales(state, value) {
      state.sales = { ...value };
    },
    updateSalesProducts(state, value) {
      state.salesProducts = [...value];
    },
    updateSalesTotal(state, value) {
      state.salesTotal = { ...value };
    },
    updateStuffMove(state, value) {
      value.types = value.data.types.map(
        (val, idx) => (val = { name: val, value: idx })
      );
      value.users = value.data.users.map(
        (val) => (val = { name: val, value: val })
      );
      value.whs = value.data.whs.map(
        (val) => (val = { ...val, value: val.name })
      );
      value.data = value.data.list;

      state.stuffMove = { ...value };
    },
    updateStuffMoveTotal(state, value) {
      state.stuffMoveTotal = { ...value };
    },
  },
  actions: {
    async getAutocompleteAnalytics(context, params) {
      const url = BaseURL + "analytics/autocomplete/"; // <----- слэш не трогай!!!
      const res = await fetch(
        url + params.field + preparation_params(params.value),
        {
          headers: {
            Authorization: TOKEN,
          },
        }
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
          Authorization: TOKEN,
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
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCustomersResponsible", json);
      return json;
    },
    async getCustomersProducts(context, params) {
      const url = BaseURL + "analytics/customers/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
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
          Authorization: TOKEN,
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
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateSalesProducts", json);
      return json;
    },
    async getSalesTotal(context, params) {
      const url = BaseURL + "analytics/sales/total";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateSalesTotal", json);
    },
    async getCustomersTotal(context, params) {
      const url = BaseURL + "analytics/customers/total";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCustomersTotal", json);
      return json;
    },
    async getStuffMove(context, params) {
      const url = BaseURL + "analytics/movement/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateStuffMoveTotal", json.data.total);
      context.commit("updateStuffMove", json);
    },
    // async getStuffMoveTotal(context, params) {
    //   const url = BaseURL + "analytics/movement/products/total";
    //   const res = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: TOKEN,
    //     },
    //     body: JSON.stringify(params),
    //   });
    //   const json = await res.json();
    //   context.commit("updateStuffMoveTotal", json);
    // },
  },
};
