<template>
  <tr class="bar_row">
    <th class="bar_item item" style="min-width: 17px"></th>
    <th
      class="bar_item item"
      :style="{
        minWidth:
          width[idx] != 0
            ? width[idx] + 'px'
            : (collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) / collsCount +
              '%',
      }"
      v-for="(field, idx) in fields"
      v-show="field.table_config.visible"
      :key="field.id"
    >
      <div class="bar_item_group">
        <div>{{ field.name }}</div>
        <button class="bar_item_icon"></button>
      </div>
    </th>
    <th class="bar_item item" style="min-width: 20px"></th>
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
  },
  computed: {
    ...mapGetters(["fields"]),
    collsCount() {
      return this.fields.filter((val) => val.table_config.visible).length;
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
      }
    }
  }
  .bar_item:first-child {
    width: 17px !important;
  }
  .bar_item:last-child {
    width: 20px !important;
  }
}
</style>
