<template>
  <div class="v-select">
    <div class="backdrop" @click="close()" v-if="showOptions" />
    <div
      class="title"
      :class="{ title_checked: showOptions, disabled: disabled }"
      @click="toggleOptions()"
    >
      <p>{{ placeholder }}</p>
      <button
        class="arrow"
        v-if="!disabled"
        :class="{ rotate_arrow: showOptions }"
      >
        <div />
      </button>
    </div>
    <transition name="list">
      <div
        class="options"
        :class="{ 'right-0': rightSideSticky }"
        v-if="showOptions"
      >
        <p
          v-for="item in list"
          :key="item.value"
          :class="{
            optgroup: item.value === 'optgroup',
            selected: item.selected,
          }"
          :style="{ backgroundColor: item.color }"
          @click="select(item)"
        >
          <template v-if="item.selected && item.color">
            <span class="material-icons-outlined opacity-50"> check </span>
          </template>
          <template v-if="item.optgroup">
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}
          </template>
          <template v-else>{{ item.name }}</template>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
// import { ref } from "@vue/runtime-core";
import { useToggle } from "@vueuse/core";
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default() {
        return "";
      },
    },
    rightSideSticky: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
  },

  emits: {
    select: null,
  },
  setup(props, context) {
    const [showOptions, toggle] = useToggle();

    const close = () => {
      showOptions.value = false;
    };
    const toggleOptions = () => {
      if (!props.disabled) {
        toggle();
      }
    };

    const select = (item) => {
      if (item.value != "optgroup") {
        context.emit("select", item);
      }
    };

    return {
      toggleOptions,
      showOptions,
      select,
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
@keyframes height_1 {
  from {
    height: 10px;
  }
  to {
    height: 20px;
  }
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.v-select {
  position: relative;
  width: 250px;
  box-sizing: border-box;
  @include font(400, 16px, 20px);
  .optgroup {
    @include font(500, 16px, 20px);
    background-color: #ffffff !important;
    cursor: default !important;
  }
  p {
    margin: 0;
    text-overflow: ellipsis;
    overflow-x: clip;
    white-space: nowrap;
  }
  .title {
    height: 34px;
    width: 100%;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    cursor: pointer;

    // !!!!!!бегущая строка
    // .text {
    //   min-width: 80%;
    //   max-width: 80%;
    //   overflow-x: hidden;

    //   > p {
    //     display: inline-block;
    //     text-overflow: unset;
    //     animation: marquee linear infinite;
    //     animation-duration: v-bind(animationTime);
    //   }

    //   @keyframes marquee {
    //     from {
    //       transform: translateX(0);
    //     }
    //     to {
    //       transform: translateX(calc(-100% + 180px));
    //     }
    //   }
    // }
  }
  .title_checked {
    border-color: #86b7fe;
    box-shadow: 0 0 0 2px rgb(13 110 253 / 25%);
  }
  .arrow {
    padding: 4px;
    transition: transform 0.2s ease-in-out;
    > div {
      width: 16px;
      height: 12px;
      @include bg_image("@/assets/arrow_select.svg");
    }
  }
  .rotate_arrow {
    transform: rotateX(180deg);
  }
  .options {
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .options::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .options {
    position: absolute;
    z-index: 50;
    top: 100%;
    max-height: 400px;
    overflow-y: scroll;
    scrollbar-width: 0;
    // overflow-x: hidden;
    background-color: white;
    border: 1px solid #ced4da;
    // border-top: 0;
    // border-radius: 0 0 4px 4px;
    border-radius: 4px;
    width: fit-content;
    min-width: 100%;
    z-index: 50;
    p {
      cursor: pointer;
      height: 34px;
      width: 100%;
      padding: 6px 12px;
      transition: background-color 0.15s ease-out;
      white-space: pre;
      text-align: start;
      display: flex;
      align-items: center;
    }
    p:hover {
      background-color: rgb(13 110 253 / 25%);
    }
    p:last-child {
      border-radius: 0 0 4px 4px;
    }
    p:active {
      background-color: #3261a7;
    }
  }
}
.selected {
  background-color: rgb(13 110 253 / 20%);
}
.disabled {
  background-color: #e9ecef !important;
  cursor: default !important;
}
.backdrop {
  position: fixed;
  z-index: 49;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
}
</style>
