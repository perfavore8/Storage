import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { TokenName } from "@/composables/BaseURL";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async authLogin(context, params) {
      const { data } = await ApiReqFunc({
        url: "auth/login",
        method: "post",
        data: params,
      });
      if (data.success && data.access_token) {
        // Сохранение переменной в кэше
        localStorage.setItem(TokenName, JSON.stringify(data.access_token));
      }

      return data;
    },
    async authRegistration(context, params) {
      const { data, error } = await ApiReqFunc({
        url: "auth/sign-up",
        params: params,
      });

      if (error) return { success: false };

      return data;
    },

    async authSetAccount(context, params) {
      const { data } = await ApiReqFunc({
        url: "auth/set-account",
        params: params,
      });

      return data;
    },
  },
};
