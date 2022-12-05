<template>
  <div class="row">
    <input
      type="checkbox"
      class="checkbox"
      :id="idx + 'za'"
      v-model="copy_selected_option"
      :disabled="disabled"
    />
    <label :for="idx + 'za'">{{ item }}</label>
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
      // type: Boolean,
      required: true,
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
      copy_selected_option: Boolean,
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
      this.option_select(this.copy_selected_option);
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        if (this.selected_option != undefined)
          this.copy_selected_option = !!this.selected_option;
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
