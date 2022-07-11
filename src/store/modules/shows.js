export default {
  state: {
    show_edit_modal: false,
    idx_edit_modal: -1,
    show_settings: false,
    show_filter: false,
    show_table_settings: false,
    show_buttons: false,
    show_edit_stuff: false,
  },
  getters: {
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
  },
  mutations: {
    open_edit_modal(state, idx) {
      state.show_edit_modal = true;
      state.idx_edit_modal = idx;
    },
    close_edit_modal(state) {
      state.show_edit_modal = false;
    },
    open_settings(state) {
      state.show_settings = true;
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
    open_close_show_edit_stuff(state, value) {
      state.show_edit_stuff = value;
    },
  },
  actions: {},
};
