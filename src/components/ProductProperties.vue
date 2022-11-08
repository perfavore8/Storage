<template>
  <div class="wrapper">
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Свойства товаров</label>
            <btns-save-close @close="close_product_properties" @save="save">
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div>
            <button
              v-for="(cat, idx) in selected_fields_properties"
              :key="cat.name"
              @click="prev_cat(idx)"
            >
              {{ cat.name }}
            </button>
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
              <th class="item">Поле</th>
              <th class="item">Тип</th>
              <th class="item">Видимость</th>
              <th class="item">Редактирование</th>
              <th class="item"></th>
            </tr>
            <tr
              class="row"
              v-for="(row, idx) in copy_fields"
              :key="row.id"
              v-show="selected_fields_properties.at(-1)?.idxes.includes(row.id)"
            >
              <td class="item">{{ row.field }}</td>
              <td class="item selectors">
                <SelectorVue
                  :options_props="types"
                  @select="option_select_type"
                  :selected_option="copy_fields[idx].type"
                  :disabled="copy_fields[idx].disable_change_type"
                  :idx="idx"
                />
                <div
                  class="type_selector_options"
                  v-if="
                    copy_fields[idx].type.value == 5 ||
                    copy_fields[idx].type.value == 6
                  "
                >
                  <div
                    class="type_selector_option"
                    v-for="(option, i) in copy_fields[idx].selector_options"
                    :key="i"
                  >
                    <input
                      type="text"
                      class="input"
                      v-model="copy_fields[idx].selector_options[i].name"
                    />
                    <button
                      class="del_button"
                      @click="remove_selector_option(idx, i)"
                      v-if="
                        copy_fields[idx].type.value == 6
                          ? i == 0
                            ? false
                            : true
                          : copy_fields[idx].selector_options.length > 1
                          ? true
                          : false
                      "
                    >
                      x
                    </button>
                  </div>
                  <button @click="add_selector_option(idx)" class="add_button">
                    +
                  </button>
                </div>
              </td>
              <td class="box item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'b'"
                  v-model="copy_fields[idx].visibility"
                />
                <label :for="idx + 'b'"></label>
              </td>
              <td class="box item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'c'"
                  v-model="copy_fields[idx].editing"
                />
                <label :for="idx + 'c'"></label>
              </td>
              <td class="item">
                <button
                  class="del_btn"
                  v-show="copy_fields[idx].delete"
                  @click="delete_field(idx)"
                >
                  X
                </button>
              </td>
            </tr>
            <tr
              class="row"
              v-for="(row, idx) in new_fields"
              :key="row.id"
              v-show="selected_fields_properties.at(-1)?.idxes.includes(row.id)"
            >
              <td class="item">
                <input
                  type="text"
                  class="input new_item_input"
                  v-model="new_fields[idx].field"
                />
              </td>
              <td class="item selectors">
                <SelectorVue
                  :options_props="types"
                  @select="option_select_new_field_type"
                  :selected_option="new_fields[idx].type"
                  :idx="idx"
                />
                <div
                  class="type_selector_options"
                  v-if="
                    new_fields[idx].type.value == 5 ||
                    new_fields[idx].type.value == 6
                  "
                >
                  <div
                    class="type_selector_option"
                    v-for="(option, i) in new_fields[idx].selector_options"
                    :key="i"
                  >
                    <input
                      type="text"
                      class="input"
                      v-model="new_fields[idx].selector_options[i].name"
                    />
                    <button
                      class="del_button"
                      @click="remove_new_fields_selector_option(idx, i)"
                      v-if="
                        new_fields[idx].type.value == 6
                          ? i == 0
                            ? false
                            : true
                          : new_fields[idx].selector_options.length > 1
                          ? true
                          : false
                      "
                    >
                      x
                    </button>
                  </div>
                  <button
                    @click="add_new_fields_selector_option(idx)"
                    class="add_button"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="box item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'nb'"
                  v-model="new_fields[idx].visibility"
                />
                <label :for="idx + 'nb'"></label>
              </td>
              <td class="box item">
                <input
                  type="checkbox"
                  class="checkbox"
                  :id="idx + 'n'"
                  v-model="new_fields[idx].editing"
                />
                <label :for="idx + 'n'"></label>
              </td>
              <td class="item">
                <button
                  class="del_btn"
                  v-show="new_fields[idx].delete"
                  @click="delete_new_field(idx)"
                >
                  X
                </button>
              </td>
            </tr>
          </table>
          <button @click="add_new_field()" class="add_new_button">+</button>
        </div>
        <div class="footer">
          <btns-save-close @close="close_product_properties" @save="save">
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
import { mapGetters } from "vuex";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  data() {
    return {
      copy_fields: [],
      new_fields: [],
      new_fields_cat: [],
      copy_items_from_storage: [],
      idx_to_delete: [],
      copy_fields_properties: [],
      selected_fields_properties: [],
      data_fields_properties: {
        items: null,
        selected: { name: "", value: -1 },
      },
    };
  },
  mounted() {
    this.copy_fields = [];
    this.idx_to_delete = [];
    this.new_fields = [];
    this.new_fields_cat = [];

    this.selected_fields_properties = [];
    this.copy_fields_properties = JSON.parse(
      JSON.stringify(this.fields_properties)
    );
    this.option_select_fields_properties({
      value: this.copy_fields_properties.filter(
        (val) => val.parent_id === 0
      )[0],
    });

    this.copy_fields = this.fields.map((b, idx) =>
      Object.assign({ index: idx }, b)
    );
    this.copy_items_from_storage = [];
    this.copy_items_from_storage = this.items_from_storage.map((b, idx) =>
      Object.assign({ index: idx }, b)
    );
  },
  computed: {
    ...mapGetters([
      "types",
      "fields_properties",
      "fields",
      "items_from_storage",
    ]),
  },
  methods: {
    save() {
      this.copy_fields.forEach((value) => {
        let a = 1;
        value.selector_options.forEach((val) => {
          Object.assign(val, { value: a });
          a += 1;
        });
      });
      this.new_fields.forEach((val) => this.copy_fields.push(val));
      this.$store.commit(
        "update_fields_properties",
        this.copy_fields_properties
      );
      this.$store.commit("update_fields", this.copy_fields);
      this.$store.commit(
        "update_items_from_storage",
        this.copy_items_from_storage
      );
      this.$store.commit("delete_data_idx", this.idx_to_delete);
      this.new_fields_push();
      const arr = [];
      this.fields.forEach((val) => arr.push(val.field));
      arr.unshift("");
      arr.push("");
      this.$store.commit("update_params", arr);
      this.new_fields = [];
      this.close_product_properties();
    },
    new_fields_push() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      const hour = today.getHours();
      const min = today.getMinutes();
      const date = yyyy + "-" + mm + "-" + dd;
      const datetime = yyyy + "-" + mm + "-" + dd + "T" + hour + ":" + min;
      this.new_fields.forEach((val) => {
        let new_field = "";
        if (val.type.value == 1 || val.type.value == 2) new_field = "0";
        if (val.type.value == 6) new_field = "Не выбрано";
        if (val.type.value == 7) new_field = date;
        if (val.type.value == 8) new_field = datetime;
        if (val.type.value == 9) new_field = "Нет";
        this.$store.commit("update_all_data", new_field);
      });
    },
    add_new_field() {
      const id = this.copy_fields.length + 1 + this.new_fields.length;
      this.new_fields.push({
        id: id,
        field: "",
        type: { name: "Строка", value: 3 },
        selector_options: [{ name: "Не выбрано" }],
        disable_change_type: false,
        visibility: false,
        edit: false,
        editing: false,
        delete: true,
      });
      const item = this.selected_fields_properties.at(-1);
      this.copy_fields_properties.map((val) =>
        val.id === item.id ? val.idxes.push(id) : null
      );
      item.idxes.push(id);
    },
    prev_cat(idx) {
      this.selected_fields_properties.splice(idx + 1);
      this.feel_data_fields_properties(
        this.selected_fields_properties.at(-1).id
      );
    },
    feel_data_fields_properties(id) {
      this.data_fields_properties.items = this.preparing_fields_properties(id);
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
    delete_new_field(idx) {
      const item = this.selected_fields_properties.at(-1);
      const start = item.idxes.length - this.new_fields.length + idx;
      this.new_fields.splice(idx, 1);
      this.copy_fields_properties.map((val) =>
        val.id === item.id ? val.idxes.splice(start, 1) : null
      );
      item.idxes.splice(start, 1);
    },
    delete_field(idx) {
      this.copy_fields.splice(idx, 1);
      this.idx_to_delete.push(idx);
    },
    option_select_type(option, idx) {
      this.copy_fields[idx].type = option;
    },
    option_select_new_field_type(option, idx) {
      this.new_fields[idx].type = option;
    },
    add_selector_option(idx) {
      this.copy_fields[idx].selector_options.push({
        name: "",
      });
    },
    remove_selector_option(idx, i) {
      this.copy_fields[idx].selector_options.splice(i, 1);
    },
    add_new_fields_selector_option(idx) {
      this.new_fields[idx].selector_options.push({
        name: "",
      });
    },
    remove_new_fields_selector_option(idx, i) {
      this.new_fields[idx].selector_options.splice(i, 1);
    },
    close_product_properties() {
      this.$store.commit("open_close_show_product_properties", false);
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
  .bgc {
    width: 80%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      width: 80%;
      margin: 30px auto;
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
        @include font(400, 16px);
        h6 {
          @include font(500, 16px);
        }
        .small {
          @include font(400, 14px);
        }
        .rows {
          border: 1px solid #c9c9c9;
          border-collapse: collapse;
          .row:first-child {
            .item {
              padding-bottom: 20px;
            }
          }
          .row {
            .item {
              padding: 10px;
              border: 1px solid #c9c9c9;
              text-align: center;
            }
            .item:nth-child(1) {
              width: 30%;
              text-align: left;
            }
            .item:nth-child(2) {
              width: 0%;
              min-width: 224px;
              max-width: 224px;
            }
            .item:nth-child(3) {
              width: 12%;
            }
            .item:nth-child(4) {
              width: 15%;
            }
            .item:nth-child(5) {
              width: 0.1%;
              max-width: 54px;
            }
            .item:last-child {
              border-right: none;
              min-width: 34px;
            }
            .new_item_input {
              width: calc(100% - 26px) !important;
            }
            .del_btn {
              height: 34px;
              width: 34px !important;
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
            .selectors {
              .v-select {
                width: calc(100% - 26px) !important;
                margin-right: 24px;
                :deep(.title) {
                  width: 100% !important;
                }
                :deep(.options) {
                  width: calc(100% + 24px) !important;
                  text-align: left;
                  p {
                    width: calc(100% - 24px) !important;
                  }
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
                    width: calc(100% - 56px);
                    height: 10px !important;
                    @include font(400, 14px, 18px);
                  }
                  .del_button {
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                    color: #fff;
                    background: #dc3545;
                    border: none;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    @include font(400, 16px, 10px);
                  }
                }
                .add_button {
                  cursor: pointer;
                  margin-top: 8px;
                  width: 40px;
                  height: 20px;
                  color: #fff;
                  background: #4e964d;
                  border: none;
                  border-radius: 4px;
                }
              }
            }
          }
        }
        .add_new_button {
          cursor: pointer;
          margin-top: 8px;
          position: absolute;
          right: 18.5%;
          width: 34px;
          height: 34px;
          color: #fff;
          background: #4e964d;
          border: none;
          border-radius: 4px;
        }
        .steps {
          display: flex;
          flex-direction: column;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          margin-top: 30px;
          padding: 10px;
          > div {
            .label_input {
              display: flex;
              flex-direction: row;
              padding: 10px;
              label {
                width: 40%;
              }
              .v-select {
                width: calc(50% - 26px);
                margin-right: 24px;
                :deep(.title) {
                  width: 100%;
                }
                :deep(.options) {
                  width: calc(100% + 24px);
                  text-align: left;
                  p {
                    width: calc(100% - 24px);
                  }
                }
              }
            }
          }
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
.input {
  height: 20px;
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
</style>
