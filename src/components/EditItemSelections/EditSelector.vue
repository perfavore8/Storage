<template>
  <div class="row">
    <label>{{ item.name }}:</label>
    <SelectorVue
      :options_props="preparing_field_data(item.data)"
      @select="option_select"
      :selected_option="{ name: copy_selected_option, value: -1 }"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
import SelectorVue from "@/components/SelectorVue.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  components: {
    SelectorVue,
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
      copy_selected_option: t("global.notSelected"),
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
        this.item.data?.forEach((val) => {
          if (val == this.selected_option) this.copy_selected_option = val;
          if (val?.value == this.selected_option && val?.value != undefined) {
            this.copy_selected_option = val?.name;
          }
        });
      });
    },
    preparing_field_data(arr) {
      const result = [];
      if (arr)
        arr[0]?.name
          ? arr.forEach((val) =>
              result.push({ name: val.name, value: val?.value })
            )
          : arr.forEach((val, idx) => result.push({ name: val, value: idx }));
      return result;
    },
    option_select(value) {
      if (this.selected_option == value.name) return;
      this.$emit("change_value", value.name, this.idx, value.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
