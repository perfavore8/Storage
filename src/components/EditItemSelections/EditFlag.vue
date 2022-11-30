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
      let val = "";
      if (this.copy_selected_option) {
        val = "Да";
      } else {
        val = "Нет";
      }
      this.option_select(val);
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        if (this.selected_option == "Да") {
          this.copy_selected_option = true;
        } else {
          this.copy_selected_option = false;
        }
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
