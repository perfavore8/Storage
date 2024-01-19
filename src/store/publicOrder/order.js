import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { useNewDeal } from "@/composables/newDeal";
const { newDealParams } = useNewDeal();

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
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/position/add",
          method: "post",
          data: params,
        },
        true
      );

      return data;
    },
    async POOrderPositionDelete(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/position/delete",
          params: params,
        },
        true
      );

      return data;
    },
    async POOrder(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order",
          params: { ...params, order_id: newDealParams.id },
        },
        true
      );

      return data;
    },
    async POOrderUpdate(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/update",
          method: "post",
          data: params,
        },
        true
      );

      return data;
    },
    async POOrderList(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/list",
          params: params,
        },
        true
      );

      context.commit("updateAvailablePublicOrdersList", data);

      return data;
    },
    async clientUpdate(context, params) {
      const { data } = await ApiReqFunc({
        url: "orders/client-update",
        method: "post",
        data: params,
      });

      return data;
    },
  },
};
