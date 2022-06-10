<template>
  <div class="wrapper">
    <tabel class="tabel" :key="updateKey">
      <tr class="bar_row">
        <td class="bar_item item" v-for="param in params" :key="param">
          <div class="bar_item_row">
            <div>{{ param }}</div>
            <button v-show="param" class="bar_item_icon"></button>
          </div>
        </td>
      </tr>
      <tr>
        <td
          class="item"
          v-show="show_filter"
          v-for="(filter, idx) in params.length"
          :key="idx"
        >
          <div class="filter" v-show="idx != params.length - 1">
            <button @click="changeComparison(idx)">
              <div
                class="icon"
                :class="{
                  tilde: comparisons[idx] == 1,
                  equal: comparisons[idx] == 2,
                  more: comparisons[idx] == 3,
                  more_or_equal: comparisons[idx] == 4,
                }"
              ></div>
            </button>
            <input v-model="filterValue[idx]" type="text" />
          </div>
        </td>
      </tr>
      <tr class="row" v-for="row in paginatedData" :key="row">
        <td class="item" v-for="(item, idx) in row" :key="idx">{{ item }}</td>
        <td class="item"><div class="edit_icon"></div></td>
      </tr>
    </tabel>
    <div class="bottom">
      <button v-if="page > 1" @click="page -= 1">
        {{ "<" }}
      </button>
      <button v-if="page * count < data.length" @click="page += 1">
        {{ ">" }}
      </button>
      <input type="number" v-model="count" class="count" @input="page = 1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Main_grid",
  props: {
    params: [],
    data: [],
    show_filter: Boolean,
  },
  data() {
    return {
      coll: [],
      count: 3,
      page: 1,
      filterValue: [],
      updateKey: 0,
      comparisons: [],
    };
  },
  watch: {
    count() {
      if (this.count < 0) {
        this.count = 0;
      }
    },
    paginatedData: {
      handler: function () {
        this.updateKey += 1;
      },
      deep: true,
    },
    comparisons: {
      handler: function () {
        this.comparisons.forEach((val, i) => {
          val > 4 ? (this.comparisons[i] = 1) : val;
        });
      },
      deep: true,
    },
    data: {
      handler: function () {
        this.comparisons = [];
        this.fillColls();
        this.filterValue = [];
        this.page = 1;
      },
      deep: true,
    },
  },
  computed: {
    paginatedData() {
      return this.data.slice(
        this.page * this.count - this.count,
        this.page * this.count
      );
    },
  },
  mounted() {
    this.fillColls();
  },
  methods: {
    fillColls() {
      this.coll = Object.keys(this.data[0]);
      this.coll.forEach(() => {
        this.comparisons.push(1);
      });
    },
    changeComparison(idx) {
      this.comparisons[idx] = this.comparisons[idx] + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin font($w, $s, $h) {
  font-family: "Inter";
  font-style: normal;
  font-weight: $w;
  font-size: $s;
  line-height: $h;
}
@mixin bg_image($url, $size: 100% 100%) {
  background-size: $size;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url($url);
}

.item {
  padding: 10px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
}
.edit_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  @include bg_image("../assets/edit.svg");
}
.row {
}

.tabel {
  border-collapse: collapse;
}
.bar_row {
  height: 66px;
}
.bar_item {
  background: #e5e5e5;
  @include font(500, 16px, 19px);
  color: #000000;
  vertical-align: middle;
  cursor: pointer;
}
.bar_item_row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.bar_item_icon {
  height: 16px;
  width: 16px;
  background-color: transparent;
  @include bg_image("../assets/sort.svg");
  border: none;
}
.count {
  margin-top: 20px;
  margin-left: 5px;
}
.filter {
  display: flex;
  flex-direction: row;
  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 54px;
    height: 35px;
    background: #757575;
    border-radius: 4px;
    border: none;
    z-index: 2;
    cursor: pointer;

    .icon {
      width: 35px;
      height: 35px;
    }
  }
  > input {
    width: 100%;
    height: 31px;
    background: #ffffff;
    border: 0.5px solid #c4c4c4;
    border-radius: 4px;
    margin-left: -5px;
    padding-left: 7px;
    @include font(400, 14px, 17px);
    outline: none;
  }
}
.tilde {
  @include bg_image("../assets/tilde.svg", 40% 40%);
}
.equal {
  @include bg_image("../assets/equal.svg", 30% 30%);
}
.more {
  @include bg_image("../assets/more.svg", 40% 40%);
}
.more_or_equal {
  @include bg_image("../assets/more_or_equal.svg", 60% 60%);
}
</style>
