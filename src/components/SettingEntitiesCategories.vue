<template>
  <div class="bgc">
    <button
      class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-0 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
      @click="close()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
        />
      </svg>
    </button>
    <div class="container">
      <div class="header">
        <div class="top">
          <label>{{ $t("SettingEntities.entCats.header") }}</label>
        </div>
        <br />
        <div class="bottom">
          <teleport to="body" v-if="del_modal_config.show">
            <ProductsCategoryRemoveModal
              @remove="remove"
              @close="closeRemoveModal"
            />
          </teleport>
          <teleport :to="target" v-if="target !== null">
            <div
              class="backdrop"
              @click.stop="reset_fields_cat_name()"
              style="z-index: 99"
            />
            <div
              class="add_teleport"
              style="z-index: 100"
              :title="t('SettingEntities.entCats.titleAdd')"
            >
              <input
                type="text"
                class="input_teleport"
                v-model="fields_cat_name"
                ref="input"
                @keyup.enter="add_new()"
                @keyup.esc="reset_fields_cat_name()"
              />
              <button class="button_teleport" @click="add_new()">
                {{ $t("global.ok") }}
              </button>
            </div>
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
                :title="t('SettingEntities.entCats.titleChangeName')"
                class="text_block"
              >
                <input
                  type="text"
                  class="input_uderline"
                  @keyup.enter="rename(item.id)"
                  v-model="item.name"
                  :disabled="item.parent_id === 0"
                />
              </div>
              <button
                @click="rename(item.id)"
                v-if="
                  !all_old?.name?.includes(item.name) &&
                  all_old?.id?.includes(item.id)
                "
                class="btns"
                :title="t('SettingEntities.entCats.titleSave')"
              >
                <div
                  class="btn"
                  :class="{ apply: !confirm, confirm: confirm }"
                ></div>
              </button>
              <button
                @click="prevname(item.id)"
                v-if="
                  !all_old?.name?.includes(item.name) &&
                  all_old?.id?.includes(item.id)
                "
                class="btns"
                :title="t('SettingEntities.entCats.titleChange')"
              >
                <div class="rename btn"></div>
              </button>
              <input
                type="text"
                class="input input_uderline ml-2"
                v-model="item.img_url"
                :placeholder="t('SettingEntities.entCats.url')"
                @input="() => changeImgUrl(item)"
                v-if="isTest"
              />
            </div>
            <div
              class="flex flex-row items-center justify-end gap-1 min-w-[84px]"
            >
              <!-- <button
                @click.stop="setRemoveModalConfig(item.id, item.level)"
                v-if="
                  item.parent_id !== 0 &&
                  (copy_fields_properties[idx + 1]
                    ? copy_fields_properties[idx + 1]?.level <= item.level
                    : true)
                "
                class="btns"
                title="Удаление категории"
              >
                <div class="remove btn"></div>
              </button> -->
              <button
                @click.stop="setRemoveModalConfig(item.id, item.level)"
                v-if="
                  item.parent_id !== 0 &&
                  (copy_fields_properties[idx + 1]
                    ? copy_fields_properties[idx + 1]?.level <= item.level
                    : true)
                "
                class="w-10 h-10 p-1 pointer transition-all overflow-hidden duration-200 relative bg-slate-50 text-slate-700/70 hover:bg-valencia-50 hover:text-valencia-500 rounded-lg inline-flex justify-center items-center"
                :title="t('SettingEntities.entCats.del')"
              >
                <span
                  class="material-icons-round absolute"
                  style="font-size: 30px; font-weight: bold"
                >
                  close
                </span>
              </button>
              <button
                :id="item.id"
                @click="selected_category_id = item.id"
                class="w-10 h-10 p-1 pointer justify-self-end transition-all duration-200 relative bg-slate-50 text-slate-700/70 hover:bg-fruit-salad-100/80 hover:text-fruit-salad-500 rounded-lg inline-flex justify-center items-center"
                :ref="
                  (el) =>
                    item.id === selected_category_id ? (target = el) : null
                "
                :title="
                  target === null ? t('SettingEntities.entCats.add') : null
                "
              >
                <span
                  class="material-icons-round absolute"
                  style="font-size: 38px; font-weight: 400"
                >
                  add
                </span>
              </button>
              <!-- <button
                :id="item.id"
                @click="selected_category_id = item.id"
                class="btns"
                :ref="
                  (el) =>
                    item.id === selected_category_id ? (target = el) : null
                "
                :title="target === null ? 'Добавлние новой подкатегории' : null"
              >
                <div class="add btn"></div>
              </button> -->
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import ProductsCategoryRemoveModal from "@/components/ProductsCategoryRemoveModal.vue";
// import { nextTick } from "vue";
import { ref, watch, computed, nextTick, reactive, onMounted } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import store from "@/store";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: {
    ProductsCategoryRemoveModal,
    draggable: VueDraggableNext,
  },
  setup(props, context) {
    const { t } = useLangConfiguration();

    const fields_cat_name = ref("");
    const selected_category_id = ref(null);
    const target = ref(null);
    const all_old = reactive({});
    const isDragged = ref(null);
    const confirm = ref(false);
    const del_modal_config = reactive({
      show: false,
      id: null,
      level: null,
    });
    const timer = ref(null);

    onMounted(async () => {
      await store.dispatch("get_fields_properties");
      get_all_old();
    });

    const copy_fields_properties = computed(() => {
      return store.state.categories.fields_properties;
    });

    const isTest = computed(() => {
      return store.state.account?.account?.id == 1;
    });

    const changeImgUrl = (item) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        const params = {
          id: item.id,
          name: item.name,
          parent_id: item.parent_id,
          img_url: item.img_url,
        };
        store.dispatch("update_fields_properties", params);
      }, 1000);
    };

    const changeData = (event) => {
      const newidx = event.moved.newIndex;
      const list = [...copy_fields_properties.value];
      const params = {
        id: list[newidx].id,
        parent_id: list[newidx - 1].id,
        name: "",
      };
      store.dispatch("update_fields_properties", params);
    };

    const get_all_old = () => {
      const list = {
        name: [],
        id: [],
        parent_id: [],
        fields_id: [],
        level: [],
        levels: [],
      };
      store.state.categories.fields_properties.forEach((val) =>
        Object.entries(val).forEach((value) => list[value[0]]?.push(value[1]))
      );
      Object.assign(all_old, list);
    };

    const add_new = () => {
      const parent = copy_fields_properties.value.find(
        (val) => val.id === selected_category_id.value
      );
      if (parent.level + 1 <= 10 && fields_cat_name.value != "") {
        store.dispatch("add_fields_properties", {
          name: fields_cat_name.value,
          parent_id: parent.id,
        });
        reset_fields_cat_name();
      }
    };

    const rename = async (id) => {
      const item = [...copy_fields_properties.value].find(
        (val) => val.id === id
      );
      const params = {
        id: item.id,
        parent_id: "",
        name: item.name,
      };
      await store.dispatch("update_fields_properties", params);

      confirm.value = true;
      setTimeout(() => {
        confirm.value = false;
        get_all_old();
      }, 1000);
    };

    const prevname = (id) => {
      store.state.categories.fields_properties.map((val) => {
        const name = () => {
          let res = "";
          all_old.id.forEach((value, idx) =>
            value === id ? (res = all_old.name[idx]) : null
          );
          return res;
        };
        if (val.id === id) (val.name = name()), rename(id);
      });
    };

    const reset_fields_cat_name = () => {
      selected_category_id.value = null;
      fields_cat_name.value = "";
      target.value = null;
    };

    const calculate_width = (level) => {
      let width = 100;
      width = width * 0.95 ** (level - 1);
      return width;
    };

    const setRemoveModalConfig = (id, level) => {
      del_modal_config.level = level;
      del_modal_config.id = id;
      del_modal_config.show = true;
    };

    const remove = () => {
      if (del_modal_config.level != 1) {
        store.dispatch("delete_fields_properties", {
          id: del_modal_config.id,
        });
      }
      closeRemoveModal();
    };

    const closeRemoveModal = () => {
      del_modal_config.show = false;
    };

    const close = () => {
      context.emit("toggleCategories", false);
    };

    const input = ref(null);
    watch(
      target,
      () => {
        nextTick(() => {
          if (target.value !== null) input.value.focus();
        });
      },
      { deep: true }
    );

    return {
      fields_cat_name,
      selected_category_id,
      target,
      all_old,
      isDragged,
      confirm,
      del_modal_config,
      timer,
      copy_fields_properties,
      isTest,
      changeImgUrl,
      changeData,
      get_all_old,
      add_new,
      rename,
      prevname,
      reset_fields_cat_name,
      calculate_width,
      setRemoveModalConfig,
      remove,
      closeRemoveModal,
      close,
      input,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.bgc {
  position: relative;
  width: 100%;
  background-color: #fff;
  background-clip: padding-box;
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
        gap: 16px;
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
          width: 100%;
          .text_block {
            width: 100%;
            position: relative;
          }
        }
        .btns {
          padding: 0.25rem;
          margin-left: 8px;
          height: fit-content;
          width: fit-content;
          align-self: center;
          background-color: transparent;
          border: none;
          outline: none;
          position: relative;
          cursor: pointer;
        }
        .add_teleport {
          color: #212529;
          position: absolute;
          top: 90%;
          // left: -150%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          height: 30px;
          .input_teleport {
            box-sizing: border-box;
            width: 100px;
            height: 100%;
            border-radius: 0.25rem 0 0 0.25rem;
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
            cursor: pointer;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 0.25rem 0.25rem 0;
            outline: none;
            width: 30px;
            height: 100%;
            padding: 0;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            @include font(400, 16px);
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
        }
        .rename {
          // border-color: #5f676d;
          // border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          position: relative;
          top: 1px;
          transform: scale(1.8);
          align-self: center;
          border: none;
          @include bg_image("@/assets/undo.svg", 100% 90%);
          transition: all 0.2s ease-out;
        }
        .rename:active {
          transform: rotate(-90deg);
        }
        .apply {
          margin-left: 4px;
          border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          position: relative;
          top: 1px;
          transform: scale(1.6);
          align-self: center;
          border: none;
          @include bg_image("@/assets/download.svg");
          transition: all 0.2s ease-out;
        }
        .confirm {
          margin-left: 4px;
          border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          position: relative;
          top: 1px;
          transform: scale(1.6);
          align-self: center;
          border: none;
          @include bg_image("@/assets/download_done.svg");
          transition: all 0.2s ease-out;
        }
        .remove {
          @include bg_image("@/assets/cross_red.svg", 70%);
        }
        .add {
          @include bg_image("@/assets/plus_green.svg", 70%);
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

.input {
  background-color: white;
  border: none;
  border-bottom: 1px solid #ced4da;
  appearance: none;
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  // box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
}
.opened_close_remove_modal {
  z-index: 201;
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
.input_uderline {
  flex-shrink: 2;
  min-width: 30%;
}
</style>
