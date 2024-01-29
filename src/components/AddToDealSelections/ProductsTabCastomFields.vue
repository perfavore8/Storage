<template>
  <div class="flex flex-col gap-4 justify-center items-center w-full mt-5">
    <!-- <h2 class="font-semibold text-gray-700 w-full text-start h-6"></h2> -->
    <div
      class="min-w-[40%] text-gray-900 flex flex-col divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
      :class="[
        isPublicOrder
          ? 'w-full mr-auto grid grid-cols-1 sm:grid-cols-2 gap-2 items-start'
          : 'w-full md:w-fit',
      ]"
    >
      <template
        v-for="(field, idx) in fields.filter(
          (field) =>
            field.component &&
            !dontShowCodes.includes(field.code) &&
            (isPublicOrder
              ? Boolean(field.config?.public_order_visible) > 0
              : true)
        )"
        :key="field.id"
      >
        <div
          class="row pb-3"
          :class="[
            isPublicOrder && idx === 1 && 'md:!border-t-0',
            { 'w-11/12': isPublicOrder },
          ]"
        >
          <component
            :is="field.component"
            :item="field.type == 5 || field.type == 6 ? field : field.name"
            :selected_option="order?.fields?.[field.code]"
            :idx="field.code"
            :disabled="isPublicOrder"
            @change_value="change_value"
          />
        </div>
      </template>
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
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
import { useNewDeal } from "@/composables/newDeal";
import { isPublicOrder } from "../PublicOrder";
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
  setup() {
    const { order, toggleSomeChange } = useNewDeal();

    onMounted(async () => {
      await Promise.all([
        store.dispatch("getOrdersTypes"),
        store.dispatch("getOrdersFields"),
      ]);
    });

    const change_value = (value, code) => (
      (order.fields[code] = value), toggleSomeChange(true)
    );

    const fields = computed(() =>
      store.state.orders.fields.sort((el) =>
        el.code === "description" ? 1 : -1
      )
    );

    const dontShowCodes = reactive(["name", "created_at", "updated_at"]);

    return { fields, order, change_value, dontShowCodes, isPublicOrder };
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
  :deep(label) {
    // padding: 7px 0;
    @apply mb-1 text-gray-500 md:text-base dark:text-gray-400;
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
