<template>
  <tr class="bar_row">
    <th
      class="bar_item item"
      v-show="collval[idx - 1] === false ? false : true"
      :style="{
        minWidth:
          idx === 0
            ? 17 + 'px'
            : idx === params.length - 1
            ? 20 + 'px'
            : width[idx] != 0
            ? width[idx] + 'px'
            : (collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) / collsCount +
              '%',
      }"
      v-for="(param, idx) in params"
      :key="param"
    >
      <div class="bar_item_group">
        <div>{{ param }}</div>
        <button v-show="param" class="bar_item_icon"></button>
      </div>
    </th>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    collval: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    params: {
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
      let count = 0;
      this.collval.forEach((val) => (val ? (count += 1) : null));
      return count;
    },
    width() {
      let arr = [];
      this.params.forEach((value) => {
        let a = 0;
        this.fields.forEach((val) => {
          if (value === val.field) {
            if (val.type.value == 9) a = 70;
            if (val.type.value == 7 || val.type.value == 8) a = 130;
          }
        });
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
