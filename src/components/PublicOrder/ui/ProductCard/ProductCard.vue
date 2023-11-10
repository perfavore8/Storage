<template>
  <ProductCardPreloader v-if="isLoading" />
  <div
    v-else
    class="max-w-sm h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <AppImagesCarusel
      class="imgCarusel"
      :imagesList="IMAGES"
      :sizeWindow="'f'"
    />
    <div class="p-5">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ copyItem?.title }}
      </h5>
      <template v-for="field in fields" :key="field.id">
        <div
          class="pcrow"
          v-if="
            field.lead_config.visible > 0 &&
            field.component &&
            allFieldsInSubCat?.includes(field.id) &&
            field.code !== 'price' &&
            field.type !== 15
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
            :imagesList="copyItem.product?.fields[field.code] || []"
            :sizeWindow="'l'"
            :float="'left'"
          />
        </div>
      </template>
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
          :item="currentPrice.name"
          :selected_option="copyItem?.price"
          :idx="'price'"
          :disabled="currentPrice.lead_config.editable < 1"
          @change_value="change_value"
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
        class="flex flex-row justify-end gap-2 cursor-pointer focus:ring-1 focus:ring-red-200"
        @click="del()"
      >
        <span class="material-icons-outlined text-red-600"> delete </span>
        <span>{{ $t("widjet.del") }}</span>
      </div>
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
import AppImagesCarusel from "@/components/AppImagesCarusel.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { useProductCard } from "./productCardModel";
import ProductCardPreloader from "../ProductCardPreloader/ProductCardPreloader.vue";
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
    ProductCardPreloader,
  },
  props: {
    fields: { type: Array, required: true },
    copyItem: { type: Object, required: true },
  },
  setup(props) {
    const { t } = useLangConfiguration();

    return {
      t,
      ...useProductCard(props.copyItem, props.fields),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.pcrow {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
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
:deep(.parentImg) {
  border-radius: 0;
  @apply rounded-t-lg max-h-[215px] object-contain;
}
</style>
