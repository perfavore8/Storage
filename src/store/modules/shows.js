export default {
  state: {
    show_edit_modal: false,
    idx_edit_modal: -1,
    show_settings: false,
    show_filter: false,
    show_table_settings: false,
    show_buttons: false,
    show_edit_stuff: false,
    show_sync: false,
    show_new_position: false,
    show_cancel_position: false,
    show_document_setting: false,
    show_product_properties: false,
    show_product_category: false,
    showSyncSettings: false,
    showImportStuff: false,
    showThirdPpartyIntegrations: false,
    showEditPrice: false,
    showTaskCenter: false,
    showMoveProductsBetweenWhs: false,
    showReportCreate: false,
    showClientsFieldsSettings: false,
    showSettingEntities: false,
  },
  getters: {
    show_modals(state, getters) {
      return (
        state.show_settings ||
        state.showTaskCenter ||
        getters.disabled_for_modals
      );
    },
    disabled_for_modals(state, getters) {
      return state.show_edit_modal || getters.home_blur;
    },
    home_blur(state) {
      return (
        state.show_table_settings ||
        state.show_edit_stuff ||
        state.show_new_position ||
        state.show_cancel_position ||
        state.show_product_category ||
        state.show_product_properties ||
        state.show_document_setting ||
        state.showThirdPpartyIntegrations ||
        state.showSyncSettings ||
        state.showEditPrice ||
        state.showMoveProductsBetweenWhs ||
        state.showImportStuff ||
        state.showSettingEntities ||
        state.showClientsFieldsSettings
      );
    },
    show_edit_modal(state) {
      return state.show_edit_modal;
    },
    idx_edit_modal(state) {
      return state.idx_edit_modal;
    },
    show_settings(state) {
      return state.show_settings;
    },
    show_filter(state) {
      return state.show_filter;
    },
    show_table_settings(state) {
      return state.show_table_settings;
    },
    show_buttons(state) {
      return state.show_buttons;
    },
    show_edit_stuff(state) {
      return state.show_edit_stuff;
    },
    show_sync(state) {
      return state.show_sync;
    },
    show_new_position(state) {
      return state.show_new_position;
    },
    show_cancel_position(state) {
      return state.show_cancel_position;
    },
    show_document_setting(state) {
      return state.show_document_setting;
    },
    show_product_properties(state) {
      return state.show_product_properties;
    },
    show_product_category(state) {
      return state.show_product_category;
    },
    showThirdPpartyIntegrations(state) {
      return state.showThirdPpartyIntegrations;
    },
    showSyncSettings(state) {
      return state.showSyncSettings;
    },
    showImportStuff(state) {
      return state.showImportStuff;
    },
    showEditPrice(state) {
      return state.showEditPrice;
    },
    showTaskCenter(state) {
      return state.showTaskCenter;
    },
    showMoveProductsBetweenWhs(state) {
      return state.showMoveProductsBetweenWhs;
    },
    showReportCreate(state) {
      return state.showReportCreate;
    },
    showClientsFieldsSettings(state) {
      return state.showClientsFieldsSettings;
    },
    showSettingEntities(state) {
      return state.showSettingEntities;
    },
  },
  mutations: {
    open_edit_modal(state, idx) {
      state.show_edit_modal = true;
      state.idx_edit_modal = idx;
    },
    close_edit_modal(state) {
      state.show_edit_modal = false;
    },
    close_settings(state) {
      state.show_settings = false;
    },
    open_close_settings(state) {
      state.show_settings = !state.show_settings;
    },
    open_close_filter(state, value) {
      state.show_filter = value;
    },
    open_table_settings(state) {
      state.show_table_settings = true;
    },
    close_table_settings(state) {
      state.show_table_settings = false;
    },
    open_close_buttons(state, value) {
      state.show_buttons = value;
    },
    open_close_edit_stuff(state, value) {
      state.show_edit_stuff = value;
    },
    close_sync(state) {
      state.show_sync = false;
    },
    open_close_sync(state) {
      state.show_sync = !state.show_sync;
    },
    open_close_new_position(state, value) {
      state.show_new_position = value;
    },
    open_close_cancel_position(state, value) {
      state.show_cancel_position = value;
    },
    open_close_document_setting(state, value) {
      state.show_document_setting = value;
    },
    open_close_product_properties(state, value) {
      state.show_product_properties = value;
    },
    open_close_product_category(state, value) {
      state.show_product_category = value;
    },
    openCloseThirdPpartyIntegrations(state, value) {
      state.showThirdPpartyIntegrations = value;
    },
    openCloseSyncSettings(state, value) {
      state.showSyncSettings = value;
    },
    openCloseImportStuff(state, value) {
      state.showImportStuff = value;
    },
    openCloseEditPrice(state, value) {
      state.showEditPrice = value;
    },
    openCloseTaskCenter(state, value) {
      state.showTaskCenter = value;
    },
    openCloseMoveProductsBetweenWhs(state, value) {
      state.showMoveProductsBetweenWhs = value;
    },
    openCloseClientsFieldsSettings(state, value) {
      state.showClientsFieldsSettings = value;
    },
    toggleSettingEntities(state, value) {
      state.showSettingEntities = value;
    },
    toggleReportCreate(state, value) {
      if (value !== undefined) {
        state.showReportCreate = value;
      } else {
        state.showReportCreate = !state.showReportCreate;
      }
    },
  },
  actions: {},
};
