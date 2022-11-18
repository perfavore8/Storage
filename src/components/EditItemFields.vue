<template>
  <div class="row" v-for="field in copy_fields_with_parents" :key="field.id">
    <edit-integer
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 1"
    />
    <edit-float
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 2"
    />
    <edit-string
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 3"
    />
    <edit-text
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 4"
    />
    <edit-selector
      :item="field"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 5"
    />
    <edit-multi-selector
      :item="field"
      :selected_options="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 6"
    />
    <edit-date
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 7"
    />
    <edit-date-time
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
      @change_value="change_value"
      v-if="field.type == 8"
    />
    <edit-flag
      :item="field.name"
      :selected_option="new_edit_data[params_indexOf(field)]"
      :idx="params_indexOf(field)"
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
import { mapGetters } from "vuex";
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
      type: Array,
      required: true,
    },
  },
  inject: ["isServicePage"],
  emits: { change_value: null },
  data() {
    return {
      copy_fields_with_parents: [],
    };
  },
  async mounted() {
    const category_id =
      this.$store.state.data.items_categories[this.idx_edit_modal];
    await this.$store
      .dispatch("get_fields_with_parents", category_id)
      .then(
        () =>
          (this.copy_fields_with_parents = [
            ...this.$store.state.fields.fields_with_parents,
          ])
      );
  },
  computed: {
    ...mapGetters(["params", "fields", "idx_edit_modal", "items_categories"]),
  },
  methods: {
    change_value(value, idx) {
      this.$emit("change_value", value, idx);
    },
    params_indexOf(item) {
      return this.params.indexOf(item.name) - 1;
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
    width: calc(100% - 24px);
    height: 20px;
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
  select {
    height: 32px;
    width: 200px;
    padding: 6px 12px;
    background-color: white;
    border: 1px solid #ced4da;
    border-radius: 4px;
    appearance: none;
    @include bg_image("../assets/arrow_select.svg", 16px 12px);
    background-position: right 8px center;
    option {
      background-color: #fff;
      height: 32px;
    }
    option:focus {
      background-color: rgb(13 110 253 / 25%);
    }
  }
  select:focus-visible {
    // outline: #86b7fe auto 1px;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
    // transform: rotate(180deg);
  }
  select:-ms-expand {
    transform: rotate(180deg);
    background-clip: content-box;
  }
}
</style>
