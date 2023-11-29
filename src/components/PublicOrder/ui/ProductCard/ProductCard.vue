<template>
  <ProductCardPreloader v-if="isLoading" />
  <div
    v-else
    class="max-w-sm w-full h-auto max-h-[700px] relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="overflow-y-scroll w-full h-full max-h-[700px] rounded-lg">
      <AppImagesCarusel
        class="imgCarusel"
        :imagesList="IMAGES"
        :sizeWindow="'f'"
      />
      <div class="p-5 pb-2 mb-[62px]">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ copyItem?.title }}
        </h5>
        <template v-for="field in fields" :key="field.id">
          <div
            class="pcrow"
            v-if="
              (isPublicOrder
                ? field.lead_config.public_order_visible > 0
                : field.lead_config.visible > 0) &&
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
              :disabled="field.lead_config.editable < 1 || isPublicOrder"
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
            :disabled="isPublicOrder"
            @change_value="(value, code, value2) => change_value(value2, code)"
          />
        </div>
        <div class="pcrow">
          <EditFloat
            :item="currentPrice.name"
            :selected_option="copyItem?.price"
            :idx="'price'"
            :disabled="currentPrice.lead_config.editable < 1 || isPublicOrder"
            @change_value="change_value"
          />
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-0 w left-0 px-5 pt-2 pb-5 bg-white grid grid-cols-2 items-end justify-items-end row gap-2"
    >
      <div class="pcrow !mb-0 count">
        <EditFloat
          :item="t('widjet.col')"
          :selected_option="copyItem?.count"
          :idx="'count'"
          :max="copyItem?.['available-count']"
          @change_value="change_value"
        />
      </div>
      <button
        class="btn max-h-[34px] pointer-events-auto inline-flex whitespace-nowrap w-full justify-center items-center rounded-md text-[0.8125rem] font-medium leading-5 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        @click="del()"
      >
        <span>{{ $t("widjet.del2") }}</span>
      </button>
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
import { ProductCardPreloader } from "../ProductCardPreloader";
import { useNewDeal } from "@/composables/newDeal";
import { isPublicOrder } from "../../model";
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
  setup(props, context) {
    const { t } = useLangConfiguration();

    const { toggleSomeChange } = useNewDeal();

    const del = () => context.emit("del");
    const change_value = (value, code) => (
      context.emit("change_value", value, code), toggleSomeChange(true)
    );

    return {
      t,
      ...useProductCard(props.copyItem, props.fields),
      del,
      change_value,
      isPublicOrder,
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
:deep(.v-select) {
  width: 100%;
}

.count {
  :deep(label) {
    display: none;
  }
}
.w {
  width: calc(100% - 8px);
}
</style>
