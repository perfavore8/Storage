import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async profileCheckChange(context, { mode, login, code, isNew, isConfirm }) {
      const params = { code: code };
      params[mode] = login;
      const { data } = await ApiReqFunc({
        url:
          `check-${isNew ? "new" : "old"}-${mode}` +
          (isConfirm ? "-confirm" : ""),
        params: params,
      });

      return data;
    },
  },
};
