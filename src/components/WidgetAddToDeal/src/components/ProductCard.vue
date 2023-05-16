<template>
  <div
    class="w-full p-5 my-2 flex flex-col gap-4 origin-top rounded-md bg-white shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition-all"
    :class="{ small: !show }"
    ref="target"
  >
    <div
      class="cursor-pointer flex flex-row justify-between items-center gap-2"
      @click="toggle()"
    >
      <span class="text-slate-900">
        {{ copyItem.fields?.name }} | склад 'Основной склад': 99 шт | 1000 RUB
      </span>
      <button
        class="p-2 h-fit w-fit rounded-xl outline-0 outline-slate-300 focus-visible:outline-1 transition-all"
        :class="{ '-rotate-90': show }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#757575"
            d="M15.125 21.1L6.7 12.7q-.15-.15-.213-.325T6.425 12q0-.2.062-.375T6.7 11.3l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.863t-.375.887q-.375.375-.875.375t-.875-.375Z"
          />
        </svg>
      </button>
    </div>
    <div
      class="row"
      v-for="field in fields"
      :key="field.id"
      v-show="field.lead_config.visible > 0 && field.component && show"
    >
      <component
        :is="field.component"
        :item="field.type == 5 || field.type == 6 ? field : field.name"
        :selected_option="copyItem.fields?.[field.code]"
        :idx="field.code"
        :disabled="field.lead_config.editable < 1"
        @change_value="change_value"
      />
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
import { useToggle, onClickOutside } from "@vueuse/core";
import { ref } from "vue";
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
  },
  setup(props, context) {
    const change_value = (value, code) =>
      context.emit("change_value", value, code);

    const [show, toggle] = useToggle(false);

    const scrollTop = () => {
      window.scrollTo(0, target.value?.getBoundingClientRect()?.y + 184);
    };

    const target = ref(null);
    onClickOutside(target, () => {
      toggle(false);
      if (show) scrollTop();
    });

    return { change_value, show, toggle, target };
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
.small {
  @apply py-1 bg-slate-100 shadow-none;
}
</style>
