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
      // {
      //   name: "Инструкции",
      //   value: "instructions",
      // },
    ],
  },
  getters: {
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
  },
  mutations: {
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
  },
  actions: {},
};
