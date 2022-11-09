<template>
  <div class="wrapper">
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Свойства товаров</label>
            <btns-save-close @close="close_product_category" @save="save">
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div class="bottom">
            <teleport :to="target" v-if="target !== null">
              <input
                type="text"
                class="input_teleport"
                v-model="fields_cat_name"
                ref="input"
                @keyup.enter="add_new(fields_cat_name, item)"
                @keyup.esc="reset_fields_cat_name()"
              />
            </teleport>
          </div>
        </div>
        <div class="content">
          <draggable
            class="dragArea"
            :list="copy_fields_properties"
            @change="changeData"
          >
            <div
              v-for="(item, idx) in copy_fields_properties"
              :key="item.id"
              class="item"
              :style="{ width: calculate_width(item.level) + '%' }"
            >
              <div>
                <input
                  type="text"
                  class="input"
                  v-model="item.name"
                  :disabled="item.parent_id === 0"
                />
                <button
                  @click="rename2(item.id)"
                  v-if="
                    !all_old.name.includes(item.name) &&
                    all_old.id.includes(item.id)
                  "
                  class="btns"
                >
                  <div class="rename btn"></div>
                </button>
              </div>
              <div>
                <button
                  @click.stop="remove(item.levels, item.level)"
                  v-if="
                    item.parent_id !== 0 &&
                    (copy_fields_properties[idx + 1]
                      ? copy_fields_properties[idx + 1]?.level <= item.level
                      : true)
                  "
                  class="btns"
                >
                  <div class="remove btn"></div>
                </button>
                <button
                  :id="item.id"
                  @click="selected_category_id = item.id"
                  class="btns"
                  :ref="
                    (el) =>
                      item.id === selected_category_id ? (target = el) : null
                  "
                >
                  <div class="add btn"></div>
                </button>
              </div>
            </div>
          </draggable>
        </div>
        <div class="footer">
          <btns-save-close @close="close_product_category" @save="save">
            <template v-slot:close>Назад</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// FIXME DnD пофиксить перенос (уровни и отображение)
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { nextTick } from "process";
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {
    BtnsSaveClose,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      copy_fields_properties: [],
      selected_fields_properties: [],
      data_fields_properties: {
        items: null,
        selected: { name: "", value: -1 },
      },
      fields_cat_name: "",
      selected_category_id: null,
      target: null,
    };
  },
  mounted() {
    this.selected_fields_properties = [];
    this.copy_fields_properties = JSON.parse(
      JSON.stringify(this.fields_properties)
    );
  },
  computed: {
    ...mapGetters(["fields_properties"]),
    all_old() {
      const list = {
        name: [],
        id: [],
        parent_id: [],
        idxes: [],
        level: [],
        levels: [],
      };
      this.fields_properties.forEach((val) =>
        Object.entries(val).forEach((value) => list[value[0]].push(value[1]))
      );
      return list;
    },
  },
  watch: {
    target: {
      handler: function () {
        nextTick(() => {
          if (this.target !== null) this.$refs.input.focus();
        });
      },
      deep: true,
    },
  },
  methods: {
    changeData(event) {
      const oldidx = event.moved.oldIndex;
      const newidx = event.moved.newIndex;
      const list = this.copy_fields_properties;
      if (
        list[newidx + 1]?.parent_id === 0 ||
        list[newidx - 1].levels.includes(list[newidx].id)
      ) {
        const t = list[newidx];
        list.splice(newidx, 1);
        list.splice(oldidx, 0, t);
      } else {
        list[newidx].parent_id = list[newidx - 1].id;
        list[newidx].level = list[newidx - 1].level + 1;
        list[newidx].levels = [];
        list[newidx].levels.push(...list[newidx - 1].levels);
        list[newidx].levels[list[newidx - 1].level] = list[newidx].id;
      }
    },
    // changeData() {},
    save() {
      this.$store.commit(
        "update_fields_properties",
        this.copy_fields_properties
      );
      this.close_product_category();
    },
    new_id() {
      let id = 0;
      this.copy_fields_properties.forEach((val) =>
        val.id > id ? (id = val.id) : null
      );
      return id + 1;
    },
    // FIXME 2 когда добавляешь до 10 левела ломаются айдишники в levels ???
    add_new() {
      const parent = this.copy_fields_properties.filter(
        (val) => val.id === this.selected_category_id
      )[0];
      const new_fields_cat = {
        name: this.fields_cat_name,
        id: this.new_id(),
        parent_id: parent.id,
        idxes: [],
        level: parent.level + 1,
        levels: [...parent.levels],
      };
      new_fields_cat.levels[parent.level] = new_fields_cat.id;
      const parent_index = this.copy_fields_properties.indexOf(parent) + 1;
      if (new_fields_cat.level <= 10)
        this.copy_fields_properties.splice(parent_index, 0, new_fields_cat),
          this.feel_data_fields_properties(new_fields_cat.parent_id),
          this.reset_fields_cat_name();
    },
    remove(levels, level) {
      if (level != 1) {
        this.copy_fields_properties = this.copy_fields_properties.filter(
          (val) => {
            let result = false;
            val.levels.slice(0, level).forEach((elem, idx) => {
              if (elem !== levels[idx]) result = true;
            });
            return result;
          }
        );
      }
    },
    rename2(id) {
      this.copy_fields_properties.map((val) => {
        const name = () => {
          let res = "";
          this.fields_properties.forEach((value) =>
            value.id === id ? (res = value.name) : null
          );
          return res;
        };
        if (val.id === id) val.name = name();
      });
    },
    rename(new_name, id) {
      if (id != 1) {
        this.copy_fields_properties.map((val) =>
          val.id === id ? (val.name = new_name) : null
        );
        this.feel_data_fields_properties(id);
        this.reset_fields_cat_name();
      }
    },
    reset_fields_cat_name() {
      this.selected_category_id = null;
      this.fields_cat_name = "";
      this.target = null;
    },
    feel_data_fields_properties(id) {
      this.data_fields_properties.items = this.preparing_fields_properties(id);
    },
    preparing_fields_properties(id) {
      const new_arr = [];
      const arr = this.copy_fields_properties.filter(
        (val) => val.parent_id == id
      );
      arr.forEach((val) => new_arr.push({ name: val.name, value: val }));
      return new_arr;
    },
    calculate_width(level) {
      let width = 100;
      width = width * 0.95 ** (level - 1);
      return width;
    },

    close_product_category() {
      this.$store.commit("open_close_product_category", false);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999999;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .bgc {
    width: 80%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      width: 80%;
      margin: 30px auto;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #c9c9c9;
          padding-bottom: 10px;
          label {
            @include font(500, 28px);
          }
        }
      }
      .content {
        @include font(400, 16px);
        // display: flex;
        // flex-direction: column;
        // align-items: end;
        box-sizing: border-box;
        .dragArea {
          display: flex;
          flex-direction: column;
          align-items: end;
          border-radius: 0.25rem;
          border-collapse: collapse;
          box-sizing: border-box;
        }
        .item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          margin-top: -1px;
          cursor: grab;
          @include font(400, 1rem, 1.5);
          color: #212529;
          border-radius: 0.25rem;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.125);
          // border-top: transparent;
          .btns {
            padding: 0.25rem;
            margin-left: 4px;
            background-color: transparent;
            border: none;
            outline: none;
            position: relative;
            cursor: pointer;
            .input_teleport {
              box-sizing: border-box;
              position: absolute;
              top: 90%;
              left: -59px;
              width: 100px;
              border-radius: 0.25rem;
              padding: 4px 8px;
              background-color: white;
              border: 1px solid #ced4da;
              outline: none;
              appearance: none;
              transition: all 0.2s ease-in-out;
              @include font(400, 16px, 20px);
            }
            .input_teleport:focus {
              color: #212529;
              background-color: white;
              border-color: #86b7fe;
              box-shadow: 0 0 0 1px rgb(13 110 253 / 25%);
            }
          }
          .btn {
            padding: 0;
            border-radius: 1rem;
            box-sizing: border-box;
            width: 1rem;
            height: 1rem;
            background-color: transparent;
            border: 3px solid;
          }
          .rename {
            // border-color: #5f676d;
            position: relative;
            top: 1px;
            transform: scale(1.17);
            align-self: center;
            border: none;
            @include bg_image("@/assets/circular_arrow.svg");
            transition: all 0.2s ease-out;
          }
          .rename:active {
            transform: rotate(-90deg);
          }
          .remove {
            border-color: #dc3545;
          }
          .add {
            border-color: rgb(105, 177, 104);
          }
        }
        .item:first-child {
          border-top-left-radius: inherit;
          border-top-right-radius: inherit;
          border-top: 1px solid rgba(0, 0, 0, 0.125);
        }
        .item:last-child {
          border-bottom-left-radius: inherit;
          border-bottom-right-radius: inherit;
        }
      }
      .footer {
        display: flex;
        justify-content: end;
        margin-top: 60px;
      }
    }
  }
}
.input {
  height: 20px;
  padding: 6px 12px;
  background-color: white;
  border: none;
  border-bottom: 1px solid #ced4da;
  appearance: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @include font(400, 16px, 20px);
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  // box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
}
</style>
