<template>
  <label v-if="paginatedItems.length == 0" class="text">
    Ничего не найдено
  </label>
  <table class="table" v-if="paginatedItems.length != 0">
    <thead>
      <tr class="row title">
        <td v-for="title in archive.titles" :key="title" class="item">
          {{ title }}
        </td>
        <td class="item"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(items, index) in paginatedItems" :key="items" class="row">
        <td v-for="idx in idxes_to_show" :key="idx" class="item">
          {{ items[idx] }}
        </td>
        <td class="item">
          <div class="edit_icon" @click="unarchive_data(index)"></div>
        </td>
      </tr>
    </tbody>
  </table>
  <grid-bottom
    :previous="page > 1"
    :next="page * count < archive.items.length"
    :page="page"
    :show="paginatedItems.length != 0"
    :count="count"
    @changePage="changePage"
    @changeCount="changeCount"
  />
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    GridBottom,
  },
  data() {
    return {
      count: 5,
      page: 1,
    };
  },
  computed: {
    ...mapGetters(["archive"]),
    ...mapGetters(["params"]),
    paginatedItems() {
      return this.archive.items.slice(
        this.count * (this.page - 1),
        this.count * this.page
      );
    },
    idxes_to_show() {
      let arr = [];
      this.archive.titles.forEach((val) => {
        this.params.forEach((param, idx) => {
          if (val == param) arr.push(idx - 1);
        });
      });
      return arr;
    },
  },
  watch: {
    paginatedItems() {
      if (!this.paginatedItems.length) {
        if (this.page > 1) this.page -= 1;
      }
    },
  },
  methods: {
    changeCount(val) {
      this.count = val;
    },
    changePage(val) {
      this.page = val;
    },
    unarchive_data(idx) {
      console.log(this.archive.sourses[idx]);
      if (this.archive.sourses[idx] == 0) {
        this.$store.commit("unarchive_data", idx);
      } else if (this.archive.sourses[idx] == 1) {
        this.$store.commit("unarchive_service", idx);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.table {
  border: 1px solid #c9c9c9;
  border-collapse: collapse;
  width: 100%;
  @include font(400, 16px);
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
    }
  }
}
.edit_icon {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  cursor: pointer;
  @include bg_image("@/assets/export.svg");
  transform: rotate(180deg);
}
.count {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 150px;
  height: 26px;
  width: 100px;
}
.text {
  margin: 0 auto;
  @include font(500, 18px);
}
</style>