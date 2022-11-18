import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    fields_properties: [
      {
        name: "base",
        id: 1,
        parent_id: 0,
        fields_id: [1, 2, 5, 13],
        level: 1,
        levels: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "short",
        id: 2,
        parent_id: 1,
        fields_id: [3],
        level: 2,
        levels: [1, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "a",
        id: 4,
        parent_id: 2,
        fields_id: [3],
        level: 3,
        levels: [1, 2, 4, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "e",
        id: 8,
        parent_id: 4,
        fields_id: [3],
        level: 4,
        levels: [1, 2, 4, 8, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "b",
        id: 5,
        parent_id: 2,
        fields_id: [3],
        level: 3,
        levels: [1, 2, 5, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "full",
        id: 3,
        parent_id: 1,
        fields_id: [3, 4, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19],
        level: 2,
        levels: [1, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "c",
        id: 6,
        parent_id: 3,
        fields_id: [3],
        level: 3,
        levels: [1, 3, 6, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "d",
        id: 7,
        parent_id: 3,
        fields_id: [3],
        level: 3,
        levels: [1, 3, 7, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  },
  getters: {
    fields_properties(state) {
      return state.fields_properties;
    },
  },
  mutations: {
    update_fields_properties(state, value) {
      state.fields_properties = [...value];
    },
  },
  actions: {
    async get_fields_properties(context) {
      const url = "http://api.gosklad.ru/v1/category/list";
      const res = await fetch(url, {
        rejectUnauthorized: false,
      });
      const json = await res.json();
      context.commit("update_fields_properties", json);
    },
    async add_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/add";
      await fetch(url + preparation_params(params), { method: "POST" });
      context.dispatch("get_fields_properties");
    },
    async update_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/update";
      await fetch(url + preparation_params(params), { method: "POST" });
      context.dispatch("get_fields_properties");
    },
    async delete_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/delete";
      const res = await fetch(url + preparation_params(params), {
        method: "POST",
      });
      context.dispatch("get_fields_properties");
      console.log(res);
    },
  },
};
