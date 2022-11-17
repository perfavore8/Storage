// import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
// const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    types: {},
    fields: [
      {
        id: 1,
        field: "Название",
        type: { name: "Строка", value: 3 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 2,
        field: "Артикул",
        type: { name: "Строка", value: 3 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 3,
        field: "Себестоимость",
        type: { name: "Дробное число", value: 2 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 4,
        field: "Цена",
        type: { name: "Дробное число", value: 2 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 5,
        field: "Склад",
        type: { name: "Список", value: 5 },
        selector_options: [
          { name: "Не выбрано", value: 1 },
          { name: "Склад 1", value: 2 },
          { name: "Склад 2", value: 3 },
        ],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: false,
      },
      {
        id: 6,
        field: "На складе",
        type: { name: "Число целое", value: 1 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: false,
      },
      {
        id: 7,
        field: "Свободно для резерва",
        type: { name: "Число целое", value: 1 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: false,
        visibility: true,
        edit: false,
        editing: false,
        delete: true,
        available_to_services: false,
      },
      {
        id: 8,
        field: "В резерве",
        type: { name: "Число целое", value: 1 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: false,
      },
      {
        id: 9,
        field: "№ партии",
        type: { name: "Число целое", value: 1 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: false,
      },
      {
        id: 10,
        field: "Поступление",
        type: { name: "Дата", value: 7 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 11,
        field: "НДС",
        type: { name: "Флаг", value: 9 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 12,
        field: "Изменение",
        type: { name: "Дата-Время", value: 8 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 13,
        field: "Единицы измерений",
        type: { name: "Список", value: 5 },
        selector_options: [
          { name: "Не выбрано", value: 1 },
          { name: "шт", value: 2 },
          { name: "л (литры)", value: 3 },
          { name: "м3 (кубические метры)", value: 4 },
          { name: "кг (килограммы)", value: 5 },
          { name: "т (тонны)", value: 6 },
          { name: "комплект", value: 7 },
          { name: "услуга", value: 8 },
        ],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: false,
      },
      {
        id: 14,
        field: "НДС %",
        type: { name: "Дробное число", value: 2 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 15,
        field: "НДС включен в цену",
        type: { name: "Флаг", value: 9 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 16,
        field: "Менеджер может менять % НДС",
        type: { name: "Флаг", value: 9 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 17,
        field: "Описание",
        type: { name: "Текст", value: 4 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
      {
        id: 18,
        field: "Прибыль",
        type: { name: "Флаг", value: 9 },
        selector_options: [{ name: "", value: 1 }],
        disable_change_type: false,
        visibility: false,
        edit: false,
        editing: false,
        delete: true,
        available_to_services: true,
      },
      {
        id: 19,
        field: "Группа",
        type: { name: "Мильтисписок", value: 6 },
        selector_options: [
          { name: "Не выбрано", value: 1 },
          { name: "Группа 1", value: 2 },
          { name: "Группа 2", value: 3 },
          { name: "Группа 3", value: 4 },
          { name: "Группа 4", value: 5 },
        ],
        disable_change_type: true,
        visibility: true,
        edit: false,
        editing: false,
        delete: false,
        available_to_services: true,
      },
    ],
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
      state.all_fields = [...value];
    },
  },
  actions: {
    async get_types(context) {
      const url = "http://api.gosklad.ru/v1/field/types";
      const res = await fetch(url);
      const json = await res.json();
      context.commit("update_types", json.data);
    },
    async get_fields(context, category_id) {
      const url = "http://api.gosklad.ru/v1/field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=0"
      );
      const json = await res.json();
      context.commit("update_fields", json.data);
    },
    async get_fields_not_save(context, category_id) {
      const url = "http://api.gosklad.ru/v1/field/list";
      const res = await fetch(url + "?category_id=" + category_id);
      const json = await res.json();
      return json.data;
    },
    async get_all_fields(context, category_id) {
      const url = "http://api.gosklad.ru/v1/field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=1"
      );
      const json = await res.json();
      // console.log(json.data);
      context.commit("update_all_fields", json.data);
    },
    async delete_field(context, id) {
      const url = "http://api.gosklad.ru/v1/field/delete";
      const res = await fetch(url + "?id=" + id, { method: "POST" });
      // context.dispatch("get_fields");
      console.log(res);
    },
    async add_field(context, params) {
      const url = "http://api.gosklad.ru/v1/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "POST",
          // "Access-Control-Allow-Headers": "Content-Type",
          // Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      // context.dispatch("get_fields");
      console.log("add_field", json);
      return json;
    },
    async update_fields(context, params) {
      const url = "http://api.gosklad.ru/v1/field/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "POST",
          // "Access-Control-Allow-Headers": "Content-Type",
          // Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      // context.dispatch("get_fields");
      const json = await res.json();
      // context.dispatch("get_fields");
      console.log("update_fields", json);
      return json;
    },
  },
};
