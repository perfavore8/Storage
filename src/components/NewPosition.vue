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
                    :options_props="options_type"
                    @select="
                      (option, idx) => option_select(option, idx, 'type')
                    "
                    :selected_option="row.type"
                    :idx="idx"
                    :disabled="!row.new"
                  />
                </td>
                <td
                  class="item"
                  :ref="
                    (el) =>
                      selected_field_autocomplete.idx == idx &&
                      selected_field_autocomplete.field == 'article'
                        ? (targetAutocomplete = el)
                        : null
                  "
                >
                  <input
                    type="text"
                    v-model="row.article"
                    @focusin="
                      set_selected_field_autocomplete(
                        'article',
                        row.article,
                        idx
                      )
                    "
                    @focusout="set_selected_field_autocomplete('', '', idx)"
                    @input="
                      set_selected_field_autocomplete(
                        'article',
                        row.article,
                        idx
                      )
                    "
                    class="input"
                    :class="{
                      not_valid: row.article == '' && try_accept,
                    }"
                    :disabled="!row.new"
                  />
                </td>
                <td
                  class="item"
                  :ref="
                    (el) =>
                      selected_field_autocomplete.idx == idx &&
                      selected_field_autocomplete.field == 'name'
                        ? (targetAutocomplete = el)
                        : null
                  "
                >
                  <input
                    type="text"
                    v-model="row.name"
                    @focusin="
                      set_selected_field_autocomplete('name', row.name, idx)
                    "
                    @focusout="set_selected_field_autocomplete('', '', idx)"
                    @input="
                      set_selected_field_autocomplete('name', row.name, idx)
                    "
                    class="input"
                    :class="{
                      not_valid: row.name == '' && try_accept,
                    }"
                    :disabled="!row.new"
                  />
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="batch_category_options"
                      @select="
                        (option, idx) =>
                          option_select(option, idx, 'batch_category')
                      "
                      :selected_option="row.batch_category"
                      :idx="idx"
                      :disabled="!row.new || row.type.value == 2"
                    />
                    <input
                      type="text"
                      v-model="row.batch"
                      class="input"
                      :class="{
                        not_valid:
                          row.batch == '' && try_accept && row.type.value != 2,
                      }"
                      :disabled="!row.new || row.type.value == 2"
                    />
                  </div>
                </td>
                <td class="item">
                  <selector-vue
                    :options_props="wh_options"
                    @select="(option, idx) => option_select(option, idx, 'wh')"
                    :selected_option="row.wh"
                    :idx="idx"
                    :disabled="row.type.value == 2"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="row.count"
                    class="input"
                    :disabled="row.type.value == 2"
                    min="0"
                    :class="{
                      not_valid:
                        (row.count == '' || row.count == undefined) &&
                        try_accept &&
                        row.type != 2,
                    }"
                  />
                </td>
                <td class="item">
                  <selector-vue
                    :options_props="units_options"
                    @select="
                      (option, idx) => option_select(option, idx, 'units')
                    "
                    :selected_option="row.units"
                    :idx="idx"
                    :disabled="row.type.value == 2"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="row.cost_price"
                    class="input"
                    min="0"
                    :class="{
                      not_valid: row.cost_price == '' && try_accept,
                    }"
                    :disabled="!row.new"
                  />
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="row.price.cost"
                    class="input"
                    min="0"
                    :class="{
                      not_valid: row.price.cost == '' && try_accept,
                    }"
                  />
                </td>
                <td
                  class="item"
                  :class="{
                    long: row.price.is_nds,
                  }"
                >
                  <div class="nds">
                    <div v-if="!row.price.is_nds">
                      <input
                        type="checkbox"
                        v-model="row.price.is_nds"
                        class="checkbox"
                        :id="idx + 'nq'"
                      />
                      <label :for="idx + 'nq'"></label>
                    </div>
                    <div class="hiden" v-else>
                      <div class="checkboxes">
                        <input
                          type="checkbox"
                          v-model="row.price.is_nds"
                          class="checkbox"
                          :id="idx + 'nq'"
                        />
                        <label :for="idx + 'nq'">НДС</label>
                        <input
                          type="checkbox"
                          v-model="row.price.is_price_include_nds"
                          class="checkbox"
                          :id="idx + 'nw'"
                        />
                        <label :for="idx + 'nw'">включен в цену</label>
                        <input
                          type="checkbox"
                          v-model="row.price.is_manager_can_change_nds"
                          class="checkbox"
                          :id="idx + 'ne'"
                        />
                        <label :for="idx + 'ne'">можно менять %</label>
                      </div>
                      <input
                        type="number"
                        class="input"
                        v-model="row.price.nds"
                        placeholder="% НДС"
                        min="0"
                      />
                    </div>
                  </div>
                </td>
                <td class="item">
                  <selector-vue
                    :options_props="categories_options"
                    @select="
                      (option, idx) => option_select(option, idx, 'category')
                    "
                    :selected_option="row.category"
                    :idx="idx"
                  />
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
      <teleport
        :to="targetAutocomplete"
        v-if="selected_field_autocomplete_list.length"
      >
        <ul class="autocomplete_teleport">
          <li
            v-for="item in selected_field_autocomplete_list"
            :key="item.id"
            @click="
              select_current_product(item.fields.name, item.fields.article)
            "
          >
            {{ item.fields.name }}
          </li>
        </ul>
      </teleport>
      <div class="footer">
        <btns-save-close @close="close" @save="save" />
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
  props: {
    currentItems: {
      type: Array,
      required: false,
      default() {
        return [];
      },
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
        "Категория",
      ],
      new_items: [],
      options_type: [
        { name: "Товар", value: 1 },
        { name: "Услуга", value: 2 },
      ],
      batch_category_options: [],
      wh_options: [],
      units_options: [],
      categories_options: [],
      selected_field_autocomplete: {
        idx: null,
        field: "",
        value: "",
      },
      selected_field_autocomplete_list: [],
      timer: 0,
      targetAutocomplete: null,
    };
  },
  computed: {
    fields() {
      return this.$store.state.fields.all_fields;
    },
  },
  async mounted() {
    await this.$store.dispatch("get_fields_properties");
    await this.$store.dispatch("get_all_fields");
    this.get_categories_options();
    this.get_options("batch", this.batch_category_options, "Новая");
    this.get_options("wh", this.wh_options, "Не выбрано");
    this.get_options("units", this.units_options, "Не выбрано");
    this.currentItems.length ? this.pushCurrentItems() : this.push_new_item();
  },
  watch: {
    selected_field_autocomplete: {
      async handler() {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          const complete = this.selected_field_autocomplete;
          this.selected_field_autocomplete_list = [];
          if (
            complete.field !== "" &&
            complete.value.length > 2 &&
            complete.value.split("").at(-1) != " " &&
            complete.value.split("")[0] != " "
          ) {
            const list = await this.$store.dispatch(
              "autocomplete_" + complete.field,
              complete.value
            );
            if (list != undefined)
              this.selected_field_autocomplete_list = [...list];
          }
        }, 500);
      },
      deep: true,
    },
  },
  methods: {
    push_new_item() {
      const item = {
        new: true,
        type: { name: "Товар", value: 1 },
        article: "",
        name: "",
        batch_category: { name: "Новая", value: -1 },
        batch: "",
        wh: { name: "Не выбрано", value: -1 },
        count: 0,
        units: { name: "Не выбрано", value: -1 },
        cost_price: 0,
        category: { name: "Не выбрано", value: -1 },
        price: {
          cost: 0,
          currency: "RUB",
          is_manager_can_change_nds: false,
          is_nds: false,
          is_price_include_nds: false,
          nds: 0,
        },
      };
      this.new_items.push(item);
    },
    pushCurrentItems() {
      this.currentItems.forEach((val) => {
        const item = {
          new: false,
          type: { name: "Товар", value: 1 },
          article: val.fields.article,
          name: val.fields.name,
          batch_category: { name: "", value: -1 },
          batch: val.fields.batch,
          wh: { name: "Не выбрано", value: -1 },
          count: 0,
          units: { name: "Не выбрано", value: -1 },
          cost_price: val.fields.cost_price,
          category: {
            ...this.categories_options.filter(
              (value) => value.value == val.fields.category
            )[0],
          },
          price: {
            cost: 0,
            currency: "RUB",
            is_manager_can_change_nds: false,
            is_nds: false,
            is_price_include_nds: false,
            nds: 0,
          },
        };
        this.new_items.push(item);
      });
    },
    set_selected_field_autocomplete(field, value, idx) {
      if (field == "") this.targetAutocomplete = null;
      this.selected_field_autocomplete = {
        field: field,
        value: value,
        idx: idx,
      };
    },
    select_current_product(name, article) {
      this.new_items[this.selected_field_autocomplete.idx].name = name;
      this.new_items[this.selected_field_autocomplete.idx].article = article;
      this.set_selected_field_autocomplete("", "", null);
    },
    get_options(cat, catArr, name) {
      catArr.push({ name: name, value: -1 });
      this.search_type_options(this.fields, cat).forEach((val, idx) =>
        catArr.push({ name: val, value: idx })
      );
    },
    get_categories_options() {
      this.$store.state.categories.fields_properties.forEach((val) => {
        let spaces = "";
        for (let i = 1; i < val.level; i++) spaces = spaces + "    ";
        this.categories_options.push({
          name: spaces + val.name,
          value: val.id,
        });
      });
    },
    search_type_options(arr, code) {
      let res = [];
      arr.forEach((val) => {
        if (val.code == code && val.data) res = val.data;
      });
      return res;
    },
    option_select(option, idx, cat) {
      this.new_items[idx][cat] = { ...option };
    },
    close() {
      this.$emit("close");
      this.$store.commit("open_close_new_position", false);
    },
    save() {
      const params = { products: [] };
      this.new_items.forEach((val) => {
        const item = {
          is_service: val.type.value - 1,
          fields: {
            name: val.name,
            article: val.article,
            batch: val.batch,
            // wh: { count: 0, reserve: 0 }, !!!не понятно
            // count: val.count, !!!не работают
            units: val.units.name,
            // cost_price: val.cost_price, !!!не работают
            price: val.price,
            category: val.category.value,
          },
        };
        params.products.push(item);
      });
      this.$store.dispatch("add_product", params);
      this.close();
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
    width: calc(100% - 60px);
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
            position: relative;
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
              // width: calc(100% - 26px) !important;
              width: 100%;
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
            max-width: 140px;
            min-width: 140px;
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
            width: 15%;
            min-width: 140px;
          }
          .item:nth-child(12) {
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
.autocomplete_teleport {
  position: absolute;
  top: 50px;
  left: 0;
  border-radius: 4px;
  list-style: none;
  max-height: 400px;
  min-height: 40px;
  // width: 300%;
  overflow-y: scroll;
  scrollbar-width: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  scrollbar-width: 0;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 4px;
  z-index: 5;

  box-sizing: border-box;
  li {
    // margin: 0;
    box-sizing: border-box;
    cursor: pointer;
    height: 40px;
    width: 100%;
    padding: 6px 12px;
    transition: background-color 0.15s ease-out;
    white-space: pre;
  }
  li:hover {
    background-color: rgb(13 110 253 / 25%);
  }
  li:last-child {
    border-radius: 0 0 4px 4px;
  }
  li:first-child {
    border-radius: 4px 4px 0 0;
  }
  li:active {
    background-color: #3261a7;
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
