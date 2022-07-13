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
            <tr class="row" v-for="(row, idx) in new_items" :key="row">
              <td class="item">
                <input type="text" v-model="new_items[idx][0]" class="input" />
              </td>
              <td class="item">
                <input type="text" v-model="new_items[idx][1]" class="input" />
              </td>
              <td class="item">
                <div class="select_input">
                  <selector-vue
                    :options_props="options1"
                    @select="option_select1"
                    :selected_option="row[2]"
                    :idx="idx"
                  />
                  <input
                    type="text"
                    v-model="new_items[idx][3]"
                    class="input"
                  />
                </div>
              </td>
              <td class="item">
                <selector-vue
                  :options_props="options2"
                  @select="option_select2"
                  :selected_option="row[4]"
                  :idx="idx"
                />
              </td>
              <td class="item">
                <input
                  type="number"
                  v-model="new_items[idx][5]"
                  class="input"
                  :disabled="row[4].value == 2"
                />
              </td>
              <td class="item">
                <input
                  type="number"
                  v-model="new_items[idx][6]"
                  class="input"
                />
              </td>
              <td class="item">
                <input
                  type="number"
                  v-model="new_items[idx][7]"
                  class="input"
                />
              </td>
              <td class="item">
                <div class="nds">
                  <input
                    type="checkbox"
                    v-model="new_items[idx][8]"
                    class="checkbox"
                    :id="idx + 'nq'"
                  />
                  <label :for="idx + 'nq'"></label>
                  <div class="hiden" v-if="new_items[idx][8]">
                    <input
                      type="checkbox"
                      v-model="new_items[idx][9]"
                      class="checkbox"
                      :id="idx + 'nw'"
                    />
                    <label :for="idx + 'nw'">включен в цену</label>
                    <input
                      type="checkbox"
                      v-model="new_items[idx][10]"
                      class="checkbox"
                      :id="idx + 'ne'"
                    />
                    <label :for="idx + 'ne'">менеджер может менять %</label>
                    <input
                      type="number"
                      class="input"
                      v-model="new_items[idx][11]"
                      placeholder="% НДС"
                    />
                  </div>
                </div>
              </td>
              <td class="item">
                <button
                  class="del_btn"
                  v-show="new_items.length > 1"
                  @click="del_item(idx)"
                >
                  X
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="add_new_button" @click="push_new_item()">+</button>
      </div>
      <div class="footer">
        <div class="btns">
          <button class="btn btn1">Назад</button>
          <button class="btn btn2" @click="save()">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue";
export default {
  components: {
    SelectorVue,
  },
  data() {
    return {
      title: [
        "Артикул",
        "Название",
        "№ партии",
        "Тип",
        "Кол-во",
        "Себестоимость",
        "Цена",
        "Ндс",
      ],
      new_items: [],
      options1: [{ name: "Новая", value: 1 }],
      options2: [
        { name: "Товар", value: 1 },
        { name: "Услуга", value: 2 },
      ],
    };
  },
  mounted() {
    this.push_new_item();
  },
  methods: {
    push_new_item() {
      this.new_items.push([
        "",
        "",
        { name: "Новая", value: 1 },
        "",
        { name: "Товар", value: 1 },
        null,
        null,
        null,
        false,
        false,
        false,
        null,
      ]);
    },
    del_item(idx) {
      this.new_items.splice(idx, 1);
    },
    save() {
      this.new_items.forEach((value, index) => {
        value.forEach((val, idx) => {
          this.new_items[index][idx] = `${val}`;
          if (typeof val == "object" && val != null) {
            this.new_items[index][idx] = val.name;
          }
          if (val === true) {
            this.new_items[index][idx] = "Да";
          }
          if (val === false) {
            this.new_items[index][idx] = "Нет";
          }
          if (val === null) {
            this.new_items[index][idx] = "";
          }
        });
      });
      this.new_items.forEach((val) => {
        this.$store.commit("add_new_data", val);
      });
      this.$router.push("/");
    },
    option_select1(option, idx) {
      this.new_items[idx][2] = option;
    },
    option_select2(option, idx) {
      this.new_items[idx][4] = option;
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
    max-width: 1140px;
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
    }
    .content {
      @include font(400, 16px);
      padding: 50px;
      .table {
        border: 1px solid #c9c9c9;
        border-collapse: collapse;
        width: 100%;
        .row:first-child {
          .item {
            padding-bottom: 20px;
          }
        }
        .row {
          .item {
            padding: 10px;
            border: 1px solid #c9c9c9;
            text-align: left;
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
            width: 9%;
          }
          .item:nth-child(2) {
            width: 7%;
            // min-width: 224px;
            // max-width: 224px;
          }
          .item:nth-child(3) {
            width: 20%;
          }
          .item:nth-child(4) {
            width: 10%;
          }
          .item:nth-child(5) {
            width: 10%;
          }
          .item:nth-child(6) {
            width: 5%;
          }
          .item:nth-child(7) {
            width: 5%;
          }
          .item:nth-child(8) {
            width: 5%;
          }
          .item:nth-child(9) {
            width: 5.3%;
            min-width: 54px;
            max-width: 54px;
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
      .add_new_button {
        cursor: pointer;
        margin-top: 8px;
        // position: absolute;
        // right: 13.5%;
        margin-left: 981px;
        width: 34px;
        height: 34px;
        color: #fff;
        background: #4e964d;
        border: none;
        border-radius: 4px;
        @include font(400, 16px, 20px);
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      margin-top: 40px;
    }
  }
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
