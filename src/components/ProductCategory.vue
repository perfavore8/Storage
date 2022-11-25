<template>
  <div
    class="wrapper"
    :class="{ opened_close_remove_modal: del_modal_config.show }"
  >
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Категории товаров</label>
            <btns-save-close
              @close="close_product_category"
              @save="save"
              :show_save="false"
            >
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div class="bottom">
            <teleport to="body" v-if="del_modal_config.show">
              <ProductsCategoryRemoveModal
                @remove="remove"
                @close="closeRemoveModal"
              />
            </teleport>
            <teleport
              :to="target"
              v-if="target !== null"
              @focusout="reset_fields_cat_name()"
            >
              <input
                type="text"
                class="input_teleport"
                v-model="fields_cat_name"
                ref="input"
                @keyup.enter="add_new(fields_cat_name, item)"
                @keyup.esc="reset_fields_cat_name()"
              />
              <button
                class="button_teleport"
                @click="add_new(fields_cat_name, item)"
              >
                ок
              </button>
            </teleport>
            <teleport
              :to="target_hovered_category"
              v-if="target_hovered_category !== null"
            >
              <p class="tooltip_teleport">
                {{ hovered_category_text[hovered_category?.type] }}
              </p>
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
              @dragstart="isDragged = idx"
              @dragend="isDragged = null"
              :class="{ darag: isDragged == idx }"
            >
              <div class="input_name">
                <div
                  @mouseenter="hovered_category = { id: item.id, type: 'name' }"
                  @mouseleave="target_hovered_category = null"
                  :ref="
                    (el) =>
                      item.id === hovered_category?.id &&
                      hovered_category.type == 'name'
                        ? (target_hovered_category = el)
                        : null
                  "
                  class="text_block"
                >
                  <input
                    type="text"
                    class="input"
                    @keyup.enter="rename(item.id)"
                    v-model="item.name"
                    :disabled="item.parent_id === 0"
                  />
                </div>
                <button
                  @click="prevname(item.id)"
                  v-if="
                    !all_old?.name?.includes(item.name) &&
                    all_old?.id?.includes(item.id)
                  "
                  class="btns"
                  @mouseenter="
                    hovered_category = { id: item.id, type: 'prevname' }
                  "
                  @mouseleave="target_hovered_category = null"
                  :ref="
                    (el) =>
                      item.id === hovered_category?.id &&
                      hovered_category.type == 'prevname'
                        ? (target_hovered_category = el)
                        : null
                  "
                >
                  <div class="rename btn"></div>
                </button>
              </div>
              <div>
                <button
                  @click.stop="setRemoveModalConfig(item.id, item.level)"
                  v-if="
                    item.parent_id !== 0 &&
                    (copy_fields_properties[idx + 1]
                      ? copy_fields_properties[idx + 1]?.level <= item.level
                      : true)
                  "
                  class="btns"
                  @mouseenter="
                    hovered_category = { id: item.id, type: 'delete' }
                  "
                  @mouseleave="target_hovered_category = null"
                  :ref="
                    (el) =>
                      item.id === hovered_category?.id &&
                      hovered_category.type == 'delete'
                        ? (target_hovered_category = el)
                        : null
                  "
                >
                  <div class="remove btn"></div>
                </button>
                <button
                  :id="item.id"
                  @click="selected_category_id = item.id"
                  class="btns"
                  :ref="
                    (el) =>
                      item.id === selected_category_id
                        ? (target = el)
                        : item.id === hovered_category?.id &&
                          hovered_category.type == 'add'
                        ? (target_hovered_category = el)
                        : null
                  "
                  @mouseenter="hovered_category = { id: item.id, type: 'add' }"
                  @mouseleave="target_hovered_category = null"
                >
                  <div class="add btn"></div>
                </button>
              </div>
            </div>
          </draggable>
        </div>
        <div class="footer">
          <btns-save-close
            @close="close_product_category"
            @save="save"
            :show_save="false"
          >
            <template v-slot:close>Назад</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import ProductsCategoryRemoveModal from "@/components/ProductsCategoryRemoveModal.vue";
import { nextTick } from "process";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    BtnsSaveClose,
    ProductsCategoryRemoveModal,
    draggable: VueDraggableNext,
  },
  data() {
    return {
      fields_cat_name: "",
      selected_category_id: null,
      hovered_category: null,
      target: null,
      target_hovered_category: null,
      all_old: {},
      isDragged: null,
      del_modal_config: {
        show: false,
        id: null,
        level: null,
      },
      hovered_category_text: {
        name: "Для изменеия названия категории нажмите Enter",
        prevname: "Возвращает изначальное название",
        delete: "Удаление категории",
        add: "Добавлние новой подкатегории",
      },
    };
  },
  async mounted() {
    this.$store
      .dispatch("get_fields_properties")
      .then(() => this.get_all_old());
  },
  computed: {
    copy_fields_properties() {
      return this.$store.state.categories.fields_properties;
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
    target_hovered_category() {
      // console.log(this.hovered_category, this.target_hovered_category);
    },
  },
  methods: {
    changeData(event) {
      const newidx = event.moved.newIndex;
      const list = [...this.copy_fields_properties];
      const params = {
        id: list[newidx].id,
        parent_id: list[newidx - 1].id,
        name: "",
      };
      this.$store.dispatch("update_fields_properties", params);
    },
    get_all_old() {
      const list = {
        name: [],
        id: [],
        parent_id: [],
        fields_id: [],
        level: [],
        levels: [],
      };
      this.$store.state.categories.fields_properties.forEach((val) =>
        Object.entries(val).forEach((value) => list[value[0]]?.push(value[1]))
      );
      Object.assign(this.all_old, list);
    },
    add_new() {
      const parent = this.copy_fields_properties.filter(
        (val) => val.id === this.selected_category_id
      )[0];
      if (parent.level + 1 <= 10) {
        this.$store.dispatch("add_fields_properties", {
          name: this.fields_cat_name,
          parent_id: parent.id,
        });
        this.reset_fields_cat_name();
      }
    },
    rename(id) {
      const item = [...this.copy_fields_properties].filter(
        (val) => val.id === id
      )[0];
      const params = {
        id: item.id,
        parent_id: "",
        name: item.name,
      };
      this.$store.dispatch("update_fields_properties", params);
    },
    prevname(id) {
      this.$store.state.categories.fields_properties.map((val) => {
        const name = () => {
          let res = "";
          this.all_old.id.forEach((value, idx) =>
            value === id ? (res = this.all_old.name[idx]) : null
          );
          return res;
        };
        if (val.id === id) (val.name = name()), this.rename(id);
      });
    },
    reset_fields_cat_name() {
      nextTick(() => {
        this.selected_category_id = null;
        this.fields_cat_name = "";
        this.target = null;
      });
    },
    calculate_width(level) {
      let width = 100;
      width = width * 0.95 ** (level - 1);
      return width;
    },
    setRemoveModalConfig(id, level) {
      this.del_modal_config.level = level;
      this.del_modal_config.id = id;
      this.del_modal_config.show = true;
    },
    remove() {
      if (this.del_modal_config.level != 1) {
        this.$store.dispatch("delete_fields_properties", {
          id: this.del_modal_config.id,
        });
      }
      this.closeRemoveModal();
    },
    closeRemoveModal() {
      this.del_modal_config.show = false;
    },
    close_product_category() {
      this.$store.commit("open_close_product_category", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 1000;
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
          .input_name {
            display: flex;
            flex-direction: row;
            .text_block {
              position: relative;
            }
          }
          .btns {
            padding: 0.25rem;
            margin-left: 4px;
            background-color: transparent;
            border: none;
            outline: none;
            position: relative;
            cursor: pointer;
            .input_teleport {
              z-index: 2;
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
            .button_teleport {
              z-index: 2;
              cursor: pointer;
              position: absolute;
              top: calc(90% + 5px);
              right: 4px;
              outline: none;
              width: 30px;
              height: 20px;
              padding: 0;
              padding-bottom: 2px;
              border: none;
              background-color: transparent;
              border-radius: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
              @include font(400, 16px);
            }
            .button_teleport:hover {
              border: 1px solid rgba(0, 0, 0, 0.125);
            }
            .button_teleport:focus {
              border: 1px solid rgba(0, 0, 0, 0.125);
            }
            .button_teleport:active {
              background-color: rgba(0, 0, 0, 0.125);
            }
          }
          .btn {
            position: relative;
            padding: 0;
            border-radius: 2rem;
            box-sizing: border-box;
            width: 2rem;
            height: 2rem;
            background-color: transparent;
            border: 3px solid;
          }
          .rename {
            // border-color: #5f676d;
            border-radius: 1rem;
            width: 1rem;
            height: 1rem;
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
            @include bg_image("@/assets/delete_circle.svg", 94%);
          }
          .add {
            @include bg_image("@/assets/add_circle.svg");
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
.opened_close_remove_modal {
  pointer-events: none;
  filter: blur(1px);
}
.darag {
  border-color: #86b7fe !important;
}
.tooltip_teleport {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 60%;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #f8fcff;
  padding: 4px 8px;
  border-radius: 6px;
  box-sizing: border-box;
  @include font(400, 16px, 20px);
}
</style>
