<template>
  <div class="row">
    <label>{{ item }}:</label>
    <div class="right">
      <edit-float
        :item="'Значение'"
        :selected_option="copy_selected_option?.cost"
        :idx="idx + 'cost'"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'cost')"
      />
      <edit-selector
        :item="{ name: 'Валюта', data: currencies }"
        :selected_option="copy_selected_option?.currency"
        :idx="idx + 'currency'"
        :disabled="disabled"
        @change_value="
          (name, idx, value) => option_select(name, 'currency', value, idx)
        "
      />
      <edit-flag
        :item="'НДС'"
        :selected_option="copy_selected_option?.is_nds"
        :idx="idx + 'is_nds'"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'is_nds')"
      />
      <transition-group name="modal">
        <template v-if="copy_selected_option?.is_nds">
          <edit-flag
            :item="'НДС можно менять %'"
            :selected_option="copy_selected_option?.is_manager_can_change_nds"
            :idx="idx + 'is_manager_can_change_nds'"
            :disabled="disabled"
            @change_value="
              (option) => option_select(option, 'is_manager_can_change_nds')
            "
          />
          <edit-flag
            :item="'НДС включен в цену'"
            :selected_option="copy_selected_option?.is_price_include_nds"
            :idx="idx + 'is_price_include_nds'"
            :disabled="disabled"
            @change_value="
              (option) => option_select(option, 'is_price_include_nds')
            "
          />
          <edit-float
            :item="'НДС значение'"
            :selected_option="copy_selected_option?.nds"
            :idx="idx + 'nds'"
            :disabled="disabled"
            @change_value="(option) => option_select(option, 'nds')"
          />
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import EditFloat from "@/components/EditItemSelections/EditFloat.vue";
import EditSelector from "@/components/EditItemSelections/EditSelector.vue";
import EditFlag from "@/components/EditItemSelections/EditFlag.vue";
export default {
  components: {
    EditFloat,
    EditSelector,
    EditFlag,
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
    currencies: {
      type: Array,
    },
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
    option_select(value, code, cur) {
      code == "currency"
        ? (this.copy_selected_option[code] = cur)
        : (this.copy_selected_option[code] = value);
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
