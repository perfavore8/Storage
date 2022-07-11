<template>
  <div class="v-select">
    <div
      class="title"
      :class="{ title_checked: show_options, disabled: disabled }"
      @click="open_close_options()"
      @focusout="handleFocusOut"
      tabindex="0"
    >
      <p>{{ selected_option.name }}</p>
      <div
        class="arrow"
        v-if="!disabled"
        :class="{ rotate_arrow: show_options }"
      ></div>
    </div>
    <transition name="list">
      <div class="options" v-if="show_options">
        <p
          v-for="option in options"
          :key="option.value"
          @click="select_option(option)"
        >
          {{ option.name }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SelectorVue",
  props: {
    options_props: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    selected_option: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    idx: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      show_options: false,
      options: [],
    };
  },
  mounted() {
    this.options = [];
    this.options_props.forEach((item) => this.options.push(item));
  },
  methods: {
    select_option(option) {
      this.$emit("select", option, this.idx);
      this.hide_select();
    },
    hide_select() {
      this.show_options = false;
    },
    open_close_options() {
      if (!this.disabled) {
        this.show_options = !this.show_options;
      }
    },
    handleFocusOut() {
      this.hide_select();
    },
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
  @include font(400, 16px, 20px);
  p {
    margin: 0;
  }
  .title {
    height: 20px;
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
  }
  .title_checked {
    border-color: #86b7fe;
    box-shadow: 0 0 0 2px rgb(13 110 253 / 25%);
  }
  .arrow {
    width: 16px;
    height: 12px;
    @include bg_image("@/assets/arrow_select.svg");
    transition: transform 0.2s ease-in-out;
  }
  .rotate_arrow {
    transform: rotateX(180deg);
  }
  .options {
    position: absolute;
    top: 34px;
    background-color: white;
    border: 1px solid #ced4da;
    border-top: 0;
    border-radius: 0 0 4px 4px;
    width: calc(100% + 24px);
    z-index: 5;
    p {
      cursor: pointer;
      height: 20px;
      width: calc(100% - 24px);
      padding: 6px 12px;
      transition: background-color 0.15s ease-out;
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
.disabled {
  background-color: #e9ecef !important;
  cursor: default !important;
}
</style>
