import { ApiReqFunc } from "@/composables/ApiReqFunc";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getToken(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/token/get",
        params: params,
      });

      return data;
    },
    async getPublicToken(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/token/get-public",
        params: params,
      });

      return data;
    },
  },
};
