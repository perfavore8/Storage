<template>
  <div class="row">
    <label>{{ item }}:</label>
    <div class="right">
      <edit-float
        :item="t('Edit.zn')"
        :selected_option="copy_selected_option?.cost"
        :idx="idx + 'cost'"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'cost')"
      />
      <template v-if="isNewPrice">
        <div class="qew">
          <input
            type="checkbox"
            id="0"
            class="checkbox"
            v-model="editPrice.is_update_leads"
          />
          <label for="0">{{ $t("Edit.iz") }}</label>
        </div>
      </template>
      <edit-selector
        :item="{ name: t('Edit.val'), data: currencies }"
        :selected_option="copy_selected_option?.currency"
        :idx="idx + 'currency'"
        :disabled="disabled"
        @change_value="
          (name, idx, value) => option_select(name, 'currency', value, idx)
        "
      />
      <edit-flag
        :item="t('Edit.nds1')"
        :selected_option="copy_selected_option?.is_nds"
        :idx="idx + 'is_nds'"
        :disabled="disabled"
        @change_value="(option) => option_select(option, 'is_nds')"
      />
      <transition-group name="modal">
        <template v-if="copy_selected_option?.is_nds">
          <edit-flag
            :item="t('Edit.nds2')"
            :selected_option="copy_selected_option?.is_manager_can_change_nds"
            :idx="idx + 'is_manager_can_change_nds'"
            :disabled="disabled"
            @change_value="
              (option) => option_select(option, 'is_manager_can_change_nds')
            "
            v-if="false"
          />
          <edit-flag
            :item="t('Edit.nds3')"
            :selected_option="copy_selected_option?.is_price_include_nds"
            :idx="idx + 'is_price_include_nds'"
            :disabled="disabled"
            @change_value="
              (option) => option_select(option, 'is_price_include_nds')
            "
          />
          <edit-float
            :item="t('Edit.nds4')"
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
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

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
      type: String,
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
  setup() {
    return { t };
  },
  data() {
    return {
      copy_selected_option: {},
      oldPrice: null,
      editPrice: {
        isNew: true,
        price: "",
        is_update_leads: false,
      },
    };
  },
  mounted() {
    this.change_value();
    nextTick(() => {
      this.oldPrice = this.selected_option.cost;
      if (this.selected_option.cost == undefined) {
        this.oldPrice = "";
        this.copy_selected_option.cost = "";
      }
      this.dropEditPrice();
    });
  },
  computed: {
    isNewPrice() {
      return this.oldPrice != this.copy_selected_option?.cost;
    },
    isChangePrice() {
      return {
        is_update_leads: this.editPrice.is_update_leads,
        cost: this.copy_selected_option.cost,
      };
    },
  },
  watch: {
    selected_option: {
      handler: function () {
        this.change_value();
      },
      deep: true,
    },
    isNewPrice() {
      nextTick(() => {
        if (!this.isNewPrice) this.dropEditPrice();
      });
    },
    isChangePrice() {
      this.changeEditPrice();
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
    dropEditPrice() {
      this.editPrice = {
        isNew: true,
        price: "",
        is_update_leads: false,
      };
    },
    changeEditPrice() {
      this.editPrice.isNew = this.isNewPrice;
      this.editPrice.price = this.copy_selected_option.cost;
      this.$emit("changeEditPrice", this.editPrice, this.idx);
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
