import { BaseURL, getTOKEN } from "@/composables/BaseURL";
import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { useNewDeal } from "@/composables/newDeal";
import store from "..";
import { computed } from "vue";
const { preparation_params } = usePreparationQueryParams();
const { newDealParams, order } = useNewDeal();
const isTest = computed(() => store.state.account.account?.id === 1);
export default {
  state: {
    orders: {},
    meta: {},
    types: {},
    fields: [],
    filters: {
      page: 1,
    },
    isLoading: false,
    tableConfig: {},
  },
  getters: {},
  mutations: {
    updateTableConfig(state, value) {
      state.tableConfig = { ...value };
    },
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
      Object.assign(state.types, value);
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
      const url = BaseURL + (isTest.value ? "orders/list-v2" : "orders/list");
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
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
        headers: { Authorization: getTOKEN() },
      });
      const json = await res.json();
      context.commit("updateOrdersTypes", json);
    },

    async getOrdersFields(context) {
      const url = BaseURL + "orders/field/list";
      const res = await fetch(url, {
        headers: { Authorization: getTOKEN() },
      });
      const json = await res.json();
      context.commit("updateOrdersFields", json);
    },
    async addOrdersField(context, params) {
      const url = BaseURL + "orders/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
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
          Authorization: getTOKEN(),
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
          Authorization: getTOKEN(),
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
            Authorization: getTOKEN(),
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
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async updateOrder(context, params) {
      const copy = JSON.parse(JSON.stringify(order));
      delete copy.contacts;
      delete copy.company;
      const url = BaseURL + "orders/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...Object.assign(copy, params),
          order_id: newDealParams.id,
        }),
      });
    },
    async deleteOrder(context, params) {
      const url = BaseURL + "orders/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },

    async generateOrderDoc(context, params) {
      const url = BaseURL + "orders/doc/generate";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async getOrderDocList(context, params) {
      const url = BaseURL + "orders/doc/list";
      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();

      return json;
    },
    async deleteOrderDoc(context, params) {
      const url = BaseURL + "orders/doc/delete";
      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();

      return json;
    },

    async customDocUpload(context, params) {
      const url = BaseURL + "orders/custom-doc/upload";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
        },
        body: params,
      });
      const json = await res.json();

      return json;
    },
    async customDocList(context, params) {
      const url = BaseURL + "orders/custom-doc/list";
      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();

      return json;
    },
    async customDocDelete(context, params) {
      const url = BaseURL + "orders/custom-doc/delete";
      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();

      return json;
    },

    async ordersPipelinesList(context, params) {
      const url = BaseURL + "orders/pipelines/list";
      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();

      return json;
    },
    async ordersPipelinesAdd(context, params) {
      const url = BaseURL + "orders/pipelines/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async ordersPipelinesUpdate(context, params) {
      const url = BaseURL + "orders/pipelines/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async ordersPipelinesDelete(context, params) {
      const url = BaseURL + "orders/pipelines/delete";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },

    async ordersPipelinesStatusesAdd(context, params) {
      const url = BaseURL + "orders/pipelines/statuses/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async ordersPipelinesStatusesUpdate(context, params) {
      const url = BaseURL + "orders/pipelines/statuses/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async ordersPipelinesStatusesDelete(context, params) {
      const url = BaseURL + "orders/pipelines/statuses/delete";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },

    async getOrdersTableConfig(context) {
      const url = BaseURL + "orders/table-config";
      const res = await fetch(url, {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("updateTableConfig", json);

      return json;
    },
    async updateOrdersConfigTable(context, params) {
      const url = BaseURL + "orders/table-config";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params.value),
      });
      const json = await res.json();
      console.log("updateOrdersConfigTable", json);
      await context.dispatch("getOrdersTableConfig");
      context.dispatch("getOrdersFields");
      return json;
    },
  },
};
