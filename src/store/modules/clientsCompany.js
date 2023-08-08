import { computed } from "vue";
import { useClients } from "@/composables/clients";
import { useClientsTabs } from "@/composables/clientsTabs";
import { ApiReqFunc } from "@/composables/ApiReqFunc";

const { tabs } = useClientsTabs();
const selectedTabComp = computed(() => tabs.selected);
const { getClientsList } = useClients(selectedTabComp);

export default {
  state: {
    types: {},
    fields: [],
    list: [],
    meta: {
      links: {},
      meta: {},
    },
    params: {
      page: 1,
      filter: {},
      sort: {},
    },
  },
  getters: {},
  mutations: {
    updateCompanyList(state, value) {
      state.list = [...value];
    },
    updateCompanyTypes(state, value) {
      Object.assign(state.types, value);
    },
    updateCompanyFields(state, value) {
      const componentsList = {
        1: "EditInteger",
        2: "EditFloat",
        3: "EditString",
        4: "EditText",
        5: "EditSelector",
        6: "EditMultiSelector",
        7: "EditDate",
        8: "EditDateTime",
        9: "EditFlag",
      };
      value.map((field) => (field.component = componentsList[field.type]));
      state.fields = [...value];
    },
    updateCompanyMeta(state, value) {
      state.meta = { ...value };
    },
    updateCompanyParams(state, params) {
      Object.assign(state.params, params);
    },
  },
  actions: {
    async getClientsCompanyList(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/list",
        method: "post",
        data: params,
      });
      context.commit("updateCompanyMeta", {
        links: data.links,
        meta: data.meta,
      });
      context.commit("updateCompanyList", data.data);

      return data;
    },
    async addClientsCompany(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/add",
        method: "post",
        data: params,
      });
      getClientsList();

      return data;
    },
    async updateClientsCompany(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/update",
        method: "post",
        data: params,
      });
      getClientsList();

      return data;
    },
    async deleteClientsCompany(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/delete",
        params: params,
      });
      getClientsList();

      return data;
    },

    async linkClientsCompany(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/contacts/link",
        method: "post",
        data: params,
      });

      return data;
    },
    async unlinkClientsCompany(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/contacts/unlink",
        method: "post",
        data: params,
      });

      return data;
    },

    async getClientsCompanyTypes(context) {
      const { data } = await ApiReqFunc({
        url: "company/field/types",
      });
      context.commit("updateCompanyTypes", data);

      return data;
    },

    async getClientsCompanyFields(context) {
      const { data } = await ApiReqFunc({
        url: "company/field/list",
      });
      context.commit("updateCompanyFields", data);

      return data;
    },
    async addClientsCompanyField(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/field/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async updateClientsCompanyField(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/field/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async deleteClientsCompanyField(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/field/delete",
        method: "post",
        data: params,
      });

      return data;
    },

    async getClientsCompanyAutocomplete(context, params) {
      const { data } = await ApiReqFunc({
        url: "company/autocomplete",
        params: params,
      });

      return data;
    },
  },
};
