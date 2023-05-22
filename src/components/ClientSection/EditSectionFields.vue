<template>
  <div class="w-11/12 p-5 flex flex-col gap-4">
    <div class="row" v-for="field in fields" :key="field.id">
      <component
        :is="field.component"
        :item="field.type == 5 || field.type == 6 ? field : field.name"
        :selected_option="copyItem.fields?.[field.code]"
        :idx="field.code"
        @change_value="change_value"
        :class="{
          tryAccept: checkError(field).value,
        }"
      />
      <small
        v-if="checkError(field).value"
        class="absolute right-0 top-1 text-xs text-red-700"
      >
        {{
          checkError(field).empty
            ? "Пустое поле"
            : checkError(field).short
            ? "Минимум 3 символа"
            : ""
        }}
      </small>
    </div>
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
import { useCheckError } from "@/composables/checkError";
import { computed } from "vue";
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
    fields: { type: Array, required: true },
    copyItem: { type: Object, required: true },
    tryAccept: { type: Boolean, required: false, default: () => false },
  },
  setup(props, context) {
    const { checkError } = useCheckError(
      props.copyItem,
      computed(() => props.tryAccept)
    );

    const change_value = (value, code) =>
      context.emit("change_value", value, code);

    return { change_value, checkError };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.row {
  position: relative;
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
.tryAccept {
  :deep(input) {
    @extend .input_error;
  }
}
</style>
