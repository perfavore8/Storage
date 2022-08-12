<template>
  <div class="wrapper">
    <div class="container">
      <div class="header"><label>Добавление товаров</label></div>
      <div class="content">
        <table class="table">
          <thead>
            <tr class="row title">
              <td class="item" v-for="tit in title" :key="tit">{{ tit }}</td>
              <td class="item"></td>
            </tr>
          </thead>
          <tbody>
            <transition-group name="row">
              <tr class="row" v-for="(row, idx) in new_items" :key="row">
                <td class="item">
                  <selector-vue
                    :options_props="options2"
                    @select="option_select2"
                    :selected_option="row[0]"
                    :idx="idx"
                    :disabled="rows.length > idx"
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="new_items[idx][1]"
                    class="input"
                    :class="{
                      not_valid: new_items[idx][1] == '' && try_accept,
                    }"
                    :disabled="rows.length > idx"
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="new_items[idx][2]"
                    class="input"
                    :class="{
                      not_valid: new_items[idx][2] == '' && try_accept,
                    }"
                    :disabled="rows.length > idx"
                  />
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="options1[idx]"
                      @select="option_select1"
                      :selected_option="row[3]"
                      :idx="idx"
                      :disabled="row[0].value == 2"
                    />
                    <input
                      type="text"
                      v-model="new_items[idx][4]"
                      class="input"
                      :class="{
                        not_valid:
                          new_items[idx][4] == '' &&
                          try_accept &&
                          row[0].value != 2,
                      }"
                      :disabled="rows.length > idx || row[0].value == 2"
                    />
                  </div>
                </td>
                <td class="item">
                  <selector-vue
                    :options_props="options[0]"
                    @select="option_select3"
                    :selected_option="row[5]"
                    :idx="idx"
                    :disabled="row[0].value == 2"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="new_items[idx][6]"
                    class="input"
                    :disabled="row[0].value == 2"
                    min="0"
                    :class="{
                      not_valid:
                        (new_items[idx][6] == '' ||
                          new_items[idx][6] == undefined) &&
                        try_accept &&
                        row[0].value != 2,
                    }"
                  />
                </td>
                <td class="item">
                  <selector-vue
                    :options_props="options[1]"
                    @select="option_select4"
                    :selected_option="row[7]"
                    :idx="idx"
                    :disabled="row[0].value == 2"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="new_items[idx][8]"
                    class="input"
                    min="0"
                    :class="{
                      not_valid: new_items[idx][8] == '' && try_accept,
                    }"
                    :disabled="rows.length > idx"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="new_items[idx][9]"
                    class="input"
                    min="0"
                    :class="{
                      not_valid: new_items[idx][9] == '' && try_accept,
                    }"
                  />
                </td>
                <td
                  class="item"
                  :class="{
                    long: new_items[idx][10],
                  }"
                >
                  <div class="nds">
                    <div v-if="!new_items[idx][10]">
                      <input
                        type="checkbox"
                        v-model="new_items[idx][10]"
                        class="checkbox"
                        :id="idx + 'nq'"
                      />
                      <label :for="idx + 'nq'"></label>
                    </div>
                    <div class="hiden" v-if="new_items[idx][10]">
                      <div class="checkboxes">
                        <input
                          type="checkbox"
                          v-model="new_items[idx][10]"
                          class="checkbox"
                          :id="idx + 'nq'"
                        />
                        <label :for="idx + 'nq'">НДС</label>
                        <input
                          type="checkbox"
                          v-model="new_items[idx][11]"
                          class="checkbox"
                          :id="idx + 'nw'"
                        />
                        <label :for="idx + 'nw'">включен в цену</label>
                        <input
                          type="checkbox"
                          v-model="new_items[idx][12]"
                          class="checkbox"
                          :id="idx + 'ne'"
                        />
                        <label :for="idx + 'ne'">можно менять %</label>
                      </div>
                      <input
                        type="number"
                        class="input"
                        v-model="new_items[idx][13]"
                        placeholder="% НДС"
                        min="0"
                      />
                    </div>
                  </div>
                </td>
                <transition name="row">
                  <td class="item">
                    <button
                      class="del_btn"
                      v-show="new_items.length > 1"
                      @click="del_item(idx)"
                    >
                      X
                    </button>
                  </td>
                </transition>
              </tr>
            </transition-group>
          </tbody>
        </table>
        <div class="content_footer">
          <button class="add_new_button" @click="push_new_item()">+</button>
        </div>
      </div>
      <div class="footer">
        <btns-save-close @close="close_modal" @save="save" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { nextTick } from "@vue/runtime-core";
import { mapGetters } from "vuex";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  props: {
    rows: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    idxes: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      title: [
        "Тип",
        "Артикул",
        "Название",
        "№ партии",
        "Склад",
        "Кол-во",
        "Единицы измерений",
        "Себестоимость",
        "Цена",
        "НДС",
      ],
      new_items: [],
      options1: [],
      options2: [
        { name: "Товар", value: 1 },
        { name: "Услуга", value: 2 },
      ],
      options: [],
      try_accept: false,
      fields_for_validation: [1, 2, 6, 8, 9],
      fields_for_validation_service: [1, 2, 8, 9],
    };
  },
  computed: {
    ...mapGetters(["options_from_name"]),
  },
  mounted() {
    this.start();
  },
  watch: {
    new_items: {
      handler: function () {
        this.new_items.forEach((val, idx) => {
          const type_idx = this.title.indexOf("Тип");
          const count_idx = this.title.indexOf("Кол-во") + 1;
          const batchnumber_idx = this.title.indexOf("№ партии");
          const batchnumber_value_idx = this.title.indexOf("№ партии") + 1;
          const storage_idx = this.title.indexOf("Склад") + 1;
          const ed_idx = this.title.indexOf("Единицы измерений") + 1;
          const obj = { name: "", value: 999 };
          const new_sel_option = (objs) => {
            Object.assign(this.new_items[idx][batchnumber_idx], objs[0]);
            Object.assign(this.new_items[idx][storage_idx], objs[1]);
            Object.assign(this.new_items[idx][ed_idx], objs[2]);
          };
          if (val[type_idx].value == 2) {
            this.new_items[idx][count_idx] = "";
            this.new_items[idx][batchnumber_value_idx] = "";
            new_sel_option([obj, obj, obj]);
          }
          if (
            val[type_idx].value != 2 &&
            val[batchnumber_idx].value == obj.value
          ) {
            new_sel_option([
              this.options1[idx][0],
              this.options[0][0],
              this.options[1][0],
            ]);
          }
          if (val[5] < 0) this.new_items[idx][5] = 0;
          if (val[6] < 0) this.new_items[idx][6] = 0;
          if (val[7] < 0) this.new_items[idx][7] = 0;
          if (val[11] < 0) this.new_items[idx][11] = 0;
        });
      },
      deep: true,
    },
  },
  methods: {
    push_new_item() {
      this.new_items.push([
        { name: "Товар", value: 1 },
        "",
        "",
        { name: "Новая", value: 1 },
        "",
        {},
        "",
        {},
        "",
        "",
        false,
        false,
        false,
        "",
      ]);
      Object.assign(
        this.new_items[this.new_items.length - 1][5],
        this.options[0][0]
      );
      Object.assign(
        this.new_items[this.new_items.length - 1][7],
        this.options[1][0]
      );
      this.options1.push([{ name: "Новая", value: 1 }]);
    },
    push_current_item() {
      this.rows.forEach((val, idx) => {
        this.new_items.push([]);
        const serch_selected_item = (options, name) => {
          let obj = {};
          options.forEach((val) => {
            if (val.name == name) {
              Object.assign(obj, val);
            }
          });
          return obj;
        };
        val.forEach((value) => {
          this.new_items[idx].push(value);
        });
        this.options1.push([
          {
            name: this.new_items[idx][3],
            value: 2,
          },
        ]);
        this.new_items[idx][3] = {
          name: this.new_items[idx][3],
          value: 2,
        };
        this.new_items[idx][5] = serch_selected_item(
          this.options[0],
          this.new_items[idx][5]
        );
        this.new_items[idx][7] = serch_selected_item(
          this.options[1],
          this.new_items[idx][7]
        );
        this.new_items[idx][0] = { name: "Товар", value: 1 };
      });
    },
    del_item(idx) {
      this.new_items.splice(idx, 1);
    },
    save() {
      this.try_accept = true;
      let accept = true;
      const validate = (item, arr) => {
        arr.forEach((val) => {
          accept = accept && item[val] != "" && item[val] != undefined;
        });
      };
      this.new_items.forEach((val) => {
        if (val[0].value == 1) validate(val, this.fields_for_validation);
        if (val[0].value == 2)
          validate(val, this.fields_for_validation_service);
      });
      if (accept) {
        this.new_items.forEach((value, index) => {
          value.forEach((val, idx) => {
            this.new_items[index][idx] = `${val}`;
            if (typeof val == "object") this.new_items[index][idx] = val.name;
            if (val === true) this.new_items[index][idx] = "Да";
            if (val === false) this.new_items[index][idx] = "Нет";
          });
        });
        this.new_items.forEach((item) => {
          let artic = [];
          this.title.forEach((val) => {
            if (val === "Кол-во") val = "На складе";
            if (val === "№ партии") artic.push("");
            artic.push(val);
          });
          artic.push(
            "НДС включен в цену",
            "Менеджер может менять % НДС",
            "НДС %"
          );
          const payload = {
            new_data: item,
            title: artic,
          };
          if (item[0] == "Товар") this.$store.commit("add_new_data", payload);
          if (item[0] == "Услуга")
            this.$store.commit("add_new_service", payload);
        });
        this.close_modal();
      }
    },
    close_modal() {
      this.new_items = [];
      this.try_accept = false;
      this.$store.commit("open_close_new_position", false);
    },
    option_select1(option, idx) {
      Object.assign(this.new_items[idx][3], option);
    },
    option_select2(option, idx) {
      Object.assign(this.new_items[idx][0], option);
    },
    option_select3(option, idx) {
      Object.assign(this.new_items[idx][5], option);
    },
    option_select4(option, idx) {
      Object.assign(this.new_items[idx][7], option);
    },
    start() {
      nextTick(() => {
        this.options.push(this.options_from_name["Склад"]);
        this.options.push(this.options_from_name["Единицы измерений"]);
        if (this.rows.length > 0) {
          this.push_current_item();
        } else {
          this.push_new_item();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999999;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .container {
    width: 90%;
    min-width: 1400px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: start;
      padding: 10px 50px;
      @include font(500, 20px);
      // border-bottom: 2px solid #dee2e6;
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px 0;
      // border-bottom: 2px solid #dee2e6;
      .table {
        border: 1px solid #c9c9c9;
        border-collapse: collapse;
        width: 100%;
        .title {
          @include font(500, 16px);
          background-color: rgba(0, 0, 0, 0.15) !important;
          .item {
            padding-bottom: 20px !important;
            text-align: center !important;
          }
        }
        .row:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .row {
          .item {
            padding: 10px 5px;
            border: 1px solid #c9c9c9;
            border-top: 2px solid #c9c9c9;
            text-align: left;
            .nds {
              // text-align: center;
              display: flex;
              flex-direction: row;
              text-align: center;
              justify-content: center;
              .hiden {
                display: flex;
                flex-direction: column;
                .checkboxes {
                  display: flex;
                  flex-direction: row;
                  gap: 7px;
                  @include font(500, 14px);
                  > label {
                    flex-direction: column;
                  }
                }
              }
            }
            .v-select {
              width: calc(100% - 26px) !important;
            }
            .select_input {
              display: flex;
              flex-direction: row;
              gap: 24px;
              .v-select {
                flex: 2 2 auto;
                width: 60% !important;
                :deep(.title) {
                  width: calc(100% - 24px) !important;
                }
                :deep(.options) {
                  width: 100% !important;
                }
              }
              .input {
                flex: 1 1 auto;
                width: calc(40% - 24px) !important;
                min-width: 30%;
                margin-left: -24px;
              }
            }
          }
          .item:nth-child(1) {
            width: 10%;
          }
          .item:nth-child(2) {
            width: 9%;
          }
          .item:nth-child(3) {
            width: 7%;
          }
          .item:nth-child(4) {
            width: 40%;
          }
          .item:nth-child(5) {
            width: 1%;
            min-width: 140px;
            max-width: 140px;
          }
          .item:nth-child(6) {
            width: 15%;
          }
          .item:nth-child(7) {
            width: 1%;
            min-width: 230px;
            max-width: 230px;
          }
          .item:nth-child(8) {
            width: 5%;
          }
          .item:nth-child(9) {
            width: 15%;
          }
          .item:nth-child(10) {
            width: 5%;
          }
          .item:nth-child(11) {
            width: 5.3%;
            min-width: 34px;
            max-width: 54px;
          }
          .long {
            min-width: 172px;
          }
          .del_btn {
            height: 34px;
            width: 34px !important;
            margin: 0 auto;
            cursor: pointer;
            color: #fff;
            background: #dc3545;
            border: none;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            @include font(400, 16px, 20px);
          }
        }
      }
      .content_footer {
        margin-top: 15px;
        display: flex;
        justify-content: end;
        .add_new_button {
          margin-right: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 34px;
          height: 20px;
          color: #fff;
          background: #4e964d;
          border: none;
          border-radius: 4px;
          @include font(400, 16px, 20px);
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
.not_valid {
  border: 1px solid #ff0000 !important;
}
.not_valid:focus {
  box-shadow: 0 0 0 4px rgb(255 0 0 / 25%) !important;
}
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
.input {
  width: calc(100% - 24px);
  min-width: 50%;
  height: 20px;
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @include font(400, 16px, 20px);
}
.input:disabled {
  background-color: #e9ecef !important;
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
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
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
.btns {
  display: flex;
  flex-direction: row;
  gap: 10px;

  .btn {
    cursor: pointer;
    padding: 6px 12px;
    height: 36px;
    border: none;
    @include font(400, 16px);
    border-radius: 5px;
    transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn1 {
    color: #fff;
    background-color: #6c757d;
  }
  .btn1:hover {
    background-color: #5f676d;
    box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
  }
  .btn2 {
    color: #fff;
    background-color: #0d6efd;
  }
  .btn2:hover {
    background-color: #0256d4;
    box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
  }
}
.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease-out;
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
}
</style>
