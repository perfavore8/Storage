<template>
  <div class="row">
    <label>{{ item }}:</label>
    <div class="right">
      <edit-integer
        :item="t('Edit.ns')"
        :selected_option="copy_selected_option?.count"
        :idx="idx"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'count')"
      />
      <edit-integer
        :item="t('Edit.vr')"
        :selected_option="copy_selected_option?.reserve"
        :idx="idx"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'reserve')"
      />
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import EditInteger from "@/components/EditItemSelections/EditInteger.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  components: {
    EditInteger,
  },
  props: {
    item: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    selected_option: {
      type: Object,
      required: true,
      default() {
        return { count: 0, reserve: 0 };
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
  setup() {
    return { t };
  },
  data() {
    return {
      copy_selected_option: {},
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_option: {
      handler: function () {
        this.change_value();
      },
      deep: true,
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.copy_selected_option = { ...this.selected_option };
      });
    },
    option_select(value, code) {
      this.copy_selected_option[code] = value;
      this.$emit("change_value", this.copy_selected_option, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.right {
  margin-left: 40px;
  width: calc(100% - 40px);
}
</style>
