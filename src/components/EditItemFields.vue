<template>
  <div class="row" v-for="field in copy_fields_with_parents" :key="field.id">
    <edit-integer
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 1"
    />
    <edit-float
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 2"
    />
    <edit-string
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 3"
    />
    <edit-text
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 4"
    />
    <edit-selector
      :item="field"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 5"
    />
    <edit-multi-selector
      :item="field"
      :selected_options="new_edit_data.fields[field.code]"
      :idx="field.code"
      :disabled="!!field.is_editable"
      @change_value="change_value"
      v-if="field.type == 6"
    />
    <edit-date
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      @change_value="change_value"
      v-if="field.type == 7"
    />
    <edit-date-time
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      @change_value="change_value"
      v-if="field.type == 8"
    />
    <edit-flag
      :item="field.name"
      :selected_option="new_edit_data.fields[field.code]"
      :idx="field.code"
      @change_value="change_value"
      v-if="field.type == 9"
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
import { nextTick } from "process";
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
    };
  },
  async mounted() {
    nextTick(async () => {
      const category_id = this.new_edit_data.fields.category;
      await this.$store
        .dispatch("get_fields_with_parents", category_id)
        .then(
          () =>
            (this.copy_fields_with_parents = [
              ...this.$store.state.fields.fields_with_parents,
            ])
        );
    });
  },
  methods: {
    change_value(value, code) {
      this.$emit("change_value", value, code);
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
