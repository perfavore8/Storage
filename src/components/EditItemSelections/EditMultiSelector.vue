<template>
  <div class="row">
    <label>{{ item.name }}:</label>
    <AppMultiSelect
      :list="copy_selected_options"
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
    selected_options: {
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
      copy_selected_options: [],
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_options() {
      this.change_value();
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.copy_selected_options = [];
        const split_selected_options = this.selected_options?.split(", ");

        this.item.data?.forEach((val, idx) => {
          this.copy_selected_options.push({
            name: val,
            value: idx,
            selected: split_selected_options.includes(val),
          });
        });
      });
    },
    option_select(value) {
      value.selected = !value.selected;
      let a = [];
      this.copy_selected_options.forEach((val) => {
        if (val.selected) a.push(val.name);
      });
      a = a.join(", ");
      this.$emit("change_value", a, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
