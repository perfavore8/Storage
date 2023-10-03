<template>
  <div class="row">
    <label>{{ item }}:</label>
    <div class="type_selector_options">
      <div
        class="type_selector_option gap-2"
        v-for="(imgUrl, idx) in copy_selected_option"
        :key="idx"
      >
        <input type="text" class="input" v-model="copy_selected_option[idx]" />
        <button
          class="del_button"
          :style="{
            visibility: idx === 0 ? 'hidden' : 'visible',
          }"
          @click="del(idx)"
        />
      </div>
      <button @click="add()" class="add_button" />
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
  components: {},
  props: {
    item: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    selected_option: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    idx: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      copy_selected_option: [],
      isInitialCopy: false,
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_option() {
      this.change_value();
    },
    copy_selected_option: {
      handler: function () {
        if (!this.isInitialCopy) this.option_select();
      },
      deep: true,
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.isInitialCopy = true;
        this.copy_selected_option = [...this.selected_option];
        nextTick(() => (this.isInitialCopy = false));
      });
    },
    option_select() {
      this.$emit("change_value", this.copy_selected_option, this.idx);
    },
    add() {
      this.copy_selected_option.push("");
    },
    del(idx) {
      this.copy_selected_option.splice(idx, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.type_selector_options {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  gap: 5px;
  .type_selector_option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .input {
      width: calc(100% - 30px);
      height: 24px !important;
      @include font(400, 14px, 18px);
    }
    .del_button {
      cursor: pointer;
      width: 18px;
      height: 18px;
      min-width: 18px;
      background: #dc3545;
      border: none;
      border-radius: 4px;
      @include bg_image("@/assets/cross.svg", 50%);
    }
  }
}
.add_button {
  cursor: pointer;
  margin-top: 8px;
  width: 40px;
  height: 20px;
  background: #4e964d;
  border: none;
  border-radius: 4px;
  @include bg_image("@/assets/plus.svg", 30%);
}
</style>
