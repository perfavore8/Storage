import { usePreparationQueryParams } from "@/components/WidgetAddToDeal/src/composables/preparationQueryParams";
import { TOKEN, BaseURL } from "@/composables/BaseURL";
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
      const url = BaseURL + "orders/fields";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateFields", json);

      return json;
    },
    async getAllFieldsW(context, params) {
      const url = BaseURL + "orders/fields/all";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_all_fields", json);

      return json;
    },
    async getTableConfigW(context, params) {
      const url = BaseURL + "orders/products/filtered/config";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateTableConfigW", json?.table);

      return json;
    },
    async updateTableConfigW(context, params) {
      const url = BaseURL + "orders/products/filtered/config/update";

      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },
  },
};
