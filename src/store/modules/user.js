import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async updateUser(context, params) {
      const { data } = await ApiReqFunc({
        method: "post",
        url: "account/update",
        data: params,
      });
      context.commit("updateTusks", data);

      return data;
    },
    async addUser(context, params) {
      const { data } = await ApiReqFunc({
        method: "post",
        url: "account/user/add",
        data: params,
      });
      context.commit("updateTusks", data);

      return data;
    },
    async linkUser(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/user/link",
        params: params,
      });
      context.commit("updateTusks", data);

      return data;
    },
    async unLinkUser(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/user/unlink",
        params: params,
      });
      context.commit("updateTusks", data);

      return data;
    },
    async checkLinkUser(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/user/check",
        params: params,
      });
      context.commit("updateTusks", data);

      return data;
    },
  },
};
