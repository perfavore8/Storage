import { ApiReqFunc } from "@/composables/ApiReqFunc";
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
    isloadingDocumentsList: false,
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
    updateIsloadingDocumentsList(state, value) {
      state.isloadingDocumentsList = value;
    },
    updateDocumentsFilters(state, value) {
      Object.assign(state.filters, value);
      Object.keys(state.filters).forEach((key) => {
        if (!state.filters[key]) {
          delete state.filters[key];
        }
      });
    },
    updateIsLoadingDocs(state, value) {
      state.isLoading = value;
    },
    updateMeta(state, value) {
      delete value.data;
      state.meta = { ...value };
    },
  },
  actions: {
    async getAutocomplete(context, params) {
      const { data } = await ApiReqFunc({
        url: params.subUrl,
        params: params,
      });

      return data;
    },
    async getDocuments(context, params) {
      context.commit("updateIsLoadingDocs", true);
      const { data } = await ApiReqFunc({
        url: "document/registry",
        method: "post",
        data: params,
      });
      context.commit("updateDocuments", data.data);
      context.commit("updateMeta", data);
      context.commit("updateIsLoadingDocs", false);

      return data;
    },
    async get_documents(context) {
      const { data } = await ApiReqFunc({
        url: "document/list",
      });
      context.commit("update_templates", data.templates);
      context.commit("update_config", data.config);

      return data;
    },
    async get_documents_v2(context) {
      context.commit("updateIsloadingDocumentsList", true);
      const { data } = await ApiReqFunc({
        url: "document/listV2",
      });
      context.commit("update_templates", data.templates);
      context.commit("update_config", data.config);
      context.commit("updateIsloadingDocumentsList", false);

      return data;
    },
    async get_documents_v3(context) {
      const { data } = await ApiReqFunc({
        url: "document/listV3",
      });
      context.commit("update_templates", data.templates);
      context.commit("update_config", data.config);

      return data;
    },
    async delete_template(context, params) {
      const { data } = await ApiReqFunc({
        url: "document/delete",
        method: "post",
        data: params,
      });
      context.dispatch("get_documents_v2");

      return data;
    },
    async update_template(context, params) {
      const { data } = await ApiReqFunc({
        url: "document/update",
        method: "post",
        data: params,
      });
      context.dispatch("get_documents_v2");

      return data;
    },
    async add_template(context, params) {
      const { data } = await ApiReqFunc({
        url: "document/add",
        method: "post",
        data: params,
      });
      context.dispatch("get_documents_v2");

      return data;
    },
    async refresh_fields(context) {
      const { data } = await ApiReqFunc({
        url: "document/refresh-fields",
      });
      context.dispatch("get_documents_v2");

      return data;
    },
  },
};
