<template>
  <div class="relative mb-14">
    <table class="rows">
      <tr class="row">
        <th class="item item_field title">
          <span>Поле</span>
        </th>
        <th class="item item_type">Тип</th>
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
      >
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
    const copy_fields = reactive([]);
    const new_fields = reactive([]);
    const is_loading = ref(false);

    const updateAllFields = () => {
      copy_fields.map((field, idx) => {
        const needUpdate = field.changeName || field.changeData;
        if (needUpdate)
          update_field(idx, [
            field.changeName ? "name" : null,
            field.changeData ? "data" : null,
          ]);
        field.changeName = false;
        field.changeData = false;
      });
    };
    const update_field = async (idx, params_names) => {
      const params = {};
      params["id"] = copy_fields[idx]["id"];
      params_names.forEach((val) => {
        if (val != null) {
          params[val] = copy_fields[idx][val];
        }
      });
      if (copy_fields[idx]?.is_system) delete params?.name;
      const error = await store.dispatch(
        `updateClients${props.selectedTab.value}Field`,
        params
      );
      const nameError = error?.error == "This field name exist.";

      copy_fields[idx]["nameError"] = nameError;
      if (!error?.error) {
        copy_fields[idx].changeName = false;
        copy_fields[idx].changeData = false;
      }
    };

    onMounted(() => {
      changeSelectedTab();
    });

    const changeSelectedTab = async () => {
      is_loading.value = true;
      await store.dispatch(`getClients${props.selectedTab.value}Types`);
      get_fields();
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
        res = res || field.changeName || field.changeData;
      });
      return res;
    });
    const types = computed(() => {
      const arr = [];

      store.state[`clients${props.selectedTab.value}`].types.forEach(
        (val, idx) => {
          arr.push({ name: val, value: idx + 1 });
        }
      );
      return arr;
    });
    const isTest = computed(() => {
      return store.state.account?.account?.id == 1;
    });

    const add_new_field = () => {
      const item = {
        id: copy_fields.length + 1,
        type: 3,
        name: "",
        data: [],
        nameError: false,
      };
      new_fields.push(item);
    };
    const add_new = async (item, idx) => {
      const params = {
        type: item.type,
        name: item.name,
        data: item.data,
      };
      const error = await store.dispatch(
        `addClients${props.selectedTab.value}Field`,
        params
      );
      const nameError = error?.error == "This field name exist.";
      if (nameError) new_fields[idx]["nameError"] = true;
      if (!error?.error) {
        new_fields.splice(new_fields.indexOf(item), 1);
        get_fields();
      }
    };

    const get_fields = async () => {
      is_loading.value = true;
      await store.dispatch(`getClients${props.selectedTab.value}Fields`);
      copy_fields.length = 0;
      Object.assign(copy_fields, [
        ...store.state[`clients${props.selectedTab.value}`].fields,
      ]);
      copy_fields.map((val) => {
        val["nameError"] = false;
        val["changeName"] = false;
        val["changeData"] = false;
      });
      is_loading.value = false;
    };
    const search_type = (id) => {
      return types.value.filter((val) => val.value == id)[0];
    };
    const delete_new_field = (idx) => {
      new_fields.splice(idx, 1);
    };
    const delete_field = async (id) => {
      await store.dispatch(`deleteClients${props.selectedTab.value}Field`, id);
      get_fields();
    };
    const option_select_type = (option, idx) => {
      copy_fields[idx].type = option;
    };
    const option_select_new_field_type = (option, idx) => {
      new_fields[idx].type = option.value;
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
      copy_fields,
      new_fields,
      is_loading,
      updateAllFields,
      update_field,
      showUpdateAllFieldsBtn,
      types,
      isTest,
      add_new_field,
      add_new,
      get_fields,
      search_type,
      delete_new_field,
      delete_field,
      option_select_type,
      option_select_new_field_type,
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
</style>
