import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, TOKEN } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    templates: [],
    config: {},
  },
  getters: {},
  mutations: {
    update_templates(state, value) {
      state.templates = [...value];
    },
    update_config(state, value) {
      state.config = { ...value };
    },
  },
  actions: {
    async get_documents(context) {
      const url = BaseURL + "document/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_templates", json.templates);
      context.commit("update_config", json.config);
    },
    async delete_template(context, params) {
      const url = BaseURL + "document/delete";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("get_documents");
    },
    async update_template(context, params) {
      const url = BaseURL + "document/update";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("get_documents");
    },
    async add_template(context, params) {
      const url = BaseURL + "document/add";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("get_documents");
    },
    async refresh_fields(context) {
      const url = BaseURL + "document/refresh-fields";
      await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("get_documents");
    },
  },
};
