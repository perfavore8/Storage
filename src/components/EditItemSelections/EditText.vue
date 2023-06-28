<template>
  <div class="row">
    <label>{{ item }}:</label>
    <textarea
      class="text_area"
      cols="30"
      rows="10"
      v-model="copy_selected_option"
      @input="() => option_select(copy_selected_option)"
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
    // copy_selected_option() {
    //   this.option_select(this.copy_selected_option);
    // },
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
.text_area {
  width: 100%;
  min-height: 100px;
  max-height: 200px;
  @include font(400, 16px, 20px);
  padding: 12px;
  background-color: white;
  border: 1px solid #ced4da;
  outline: none;
  resize: vertical;
}
.text_area:disabled {
  color: #212529;
  background-color: #e9ecef !important;
}
</style>
