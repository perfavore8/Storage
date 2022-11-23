// import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
// const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    sync_list_stuff_options: [
      { name: "Не выбрано", value: 1 },
      { name: "Товары", value: 2 },
    ],
    sync_list_hide_tab_options: [
      { name: "Не выбрано", value: 1 },
      { name: "Основное", value: 2 },
      { name: "Сделки", value: 3 },
      { name: "Docs", value: 4 },
      { name: "Склад", value: 5 },
      { name: "Товары", value: 6 },
      { name: "Документы", value: 7 },
      { name: "Статистика", value: 8 },
      { name: "Счета/покупки", value: 9 },
      { name: "Корреспонденция", value: 10 },
      { name: "Анкета", value: 11 },
      { name: "Авто", value: 12 },
      { name: "Финансы", value: 13 },
      { name: "Документы", value: 14 },
      { name: "Чек-лист", value: 15 },
      { name: "DocsSls", value: 16 },
      { name: "Реквизиты", value: 17 },
    ],
    sync_list_stuff_selected_option: { name: "Не выбрано", value: 1 },
    sync_list_hide_tab_selected_option: { name: "Не выбрано", value: 1 },
    // fields_properties: [],
    items_from_storage: [
      {
        id: 1,
        name: "Тест калькулятора",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [
          { name: "Не выбрано", value: 1 },
          { name: "Не складывать", value: 2 },
          { name: "Сложить", value: 3 },
          { name: "Умножить", value: 4 },
          { name: "Вычесть", value: 5 },
          { name: "Поделить", value: 6 },
        ],
        reserve_disable_change: false,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [
          { name: "Не выбрано", value: 1 },
          { name: "Не складывать", value: 2 },
          { name: "Сложить", value: 3 },
          { name: "Умножить", value: 4 },
          { name: "Вычесть", value: 5 },
          { name: "Поделить", value: 6 },
        ],
        cancellation_disable_change: true,
      },
      {
        id: 2,
        name: "Рассмотрение заемщика",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: false,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 3,
        name: "Заемщик одобрен",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: false,
      },
      {
        id: 4,
        name: "Объект залога одобрен",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 5,
        name: "Процесс сделки",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 6,
        name: "Test",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 7,
        name: "ТЕСТ УНИВЕР",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 8,
        name: "Nethouse TEST",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 9,
        name: "тест Чек-лист",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 10,
        name: "Сопряжение",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 11,
        name: "Тест товаров",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 12,
        name: "Тест генерации документов",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 13,
        name: "Праздники",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 14,
        name: "Тест сенсей",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
      {
        id: 15,
        name: "Тест Реквизиты",
        reserve_selected_option: { name: "Не выбрано", value: 1 },
        reserve_selector_options: [{ name: "Не выбрано", value: 1 }],
        reserve_disable_change: true,
        cancellation_selected_option: { name: "Не выбрано", value: 1 },
        cancellation_selector_options: [{ name: "Не выбрано", value: 1 }],
        cancellation_disable_change: true,
      },
    ],
    binding_fields_deals: [
      {
        id: 1,
        name: "Товары",
        binding_selected_option: { name: "Не выбрано", value: 1 },
        binding_selector_options: [{ name: "Не выбрано", value: 1 }],
        binding_disable_change: false,
      },
      {
        id: 2,
        name: "Себестоимость",
        binding_selected_option: { name: "Не выбрано", value: 1 },
        binding_selector_options: [{ name: "Не выбрано", value: 1 }],
        binding_disable_change: true,
      },
      {
        id: 3,
        name: "Прибыль",
        binding_selected_option: { name: "Не выбрано", value: 1 },
        binding_selector_options: [{ name: "Не выбрано", value: 1 }],
        binding_disable_change: true,
      },
      {
        id: 4,
        name: "Общий бюджет",
        binding_selected_option: { name: "Не выбрано", value: 1 },
        binding_selector_options: [{ name: "Не выбрано", value: 1 }],
        binding_disable_change: true,
      },
      {
        id: 5,
        name: "НДС сумма",
        binding_selected_option: { name: "Не выбрано", value: 1 },
        binding_selector_options: [{ name: "Не выбрано", value: 1 }],
        binding_disable_change: true,
      },
    ],
    catalog: [
      {
        name: "Остатки",
        value: "",
      },
      {
        name: "Аналитика",
        value: "analytics",
      },
      {
        name: "Архив",
        value: "archive",
      },
      {
        name: "Инструкции",
        value: "instructions",
      },
    ],
  },
  getters: {
    data(state) {
      return state.data;
    },
    get_data_storage(state) {
      const storage_idx = state.params.indexOf("Склад") - 1;
      const result = {};
      let storages = [];
      let fields_stor_idx = null;
      state.fields.forEach((val) => {
        if (val.field == "Склад") {
          fields_stor_idx = val.id - 1;
        }
      });
      state.fields[fields_stor_idx].selector_options.forEach((val) => {
        storages.push(val.name);
      });
      storages.shift();
      storages.forEach((val) => {
        result[val] = [];
      });
      storages.forEach((val) => {
        state.data.forEach((value) => {
          if (value[storage_idx] == val) result[val].push(value);
        });
      });
      return result;
    },
    service(state) {
      return state.service;
    },
    params(state) {
      return state.params;
    },
    types(state) {
      return state.types;
    },
    fields(state) {
      return state.fields;
    },
    items_categories(state) {
      const result = [];
      let fields_id = [];
      const search = (id) =>
        state.fields_properties.filter((value) => value.id == id)[0];
      const add = (id) => {
        const item = search(id);
        if (item != undefined) {
          let levels = [...item.levels];
          levels.forEach((val) =>
            val != 0 ? fields_id.push(...search(val).fields_id) : null
          );
        }
      };
      state.items_categories.forEach((val) => {
        add(val);
        result.push(fields_id);
        fields_id = [];
      });
      return result;
    },
    // fields_properties(state) {
    //   return state.fields_properties;
    // },
    sync_list_stuff_options(state) {
      return state.sync_list_stuff_options;
    },
    sync_list_hide_tab_options(state) {
      return state.sync_list_hide_tab_options;
    },
    sync_list_stuff_selected_option(state) {
      return state.sync_list_stuff_selected_option;
    },
    sync_list_hide_tab_selected_option(state) {
      return state.sync_list_hide_tab_selected_option;
    },
    items_from_storage(state) {
      return state.items_from_storage;
    },
    binding_fields_deals(state) {
      return state.binding_fields_deals;
    },
    catalog(state) {
      return state.catalog;
    },
    archive(state) {
      return state.archive;
    },
    coun_archive(state) {
      return state.archive.items.length;
    },
    options_from_name: (state) => {
      const result = {};
      state.fields.forEach((val) => {
        result[val.field] = val.selector_options;
      });
      return result;
    },
    documents(state) {
      return state.documents;
    },
    documents_fields(state) {
      return state.documents_fields;
    },
    show_columns(state) {
      const result = {};
      state.show_columns.names.forEach((val, idx) => {
        result[val] = state.show_columns.values[idx];
      });
      return result;
    },
  },
  mutations: {
    update_data(state, data) {
      state.data = data;
    },
    update_data_idx(state, payload) {
      state.data[payload.idx] = payload.data;
    },
    update_all_data(state, new_field) {
      state.data.forEach((val, idx) => {
        state.data[idx].push(new_field);
      });
    },
    add_new_data(state, payload) {
      let dat = [];
      state.params.forEach(() => dat.push(""));
      dat.pop();
      dat.pop();
      payload.title.forEach((val, idx) => {
        const data_idx = state.params.indexOf(val) - 1;
        if (data_idx >= 0) dat[data_idx] = payload.new_data[idx];
      });
      state.data.push(dat);
    },
    cancel_item_in_data(state, payload) {
      const count_idx = state.params.indexOf(payload.name) - 1;
      const old_val = state.data[payload.idx][count_idx];
      state.data[payload.idx][count_idx] = old_val - payload.count;
    },
    delete_data_idx(state, idxes) {
      state.data.forEach((val, index) => {
        idxes.forEach((value) => {
          state.data[index].splice(value, 1);
        });
      });
    },
    remove_data_idx(state, payload) {
      state.data.splice(payload.idx, 1);
    },
    add_data(state, payload) {
      state.data.push(payload.data);
    },
    archive_data(state, idxes) {
      idxes.forEach((idx) => {
        state.archive.items.push(state.data[idx]);
        state.archive.sourses.push(0);
      });
      const idxes_reverse = idxes.reverse();
      idxes_reverse.forEach((idx) => state.data.splice(idx, 1));
    },
    unarchive_data(state, idx) {
      state.data.push(state.archive.items[idx]);
      state.archive.sourses.splice(idx, 1);
      state.archive.items.splice(idx, 1);
    },
    archive_service(state, idxes) {
      idxes.forEach((idx) => {
        state.archive.items.push(state.service[idx]);
        state.archive.sourses.push(1);
      });
      const idxes_reverse = idxes.reverse();
      idxes_reverse.forEach((idx) => state.service.splice(idx, 1));
    },
    unarchive_service(state, idx) {
      state.service.push(state.archive.items[idx]);
      state.archive.sourses.splice(idx, 1);
      state.archive.items.splice(idx, 1);
    },
    add_new_service(state, payload) {
      let dat = [];
      state.params.forEach(() => dat.push(""));
      dat.pop();
      dat.pop();
      payload.title.forEach((val, idx) => {
        const data_idx = state.params.indexOf(val) - 1;
        if (data_idx >= 0) dat[data_idx] = payload.new_data[idx];
      });
      state.service.push(dat);
    },
    update_service_idx(state, payload) {
      state.service[payload.idx] = payload.data;
    },
    remove_service_idx(state, payload) {
      state.service.splice(payload.idx, 1);
    },
    add_service(state, payload) {
      state.service.push(payload.data);
    },
    update_columns(state, payload) {
      const idx = state.show_columns.names.indexOf(payload.name);
      state.show_columns.values[idx] = [];
      state.show_columns.values[idx] = state.show_columns.values[idx].concat(
        payload.value
      );
    },
    update_params(state, params) {
      state.params = params;
    },
    update_fields(state, fields) {
      state.fields = fields;
    },
    update_sync_list_stuff_selected_option(state, option) {
      Object.assign(state.sync_list_stuff_selected_option, option);
    },
    update_sync_list_hide_tab_selected_option(state, option) {
      Object.assign(state.sync_list_hide_tab_selected_option, option);
    },
    update_items_from_storage(state, items_from_storage) {
      state.items_from_storage = items_from_storage;
    },
    update_binding_fields_deals(state, binding_fields_deals) {
      state.binding_fields_deals = binding_fields_deals;
    },
    save_docs(state, payload) {
      state.documents = payload;
    },
    update_fields_properties(state, value) {
      state.fields_properties = [...value];
    },
    add_fields_properties(state, new_item) {
      state.fields_properties.push(new_item);
    },
  },
  actions: {
    // async get_fields_properties(context) {
    //   const url = "http://api.gosklad.ru/v1/category/list";
    //   const res = await fetch(url, {
    //     rejectUnauthorized: false,
    //   });
    //   const json = await res.json();
    //   context.commit("update_fields_properties", json);
    // },
    // async add_fields_properties(context, params) {
    //   const url = "http://api.gosklad.ru/v1/category/add";
    //   await fetch(url + preparation_params(params), { method: "POST" });
    //   context.dispatch("get_fields_properties");
    // },
    // async update_fields_properties(context, params) {
    //   const url = "http://api.gosklad.ru/v1/category/update";
    //   await fetch(url + preparation_params(params), { method: "POST" });
    //   context.dispatch("get_fields_properties");
    // },
    // async delete_fields_properties(context, params) {
    //   const url = "http://api.gosklad.ru/v1/category/delete";
    //   const res = await fetch(url + preparation_params(params), {
    //     method: "POST",
    //   });
    //   context.dispatch("get_fields_properties");
    //   console.log(res);
    // },
  },
};
