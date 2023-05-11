<template>
  <div class="relative mb-14 mt-5">
    <table class="rows">
      <tr class="row">
        <th
          class=""
          v-if="isTest && selected_fields_properties?.length == 1"
        ></th>
        <th class="item item_field title">
          <div class="copy_fields">
            <span>Поле</span>
          </div>
        </th>
        <th class="item item_type">Тип</th>
        <th class="item item_icon title" v-if="selectedTab.haveLeadConfig">
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
        <th class="item item_icon title" v-if="selectedTab.haveLeadConfig">
          <div class="w-min mx-auto">
            <div
              class="flex items-center relative"
              @mouseenter="toolTips.edit = true"
              @mouseleave="toolTips.edit = false"
            >
              <span class="material-icons-outlined opacity-50"> edit </span>
              <div
                class="absolute top-[120%] bg-slate-700 text-slate-100 text-xs p-2 rounded-md z-10"
                v-if="toolTips.edit"
              >
                Редактирование в сделке
              </div>
            </div>
          </div>
        </th>
        <th class="item item_icon title" v-if="selectedTab.haveLeadConfig">
          <div class="w-min mx-auto">
            <div
              class="flex items-center relative"
              @mouseenter="toolTips.title = true"
              @mouseleave="toolTips.title = false"
            >
              <span class="material-icons-outlined opacity-50"> title </span>
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
          <th class="item item_icon title" v-if="selectedTab.haveLeadConfig">
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
        v-show="selected_fields_properties?.id === row.category_id || true"
      >
        <th
          class="p-[10px] border border-[#c9c9c9]"
          v-if="isTest && selected_fields_properties?.length == 1"
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
                @click="remove_selector_option(idx, i), (row.changeData = true)"
              ></button>
            </div>
            <button
              @click="add_selector_option(idx), (row.changeData = true)"
              class="add_button"
            ></button>
          </div>
        </td>
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
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
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
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
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
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
          <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
            <input
              type="checkbox"
              class="checkbox"
              :id="idx + 'nd'"
              :disabled="row.config.double_in_new_bath.disabled"
              v-model="row.config.double_in_new_bath.value"
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
          v-if="isTest && selected_fields_properties?.length == 1"
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
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
          <input
            type="checkbox"
            class="checkbox"
            :id="idx + 'nb1'"
            :disabled="new_fields[idx].disabled?.visible.value"
            v-model="new_fields[idx].lead_config.visible.value"
          />
          <label :for="idx + 'nb1'"></label>
        </td>
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
          <input
            type="checkbox"
            class="checkbox"
            :id="idx + 'n1'"
            :disabled="new_fields[idx].disabled?.editable.value"
            v-model="new_fields[idx].lead_config.editable.value"
          />
          <label :for="idx + 'n1'"></label>
        </td>
        <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
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
          <td class="box item text-lg" v-if="selectedTab.haveLeadConfig">
            <input
              type="checkbox"
              class="checkbox"
              :id="idx + 'n3'"
              :disabled="new_fields[idx].config.double_in_new_bath.disabled"
              v-model="new_fields[idx].config.double_in_new_bath.value"
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
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import store from "@/store";
import SelectorVue from "./SelectorVue.vue";
export default {
  components: { SelectorVue },
  props: { selectedTab: Object },
  setup(props) {
    const toolTips = reactive({
      visibility: false,
      edit: false,
      title: false,
      content_copy: false,
    });
    const copy_fields = reactive([]);
    const new_fields = reactive([]);
    const is_loading = ref(false);

    onMounted(async () => {
      changeSelectedTab();
    });

    const changeSelectedTab = async () => {
      is_loading.value = true;
      await store.dispatch(selectedTab.value.getTypesName);
      await get_fields();
      setTimeout(() => {
        if (is_loading.value) is_loading.value = false;
      }, 5000);
    };

    const selectedTab = computed(() => props.selectedTab);
    watch(selectedTab, () => {
      changeSelectedTab();
    });

    const showUpdateAllFieldsBtn = computed(() => {
      let res = false;
      copy_fields.forEach((field) => {
        res =
          res ||
          field.changeName ||
          field.changeData ||
          field.changeLeadConfig ||
          field.changeConfig;
      });
      return res;
    });
    const types = computed(() => {
      const arr = [];
      Object.entries(
        store.state[selectedTab.value.storeName]?.[selectedTab.value.typesName]
      ).forEach((val) => {
        arr.push({ name: val[1], value: val[0] });
      });
      return arr;
    });
    const isTest = computed(() => store.state.account?.account?.id == 1);

    const add_new_field = () => {
      const item = {
        id: copy_fields.length + 1,
        category_id: props.selected_fields_properties?.id,
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
          double_in_new_bath: { disabled: false, value: false },
        },
      };
      if (!selectedTab.value.haveLeadConfig) delete item.lead_config;
      new_fields.push(item);
    };
    const add_new = async (item, idx) => {
      const preparing = (val, dis) => {
        let res = 0;
        if (val && dis) res = 2;
        if (val && !dis) res = 1;
        if (!val && !dis) res = 0;
        if (!val && dis) res = -1;
        return res;
      };

      const params = {
        type: item.type,
        name: item.name,
        category_id: item.category_id,
        data: item.data,
      };

      if (selectedTab.value.haveLeadConfig) {
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
        params.lead_config = lead_config;
      }

      const error = await store.dispatch(selectedTab.value.addName, params);
      const nameError = error.error == "This field name exist.";
      if (nameError) new_fields[idx]["nameError"] = true;
      if (!error.error) {
        new_fields.splice(new_fields.indexOf(item), 1);
        get_fields();
      }
    };

    const updateAllFields = () => {
      copy_fields.map((field, idx) => {
        const needUpdate =
          field.changeName ||
          field.changeData ||
          field.changeLeadConfig ||
          field.changeConfig;
        if (needUpdate)
          update_field(idx, [
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
    };
    const update_field = async (idx, params_names) => {
      const params = {};
      params["id"] = copy_fields[idx]["id"];
      params_names.forEach((val) => {
        if (val != null) {
          params[val] = {};
          if (val == "lead_config") {
            params[val].visible = copy_fields[idx][val].visible.value ? 1 : 0;
            params[val].editable = copy_fields[idx][val].editable.value ? 1 : 0;
            params[val].title_visible = copy_fields[idx][val].title_visible
              .value
              ? 1
              : 0;
            params[val].title_sort = copy_fields[idx][val].title_sort;
          } else if (val == "config") {
            params[val].double_in_new_bath = copy_fields[idx][val]
              .double_in_new_bath.value
              ? 1
              : 0;
          } else {
            params[val] = copy_fields[idx][val];
          }
        }
      });
      if (copy_fields[idx]?.is_system) delete params?.name;
      const error = await store.dispatch(selectedTab.value.updateName, params);
      const nameError = error.error == "This field name exist.";

      copy_fields[idx]["nameError"] = nameError;
      if (!error.error) {
        copy_fields[idx].changeName = false;
        copy_fields[idx].changeData = false;
        copy_fields[idx].changeLeadConfig = false;
        copy_fields[idx].changeConfig = false;
      }
    };
    const get_fields = async () => {
      is_loading.value = true;
      await store.dispatch(selectedTab.value.getFieldsName, 1);
      copy_fields.length = 0;
      Object.assign(copy_fields, [
        ...store.state[selectedTab.value.storeName]?.[
          selectedTab.value.fieldsName
        ],
      ]);
      copy_fields.map((val) => {
        val["nameError"] = false;
        val["changeName"] = false;
        val["changeData"] = false;
        val["changeLeadConfig"] = false;
        val["changeConfig"] = false;
        if (selectedTab.value.haveLeadConfig) {
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
          const double_in_new_bath = val.config.double_in_new_bath;
          val.config.double_in_new_bath = {
            disabled: double_in_new_bath == -1 || double_in_new_bath == 2,
            value: double_in_new_bath > 0,
          };
        }
      });
      is_loading.value = false;
    };
    const search_type = (id) => {
      return types.value.find((val) => val.value == id);
    };
    const delete_new_field = (idx) => {
      new_fields.splice(idx, 1);
    };
    const delete_field = async (id) => {
      await store.dispatch(selectedTab.value.deleteName, id);
      get_fields();
    };
    const option_select_type = (option, idx) => {
      copy_fields[idx].type = option;
    };
    const option_select_new_field_type = (option, idx) => {
      new_fields[idx].type = option.value;
    };
    const changeTitleSort = (idx, isUp) => {
      if (isUp) {
        copy_fields[idx].lead_config.title_sort -= 1;
        copy_fields[idx - 1].lead_config.title_sort += 1;
      } else {
        copy_fields[idx].lead_config.title_sort += 1;
        copy_fields[idx + 1].lead_config.title_sort -= 1;
      }
      update_field(idx, ["lead_config"]);
      if (isUp) {
        update_field(idx - 1, ["lead_config"]);
      } else {
        update_field(idx + 1, ["lead_config"]);
      }
      get_fields();
    };
    const add_selector_option = (idx) => {
      if (copy_fields[idx].data == null) copy_fields[idx].data = [];
      copy_fields[idx].data.push("");
    };
    const remove_selector_option = (idx, i) => {
      copy_fields[idx].data.splice(i, 1);
    };
    const add_new_fields_selector_option = (idx) => {
      new_fields[idx].data.push("");
    };
    const remove_new_fields_selector_option = (idx, i) => {
      new_fields[idx].data.splice(i, 1);
    };

    return {
      toolTips,
      copy_fields,
      new_fields,
      is_loading,
      showUpdateAllFieldsBtn,
      types,
      isTest,
      add_new_field,
      add_new,
      updateAllFields,
      update_field,
      get_fields,
      search_type,
      delete_new_field,
      delete_field,
      option_select_type,
      option_select_new_field_type,
      changeTitleSort,
      add_selector_option,
      remove_selector_option,
      add_new_fields_selector_option,
      remove_new_fields_selector_option,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
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
      text-align: center;
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
    .box {
      text-align: center !important;
    }
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
      text-align: left;
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
      text-align: center;
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
  right: 4px;
  width: 34px;
  height: 34px;
  background: #4e964d;
  border: none;
  border-radius: 4px;
  @include bg_image("@/assets/plus.svg", 50%);
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
.checkbox + label::before {
  width: 1em;
  height: 1em;
  background-color: #fff;
  border: 1px solid #adb5bd;
  margin-right: 0;
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
</style>
