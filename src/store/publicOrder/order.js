import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { useNewDeal } from "@/composables/newDeal";
const { newDealParams, order } = useNewDeal();

export default {
  state: {
    AvailablePublicOrdersList: [],
  },
  getters: {},
  mutations: {
    updateAvailablePublicOrdersList(state, val) {
      state.AvailablePublicOrdersList = val || [];
    },
  },
  actions: {
    async POOrderPositionAdd(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/position/add",
          method: "post",
          data: { ...params, order_id: newDealParams.id },
        },
        true
      );

      return data;
    },
    async POOrderPositionDelete(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/position/delete",
          params: { ...params, order_id: newDealParams.id },
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
      const copy = { positions: order.positions };
      const { data } = await ApiReqFunc(
        {
          url: "public-order/order/update",
          method: "post",
          data: { ...params, ...copy, order_id: Number(newDealParams.id) },
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
