import { useNewDeal } from "@/composables/newDeal";
import store from "..";
import { computed } from "vue";
import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { usePreparationOrders } from "@/composables/preporationOrders";
const { newDealParams, order } = useNewDeal();
const isTest = computed(() => store.state.account.account?.id === 1);

const { preparationOrder } = usePreparationOrders();

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
    kanBanTableConfig: {},
  },
  getters: {
    preporatedTableConfig(state) {
      const list = [];
      Object.entries(state.tableConfig).forEach(([key, value]) => {
        list.push({ value: key, code: key.split("_")[1], ...value });
      });
      list.map((item) => (item.isOrder = item.value.split("_")[0] === "order"));

      return list;
    },
    sortedFilteredTableConfig(state, getters) {
      return getters.preporatedTableConfig
        .sort((a, b) => {
          if (a.sort > b.sort) return 1;
          if (a.sort == b.sort) return 0;
          if (a.sort < b.sort) return -1;
        })
        .filter((val) => val.visible);
    },
  },
  mutations: {
    updateTableConfig(state, value) {
      state.tableConfig = { ...value };
    },
    updateKanBanTableConfig(state, value) {
      state.kanBanTableConfig = { ...value };
    },
    updateOrders(state, value) {
      value.map((item) => (item.fieldsForRender = preparationOrder(item)));
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
      const dontSaveMeta = params.dontSaveMeta;
      delete params.dontSaveMeta;
      context.commit("updateIsLoading", true);
      const { data } = await ApiReqFunc({
        url: isTest.value ? "orders/list-v2" : "orders/list",
        method: "post",
        data: params,
      });

      context.commit("updateOrders", data.data);
      if (!dontSaveMeta) context.commit("updateMeta", data);
      context.commit("updateIsLoading", false);

      return data;
    },

    async getOrdersTypes(context) {
      const { data } = await ApiReqFunc({
        url: "orders/field/types",
      });
      context.commit("updateOrdersTypes", data);
    },

    async getOrdersFields(context) {
      const { data } = await ApiReqFunc({
        url: "orders/field/list",
      });
      context.commit("updateOrdersFields", data);
    },
    async addOrdersField(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/feild/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async updateOrdersField(context, params) {
      await ApiReqFunc({
        url: "orders/field/update",
        method: "post",
        data: params,
      });
    },
    async deleteOrdersField(context, params) {
      await ApiReqFunc({
        url: isTest.value ? "orders/list-v2" : "orders/field/delete",
        method: "post",
        data: params,
      });
    },

    async getOrder(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/order",
        params: { ...params, order_id: newDealParams.id },
      });

      return data;
    },
    async addOrder(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async updateOrder(context, params) {
      const copy = JSON.parse(JSON.stringify(order));
      delete copy.contacts;
      delete copy.company;
      await ApiReqFunc({
        url: "orders/update",
        method: "post",
        data: {
          ...Object.assign(copy, params),
          order_id: newDealParams.id,
        },
      });
    },
    async deleteOrder(context, params) {
      await ApiReqFunc({
        url: "orders/delete",
        method: "post",
        data: params,
      });
    },
    async refundOrder(context, params) {
      await ApiReqFunc({
        url: "orders/refund",
        params: params,
      });
    },

    async generateOrderDoc(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/doc/generate",
        method: "post",
        data: params,
      });

      return data;
    },
    async getOrderDocList(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/doc/list",
        params: params,
      });

      return data;
    },
    async deleteOrderDoc(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/doc/delete",
        params: params,
      });

      return data;
    },

    async customDocUpload(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/custom-doc/upload",
        method: "post",
        data: params,
      });

      return data;
    },
    async customDocList(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/custom-doc/list",
        params: params,
      });

      return data;
    },
    async customDocDelete(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/custom-doc/delete",
        params: params,
      });

      return data;
    },

    async ordersPipelinesList(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/list",
        params: params,
      });

      return data;
    },
    async ordersPipelinesAdd(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async ordersPipelinesUpdate(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async ordersPipelinesDelete(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/delete",
        method: "post",
        data: params,
      });

      return data;
    },

    async ordersPipelinesStatusesAdd(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/statuses/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async ordersPipelinesStatusesUpdate(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/statuses/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async ordersPipelinesStatusesDelete(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/pipelines/statuses/delete",
        method: "post",
        data: params,
      });

      return data;
    },

    async getOrdersTableConfig(context) {
      const { data } = await ApiReqFunc({
        url: "orders/table-config",
      });
      context.commit("updateTableConfig", data);

      return data;
    },
    async updateOrdersConfigTable(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/table-config",
        method: "post",
        data: params.value,
      });
      await context.dispatch("getOrdersTableConfig");
      context.dispatch("getOrdersFields");

      return data;
    },

    async getOrdersKanBanTableConfig(context) {
      const { data } = await ApiReqFunc({
        url: "orders/table-config",
      });
      context.commit("updateKanBanTableConfig", data);

      return data;
    },
    async updateOrdersKanBanConfigTable(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/update",
        method: "post",
        data: params,
      });
      await context.dispatch("get_account");

      return data;
    },
    async updateOrderStatus(context, params) {
      await ApiReqFunc({
        url: "orders/update",
        method: "post",
        data: params,
      });
    },
  },
};
