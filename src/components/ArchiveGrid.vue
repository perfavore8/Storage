<template>
  <table class="table">
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
  <div class="bottom">
    <button v-if="page > 1" @click="page -= 1">
      {{ "<" }}
    </button>
    <span style="margin: 5px">{{ page }}</span>
    <button v-if="page * count < archive.items.length" @click="page += 1">
      {{ ">" }}
    </button>
    <select name="count" id="count" class="count" v-model="count">
      <option>3</option>
      <option>5</option>
      <option>10</option>
      <option>20</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      count: 20,
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
    unarchive_data(idx) {
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
.bottom {
  margin-top: 30px;
  @include font(400, 16px);
  color: #3f3f3f;
}
.count {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 150px;
  height: 26px;
  width: 100px;
}
</style>
