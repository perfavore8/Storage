<template>
  <div class="row">
    <label>{{ item.name }}:</label>
    <AppMultiSelect
      :list="copy_selected_option"
      :disabled="disabled"
      @select="option_select"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
import AppMultiSelect from "../AppMultiSelect.vue";
export default {
  components: {
    AppMultiSelect,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {};
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
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_option() {
      this.change_value();
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.copy_selected_option = [];
        const split_selected_option = this.selected_option;

        this.item.data?.forEach((val, idx) => {
          this.copy_selected_option.push({
            name: val,
            value: idx,
            selected: split_selected_option.includes(val),
          });
        });
      });
    },
    option_select(value) {
      value.selected = !value.selected;
      let a = [];
      this.copy_selected_option.forEach((val) => {
        if (val.selected) a.push(val.name);
      });
      this.$emit("change_value", a, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
