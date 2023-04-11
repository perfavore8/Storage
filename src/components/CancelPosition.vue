<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close_modal()" />
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
                    v-model="row.fields.article"
                    class="input"
                    disabled
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="row.fields.name"
                    class="input"
                    disabled
                  />
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="[]"
                      @select="option_select1"
                      :selected_option="{ name: row.fields?.batch, value: -1 }"
                      :disabled="true"
                    />
                  </div>
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="calcWhsOptions[row.id]"
                      @select="option_select"
                      :selected_option="row.fields.whToCancel"
                      :idx="idx"
                    />
                  </div>
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="row.fields.countToCancel"
                    :max="row.fields?.whToCancel?.count"
                    class="input"
                    :class="{
                      not_valid: row.fields?.countToCancel == '' && try_accept,
                    }"
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="row.fields.rison"
                    class="input"
                    :class="{
                      not_valid: row.fields?.rison == '' && try_accept,
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
    currentItems: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: [
        "Артикул",
        "Название",
        "№ партии",
        "Склад",
        "Кол-во",
        "Причина списания",
      ],
      items_to_cancel: [],
      whs_options: [],
      try_accept: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("get_all_fields");
    nextTick(() => {
      this.items_to_cancel = [...this.currentItems];
      this.items_to_cancel.map((val) => {
        val.fields.countToCancel = 0;
        val.fields.rison = "";
        val.fields.whs_options = [];
        val.fields.whToCancel = { name: "Не выбрано", value: -1 };
      });
      this.fillWhs();
    });
  },
  computed: {
    fields() {
      return this.$store.state.fields.all_fields;
    },
    countToCancel() {
      const list = [];
      this.items_to_cancel.forEach((val) =>
        list.push(val.fields.countToCancel)
      );
      return list;
    },
    calcWhsOptions() {
      const obj = {};
      this.items_to_cancel.forEach((item) => {
        const whs_options = [];
        if (item.fields.whs_options)
          item.fields.whs_options.forEach((wh) => {
            const a = {};
            if (item.fields[wh.value]) {
              const count = this.allow_add_reserve
                ? item.fields[wh.value].count
                : item.fields[wh.value].count - item.fields[wh.value].reserve;
              a.name = wh.name + " | " + count;
              a.value = wh.value;
            }
            whs_options.push(a);
          });
        obj[item.id] = whs_options;
      });
      return obj;
    },
    allow_add_reserve() {
      return this.$store.state.account.account.config.allow_add_reserve;
    },
  },
  watch: {
    countToCancel: {
      handler: function () {
        this.items_to_cancel.map((val) => {
          if (val.fields.whToCancel) {
            let count = val.fields?.[val.fields.whToCancel?.value]?.count;
            count == undefined ? (count = 0) : null;
            if (val.fields.countToCancel > count)
              val.fields.countToCancel = count;
            if (val.fields.countToCancel < 0) val.fields.countToCancel = 0;
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    fillWhs() {
      this.fields
        .filter((val) => val.type == 13 && val.code != "whs")
        .forEach((val) =>
          this.whs_options.push({ name: val.name, value: val.code })
        );
      this.items_to_cancel.map((item) => {
        item.fields.whs_options = this.searchCatArr(
          this.whs_options,
          this.searchParentsCat(item.fields.category)
        );
      });
    },
    searchCatArr(arr, categories) {
      const res = [];
      arr.forEach((val) => {
        if (
          categories.includes(
            this.fields.find((value) => val.value == value.code).category_id
          )
        )
          res.push(val);
      });
      return res;
    },
    searchParentsCat(cat) {
      let res = [];
      this.$store.state.categories.fields_properties.forEach((val) => {
        if (val.id == cat) res = [...val.levels];
      });
      const zeroIdx = res.indexOf(0);
      res = res.slice(0, zeroIdx);
      return res;
    },
    async save() {
      this.try_accept = true;
      let accept = true;
      this.items_to_cancel.forEach((val) => {
        accept =
          accept &&
          val.fields.countToCancel != "" &&
          val.fields.rison != "" &&
          val.fields.countToCancel != undefined &&
          val.fields.rison != undefined;
      });
      if (accept) {
        const params = {
          products: [],
        };
        this.items_to_cancel.forEach((val) => {
          const item = {
            id: val.id,
            fields: val.fields,
            comment: val.fields.rison,
          };
          item.fields[val.fields.whToCancel.value].count =
            item.fields[val.fields.whToCancel.value].count -
            item.fields.countToCancel;
          // item.fields[val.fields.whToCancel.value].reserve +=
          //   item.fields.countToCancel;
          delete item.fields.countToCancel;
          delete item.fields.rison;
          delete item.fields.whs_options;
          delete item.fields.whToCancel;
          params.products.push(item);
        });
        await this.$store.dispatch("update_product", params);
        this.close_modal();
      }
    },
    close_modal() {
      this.items_to_cancel = [];
      this.try_accept = false;
      this.$emit("close");
      this.$store.commit("open_close_cancel_position", false);
    },
    option_select(option, idx) {
      this.items_to_cancel[idx].fields.whToCancel = option;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
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
              width: 100%;
              :deep(.options) {
                text-align: left;
              }
            }
          }
          .item:nth-child(1) {
            width: 20%;
          }
          .item:nth-child(2) {
            width: 30%;
          }
          .item:nth-child(3) {
            width: 1%;
            min-width: 150px;
            max-width: 150px;
          }
          .item:nth-child(4) {
            width: 30%;
          }
          .item:nth-child(5) {
            width: 10%;
          }
          .item:nth-child(6) {
            width: 35%;
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
.btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
