<template>
  <div class="row">
    <label>{{ item }}:</label>
    <input
      type="number"
      class="input"
      step="1"
      onchange="this.value = parseInt(this.value);"
      v-model="copy_selected_option"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
export default {
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
      copy_selected_option: "",
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_option() {
      this.change_value();
    },
    copy_selected_option() {
      if (this.selected_option == this.copy_selected_option) return;
      // this.copy_selected_option = `${this.copy_selected_option}`;
      this.option_select(this.copy_selected_option);
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.copy_selected_option = this.selected_option;
      });
    },
    option_select(value) {
      this.$emit("change_value", value, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
