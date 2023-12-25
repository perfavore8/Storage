import { ApiReqFunc } from "@/composables/ApiReqFunc";

export default {
  state: {
    AvailablePublicOrdersList: [],
  },
  getters: {
    updateAvailablePublicOrdersList(state, val) {
      state.AvailablePublicOrdersList = val || [];
    },
  },
  mutations: {},
  actions: {
    async POOrderPositionAdd(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/order/position/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async POOrderPositionDelete(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/order/position/delete",
        params: params,
      });

      return data;
    },
    async POOrder(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/order",
        params: params,
      });

      return data;
    },
    async POOrderUpdate(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async POOrderList(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/order/list",
        params: params,
      });

      context.commit("updateAvailablePublicOrdersList", data);

      return data;
    },
  },
};
