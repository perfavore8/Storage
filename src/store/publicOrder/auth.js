import { ApiReqFunc } from "@/composables/ApiReqFunc";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async POGetProfile(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/profile",
          params: params,
        },
        true
      );

      return data;
    },
    async POSetProfile(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/profile",
          method: "post",
          data: params,
        },
        true
      );

      return data;
    },
    async POLogin(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/auth/login",
          method: "post",
          data: params,
        },
        true
      );

      return data;
    },
  },
};
