<template>
  <div class="wrapper">
    <edit-item v-if="show_edit_modal" :edit_data="edit_data" />
    <div class="grid">
      <div class="card" v-for="(row, i) in paginatedData" :key="row">
        <div
          class="row"
          v-for="(item, idx) in row"
          :key="item"
          v-show="collval[idx]"
        >
          <div class="name">{{ params[idx + 1] }} :</div>
          <div class="vaule">{{ item }}</div>
        </div>
        <div class="edit_icon" @click="open_edit_modal(row, i)"></div>
      </div>
    </div>
    <div class="bottom" :class="{ blur: show_edit_modal }">
      <button v-if="page > 1" @click="page -= 1">
        {{ "<" }}
      </button>
      <span style="margin: 5px">{{ page }}</span>
      <button v-if="page * count < data.length" @click="page += 1">
        {{ ">" }}
      </button>
      <select name="count" id="count" class="count" v-model="count">
        <option>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </div>
  </div>
</template>

<script>
// FIXME 3 <TransitionGroup> children must be keyed.
import EditItem from "@/components/EditItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "Main_grid",
  components: {
    EditItem,
  },
  props: {
    params: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    collval: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      count: 5,
      page: 1,
      filtersValue: [],
      edit_data: [],
    };
  },
  computed: {
    countPage() {
      return this.count * (this.page - 1);
    },
    paginatedData() {
      return this.data.slice(this.countPage, this.count * this.page);
    },
    ...mapGetters(["show_edit_modal"]),
    ...mapGetters(["show_filter"]),
    ...mapGetters(["fields"]),
  },
  watch: {
    page() {
      if (this.page < 1) this.page = 1;
    },
    count() {
      this.page = 1;
    },
  },
  methods: {
    open_edit_modal(row, idx) {
      this.edit_data = [];
      this.edit_data = this.edit_data.concat(row);
      this.$store.commit("open_edit_modal", idx);
    },
    change_filter_value(new_obj, idx) {
      Object.assign(this.filtersValue[idx], new_obj);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  @include font(400, 14px);
  .card {
    width: 300px;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 20px;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .name {
        margin-bottom: 5px;
      }
      .vaule {
      }
      .vaule:first-child {
        display: none;
      }
    }
    .row:first-child {
      justify-content: center;
      @include font(500, 18px);
      margin: 20px 0;
      .name {
        display: none;
      }
    }
  }
}
.edit_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  @include bg_image("@/assets/edit.svg");
}
.count {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 150px;
  height: 26px;
  width: 100px;
}
.bottom {
  button {
    @include font(400, 16px, 19px);
    color: #3f3f3f;
  }
  span {
    @include font(400, 16px, 19px);
    color: #3f3f3f;
  }
  input {
    @include font(400, 16px, 19px);
    color: #3f3f3f;
  }
}
.blur {
  filter: blur(5px);
}
.mdl-enter-active,
.mdl-leave-active {
  transition: opacity 0.15s ease-in-out;
}
.mdl-enter-from,
.mdl-leave-to {
  opacity: 0;
}
.rows-enter-active,
.rows-leave-active {
  transition: opacity 0.15s ease-in-out;
}
.rows-enter-from,
.rows-leave-to {
  opacity: 0;
}
</style>
