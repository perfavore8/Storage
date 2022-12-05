<template>
  <tr class="bar_row">
    <th class="bar_item item" style="min-width: 17px" v-if="!oneC"></th>
    <th
      class="bar_item item"
      :style="{
        minWidth:
          width[idx] != 0
            ? width[idx] + 'px'
            : (collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) / collsCount +
              '%',
      }"
      v-for="(field, idx) in sortedFields"
      :key="field"
    >
      <div class="bar_item_group">
        <label>{{ field[1].name }}</label>
        <button
          class="bar_item_icon"
          :class="{
            bar_item_icon_up:
              order.code === field[0].split('.')[0] &&
              order.prev_order === 'desc',
            bar_item_icon_down:
              order.code === field[0].split('.')[0] &&
              order.prev_order === 'asc',
          }"
          @click="sort(field[0].split('.')[0])"
          v-if="
            fields.filter((val) => val.code == field[0].split('.')[0])[0]
              .table_config.sortable
          "
        ></button>
      </div>
    </th>
    <th class="bar_item item" style="min-width: 20px">
      <div>
        <button class="settings_btn" @click="openTableSettings()"></button>
      </div>
    </th>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    fields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    sortedFields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    tableConfig: {
      type: Object,
    },
  },
  data() {
    return {
      order: {
        code: "",
        prev_order: "",
      },
    };
  },
  computed: {
    ...mapGetters(["fields"]),
    collsCount() {
      return this.tableConfig.length;
    },
    oneC() {
      return this.$store.state.account.account?.g_install;
    },
    width() {
      let arr = [];
      this.fields.forEach((field) => {
        let a = 0;
        if (field.type == 9) a = 70;
        if (field.type == 7 || field.type == 8) a = 130;
        arr.push(a);
      });

      return arr;
    },
  },
  methods: {
    isShow(code) {
      let res = false;
      Object.entries(this.tableConfig).forEach((val) => {
        if (val[0].split(".")[0] == code && val[1]?.visible) res = true;
      });
      return res;
    },
    dropOrder() {
      this.order = {
        code: "",
        prev_order: "",
      };
    },
    sort(code) {
      const order_values = ["asc", "desc"];
      let new_order = "";
      this.order.code === code && this.order.prev_order == order_values[0]
        ? (new_order = order_values[1])
        : (new_order = order_values[0]);
      this.order = { code: code, prev_order: new_order };
      this.$emit("sort", code, new_order);
    },
    openTableSettings() {
      this.$store.commit("open_table_settings");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.bar_row {
  height: 66px;
  .item {
    padding: 10px;
    padding-left: 15px;
    border: 1px solid #c9c9c9;
    @include font(400, 14px, 17px);
    color: #3f3f3f;
    text-align: start;
    min-width: 50px;
  }
  .bar_item {
    background: #e5e5e5;
    @include font(500, 16px, 19px);
    color: #000000;
    vertical-align: middle;
    cursor: pointer;

    .bar_item_group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;

      .bar_item_icon {
        height: 16px;
        width: 16px;
        background-color: transparent;
        @include bg_image("@/assets/sort.svg");
        border: none;
        cursor: pointer;
        &_up {
          @include bg_image("@/assets/sort_up.svg");
        }
        &_down {
          @include bg_image("@/assets/sort_down.svg");
        }
      }
    }
  }
  .bar_item:first-child {
    width: 17px !important;
  }
  .bar_item:last-child {
    width: 20px !important;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.settings_btn {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: none;
  background-color: transparent;
  outline: none;
  transition: all 0.15s ease-out;
  @include bg_image("../assets/gear_1.svg");
}
.settings_btn:hover {
  transform: rotate(90deg) scale(1.1);
}
</style>
