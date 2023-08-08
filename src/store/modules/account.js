import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {
    account: {},
    user: {},
    currencies: {},
    tableConfig: {},
    pipelinesListV2: {},
    leadFieldsList: {},
    leadFieldGroupsList: {},
    productLists: {},
    syncFields: {},
  },
  getters: {},
  mutations: {
    update_account(state, value) {
      state.account = { ...value };
    },
    update_user(state, value) {
      state.user = { ...value };
    },
    update_currencies(state, value) {
      state.currencies = { ...value };
    },
    updateTableConfig(state, value) {
      state.tableConfig = { ...value };
    },
    updatePipelinesListV2(state, value) {
      state.pipelinesListV2 = { ...value };
    },
    updateLeadFieldsList(state, value) {
      state.leadFieldsList = { ...value };
    },
    updateLeadFieldGroupsList(state, value) {
      state.leadFieldGroupsList = { ...value };
    },
    updateProductLists(state, value) {
      state.productLists = { ...value };
    },
    updateSyncFields(state, value) {
      state.syncFields = { ...value };
    },
  },
  actions: {
    async get_account(context) {
      const { data } = await ApiReqFunc({
        url: "account/config",
      });
      context.commit("update_account", data.account);
      context.commit("update_user", data.user);

      return data;
    },
    async getTableConfig(context, code) {
      const { data } = await ApiReqFunc({
        url: "account/table-config",
        data: { code: code },
      });
      context.commit("updateTableConfig", data);

      return data;
    },
    async importOldData() {
      const { data } = await ApiReqFunc({
        url: "account/import-old-data",
      });

      return data;
    },
    async getGoogleAuthUrl() {
      const { data } = await ApiReqFunc({
        url: "account/google-auth-url",
      });

      return data.url;
    },
    async googleLogOut() {
      const { data } = await ApiReqFunc({
        url: "account/google-logout",
      });

      return data.url;
    },
    async genezisEnableDisable(context, param) {
      const { data } = await ApiReqFunc({
        url: "account/genezis-" + param,
      });

      return data.url;
    },
    async update_config_table(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/table-config",
        method: "post",
        data: params.value,
      });
      await context.dispatch("getTableConfig", params.wh);
      context.dispatch("get_all_fields");

      return data;
    },
    async get_currencies(context) {
      const { data } = await ApiReqFunc({
        url: "account/currencies",
      });

      context.commit("update_currencies", data);
      return data;
    },
    async getPipelinesListV2(context) {
      const { data } = await ApiReqFunc({
        url: "account/pipelinesV2",
      });

      context.commit("updatePipelinesListV2", data);
      return data;
    },
    async getLeadFieldsList(context) {
      const { data } = await ApiReqFunc({
        url: "account/lead-fields",
      });

      context.commit("updateLeadFieldsList", data);
      return data;
    },
    async getLeadFieldGroupsList(context) {
      const { data } = await ApiReqFunc({
        url: "account/lead-field-groups",
      });

      context.commit("updateLeadFieldGroupsList", data);
      return data;
    },
    async getProductLists(context) {
      const { data } = await ApiReqFunc({
        url: "account/product-lists",
      });

      context.commit("updateProductLists", data);
      return data;
    },
    async getSyncFields(context) {
      const { data } = await ApiReqFunc({
        url: "account/sync-fields",
      });

      context.commit("updateSyncFields", data);
      return data;
    },
    async importStuffFields() {
      const { data } = await ApiReqFunc({
        url: "account/import-fields",
      });

      return data;
    },
    async importStuffTemplates() {
      const { data } = await ApiReqFunc({
        url: "account/import-templates",
      });

      return data;
    },
    async update_account(context, params) {
      const { data } = await ApiReqFunc({
        url: "account/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async update_user(context, params) {
      const { data } = await ApiReqFunc({
        url: "user/update",
        method: "post",
        data: params,
      });
      context.dispatch("get_account");

      return data;
    },
    async sync1C() {
      const { data } = await ApiReqFunc({
        url: "account/genezis/sync",
      });

      return data;
    },

    async getUsersList() {
      const { data } = await ApiReqFunc({
        url: "account/users",
      });

      return data;
    },
  },
};
