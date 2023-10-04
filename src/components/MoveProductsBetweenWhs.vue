<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close_modal()" />
    <div class="container">
      <div class="header">
        <label>{{ $t("ostatki.per") }}</label>
      </div>
      <div class="content">
        <table class="table">
          <thead>
            <tr class="row title">
              <td class="item" v-for="tit in title" :key="tit">{{ tit }}</td>
            </tr>
          </thead>
          <tbody>
            <transition-group name="row">
              <tr class="row" v-for="(row, idx) in itemsForMove" :key="row">
                <td class="item">
                  <AppInputSelect
                    v-if="row.isNew"
                    :list="autocomplete.list"
                    :countLettersReq="3"
                    @changeInputValue="
                      (val) => autocomplete.getList('article', val)
                    "
                    @select="(item) => autocompleteSelect(item, idx)"
                  />
                  <input
                    v-else
                    type="text"
                    v-model="row.fields.article"
                    class="input"
                    disabled
                  />
                </td>
                <td class="item">
                  <AppInputSelect
                    v-if="row.isNew"
                    :list="autocomplete.list"
                    :countLettersReq="3"
                    @changeInputValue="
                      (val) => autocomplete.getList('name', val)
                    "
                    @select="(item) => autocompleteSelect(item, idx)"
                  />
                  <input
                    v-else
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
                      @select="(...el) => option_select('cancel', ...el)"
                      :selected_option="row.fields?.whToCancel"
                      :class="{
                        not_valid_selector:
                          row.fields.whToCancel?.value == -1 && try_accept,
                      }"
                      :disabled="row.isNew"
                      :idx="idx"
                    />
                  </div>
                </td>
                <td class="item">
                  <div class="select_input">
                    <selector-vue
                      :options_props="calcWhsOptions[row.id]"
                      @select="(...el) => option_select('move', ...el)"
                      :selected_option="row.fields?.whToMove"
                      :class="{
                        not_valid_selector:
                          (row.fields.whToCancel?.value ==
                            row.fields.whToMove?.value ||
                            row.fields.whToMove?.value == -1) &&
                          try_accept,
                      }"
                      :disabled="row.isNew"
                      :idx="idx"
                    />
                  </div>
                </td>
                <td class="item">
                  <input
                    type="number"
                    v-model="row.fields.countToMove"
                    :max="row.fields?.countToMove?.count"
                    class="input"
                    :disabled="row.isNew"
                    :class="{
                      not_valid: row.fields?.countToMove == '' && try_accept,
                    }"
                  />
                </td>
                <td class="item">
                  <input
                    type="text"
                    v-model="row.fields.reason"
                    class="input"
                    :disabled="row.isNew"
                    :class="{
                      not_valid: row.fields?.reason == '' && try_accept,
                    }"
                  />
                </td>
                <td class="item">
                  <button class="del_btn" @click="delItem(idx)"></button>
                </td>
              </tr>
            </transition-group>
          </tbody>
        </table>
        <div class="w-full my-2 flex justify-end items-center">
          <button class="add_new_button" @click="pushNewItem()">+</button>
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
import AppInputSelect from "@/components/AppInputSelect.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { nextTick } from "@vue/runtime-core";
import store from "@/store";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  components: {
    SelectorVue,
    AppInputSelect,
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
  setup() {
    return { t };
  },
  data() {
    return {
      title: [
        t("ostatki.art"),
        t("ostatki.name"),
        t("ostatki.batch"),
        t("ostatki.wh1"),
        t("ostatki.wh2"),
        t("ostatki.count"),
        t("ostatki.reason"),
        "",
      ],
      itemsForMove: [],
      whs_options: [],
      try_accept: false,
      autocomplete: {
        list: [],
        value: "",
        getList: async function (field, value) {
          this.value = value;
          const list = await store.dispatch(
            "autocomplete_" + field,
            this.value
          );
          if (list != undefined) {
            this.list = [...list];
            this.list.map((item) => {
              item.name = item.fields[field];
              item.value = item.id;
            });
          }
        },
      },
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("get_fields_properties"),
      this.$store.dispatch("get_all_fields"),
    ]);
    nextTick(() => {
      this.itemsForMove = [...this.currentItems];
      this.itemsForMove.map((item) => {
        item.fields.countToMove = 0;
        item.fields.reason = "";
        item.fields.whs_options = [];
        item.fields.whToCancel = { name: t("global.notSelected"), value: -1 };
        item.fields.whToMove = { name: t("global.notSelected"), value: -1 };
      });
      this.fillWhs();
    });
  },
  computed: {
    fields() {
      return this.$store.state.fields.all_fields;
    },
    itemsCountToMove() {
      const list = [];
      this.itemsForMove.forEach((item) => list.push(item.fields.countToMove));
      return list;
    },
    allow_add_reserve() {
      return this.$store.state.account.account.config.allow_add_reserve;
    },
    calcWhsOptions() {
      const obj = {};
      this.itemsForMove.forEach((item) => {
        const whs_options = [];
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
  },
  watch: {
    itemsCountToMove: {
      handler: function () {
        this.itemsForMove.map((item) => {
          if (item.fields.whToCancel) {
            const maxCount =
              item.fields?.[item.fields.whToCancel?.value]?.count;
            if (item.fields.countToMove > maxCount)
              item.fields.countToMove = maxCount;
            if (item.fields.countToMove < 0) item.fields.countToMove = 0;
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    delItem(idx) {
      this.itemsForMove.splice(idx, 1);
    },
    autocompleteSelect(newItem, idx) {
      newItem.fields.countToMove = 0;
      newItem.fields.reason = "";
      newItem.fields.whs_options = [];
      newItem.fields.whToCancel = { name: t("global.notSelected"), value: -1 };
      newItem.fields.whToMove = { name: t("global.notSelected"), value: -1 };
      this.itemsForMove.splice(idx, 1, newItem);
      this.fillWhs();
    },
    pushNewItem() {
      this.itemsForMove.push({
        isNew: true,
        fields: {
          countToMove: 0,
          reason: "",
          whs_options: [],
          whToCancel: { name: t("global.notSelected"), value: -1 },
          whToMove: { name: t("global.notSelected"), value: -1 },
        },
      });
    },
    fillWhs() {
      this.fields
        .filter((field) => field.type == 13 && field.code != "whs")
        .forEach((field) =>
          this.whs_options.push({ name: field.name, value: field.code })
        );
      this.itemsForMove.map((item) => {
        item.fields.whs_options = this.searchCatArr(
          this.whs_options,
          this.searchParentsCat(item.fields.category)
        );
      });
    },
    async save() {
      this.try_accept = true;
      let accept = true;
      this.itemsForMove.forEach((item) => {
        accept =
          accept &&
          item.fields.countToMove != "" &&
          item.fields.reason != "" &&
          item.fields.countToMove != undefined &&
          item.fields.reason != undefined &&
          item.fields.whToCancel.value != item.fields.whToMove.value &&
          item.fields.whToCancel.value != -1 &&
          item.fields.whToMove.value != -1;
      });
      if (accept) {
        const params = {
          products: [],
        };
        this.itemsForMove.forEach((itemMove) => {
          const item = {
            id: itemMove.id,
            wh_from: itemMove.fields.whToCancel.value,
            wh_to: itemMove.fields.whToMove.value,
            count: itemMove.fields.countToMove,
            comment: itemMove.fields.reason,
          };
          params.products.push(item);
        });
        await this.$store.dispatch("transfer_product", params);
        this.$emit("save");
        this.close_modal();
      }
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
    close_modal() {
      this.try_accept = false;
      this.$emit("close");
      this.$store.commit("openCloseMoveProductsBetweenWhs", false);
    },
    option_select(wh, option, idx) {
      if (wh == "cancel") {
        this.itemsForMove[idx].fields.whToCancel = option;
        this.itemsForMove[idx].fields.countToMove = 0;
      }
      if (wh == "move") this.itemsForMove[idx].fields.whToMove = option;
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
                width: fit-content;
                text-align: left;
              }
            }
          }
          .item:nth-child(1) {
            width: 15%;
          }
          .item:nth-child(2) {
            width: 25%;
          }
          .item:nth-child(3) {
            width: 10%;
          }
          .item:nth-child(4) {
            width: 1%;
            min-width: 150px;
            max-width: 150px;
          }
          .item:nth-child(5) {
            width: 1%;
            min-width: 150px;
            max-width: 150px;
          }
          .item:nth-child(6) {
            width: 10%;
          }
          .item:nth-child(7) {
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
.not_valid_selector {
  :deep(.title) {
    border: 1px solid #ff0000 !important;
  }
  :deep(.title:focus) {
    box-shadow: 0 0 0 4px rgb(255 0 0 / 25%) !important;
  }
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
.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease-out;
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
}
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
.del_btn {
  height: 18px;
  width: 18px !important;
  cursor: pointer;
  background: #dc3545;
  border: none;
  border-radius: 4px;
  @include bg_image("@/assets/cross.svg", 50%);
}
</style>
