import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL } from "@/components/WidgetAddToDeal/src/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();

export default {
  state: {
    fields: [],
    all_fields: [],
    tableConfig: {},
    showTableSettings: false,
  },
  getters: {},
  mutations: {
    toggleShowTableSettings(state, value) {
      state.showTableSettings = value;
    },
    updateFields(state, value) {
      state.fields = [...value];
    },
    updateTableConfigW(state, value) {
      state.tableConfig = { ...value };
    },
    update_all_fields(state, value) {
      const list = value.sort((a, b) => {
        if (state.tableConfig[a.code]?.sort > state.tableConfig[b.code]?.sort)
          return 1;
        if (state.tableConfig[a.code]?.sort == state.tableConfig[b.code]?.sort)
          return 0;
        if (state.tableConfig[a.code]?.sort < state.tableConfig[b.code]?.sort)
          return -1;
      });
      state.all_fields = [...list];
    },
  },
  actions: {
    async getFieldsW(context, params) {
      const url = BaseURL + "fields";
      let response = [];

      const res = await fetch(url + preparation_params(params), {});
      response = await res.json();
      context.commit("updateFields", response);

      return response;
    },
    async getAllFieldsW(context, params) {
      const url = BaseURL + "fields/all";
      let response = [];

      const res = await fetch(url + preparation_params(params), {});
      response = await res.json();
      context.commit("update_all_fields", response);

      return response;
    },
    async getTableConfigW(context, params) {
      const url = BaseURL + "products/filtered/config";
      let response = [];

      const res = await fetch(url + preparation_params(params), {});
      response = await res.json();
      context.commit("updateTableConfigW", response?.table);

      return response;
    },
    async updateTableConfigW(context, params) {
      const url = BaseURL + "products/filtered/config/update";
      let response = [];

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      return response;
    },
  },
};
