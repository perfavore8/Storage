import store from "..";
import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {
    types: {},
    fields: [],
    fields_with_parents: [],
    all_fields: [],
  },
  getters: {},
  mutations: {
    update_types(state, value) {
      Object.assign(state.types, value);
    },
    update_fields(state, value) {
      state.fields = [...value];
    },
    update_all_fields(state, value) {
      const tableConfig = store.state.account.tableConfig;
      const list = value.sort((a, b) => {
        if (tableConfig[a.code]?.sort > tableConfig[b.code]?.sort) return 1;
        if (tableConfig[a.code]?.sort == tableConfig[b.code]?.sort) return 0;
        if (tableConfig[a.code]?.sort < tableConfig[b.code]?.sort) return -1;
      });
      state.all_fields = [...list];
    },
    update_fields_with_parents(state, value) {
      state.fields_with_parents = [...value];
    },
  },
  actions: {
    async get_types(context) {
      const { data } = await ApiReqFunc({
        url: "field/types",
      });
      context.commit("update_types", data.data);

      return data;
    },
    async get_fields(context, category_id) {
      const { data } = await ApiReqFunc({
        url: "field/list",
        params: { category_id: category_id, with_parents: 0 },
      });
      context.commit("update_fields", data);

      return data;
    },
    async get_all_fields(context) {
      const { data } = await ApiReqFunc({
        url: "field/list",
      });
      context.commit("update_all_fields", data);

      return data;
    },
    async get_fields_not_save(context, category_id) {
      const { data } = await ApiReqFunc({
        url: "field/list",
        params: { category_id: category_id, with_parents: 0 },
      });
      context.commit("update_fields", data);

      return data.data;
    },
    async get_fields_with_parents(context, category_id) {
      const { data } = await ApiReqFunc({
        url: "field/list",
        params: { category_id: category_id, with_parents: 1, sort: "created" },
      });
      context.commit("update_fields_with_parents", data);

      return data;
    },
    async delete_field(context, id) {
      const { data } = await ApiReqFunc({
        url: "field/delete",
        method: "post",
        data: { id: id },
      });

      return data;
    },
    async add_field(context, params) {
      const { data, error } = await ApiReqFunc({
        url: "field/add",
        method: "post",
        data: params,
      });

      if (error) return error;

      return data;
    },
    async update_fields(context, params) {
      const { data } = await ApiReqFunc({
        url: "field/update",
        method: "post",
        data: params,
      });

      return data;
    },
  },
};
