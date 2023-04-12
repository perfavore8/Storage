import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, TOKEN } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    templates: [],
    config: {},
    documents: {},
    meta: {},
    filters: {
      page: 1,
    },
    isLoading: false,
  },
  getters: {},
  mutations: {
    update_templates(state, value) {
      state.templates = [...value];
    },
    update_config(state, value) {
      state.config = { ...value };
    },
    updateDocuments(state, value) {
      state.documents = [...value];
    },
    updateDocumentsFilters(state, value) {
      Object.assign(state.filters, value);
      Object.keys(state.filters).forEach((key) => {
        if (!state.filters[key]) {
          delete state.filters[key];
        }
      });
    },
    updateIsLoading(state, value) {
      state.isLoading = value;
    },
    updateMeta(state, value) {
      delete value.data;
      state.meta = { ...value };
    },
  },
  actions: {
    async getAutocomplete(context, params) {
      const url = BaseURL;
      const res = await fetch(
        url + params.subUrl + preparation_params(params.value),
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      );
      const json = await res.json();
      return json;
    },
    async getDocuments(context, params) {
      context.commit("updateIsLoading", true);
      const url = BaseURL + "document/registry";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateDocuments", json.data);
      context.commit("updateMeta", json);
      context.commit("updateIsLoading", false);
    },
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
    async get_documents_v2(context) {
      const url = BaseURL + "document/listV2";
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
