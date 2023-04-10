<template>
  <div class="row" v-for="field in copy_fields_with_parents" :key="field.id">
    <edit-integer
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 1"
    />
    <edit-float
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 2"
    />
    <edit-string
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 3"
    />
    <edit-text
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 4"
    />
    <edit-selector
      :item="field"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 5"
    />
    <edit-multi-selector
      :item="field"
      :selected_options="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 6"
    />
    <edit-date
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 7"
    />
    <edit-date-time
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 8"
    />
    <edit-flag
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 9"
    />
    <edit-price
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      :currencies="currencies"
      @change_value="change_value"
      @changeEditPrice="changeEditPrice"
      v-if="field.type == 11"
    />
    <edit-wh
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 13"
    />
  </div>
</template>

<script>
import EditInteger from "@/components/EditItemSelections/EditInteger.vue";
import EditFloat from "@/components/EditItemSelections/EditFloat.vue";
import EditString from "@/components/EditItemSelections/EditString.vue";
import EditText from "@/components/EditItemSelections/EditText.vue";
import EditSelector from "@/components/EditItemSelections/EditSelector.vue";
import EditMultiSelector from "@/components/EditItemSelections/EditMultiSelector.vue";
import EditDate from "@/components/EditItemSelections/EditDate.vue";
import EditDateTime from "@/components/EditItemSelections/EditDateTime.vue";
import EditFlag from "@/components/EditItemSelections/EditFlag.vue";
import EditPrice from "@/components/EditItemSelections/EditPrice.vue";
import EditWh from "@/components/EditItemSelections/EditWh.vue";
import { nextTick } from "vue";
export default {
  components: {
    EditInteger,
    EditFloat,
    EditString,
    EditText,
    EditSelector,
    EditMultiSelector,
    EditDate,
    EditDateTime,
    EditFlag,
    EditPrice,
    EditWh,
  },
  props: {
    new_edit_data: {
      type: Object,
      required: true,
    },
  },
  emits: { change_value: null },
  data() {
    return {
      copy_fields_with_parents: [],
      currencies: [],
      editPrices: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("get_currencies");
    Object.entries(this.$store.state.account.currencies).forEach((val) =>
      this.currencies.push(val[1])
    );
    this.currencies.map((val) => (val.value = val.code_name));

    nextTick(async () => {
      const category_id = this.new_edit_data.fields.category;
      await this.$store.dispatch("get_fields_with_parents", category_id);
      this.copy_fields_with_parents = [
        ...this.$store.state.fields.fields_with_parents,
      ];
      this.fillEditPrices();
    });
  },
  wath: {
    editPrices: {
      handler: function () {},
      deep: true,
    },
  },
  methods: {
    change_value(value, code) {
      this.$emit("change_value", value, code);
    },
    fillEditPrices() {
      const priceFields = this.copy_fields_with_parents.filter(
        (val) => val.type == 11
      );
      priceFields.forEach((field) =>
        this.editPrices.push({
          isNew: false,
          product_id: this.new_edit_data.id,
          price: "",
          is_update_leads: false,
          price_field_code: field.code,
        })
      );
    },
    changeEditPrice(value, code) {
      this.editPrices.map((price) => {
        if (price.price_field_code === code) {
          Object.assign(price, value);
        }
      });
      this.$emit("changeEditPrices", this.editPrices);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  label {
    padding: 7px 0;
  }
  input {
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    @include font(400, 16px);
    background-color: white;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 4px;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  input:focus {
    color: #212529;
    background-color: white;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
  }
}
</style>
