<template>
  <div class="row">
    <label>{{ item }}:</label>
    <input
      type="datetime-local"
      class="date_input"
      aria-required="true"
      aria-invalid="false"
      v-model="copy_selected_option"
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

.date_input {
  position: relative;
  width: 250px !important;
  height: 34px;
  background: #c9c9c9;
  border-radius: 4px;
  border: none;
  color: #3f3f3f;
  outline: none;
  @include font(400, 16px, 19px);
}
.date_input::-webkit-datetime-edit-fields-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.date_input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  appearance: none;
}
</style>
