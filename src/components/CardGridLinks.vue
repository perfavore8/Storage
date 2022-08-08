<template>
  <div class="links">
    <div
      class="triangle"
      :class="{
        triangle_last: path.length - 1 == idx,
      }"
      v-for="(cat, idx) in selected_categoryes"
      :key="cat"
      @click="
        sel_idx = idx;
        selected_categoryes.splice(idx);
      "
    >
      {{ path[idx] }}
    </div>
  </div>
  <div
    class="path"
    v-for="(item, i) in path"
    :key="item"
    v-show="sel_idx == i && show_categoryes"
  >
    <div class="grid">
      <div
        class="card"
        v-for="select in categoryes[item]"
        :key="select"
        @click="
          selected_categoryes.push(select);
          sel_idx += 1;
        "
      >
        <div class="row">
          <div class="name"></div>
          <div class="value">{{ select }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  emits: { get_data: null },
  data() {
    return {
      path: ["Поступление", "№ партии", "НДС включен в цену"],
      selected_categoryes: [],
      sel_idx: 0,
      show_categoryes: true,
      categoryes: {},
    };
  },
  computed: {
    ...mapGetters(["params", "data"]),
    link() {
      const link = {
        path: this.path,
        selected_categoryes: this.selected_categoryes,
        sel_idx: this.sel_idx,
        show_categoryes: this.show_categoryes,
        categoryes: this.categoryes,
      };
      return link;
    },
  },
  mounted() {
    this.get_data_categoryes();
    this.emit_link();
  },
  watch: {
    link: {
      handler: function () {
        this.emit_link();
      },
      deep: true,
    },
    show_categoryes() {
      if (!this.show_categoryes) this.reset_sel();
    },
  },
  methods: {
    showcategoryes() {
      this.show_categoryes = true;
    },
    reset_sel() {
      this.selected_categoryes = [];
      this.sel_idx = 0;
    },
    emit_link() {
      this.$emit("emit_link", this.link);
    },
    get_data_categoryes() {
      this.categoryes = {};
      function unique(arr) {
        let res = [];

        for (let str of arr) {
          if (!res.includes(str)) {
            res.push(str);
          }
        }
        return res;
      }
      const result = {};
      let titles = [];
      titles = titles.concat(this.params);
      titles.pop();
      titles.shift();
      titles.forEach((title, idx) => {
        result[title] = [];
        let arr = [];
        this.data.forEach((val) => {
          arr.push(val[idx]);
        });
        result[title] = unique(arr);
      });
      Object.assign(this.categoryes, result);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  $step: 12px;

  .triangle {
    cursor: pointer;
    padding: 5px 10px 5px 15px;
    height: 20px;
    margin: 5px 0;
    @include font(400, 15px);
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    display: flex;
    justify-content: start;
    align-items: center;
    color: #000;
  }
  .triangle:hover {
    padding: 5px 12px 5px 17px;
    margin-left: -2px;
    margin-right: -2px;
    background: #e6e6e6 !important;
  }
  .triangle:first-child:hover {
    margin-left: 0;
  }
  .triangle_last {
    color: #fff;
    background: rgba(27, 53, 70, 0.945) !important;
  }
  .triangle_last:hover {
    background: rgba(27, 53, 70, 0.851) !important;
  }
  .triangle:active {
    background: #d6d6d6 !important;
  }

  .triangle:nth-child(3n + 1) {
    background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 84%));
  }
  .triangle:nth-child(3n + 2) {
    background: linear-gradient(
      45deg,
      hsl(0, 0%, 84%),
      hsl(0, 0%, 83%),
      hsl(0, 0%, 84%)
    );
  }
  .triangle:nth-child(3n + 3) {
    background: linear-gradient(45deg, hsl(0, 0%, 84%), hsl(0, 0%, 90%));
  }
  .triangle:first-child {
    padding-left: 5px;
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
  }
}
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  @include font(400, 14px);
  .text {
    margin: 0 auto;
    @include font(500, 18px);
  }
  .card {
    width: 300px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 20px;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px dotted #c9c9c9;
      padding-top: 5px;
      .name {
      }
      .value {
      }
      .value:first-child {
        display: none;
      }
    }
    .row:first-child {
      justify-content: center;
      @include font(500, 18px);
      padding: 20px 0;
      .name {
        display: none;
      }
    }
  }
}
</style>
