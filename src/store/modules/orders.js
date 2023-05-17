import { BaseURL, TOKEN } from "@/composables/BaseURL";
import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { useNewDeal } from "@/composables/newDeal";
const { preparation_params } = usePreparationQueryParams();
const { newDealParams } = useNewDeal();
export default {
  state: {
    orders: {},
    meta: {},
    types: [],
    fields: [],
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
    updateOrdersTypes(state, value) {
      state.types = [...Object.values(value)];
    },
    updateOrdersFields(state, value) {
      const componentsList = {
        1: "EditInteger",
        2: "EditFloat",
        3: "EditString",
        4: "EditText",
        5: "EditSelector",
        6: "EditMultiSelector",
        7: "EditDate",
        8: "EditDateTime",
        9: "EditFlag",
      };
      value.map((field) => (field.component = componentsList[field.type]));
      state.fields = [...value];
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

    async getOrdersTypes(context) {
      const url = BaseURL + "orders/field/types";
      const res = await fetch(url, {
        headers: { Authorization: TOKEN },
      });
      const json = await res.json();
      context.commit("updateOrdersTypes", json);
    },

    async getOrdersFields(context) {
      const url = BaseURL + "orders/field/list";
      const res = await fetch(url, {
        headers: { Authorization: TOKEN },
      });
      const json = await res.json();
      context.commit("updateOrdersFields", json);
    },
    async addOrdersField(context, params) {
      const url = BaseURL + "orders/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      return json;
    },
    async updateOrdersField(context, params) {
      const url = BaseURL + "orders/field/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },
    async deleteOrdersField(context, params) {
      const url = BaseURL + "orders/field/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },

    async getOrder(context, params) {
      const url = BaseURL + "orders/order";
      const res = await fetch(
        url + preparation_params({ ...params, order_id: newDealParams.id }),
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      const json = await res.json();

      return json;
    },
    async addOrder(context, params) {
      const url = BaseURL + "orders/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async updateOrder(context, params) {
      const url = BaseURL + "orders/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
    },
    async deleteOrder(context, params) {
      const url = BaseURL + "orders/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },
  },
};
