<template>
  <div class="row">
    <label>{{ item }}:</label>
    <input
      type="datetime-local"
      class="date_input"
      aria-required="true"
      aria-invalid="false"
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
      this.option_select(this.copy_selected_option);
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.copy_selected_option = this.refactorDate(this.selected_option);
      });
    },
    refactorDate(value) {
      const split = value?.split(" ");
      let date = value;
      if (split) {
        split[0] = split[0].split(".").reverse().join("-");
        date = split.join("T");
      }

      return date;
    },
    refactorDate2(value) {
      const split = value?.split("T");
      let date = value;
      if (split) {
        split[0] = split[0]
          .split("-")
          .reverse()
          .join(".")
          .replace(".000000Z", "");
        date = split.join(" ");
      }

      return date;
    },
    option_select(value) {
      const date = this.refactorDate2(value);

      if (
        Date.parse(
          this.refactorDate2(this.selected_option?.replace(".000000Z", ""))
        ) == Date.parse(date)
      )
        return;
      this.$emit("change_value", date, this.idx);
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
  background: white;
  border-radius: 4px;
  border: 1px solid #ced4da;
  color: #3f3f3f;
  outline: none;
  @include font(400, 16px, 19px);
}
.date_input:disabled {
  color: #212529;
  background-color: #e9ecef !important;
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
