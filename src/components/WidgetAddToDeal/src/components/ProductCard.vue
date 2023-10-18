<template>
  <div
    class="w-full p-5 my-2 flex flex-col gap-4 origin-top rounded-md bg-white shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition-all"
    :class="{ pcsmall: !show }"
    ref="target"
  >
    <div
      class="cursor-pointer flex flex-row justify-between items-center gap-2"
      @click="toggle()"
    >
      <span class="text-slate-900">
        {{ copyItem?.title }}
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
    <template v-if="show">
      <div class="pcrow">
        <EditSelector
          :item="{ name: t('widjet.cenT'), data: PRICES }"
          :selected_option="copyItem?.price_field"
          :idx="'price_field'"
          @change_value="(value, code, value2) => change_value(value2, code)"
        />
      </div>
      <div class="pcrow">
        <EditFloat
          :item="t('widjet.cen')"
          :selected_option="copyItem?.price"
          :idx="'price'"
          @change_value="change_value"
        />
      </div>
      <div class="pcrow">
        <EditSelector
          :item="{ name: t('widjet.sk2'), data: WHS }"
          :selected_option="copyItem?.wh_field"
          :idx="'wh_field'"
          @change_value="(value, code, value2) => change_value(value2, code)"
        />
      </div>
      <div class="pcrow">
        <EditFloat
          :item="t('widjet.col')"
          :selected_option="copyItem?.count"
          :idx="'count'"
          :max="copyItem?.['available-count']"
          @change_value="change_value"
        />
      </div>
      <div
        class="pcrow"
        v-for="field in fields"
        :key="field.id"
        v-show="
          field.lead_config.visible > 0 &&
          field.component &&
          getAllFieldsInSubCat(
            copyItem.fields?.category || copyItem.product?.fields?.category
          )?.includes(field.id)
        "
      >
        <component
          :is="field.component"
          :item="field.type == 5 || field.type == 6 ? field : field.name"
          :selected_option="
            copyItem?.[field.code]
              ? copyItem?.[field.code]
              : copyItem?.fields?.[field.code]
          "
          :idx="field.code"
          :disabled="field.lead_config.editable < 1"
          @change_value="change_value"
          :imagesList="copyItem.product?.fields[field.code]"
          :sizeWindow="'l'"
          :float="'left'"
        />
      </div>
      <div
        class="flex flex-row justify-end gap-2 cursor-pointer focus:ring-1 focus:ring-red-200"
        @click="del()"
      >
        <span class="material-icons-outlined text-red-600"> delete </span>
        <span>{{ $t("widjet.del") }}</span>
      </div>
    </template>
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
import AppImagesCarusel from "@/components/AppImagesCarusel.vue";
import {
  useToggle,
  onClickOutside,
  useWindowScroll,
  useElementBounding,
} from "@vueuse/core";
import { computed, ref } from "vue";
import { useAddToDealTabs } from "@/composables/addToDealTabs";
import { useNewDeal } from "@/composables/newDeal";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { useCats } from "../composables/cats";
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
    AppImagesCarusel,
  },
  props: {
    fields: { type: Array, required: true },
    copyItem: { type: Object, required: true },
  },
  setup(props, context) {
    const { t } = useLangConfiguration();
    const { isProductTab } = useAddToDealTabs();
    const { toggleSomeChange } = useNewDeal();
    const { getAllFieldsInSubCat } = useCats();

    const change_value = (value, code) => (
      context.emit("change_value", value, code), toggleSomeChange(true)
    );

    const target = ref(null);
    const { y: targetY } = useElementBounding(target);
    onClickOutside(target, () => {
      scrollTop();
      toggle(false);
    });
    const { y: sclrollY } = useWindowScroll();

    const [show, toggle] = useToggle(false);

    const scrollTop = () => {
      if (isProductTab.value && show.value)
        window.scrollTo(0, sclrollY.value + targetY.value - 204);
    };

    const PRICES = computed(() => {
      const arr = [];
      props.fields.forEach((field) =>
        field.type === 11
          ? arr.push({ name: field.name, value: field.code })
          : null
      );
      return arr;
    });

    const WHS = computed(() => {
      const arr = [];
      props.fields.forEach((field) =>
        field.type === 13 &&
        Boolean(field.lead_config?.editable) &&
        field.code !== "whs"
          ? arr.push({ name: field.name, value: field.code })
          : null
      );
      return arr;
    });

    const selectedWhName = computed(
      () => WHS.value.find((wh) => wh.value === props.copyItem?.wh_field)?.name
    );

    const del = () => context.emit("del");

    return {
      change_value,
      show,
      toggle,
      target,
      PRICES,
      WHS,
      selectedWhName,
      del,
      t,
      getAllFieldsInSubCat,
    };
  },
};
</script>

<style lang="scss">
@import "@/app.scss";
.pcrow {
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
  .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
}
.pcsmall {
  @apply py-1 bg-slate-100 shadow-none;
}
</style>
