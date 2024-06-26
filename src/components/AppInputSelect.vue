<template>
  <div class="input-select">
    <div @click="openList()">
      <slot name="title">
        <input
          type="text"
          class="input"
          :class="{
            input_uderline: input_uderline,
            black_text: SelectedInTitle && selected?.name,
          }"
          v-model="inputValue"
          :placeholder="
            SelectedInTitle && selected?.name ? selected?.name : placeholder
          "
        />
      </slot>
    </div>
    <template v-if="showList">
      <div class="backdrop" @click="closeList()" />
      <transition-group name="list">
        <template v-if="currentList.length">
          <ul class="list" :class="{ '!right-0 !left-auto': floatRight }">
            <li
              class="item relative"
              :class="{
                optgroup:
                  item.value === 'optgroup' &&
                  (!haveStackedOpgroup || idx === stackedOptgroup.openedIdx),
                stacked_optgroup:
                  item.value === 'optgroup' && haveStackedOpgroup,
                selected: item.value === selected?.value,
              }"
              :style="{ backgroundColor: item.color }"
              v-for="(item, idx) in currentList"
              :key="item.value"
              v-show="
                !(
                  haveStackedOpgroup &&
                  stackedOptgroup.openedIdx !== item.optgroupIdx &&
                  item.optgroupIdx !== undefined
                )
              "
              @click="selectItem(item)"
            >
              <template v-if="item.value === selected?.value && item.color">
                <span class="material-icons-outlined opacity-50"> check </span>
              </template>
              <template v-if="item.optgroup">
                &nbsp;&nbsp;&nbsp;&nbsp;
              </template>
              {{ item.name }}
              <span
                class="material-icons-outlined opacity-50 absolute right-2 top-1/2 -translate-y-1/2 transition-transform"
                :class="{ 'rotate-180': idx === stackedOptgroup.openedIdx }"
                v-if="item.value === 'optgroup' && haveStackedOpgroup"
              >
                expand_more
              </span>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="placeholder" v-if="showPlaceholder">
            <div class="item" v-for="i in 4" :key="i">
              <div>
                <div class="title"></div>
                <div class="text"></div>
              </div>
              <div class="aside"></div>
            </div>
          </div>
        </template>
      </transition-group>
    </template>
  </div>
</template>

<script>
import { waitForNonAsyncFunction } from "@/composables/waitForNonAsyncFunction";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
export default {
  props: {
    list: Array,
    selected: { type: Object, required: false },
    countLettersReq: { type: Number, required: false, default: () => 0 }, // кол-во символов для отправки запроса
    requestDelay: { type: Number, required: false, default: () => 300 }, // <--  миллисекунды
    placeholder: { type: String, required: false },
    input_uderline: { type: Boolean, required: false, default: () => false }, // стиль интпута
    SelectedInTitle: { type: Boolean, required: false, default: () => false }, // показывать выбранный итем в тайтле
    dropInputAftSel: { type: Boolean, required: false, default: () => true }, // Сбрасывать инпут после селекта
    floatRight: { type: Boolean, required: false, default: () => false }, // Список относительно правой стораны
    haveStackedOpgroup: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    dropStackedIdxAfterOpen: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  emits: ["changeInputValue", "focusIn", "select"],
  setup(props, context) {
    const inputValue = ref("");

    const timer = ref(null);

    const showPlaceholder = ref(false);

    const changeInputValue = () => {
      showPlaceholder.value = false;
      clearTimeout(timer.value);
      if (inputValue.value.length >= props.countLettersReq) {
        if (props.requestDelay >= 100) showPlaceholder.value = true;
        timer.value = setTimeout(() => {
          context.emit("changeInputValue", inputValue.value);
          if (props.requestDelay >= 100) {
            setTimeout(
              () => (showPlaceholder.value = false),
              props.requestDelay * 3
            );
          }
        }, props.requestDelay);
      }
    };

    watch(inputValue, () => changeInputValue());

    const showList = ref(false);
    const closeList = () => {
      showList.value = false;
    };
    const openList = () => {
      showList.value = true;
      focusIn();
      changeInputValue();
      if (props.dropStackedIdxAfterOpen && props.haveStackedOpgroup)
        stackedOptgroup.searchOpenedIdx();
    };
    const focusIn = () => context.emit("focusIn");

    const selectItem = (item) => {
      if (item.value === "optgroup" && props.haveStackedOpgroup) {
        const idx = currentList.value.indexOf(item);
        if (idx !== -1) stackedOptgroup.openedIdx = idx;
        return;
      }
      context.emit("select", item);
      closeList();
      if (props.dropInputAftSel) inputValue.value = "";
    };

    const stackedOptgroup = reactive({
      openedIdx: null,
      select: function (idx) {
        this.openedIdx = idx;
      },
      searchOpenedIdx: function () {
        const elem = this.listOpt.find(
          (el) => el.value === props.selected.value
        );
        if (!elem || elem.optgroupIdx === undefined) return;
        this.openedIdx = elem.optgroupIdx;
      },
      listOpt: computed(() => {
        const arr = [];
        let curOptgroupIdx = null;
        props.list.forEach((el, idx) => {
          if (el.value === "optgroup") curOptgroupIdx = idx;
          if (props.list[idx]?.optgroup && curOptgroupIdx !== null) {
            arr.push({ ...el, optgroupIdx: curOptgroupIdx });
            return;
          }
          arr.push(el);
          if (!props.list[idx + 1]?.optgroup) curOptgroupIdx = null;
        });
        return arr;
      }),
    });

    const currentList = computed(() =>
      props.haveStackedOpgroup ? stackedOptgroup.listOpt : props.list
    );
    onMounted(async () => {
      if (props.haveStackedOpgroup) {
        await waitForNonAsyncFunction(
          computed(() => stackedOptgroup.listOpt.length)
        );
        await waitForNonAsyncFunction(computed(() => props.selected?.value));
        stackedOptgroup.searchOpenedIdx();
      }
    });

    return {
      inputValue,
      showList,
      closeList,
      openList,
      selectItem,
      showPlaceholder,
      stackedOptgroup,
      currentList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.input-select {
  position: relative;
  .black_text::placeholder {
    color: black;
  }
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    z-index: 49;
  }
  .list::-webkit-scrollbar {
    display: none;
  }
  .list {
    z-index: 50;
    list-style-type: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    border-radius: 4px;
    list-style: none;
    max-height: 400px;
    min-height: 40px;
    overflow-y: scroll;
    scrollbar-width: 0;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 0;
    padding: 0;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
    min-width: 100%;

    box-sizing: border-box;
    .optgroup {
      @include font(500, 16px, 20px);
      background-color: #ffffff !important;
      cursor: default !important;
    }
    .stacked_optgroup {
      @include font(500, 16px, 20px);
    }
    .item {
      display: flex;
      align-items: center;
      // justify-content: center;
      box-sizing: border-box;
      cursor: pointer;
      height: 40px;
      width: 100%;
      padding: 6px 12px;
      transition: background-color 0.15s ease-out;
      white-space: pre;
      border-top: 1px solid #ced4da7d;
      &.stacked_optgroup:hover {
        background-color: rgb(13 110 253 / 15%);
      }
    }
    .item:hover {
      background-color: rgb(13 110 253 / 25%);
    }
    .item:last-child {
      border-radius: 0 0 4px 4px;
    }
    .item:first-child {
      border-top: none;
      border-radius: 4px 4px 0 0;
    }
    .item:active {
      background-color: #3261a7;
    }
    .selected {
      background-color: rgb(13 110 253 / 20%);
    }
  }
  .placeholder {
    box-sizing: border-box;
    z-index: 49;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    border-radius: 4px;
    padding: 16px;
    padding-bottom: 8px;
    border: 1px solid rgb(229 231 235);
    background-color: #fff;
    border-radius: 4px;
    min-width: 100%;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

    .item {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
      height: 40px;
      border-top: 1px solid rgb(229 231 235);
      &:first-child {
        border-top: none;
        padding-top: 0;
      }
      .title {
        height: 10px;
        background-color: rgb(209 213 219);
        border-radius: 9999px;
        margin-bottom: 10px;
        width: 48px;
      }
      .text {
        width: 80px;
        height: 8px;
        background-color: rgb(229 231 235);
        border-radius: 9999px;
      }
      .aside {
        height: 10px;
        background-color: rgb(209 213 219);
        border-radius: 9999px;
        width: 24px;
      }
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
