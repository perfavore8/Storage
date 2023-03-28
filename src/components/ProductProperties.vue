<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close_product_properties()" />
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Свойства товаров</label>
            <btns-save-close
              @close="close_product_properties"
              :show_save="false"
            >
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div class="links">
            <div
              class="triangle"
              :class="{
                triangle_last: selected_fields_properties.length - 1 == idx,
              }"
              v-for="(cat, idx) in selected_fields_properties"
              :key="cat.id"
              @click="prev_cat(idx)"
            >
              {{ cat.name }}
            </div>
          </div>
          <div class="bottom">
            <SelectorVue
              :options_props="data_fields_properties.items"
              @select="option_select_fields_properties"
              :selected_option="data_fields_properties.selected"
            />
          </div>
        </div>
        <div class="content">
          <h6>Поля товаров в сделке</h6>
          <table class="rows">
            <tr class="row">
              <th
                class=""
                v-if="isTest && selected_fields_properties.length == 1"
              ></th>
              <th class="item item_field title">
                <div class="copy_fields">
                  <span>Поле</span>
                </div>
              </th>
              <th class="item item_type">Тип</th>
              <th class="item item_icon title">
                <div class="w-min mx-auto">
                  <div
                    class="flex items-center relative"
                    @mouseenter="toolTips.visibility = true"
                    @mouseleave="toolTips.visibility = false"
                  >
                    <span class="material-icons-outlined opacity-50">
                      visibility
                    </span>
                    <div
                      class="absolute top-[120%] bg-slate-700 text-slate-100 text-xs p-2 rounded-md z-10"
                      v-if="toolTips.visibility"
                    >
                      Видимость в сделке
                    </div>
                  </div>
                </div>
              </th>
              <th class="item item_icon title">
                <div class="w-min mx-auto">
                  <div
                    class="flex items-center relative"
                    @mouseenter="toolTips.edit = true"
                    @mouseleave="toolTips.edit = false"
                  >
                    <span class="material-icons-outlined opacity-50">
                      edit
                    </span>
                    <div
                      class="absolute top-[120%] bg-slate-700 text-slate-100 text-xs p-2 rounded-md z-10"
                      v-if="toolTips.edit"
                    >
                      Редактирование в сделке
                    </div>
                  </div>
                </div>
              </th>
              <th class="item item_icon title">
                <div class="w-min mx-auto">
                  <div
                    class="flex items-center relative"
                    @mouseenter="toolTips.title = true"
                    @mouseleave="toolTips.title = false"
                  >
                    <span class="material-icons-outlined opacity-50">
                      title
                    </span>
                    <div
                      class="absolute top-[120%] bg-slate-700 text-slate-100 text-xs p-2 rounded-md z-10"
                      v-if="toolTips.title"
                    >
                      Заголовок товара в сделке
                    </div>
                  </div>
                </div>
              </th>
              <template v-if="isTest">
                <th class="item item_icon title">
                  <div class="w-min mx-auto">
                    <div
                      class="flex items-center relative"
                      @mouseenter="toolTips.content_copy = true"
                      @mouseleave="toolTips.content_copy = false"
                    >
                      <span class="material-icons-outlined opacity-50">
                        content_copy
                      </span>
                      <div
                        class="absolute top-[120%] bg-slate-700 text-slate-100 text-xs p-2 rounded-md z-10"
                        v-if="toolTips.content_copy"
                      >
                        Дублировать в новые партии
                      </div>
                    </div>
                  </div>
                </th>
              </template>
              <th class="item">
                <button
                  class="btn btn_save_all btn_yellow"
                  v-if="showUpdateAllFieldsBtn"
                  @click="updateAllFields()"
                >
                  Сохранить все поля
                </button>
              </th>
            </tr>
            <tr
              class="row"
              :class="{ load: is_loading }"
              v-for="(row, idx) in copy_fields"
              :key="row.id"
              v-show="selected_fields_properties.at(-1)?.id === row.category_id"
            >
              <th
                class="p-[10px] border border-[#c9c9c9]"
                v-if="isTest && selected_fields_properties.length == 1"
              >
                <div class="flex flex-row">
                  <button
                    class="bar_item_icon bar_item_icon_up"
                    :disabled="idx === 0"
                    @click="changeTitleSort(idx, true)"
                  />
                  <button
                    class="bar_item_icon bar_item_icon_down"
                    :disabled="idx === copy_fields.length - 1"
                    @click="changeTitleSort(idx, false)"
                  />
                </div>
              </th>
              <td class="item">
                <span v-if="row.is_system">{{ row.name }}</span>
                <input
                  v-else
                  type="text"
                  class="input new_item_input"
                  :class="{ error: row.nameError }"
                  v-model="row.name"
                  @keyup.enter="update_field(idx, ['name'])"
                  @change="row.changeName = true"
                />
              </td>
              <td class="item selectors">
                <SelectorVue
                  :options_props="types"
                  @select="option_select_type"
                  :selected_option="search_type(row.type)"
                  :disabled="true"
                  :idx="idx"
                />
                <div
                  class="type_selector_options"
                  v-if="row.type == 5 || row.type == 6"
                >
                  <div
                    class="type_selector_option"
                    v-for="(option, i) in row.data"
                    :key="i"
                  >
                    <input
                      type="text"
                      class="input"
                      v-model="row.data[i]"
                      @change="row.changeData = true"
                    />
                    <button
                      class="del_button"
                      @click="
                        remove_selector_option(idx, i), (row.changeData = true)
                      "
                    ></button>
                  </div>
                  <button
                    @click="add_selector_option(idx), (row.changeData = true)"
                    class="add_button"
                  ></button>
                </div>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'nb'"
                  :disabled="row.lead_config.visible.disabled"
                  v-model="row.lead_config.visible.value"
                  @change="row.changeLeadConfig = true"
                />
                <label :for="idx + 'nb'"></label>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'n'"
                  :disabled="row.lead_config.editable.disabled"
                  v-model="row.lead_config.editable.value"
                  @change="row.changeLeadConfig = true"
                />
                <label :for="idx + 'n'"></label>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'nt'"
                  :disabled="row.lead_config.title_visible.disabled"
                  v-model="row.lead_config.title_visible.value"
                  @change="row.changeLeadConfig = true"
                />
                <label :for="idx + 'nt'"></label>
              </td>
              <template v-if="isTest">
                <td class="box item text-lg">
                  <input
                    type="checkbox"
                    class="checkbox"
                    :id="idx + 'nd'"
                    v-model="row.config.double_in_new_bath"
                    @change="row.changeConfig = true"
                  />
                  <label :for="idx + 'nd'"></label>
                </td>
              </template>
              <td class="item del_sell">
                <button
                  class="del_btn"
                  v-show="!row.is_system"
                  @click="delete_field(row.id)"
                />
                <button
                  class="btn btn_save btn_blue"
                  v-if="
                    row.changeName ||
                    row.changeData ||
                    row.changeLeadConfig ||
                    row.changeConfig
                  "
                  @click="
                    update_field(idx, [
                      row.changeName ? 'name' : null,
                      row.changeData ? 'data' : null,
                      row.changeLeadConfig ? 'lead_config' : null,
                      row.changeConfig ? 'config' : null,
                    ])
                  "
                >
                  Сохранить
                </button>
              </td>
            </tr>
            <!-- ///
              //////
              //////
              //////
              //////
              /////
              /// -->
            <tr class="row" v-for="(row, idx) in new_fields" :key="row.id">
              <th
                class="p-[10px] border border-[#c9c9c9]"
                v-if="isTest && selected_fields_properties.length == 1"
              ></th>
              <td class="item">
                <input
                  type="text"
                  class="input new_item_input"
                  :class="{ error: row.nameError }"
                  v-model="row.name"
                  @keyup.enter="add_new(row, idx)"
                />
              </td>
              <td class="item selectors">
                <SelectorVue
                  :options_props="types"
                  @select="option_select_new_field_type"
                  :selected_option="search_type(row.type)"
                  :idx="idx"
                />
                <div
                  class="type_selector_options"
                  v-if="new_fields[idx].type == 5 || new_fields[idx].type == 6"
                >
                  <div
                    class="type_selector_option"
                    v-for="(option, i) in row.data"
                    :key="i"
                  >
                    <input type="text" class="input" v-model="row.data[i]" />
                    <button
                      class="del_button"
                      @click="remove_new_fields_selector_option(idx, i)"
                    ></button>
                  </div>
                  <button
                    @click="add_new_fields_selector_option(idx)"
                    class="add_button"
                  ></button>
                </div>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'nb1'"
                  :disabled="new_fields[idx].disabled?.visible.value"
                  v-model="new_fields[idx].lead_config.visible.value"
                />
                <label :for="idx + 'nb1'"></label>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'n1'"
                  :disabled="new_fields[idx].disabled?.editable.value"
                  v-model="new_fields[idx].lead_config.editable.value"
                />
                <label :for="idx + 'n1'"></label>
              </td>
              <td class="box item text-lg">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'n2'"
                  :disabled="new_fields[idx].lead_config.title_visible.disabled"
                  v-model="new_fields[idx].lead_config.title_visible.value"
                />
                <label :for="idx + 'n2'"></label>
              </td>
              <template v-if="isTest">
                <td class="box item text-lg">
                  <input
                    type="checkbox"
                    class="checkbox"
                    :id="idx + 'n3'"
                    v-model="new_fields[idx].config.double_in_new_bath"
                  />
                  <label :for="idx + 'n3'"></label>
                </td>
              </template>
              <td class="item del_sell">
                <button class="del_btn" @click="delete_new_field(idx)"></button>
                <button
                  class="btn btn_save btn_blue"
                  v-if="row.name != ''"
                  @click="add_new(row, idx)"
                >
                  Сохранить
                </button>
              </td>
            </tr>
          </table>
          <button @click="add_new_field()" class="add_new_button"></button>
        </div>
        <div class="footer">
          <btns-save-close @close="close_product_properties" :show_save="false">
            <template v-slot:close>Назад</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  data() {
    return {
      toolTips: {
        visibility: false,
        edit: false,
        title: false,
        content_copy: false,
      },
      copy_fields: [],
      copy_fields_properties: [],
      selected_fields_properties: [],
      new_fields: [],
      data_fields_properties: {
        items: null,
        selected: { name: "Выбор подкатегории", value: -1 },
      },
      is_loading: false,
    };
  },
  async mounted() {
    this.is_loading = true;
    await this.$store.dispatch("get_types");
    await this.$store.dispatch("get_fields_properties");
    this.copy_fields_properties = [
      ...this.$store.state.categories.fields_properties,
    ];

    this.option_select_fields_properties({
      value: this.copy_fields_properties.filter(
        (val) => val.parent_id === 0
      )[0],
    });

    this.get_fields();
    this.is_loading = false;
  },
  computed: {
    showUpdateAllFieldsBtn() {
      let res = false;
      this.copy_fields.forEach((field) => {
        res =
          res ||
          field.changeName ||
          field.changeData ||
          field.changeLeadConfig ||
          field.changeConfig;
      });
      return res;
    },
    types() {
      const arr = [];
      Object.entries(this.$store.state.fields.types).forEach((val) => {
        arr.push({ name: val[1], value: val[0] });
      });
      return arr;
    },
    properties_for_selector() {
      const arr = [];
      this.copy_fields_properties.forEach((val) => {
        let spaces = "";
        for (let i = 1; i < val.level; i++) spaces = spaces + "    ";
        arr.push({ name: spaces + val.name, value: val.id });
      });
      return arr;
    },
    isTest() {
      return this.$store.state.account?.account?.id == 1;
    },
  },
  methods: {
    add_new_field() {
      const item = {
        id: this.copy_fields.length + 1,
        category_id: this.selected_fields_properties.at(-1).id,
        type: 3,
        name: "",
        data: [],
        nameError: false,
        lead_config: {
          visible: { disabled: false, value: false },
          editable: { disabled: false, value: false },
          title_visible: { disabled: false, value: false },
        },
        config: {
          double_in_new_bath: false,
        },
      };
      this.new_fields.push(item);
    },
    async add_new(item, idx) {
      const preparing = (val, dis) => {
        let res = 0;
        if (val && dis) res = 2;
        if (val && !dis) res = 1;
        if (!val && !dis) res = 0;
        if (!val && dis) res = -1;
        return res;
      };
      const lead_config = {
        visible: preparing(
          item.lead_config.visible.value,
          item.lead_config.visible.disabled
        ),
        editable: preparing(
          item.lead_config.editable.value,
          item.lead_config.editable.disabled
        ),
      };
      const params = {
        type: item.type,
        name: item.name,
        category_id: item.category_id,
        lead_config: lead_config,
        data: item.data,
      };
      const error = await this.$store.dispatch("add_field", params);
      const nameError = error.error == "This field name exist.";
      if (nameError) this.new_fields[idx]["nameError"] = true;
      if (!error.error) {
        this.new_fields.splice(this.new_fields.indexOf(item), 1);
        this.get_fields();
      }
    },
    prev_cat(idx) {
      this.selected_fields_properties.splice(idx + 1);
      this.feel_data_fields_properties(
        this.selected_fields_properties.at(-1).id
      );
    },
    feel_data_fields_properties(id) {
      this.data_fields_properties.items = this.preparing_fields_properties(id);
      this.get_fields();
    },
    preparing_fields_properties(id) {
      const new_arr = [];
      const arr = this.copy_fields_properties.filter(
        (val) => val.parent_id == id
      );
      arr.forEach((val) => new_arr.push({ name: val.name, value: val }));
      return new_arr;
    },
    option_select_fields_properties(val) {
      const value = JSON.parse(JSON.stringify(val));
      this.selected_fields_properties.push(value.value);
      this.feel_data_fields_properties(val.value.id);
    },
    updateAllFields() {
      this.copy_fields.map((field, idx) => {
        const needUpdate =
          field.changeName ||
          field.changeData ||
          field.changeLeadConfig ||
          field.changeConfig;
        if (needUpdate)
          this.update_field(idx, [
            field.changeName ? "name" : null,
            field.changeData ? "data" : null,
            field.changeLeadConfig ? "lead_config" : null,
            field.changeConfig ? "config" : null,
          ]);
        field.changeName = false;
        field.changeData = false;
        field.changeLeadConfig = false;
        field.changeConfig = false;
      });
    },
    async update_field(idx, params_names) {
      const params = {};
      params["id"] = this.copy_fields[idx]["id"];
      params_names.forEach((val) => {
        if (val != null) {
          params[val] = {};
          if (val == "lead_config") {
            params[val].visible = this.copy_fields[idx][val].visible.value
              ? 1
              : 0;
            params[val].editable = this.copy_fields[idx][val].editable.value
              ? 1
              : 0;
            params[val].title_visible = this.copy_fields[idx][val].title_visible
              .value
              ? 1
              : 0;
            params[val].title_sort = this.copy_fields[idx][val].title_sort;
          } else if (val == "config") {
            params[val].double_in_new_bath = this.copy_fields[idx][val]
              .double_in_new_bath
              ? 1
              : 0;
          } else {
            params[val] = this.copy_fields[idx][val];
          }
        }
      });
      if (this.copy_fields[idx]?.is_system) delete params?.name;
      // console.log(params);
      const error = await this.$store.dispatch("update_fields", params);
      const nameError = error.error == "This field name exist.";

      this.copy_fields[idx]["nameError"] = nameError;
      if (!error.error) {
        this.copy_fields[idx].changeName = false;
        this.copy_fields[idx].changeData = false;
        this.copy_fields[idx].changeLeadConfig = false;
        this.copy_fields[idx].changeConfig = false;
        // this.get_fields();
      }
    },
    async get_fields() {
      this.is_loading = true;
      await this.$store.dispatch(
        "get_fields",
        this.selected_fields_properties.at(-1).id
      );
      this.copy_fields = [...this.$store.state.fields.fields];
      this.copy_fields.map((val) => {
        val["nameError"] = false;
        val["changeName"] = false;
        val["changeData"] = false;
        val["changeLeadConfig"] = false;
        val["changeConfig"] = false;
        const visible = val.lead_config.visible;
        val.lead_config.visible = {
          disabled: visible == -1 || visible == 2,
          value: visible > 0,
        };
        const editable = val.lead_config.editable;
        val.lead_config.editable = {
          disabled: editable == -1 || editable == 2,
          value: editable > 0,
        };
        const title_visible = val.lead_config.title_visible;
        val.lead_config.title_visible = {
          disabled: title_visible == -1 || title_visible == 2,
          value: title_visible > 0,
        };
      });
      this.is_loading = false;
    },
    search_type(id) {
      return this.types.filter((val) => val.value == id)[0];
    },
    delete_new_field(idx) {
      const item = this.selected_fields_properties.at(-1);
      const start = item.fields_id.length - this.new_fields.length + idx;
      this.new_fields.splice(idx, 1);
      this.copy_fields_properties.map((val) =>
        val.id === item.id ? val.fields_id.splice(start, 1) : null
      );
      item.fields_id.splice(start, 1);
    },
    async delete_field(id) {
      await this.$store.dispatch("delete_field", id);
      this.get_fields();
    },
    option_select_type(option, idx) {
      this.copy_fields[idx].type = option;
    },
    option_select_new_field_type(option, idx) {
      this.new_fields[idx].type = option.value;
    },
    async option_select_copy_fields(option) {
      const res = await this.$store.dispatch(
        "get_fields_not_save",
        option.value
      );
      const sorted_res = res.filter((val) => !val.is_system);
      sorted_res.forEach(async (val) => {
        const params = {
          id: val.id,
          category_id: this.selected_fields_properties.at(-1).id,
        };
        await this.$store.dispatch("update_fields", params);
      });
      this.get_fields();
    },
    changeTitleSort(idx, isUp) {
      if (isUp) {
        this.copy_fields[idx].lead_config.title_sort -= 1;
        this.copy_fields[idx - 1].lead_config.title_sort += 1;
      } else {
        this.copy_fields[idx].lead_config.title_sort += 1;
        this.copy_fields[idx + 1].lead_config.title_sort -= 1;
      }
      this.update_field(idx, ["lead_config"]);
      if (isUp) {
        this.update_field(idx - 1, ["lead_config"]);
      } else {
        this.update_field(idx + 1, ["lead_config"]);
      }
      this.get_fields();
    },
    add_selector_option(idx) {
      if (this.copy_fields[idx].data == null) this.copy_fields[idx].data = [];
      this.copy_fields[idx].data.push("");
    },
    remove_selector_option(idx, i) {
      this.copy_fields[idx].data.splice(i, 1);
    },
    add_new_fields_selector_option(idx) {
      this.new_fields[idx].data.push("");
    },
    remove_new_fields_selector_option(idx, i) {
      this.new_fields[idx].data.splice(i, 1);
    },
    close_product_properties() {
      this.$store.commit("open_close_product_properties", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .backdrop_with_filter {
    z-index: 259;
  }
  .bgc {
    position: relative;
    z-index: 260;
    width: fit-content;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    padding: 60px;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      // width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #c9c9c9;
          padding-bottom: 10px;
          label {
            @include font(500, 28px);
          }
        }
        .bottom {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      }
      .content {
        position: relative;
        @include font(400, 16px);
        h6 {
          @include font(500, 16px);
          margin: 36px 0;
        }
        .small {
          @include font(400, 14px);
        }
        .rows {
          border: 1px solid #c9c9c9;
          border-collapse: collapse;
          // width: min-content;
          .title {
            font-size: 16px;
          }
          .row:first-child {
            .item {
              padding-bottom: 20px;
            }
            .item:last-child {
              position: relative;
            }
          }
          .load {
            filter: blur(5px);
            user-select: none;
          }
          .row {
            .btn_save_all {
              white-space: nowrap;
              position: absolute;
              left: -120%;
              top: -75%;
              height: min-content;
              width: min-content;
              @include font(400, 12px);
            }
            .item {
              padding: 10px;
              border: 1px solid #c9c9c9;
              text-align: center;
              .copy_fields {
                display: flex;
                gap: 10px;
                .v-select {
                  :deep(.title) {
                    height: 28px !important;
                  }
                  :deep(.options) {
                    margin-top: 8px;
                  }
                }
              }
              .error {
                border-color: rgba(219, 54, 71);
                box-shadow: 0 0 0 4px rgba(219, 54, 71, 0.25);
              }
            }
            .item_field {
              width: 30%;
              text-align: left;
            }
            .item_type {
              width: 50%;
              // min-width: 280px;
            }
            .item_icon {
              text-align: center;
              min-width: 60px;
              max-width: 60px;
            }
            .item:last-child {
              width: 0.1%;
              max-width: 54px;
              border-right: none;
              min-width: 34px;
            }
            .new_item_input {
            }
            .del_btn {
              height: 18px;
              width: 18px !important;
              cursor: pointer;
              background: #dc3545;
              border: none;
              border-radius: 4px;
              @include bg_image("@/assets/cross.svg", 50%);
            }
            .selectors {
              .v-select {
                width: 100% !important;
                :deep(.title) {
                  width: 100% !important;
                }
                :deep(.options) {
                  text-align: left;
                }
              }
              .type_selector_options {
                display: flex;
                flex-direction: column;
                margin-top: 5px;
                gap: 5px;
                .type_selector_option {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  input {
                    width: calc(100% - 30px);
                    height: 24px !important;
                    @include font(400, 14px, 18px);
                  }
                  .del_button {
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                    background: #dc3545;
                    border: none;
                    border-radius: 4px;
                    @include bg_image("@/assets/cross.svg", 40%);
                  }
                }
                .add_button {
                  cursor: pointer;
                  margin-top: 8px;
                  width: 40px;
                  height: 20px;
                  background: #4e964d;
                  border: none;
                  border-radius: 4px;
                  @include bg_image("@/assets/plus.svg", 30%);
                }
              }
            }
          }
        }
        .add_new_button {
          cursor: pointer;
          margin-top: 8px;
          position: absolute;
          right: 10px;
          width: 34px;
          height: 34px;
          background: #4e964d;
          border: none;
          border-radius: 4px;
          @include bg_image("@/assets/plus.svg", 50%);
        }
      }
      .footer {
        display: flex;
        justify-content: end;
        margin-top: 60px;
      }
    }
  }
}
.del_sell {
  position: relative;
  .btn_save {
    position: absolute;
    color: #000;
    left: 110%;
    top: calc(50% - 15px);
    height: min-content;
    width: min-content;
    @include font(400, 12px);
  }
}
.input {
  // height: 34px;
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @include font(400, 16px, 20px);
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
}
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: #fff;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  $step: 12px;

  .triangle {
    cursor: pointer;
    padding: 5px 10px 5px 15px;
    height: 30px;
    margin: 5px 0;
    @include font(400, 15px);
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    display: flex;
    justify-content: start;
    align-items: center;
    color: #000;
  }
  .triangle:hover {
    padding: 5px 12px 5px 17px;
    margin-left: -2px;
    margin-right: -2px;
    background: #e6e6e6 !important;
  }
  .triangle:first-child:hover {
    margin-left: 0;
  }
  .triangle_last {
    color: #fff;
    background: rgba(27, 53, 70, 0.9) !important;
  }
  .triangle_last:hover {
    background: rgba(27, 53, 70, 0.8) !important;
  }
  .triangle:active {
    background: #d6d6d6 !important;
  }

  .triangle:nth-child(3n + 1) {
    background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 84%));
  }
  .triangle:nth-child(3n + 2) {
    background: linear-gradient(
      45deg,
      hsl(0, 0%, 84%),
      hsl(0, 0%, 83%),
      hsl(0, 0%, 84%)
    );
  }
  .triangle:nth-child(3n + 3) {
    background: linear-gradient(45deg, hsl(0, 0%, 84%), hsl(0, 0%, 90%));
  }
  .triangle:first-child {
    padding-left: 5px;
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
  }
}
.bar_item_icon {
  margin: 0 auto;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &_up {
    @include bg_image("@/assets/sort_up.svg");
  }
  &_down {
    @include bg_image("@/assets/sort_down.svg");
  }
}
.checkbox + label::before {
  margin-right: 0 !important;
}
</style>
