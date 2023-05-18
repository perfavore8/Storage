<template>
  <div class="flex flex-col gap-4 justify-center items-center">
    <h2 class="font-semibold text-gray-700 w-full text-start"></h2>
    <div class="max-w-md min-w-[40%] w-fit text-gray-900">
      <div
        class="row"
        v-for="field in fields"
        :key="field.id"
        v-show="field.component"
      >
        <component
          :is="field.component"
          :item="field.type == 5 || field.type == 6 ? field : field.name"
          :selected_option="order?.fields?.[field.code]"
          :idx="field.code"
          @change_value="change_value"
        />
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
import { computed, onMounted } from "vue";
import store from "@/store";
import { useNewDeal } from "@/composables/newDeal";
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
    const { order } = useNewDeal();

    onMounted(async () => {
      await Promise.all([
        store.dispatch("getOrdersTypes"),
        store.dispatch("getOrdersFields"),
      ]);
    });

    const change_value = (value, code) => (order.fields[code] = value);

    const fields = computed(() => store.state.orders.fields);

    return { fields, order, change_value };
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
</style>
