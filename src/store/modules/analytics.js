import { useNotification } from "@/composables/notification";
import { ApiReqFunc } from "@/composables/ApiReqFunc";
const { addNotification } = useNotification();
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
      const { data } = await ApiReqFunc({
        url: "analytics/autocomplete/" + params.field, // <----- слэш не трогай!!!
        params: params.value,
      });
      context.commit("updateAutocomplete", data);

      return data;
    },
    async getCustomers(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/customers",
        method: "post",
        data: params,
      });
      context.commit("updateCustomers", data);

      return data;
    },
    async getCustomersResponsible(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/customers/responsible",
        method: "post",
        data: params,
      });
      context.commit("updateCustomersResponsible", data);

      return data;
    },
    async getCustomersProducts(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/customers/products",
        method: "post",
        data: params,
      });
      context.commit("updateCustomersProducts", data);

      return data;
    },
    async getSales(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/sales",
        method: "post",
        data: params,
      });
      context.commit("updateSales", data);

      return data;
    },
    async getSalesProducts(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/sales/products",
        method: "post",
        data: params,
      });
      context.commit("updateSalesProducts", data);

      return data;
    },
    async getSalesTotal(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/sales/total",
        method: "post",
        data: params,
      });
      context.commit("updateSalesTotal", data);

      return data;
    },
    async getCustomersTotal(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/customers/total",
        method: "post",
        data: params,
      });
      context.commit("updateCustomersTotal", data);

      return data;
    },
    async getStuffMove(context, params) {
      const { data } = await ApiReqFunc({
        url: "analytics/movement/products",
        method: "post",
        data: params,
      });
      context.commit("updateStuffMoveTotal", data.data.total);
      context.commit("updateStuffMove", data);

      return data;
    },
    async analyticsExport(context, params) {
      const { data } = await ApiReqFunc({
        url: `analytics/${params.type}/export/xlsx`,
        method: "post",
        data: params,
      });
      addNotification(0, "Добавлена задача", "Экспорт отчета в xlsx");

      return data;
    },
  },
};
