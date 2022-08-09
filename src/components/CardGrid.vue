<template>
  <edit-item v-if="show_edit_modal" :edit_data="edit_data" />
  <div class="wrapper" :class="{ blur: show_edit_modal }">
    <div class="header">
      <transition name="mdl">
        <card-grid-filters ref="filters" :collval="collval" :params="params" />
      </transition>
      <!-- <div class="btns">
        <button class="button" @click="show_categoryes = !show_categoryes">
          <span v-if="show_categoryes">Все</span>
          <span v-if="!show_categoryes">По категориям</span>
        </button>
      </div> -->
      <card-grid-links ref="links" @emit_link="emit_link" />
    </div>
    <div
      class="grid"
      v-if="
        !link.show_categoryes ||
        link.path.length == link.selected_categoryes.length
      "
    >
      <label v-if="paginatedData.length == 0" class="text">
        Ничего не найдено
      </label>
      <div class="card" v-for="(row, i) in paginatedData" :key="row">
        <div
          class="row"
          v-for="(item, idx) in row"
          :key="item"
          v-show="collval[idx]"
        >
          <div class="name">{{ params[idx + 1] }} :</div>
          <div class="value">{{ item }}</div>
        </div>
        <div class="card_footer">
          <input
            type="checkbox"
            class="checkbox"
            :id="i + 'a'"
            v-model="changeValue[i]"
          />
          <label :for="i + 'a'"></label>
          <div
            class="edit_icon"
            @click="open_edit_modal(row, data.indexOf(row))"
          ></div>
        </div>
      </div>
    </div>
    <grid-bottom
      :previous="page > 1"
      :next="page * count < data.length"
      :page="page"
      :blur="show_edit_modal"
      :show="
        (!link.show_categoryes ||
          link.path.length == link.selected_categoryes.length) &&
        paginatedData.length != 0
      "
      :count="count"
      @changePage="changePage"
      @changeCount="changeCount"
    />
  </div>
</template>

<script>
import EditItem from "@/components/EditItem.vue";
import GridBottom from "@/components/GridBottom.vue";
import CardGridFilters from "@/components/CardGridFilters.vue";
import CardGridLinks from "@/components/CardGridLinks.vue";
import { mapGetters } from "vuex";
export default {
  name: "Main_grid",
  components: {
    EditItem,
    GridBottom,
    CardGridFilters,
    CardGridLinks,
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
  emits: { update_changeValue: null },
  data() {
    return {
      count: 5,
      page: 1,
      edit_data: [],
      changeValue: [],
      link: {
        path: null,
        selected_categoryes: null,
        sel_idx: null,
        show_categoryes: null,
        categoryes: null,
      },
    };
  },
  computed: {
    countPage() {
      return this.count * (this.page - 1);
    },
    paginatedData() {
      if (this.link.show_categoryes) {
        let dat = [];
        dat = dat.concat(this.data);
        let result = [];
        dat.forEach((val) => {
          let a = true;
          this.link.path.forEach((title, i) => {
            const title_idx = this.params.indexOf(title) - 1;
            a = val[title_idx] == this.link.selected_categoryes[i] && a;
          });
          if (a) result.push(val);
        });
        return result.slice(this.countPage, this.count * this.page);
      } else {
        return this.data.slice(this.countPage, this.count * this.page);
      }
    },
    show_buttons() {
      let value = false;
      this.changeValue.forEach((val) => {
        if (val != undefined) {
          value = val || value;
        }
      });
      return value;
    },
    ...mapGetters(["show_edit_modal"]),
    ref_links() {
      return this.$refs.links;
    },
    ref_filters() {
      return this.$refs.filters;
    },
  },
  watch: {
    page() {
      if (this.page < 1) this.page = 1;
    },
    count() {
      this.page = 1;
    },
    paginatedData: {
      handler: function () {
        this.changeValue = [];
      },
      deep: true,
    },
    data: {
      handler: function () {
        this.ref_links.get_data_categoryes();
        this.ref_filters.reset_filtersValue();
        this.ref_filters.feelFilters();
      },
      deep: true,
    },
    changeValue: {
      handler: function () {
        this.$emit("update_changeValue", this.changeValue);
      },
      deep: true,
    },
    show_buttons() {
      this.$store.commit("open_close_buttons", this.show_buttons);
    },
  },
  methods: {
    changeCount(val) {
      this.count = val;
    },
    changePage(val) {
      this.page = val;
    },
    drop_page() {
      this.page = 1;
      this.ref_links.reset_sel();
      this.ref_links.showcategoryes();
      this.ref_filters.feelFilters();
    },
    emit_link(obj) {
      Object.assign(this.link, obj);
    },
    open_edit_modal(row, idx) {
      this.edit_data = [];
      this.edit_data = this.edit_data.concat(row);
      this.$store.commit("open_edit_modal", idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  .btns {
    display: flex;
    justify-content: flex-end;
    .button {
      cursor: pointer;
      color: #ffffff;
      border-radius: 4px;
      border: none;
      transition: background-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      @include font(400, 14px);
      width: 124px;
      height: 35px;
      background: #ea9197;
    }
    .button:hover {
      background: rgb(226, 101, 109);
      box-shadow: 0 0 5px 2px rgb(226 101 109 / 25%);
    }
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
.card_footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
  .edit_icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    @include bg_image("@/assets/edit.svg");
  }
}
.blur {
  filter: blur(5px);
}
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.checkbox:checked + label::before {
  border-color: #757575;
  background-color: #757575;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #75757591;
}
.checkbox:not(:disabled):active + label::before {
  background-color: #75757591;
  border-color: #75757591;
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
