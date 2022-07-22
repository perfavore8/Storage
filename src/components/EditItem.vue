<template>
  <div class="background_edit_modal"></div>
  <div class="app_edit_modal">
    <div class="header">
      <div class="header_left">
        Редактирование {{ edit_data[params.indexOf("Название") - 1] }}
      </div>
      <div class="header_right">
        <div class="btns">
          <button class="btn1" @click="close_edit_modal()">Отмена</button>
          <button class="btn2">Архивировать</button>
          <button class="btn3" @click="save_data()">Сохранить</button>
        </div>
      </div>
    </div>
    <div class="hr" />
    <div class="main">
      <div class="row">
        <label>Тип:</label>
        <SelectorVue
          :options_props="options_1"
          @select="option_select_1"
          :selected_option="selected_option_1"
        />
      </div>
      <div
        class="row"
        v-for="field in fields"
        :key="field.id"
        v-show="field.available_to_services || !isServicePage"
      >
        <edit-integer
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 1"
        />
        <edit-float
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 2"
        />
        <edit-string
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 3"
        />
        <edit-text
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 4"
        />
        <edit-selector
          :item="field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 5"
        />
        <edit-multi-selector
          :item="field"
          :selected_options="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 6"
        />
        <edit-date
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 7"
        />
        <edit-date-time
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 8"
        />
        <edit-flag
          :item="field.field"
          :selected_option="new_edit_data[params_indexOf(field)]"
          :idx="params_indexOf(field)"
          @change_value="change_value"
          v-if="field.type.value == 9"
        />
      </div>
    </div>
    <div class="hr" />
    <div class="footer">
      <div class="btns">
        <button class="btn1" @click="close_edit_modal()">Отмена</button>
        <button class="btn2">Архивировать</button>
        <button class="btn3" @click="save_data()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue";
import EditInteger from "@/components/EditItemSelections/EditInteger.vue";
import EditFloat from "@/components/EditItemSelections/EditFloat.vue";
import EditString from "@/components/EditItemSelections/EditString.vue";
import EditText from "@/components/EditItemSelections/EditText.vue";
import EditSelector from "@/components/EditItemSelections/EditSelector.vue";
import EditMultiSelector from "@/components/EditItemSelections/EditMultiSelector.vue";
import EditDate from "@/components/EditItemSelections/EditDate.vue";
import EditDateTime from "@/components/EditItemSelections/EditDateTime.vue";
import EditFlag from "@/components/EditItemSelections/EditFlag.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    SelectorVue,
    EditInteger,
    EditFloat,
    EditString,
    EditText,
    EditSelector,
    EditMultiSelector,
    EditDate,
    EditDateTime,
    EditFlag,
  },
  props: {
    edit_data: {
      type: Array,
      required: true,
    },
  },
  inject: ["isServicePage"],
  computed: {
    ...mapGetters(["params"]),
    ...mapGetters(["fields"]),
    ...mapGetters(["idx_edit_modal"]),
  },
  data() {
    return {
      options_1: [
        { name: "Товар", value: 1 },
        { name: "Услуга", value: 2 },
      ],
      selected_option_1: { name: "Товар", value: 1 },
      new_edit_data: [],
    };
  },
  mounted() {
    this.new_edit_data = [];
    this.new_edit_data = this.new_edit_data.concat(this.edit_data);
    this.isServicePage.value
      ? Object.assign(this.selected_option_1, this.options_1[1])
      : Object.assign(this.selected_option_1, this.options_1[0]);
  },
  methods: {
    change_value(value, idx) {
      this.new_edit_data[idx] = value;
    },
    option_select_1(option) {
      Object.assign(this.selected_option_1, option);
    },
    close_edit_modal() {
      this.$store.commit("close_edit_modal");
    },
    save_data() {
      const payload = {
        idx: this.idx_edit_modal,
        data: this.new_edit_data,
      };
      const a = this.isServicePage.value;
      const b = this.selected_option_1.name == "Услуга";
      if (!a && !b) this.$store.commit("update_data_idx", payload);
      if (a && b) this.$store.commit("update_service_idx", payload);
      if (!a && b) {
        this.fields.forEach((val, idx) => {
          if (!val.available_to_services) payload.data[idx] = "";
        });
        this.$store.commit("remove_data_idx", payload),
          this.$store.commit("add_service", payload);
      }
      if (a && !b)
        this.$store.commit("remove_service_idx", payload),
          this.$store.commit("add_data", payload);
      this.close_edit_modal();
    },
    search_selector_options(string) {
      let options = [];
      this.fields.forEach((val) => {
        if (val.field == string) {
          options = val.selector_options;
        }
      });
      return options;
    },
    params_indexOf(item) {
      return this.params.indexOf(item.field) - 1;
    },
  },
};
</script>

<style lang="scss">
@import "@/app.scss";
.app_edit_modal {
  z-index: 9999;
  width: 50%;
  min-width: 500px;
  background-color: #f5f5f5;
  position: absolute;
  left: 25%;
  top: 50px;
  border-radius: 10px;
  pointer-events: all;
  @include font(400, 16px, 22px);
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  .header {
    width: 80%;
    margin: 20px auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    &_left {
      display: flex;
      justify-content: start;
      @include font(500, 20px, 24px);
    }
    &_right {
      display: flex;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      cursor: pointer;
      padding: 6px 12px;
      height: 36px;
      width: 130px;
      border: none;
      border-radius: 5px;
      font-weight: 400;
      line-height: 1.5;
      font-size: 1rem;
      transition: background-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    }
    .btn1 {
      color: #fff;
      background: #1b3546f1;
    }
    .btn1:hover {
      background: #1b3546d9;
      box-shadow: 0 0 5px 2px rgb(27 53 70 / 25%);
    }
    .btn2 {
      color: #fff;
      background-color: #6c757d;
    }
    .btn2:hover {
      background-color: #5f676d;
      box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
    }
    .btn3 {
      color: #fff;
      background-color: #0d6efd;
    }
    .btn3:hover {
      background-color: #0256d4;
      box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
    }
  }
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    gap: 16px;
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      label {
        padding: 7px 0;
      }
      input {
        width: calc(100% - 24px);
        height: 20px;
        padding: 6px 12px;
        @include font(400, 16px);
        background-color: white;
        border: 1px solid #ced4da;
        appearance: none;
        border-radius: 4px;
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      }
      input:focus {
        color: #212529;
        background-color: white;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
      }
      select {
        height: 32px;
        width: 200px;
        padding: 6px 12px;
        background-color: white;
        border: 1px solid #ced4da;
        border-radius: 4px;
        appearance: none;
        @include bg_image("../assets/arrow_select.svg", 16px 12px);
        background-position: right 8px center;
        option {
          background-color: #fff;
          height: 32px;
        }
        option:focus {
          background-color: rgb(13 110 253 / 25%);
        }
      }
      select:focus-visible {
        // outline: #86b7fe auto 1px;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
        // transform: rotate(180deg);
      }
      select:-ms-expand {
        transform: rotate(180deg);
        background-clip: content-box;
      }
    }
  }
  .footer {
    width: 80%;
    height: 20px;
    margin: 20px auto 40px;
    display: flex;
    justify-content: end;
  }
  .hr {
    width: 100%;
    height: 0;
    border: none;
    border-top: 1px solid #dee2e6;
    margin-top: 15px;
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
    transition: border-color 0.15s ease-in-out,
      background-color 0.15s ease-in-out;
  }
  .checkbox:checked + label::before {
    border-color: #0b76ef;
    background-color: #0b76ef;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }
  .checkbox:not(:disabled):not(:checked) + label:hover::before {
    // border-color: #b3d7ff;
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
}
</style>
