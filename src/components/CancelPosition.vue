<template>
  <div class="wrapper">
    <div class="container">
      <div class="header"><label>Списание товаров</label></div>
      <div class="content">
        <table class="table">
          <thead>
            <tr class="row title">
              <td class="item" v-for="tit in title" :key="tit">{{ tit }}</td>
            </tr>
          </thead>
          <tbody>
            <transition-group name="row">
              <tr class="row" v-for="(row, idx) in items_to_cancel" :key="row">
                <td class="item">
                  <input
                    type="text"
                    v-model="items_to_cancel[idx][0]"
                    class="input"
                    disabled
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="items_to_cancel[idx][1]"
                    class="input"
                    disabled
                  />
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="options1[idx]"
                      @select="option_select1"
                      :selected_option="items_to_cancel[idx][2]"
                      :idx="idx"
                      :disabled="true"
                    />
                  </div>
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="items_to_cancel[idx][3]"
                    class="input"
                    :class="{
                      not_valid: items_to_cancel[idx][3] == '' && try_accept,
                    }"
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="items_to_cancel[idx][4]"
                    class="input"
                    :class="{
                      not_valid: items_to_cancel[idx][4] == '' && try_accept,
                    }"
                  />
                </td>
              </tr>
            </transition-group>
          </tbody>
        </table>
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
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  props: {
    rows: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    idxes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: ["Артикул", "Название", "№ партии", "Кол-во", "Причина списания"],
      items_to_cancel: [],
      options1: [],
      try_accept: false,
      max_count_to_cancel: [],
    };
  },
  watch: {
    items_to_cancel: {
      handler: function () {
        this.items_to_cancel.forEach((val, idx) => {
          if (val[3] < 0) this.items_to_cancel[idx][3] = 0;
          if (val[3] > this.max_count_to_cancel[idx])
            this.items_to_cancel[idx][3] = this.max_count_to_cancel[idx];
        });
      },
      deep: true,
    },
  },
  mounted() {
    nextTick(() => {
      this.push_current_item();

      this.items_to_cancel.forEach((val) => {
        this.max_count_to_cancel.push(val[3]);
      });
    });
  },
  methods: {
    push_current_item() {
      this.rows.forEach((val, idx) => {
        this.items_to_cancel.push([]);
        val.forEach((value) => {
          this.items_to_cancel[idx].push(value);
        });
        this.options1.push([
          {
            name: this.items_to_cancel[idx][2],
            value: 1,
          },
        ]);
        this.items_to_cancel[idx][2] = this.options1[idx][0];
      });
    },
    save() {
      this.try_accept = true;
      let accept = true;
      this.items_to_cancel.forEach((val) => {
        accept =
          accept &&
          val[3] != "" &&
          val[4] != "" &&
          val[3] != undefined &&
          val[4] != undefined;
      });
      if (accept) {
        this.items_to_cancel.forEach((val, idx) => {
          const payload = {
            name: "На складе",
            idx: this.idxes[idx],
            count: val[3],
          };
          this.$store.commit("cancel_item_in_data", payload);
        });
        this.close_modal();
      }
    },
    close_modal() {
      this.items_to_cancel = [];
      this.try_accept = false;
      this.$store.commit("open_close_cancel_position", false);
    },
    option_select1(option, idx) {
      this.items_to_cancel[idx][2] = option;
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
      padding: 10px 50px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
      .table {
        border: 1px solid #c9c9c9;
        border-collapse: collapse;
        width: 100%;
        .title {
          @include font(500, 16px);
          background-color: rgba(0, 0, 0, 0.15) !important;
          .item {
            padding-bottom: 20px !important;
          }
        }
        .row:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .row {
          .item {
            padding: 10px;
            border: 1px solid #c9c9c9;
            border-top: 2px solid #c9c9c9;
            text-align: left;
            .v-select {
              width: calc(100% - 26px) !important;
            }
          }
          .item:nth-child(1) {
            width: 20%;
          }
          .item:nth-child(2) {
            width: 20%;
          }
          .item:nth-child(3) {
            width: 7%;
            // min-width: 224px;
            // max-width: 224px;
          }
          .item:nth-child(4) {
            width: 10%;
          }
          .item:nth-child(5) {
            width: 30%;
          }
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
