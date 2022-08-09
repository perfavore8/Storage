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
      v-if="paginatedData.length != 0"
    >
      <thead>
        <main-grid-bar :collval="collval" :params="params" />
        <main-grid-filters ref="filters" :collval="collval" :params="params" />
      </thead>
      <tbody>
        <transition-group name="rows">
          <tr
            class="row"
            v-for="(row, i) in paginatedData"
            :key="row"
            v-show="!showduplicate[i + idxes[page - 1][0]]"
          >
            <td class="item">
              <input
                type="checkbox"
                class="checkbox"
                :id="i + 'a'"
                v-model="changeValue[data.indexOf(row)]"
              />
              <label :for="i + 'a'"></label>
            </td>
            <td
              :class="{ open_dublitem: duplicate[i + idxes[page - 1][0]] }"
              class="item"
              v-for="(item, idx) in Object.entries(row)"
              v-show="collval[idx] === false ? false : true"
              :key="item"
            >
              <div class="dublitem">
                {{ item[1] }}
                <button
                  v-if="
                    idx == params.indexOf('Название') - 1 &&
                    showduplicate[i + idxes[page - 1][0] + 1] &&
                    !duplicate[i + idxes[page - 1][0]]
                  "
                  @click="showduble(i + idxes[page - 1][0])"
                  class="buttonDuwn btn"
                ></button>
                <button
                  v-if="
                    idx == params.indexOf('Название') - 1 &&
                    !showduplicate[i + idxes[page - 1][0] + 1] &&
                    !duplicate[i + idxes[page - 1][0]] &&
                    duplicate[i + idxes[page - 1][0] + 1]
                  "
                  @click="hideduble(i + idxes[page - 1][0])"
                  class="buttonUp btn"
                ></button>
              </div>
            </td>
            <td class="item">
              <div
                class="edit_icon"
                @click="open_edit_modal(row, data.indexOf(row))"
              ></div>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
    <grid-bottom
      :previous="page > 1"
      :next="page * count < data.length - countHideRows"
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
export default {
  name: "Main_grid",
  components: {
    EditItem,
    GridBottom,
    MainGridFilters,
    MainGridBar,
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
      coll: [],
      count: 5,
      page: 1,
      updateKey: 0,
      changeValue: [],
      duplicate: [],
      showduplicate: [],
      startIdx: 0,
      idxes: [[0, 6]],
      edit_data: [],
    };
  },
  watch: {
    count() {
      this.startIdx = 0;
      this.feelIdxes();
      this.page = 1;
    },
    paginatedData: {
      handler: function () {
        this.updateKey += 1;
        this.changeValue = [];
      },
      deep: true,
    },
    changeValue: {
      handler: function () {
        this.$emit("update_changeValue", this.changeValue);
      },
      deep: true,
    },
    data: {
      handler: function () {
        this.filters.reset_filtersValue();
        this.calcDuplicate();
        this.filters.feelFilters();
      },
      deep: true,
    },
    show_buttons: function () {
      this.$store.commit("open_close_buttons", this.show_buttons);
    },
    countHideRows: function () {
      this.feelIdxes();
    },
  },
  computed: {
    filters() {
      return this.$refs.filters;
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
    paginatedData() {
      if (this.idxes[this.page - 1] != undefined) {
        const dat = this.data.slice(
          this.idxes[this.page - 1][0],
          this.idxes[this.page - 1][1]
        );
        return dat;
      } else {
        return [];
      }
    },
    countPage() {
      return this.count * (this.page - 1);
    },
    countHideRows() {
      let a = 0;
      this.duplicate.forEach((val) => (val ? (a += 1) : null));
      return a;
    },
    endidx() {
      return this.endId(this.startIdx);
    },
    ...mapGetters(["show_edit_modal"]),
    ...mapGetters(["fields"]),
    ...mapGetters(["data1"]),
  },
  mounted() {
    this.calcDuplicate();
    this.feelIdxes();
    // this.open_edit_modal(this.data[0], 0);
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
    calcDuplicate() {
      let name = "";
      let artic = "";
      this.duplicate = [];
      this.showduplicate = [];
      const name_idx = this.params.indexOf("Название") - 1;
      const artic_idx = this.params.indexOf("Артикул") - 1;
      this.data.forEach((val) => {
        if (val[name_idx] == name && val[artic_idx] == artic) {
          this.duplicate.push(true);
        } else {
          this.duplicate.push(false);
        }
        name = val[name_idx];
        artic = val[artic_idx];
      });
      this.duplicate.forEach((val) => this.showduplicate.push(val));
    },
    showduble(idx) {
      while (this.duplicate[idx + 1]) {
        this.showduplicate[idx + 1] = false;
        idx += 1;
      }
    },
    hideduble(idx) {
      while (this.duplicate[idx + 1]) {
        this.showduplicate[idx + 1] = true;
        idx += 1;
      }
    },
    endId(idx) {
      let a = 0;
      while (a != this.count) {
        if (!this.duplicate[idx]) a += 1;
        idx += 1;
      }
      while (this.duplicate[idx]) idx += 1;
      return idx;
    },
    feelIdxes() {
      this.idxes = [];
      while (this.startIdx < this.data.length) {
        this.idxes.push([this.startIdx, this.endId(this.startIdx)]);
        this.startIdx = this.endId(this.startIdx);
      }
      this.startIdx = 0;
    },
    open_edit_modal(row, idx) {
      let index = idx;
      const data_idx = this.data1.indexOf(row);
      if (data_idx != -1) index = data_idx;
      this.edit_data = [];
      this.edit_data = this.edit_data.concat(row);
      this.$store.commit("open_edit_modal", index);
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
.row {
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
.dublitem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .btn {
    margin-top: -1px;
    width: 25px;
    height: 25px;
    border: none;
    outline: none;
    background-color: transparent;
  }
  .buttonDuwn {
    @include bg_image("@/assets/arrow.svg", 100% 60%);
  }
  .buttonUp {
    @include bg_image("@/assets/arrow.svg", 100% 60%);
    transform: rotate(180deg);
  }
}
.open_dublitem {
  background-color: rgba(187, 224, 242, 0.267);
  // padding-left: 30px;
  .dublitem {
  }
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
