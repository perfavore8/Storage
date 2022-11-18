<template>
  <div class="wrapper">
    <edit-item v-if="show_edit_modal" :edit_data="edit_data" />
    <label v-if="paginatedData.length == 0" class="text">
      Ничего не найдено
    </label>
    <table
      class="table"
      :key="updateKey"
      :class="{ blur: show_edit_modal }"
      v-else
    >
      <thead>
        <main-grid-bar :fields="all_fields" />
        <main-grid-filters ref="filters" :fields="all_fields" />
      </thead>
      <tbody>
        <transition-group name="rows">
          <tr class="row" v-for="row in paginatedData" :key="row.id">
            <td class="item">
              <input type="checkbox" class="checkbox" :id="row.id" />
              <label :for="row.id"></label>
            </td>
            <td
              class="item"
              v-for="item in all_fields"
              v-show="item.table_config.visible"
              :key="item"
            >
              <div class="dublitem">
                {{ row.fields[item.code] }}
              </div>
            </td>
            <td class="item">
              <div class="edit_icon" @click="open_edit_modal(row)"></div>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
    <grid-bottom
      :previous="page > 1"
      :next="page * count < 1"
      :page="page"
      :blur="show_edit_modal"
      :show="paginatedData.length != 0"
      :count="count"
      @changePage="changePage"
      @changeCount="changeCount"
    />
  </div>
</template>

<script>
import EditItem from "@/components/EditItem.vue";
import GridBottom from "@/components/GridBottom.vue";
import MainGridFilters from "@/components/MainGridFilters.vue";
import MainGridBar from "@/components/MainGridBar.vue";
import { mapGetters } from "vuex";
import { nextTick } from "process";
export default {
  name: "Main_grid",
  components: {
    EditItem,
    GridBottom,
    MainGridFilters,
    MainGridBar,
  },
  props: {},

  data() {
    return {
      count: 5,
      page: 1,
      updateKey: 0,
      changeValue: [],
      edit_data: {},
    };
  },

  mounted() {
    this.$store.dispatch("get_all_fields");
    this.$store.dispatch("get_products");
  },

  computed: {
    all_fields() {
      return this.$store.state.fields.all_fields;
    },
    filters() {
      return this.$refs.filters;
    },
    show_buttons() {
      const value = this.changeValue.filter((val) => val).length > 0;
      return value;
    },
    paginatedData() {
      return this.$store.state.products.products;
    },
    countPage() {
      return this.count * (this.page - 1);
    },
    ...mapGetters(["show_edit_modal"]),
  },

  watch: {
    count() {
      this.page = 1;
    },
    paginatedData: {
      handler: function () {
        this.updateKey += 1;
        this.changeValue = [];
        nextTick(() => {
          this.filters.reset_filtersValue();
          this.filters.feelFilters();
        });
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
    },
    open_edit_modal(row) {
      this.edit_data = { ...row };
      this.$store.commit("open_edit_modal", row.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.item {
  padding: 10px;
  padding-left: 15px;
  border: 1px solid #c9c9c9;
  @include font(400, 14px, 17px);
  color: #3f3f3f;
  text-align: start;
  min-width: 50px;
}
.edit_icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  @include bg_image("@/assets/edit.svg");
}
.table {
  border-collapse: collapse;
  margin: 0 auto;
}
.item:first-child {
  width: 17px !important;
  text-align: center;
  .filter {
    display: none;
  }
}
.item:last-child {
  width: 20px !important;
  text-align: center;
  .edit_icon {
    margin: 0 auto;
  }
  .filter {
    display: none;
  }
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
  width: 1em;
  height: 1em;
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
.blur {
  filter: blur(5px);
}
.text {
  margin: 0 auto;
  @include font(500, 18px);
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
