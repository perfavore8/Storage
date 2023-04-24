<template>
  <div
    class="w-full m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100"
  >
    <div class="w-11/12 p-5 flex flex-col gap-4">
      <div class="row" v-for="field in fields" :key="field.id">
        <component
          :is="field.component"
          :item="field.type == 5 || field.type == 5 ? field : field.name"
          :selected_option="copyItem.fields?.[field.code]"
          :idx="field.code"
          @change_value="change_value"
        />
      </div>
    </div>
    <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
      <template v-slot:other_btns>
        <button class="btn bg-transparent" @click="close()">Назад</button>
      </template>
    </BtnsSaveClose>
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
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
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
    BtnsSaveClose,
  },
  props: {
    isNew: { type: Boolean, required: true },
    item: { type: Object, required: false },
  },
  setup(props, context) {
    const copyItem = reactive({});

    const fields = computed(() => store.state.clientsContacts.fields);

    onMounted(async () => {
      await store.dispatch("getClientsContactsFields");
      if (props.isNew) {
        123;
      } else {
        Object.assign(copyItem, props.item);
      }
    });

    const close = () => context.emit("close");
    const accept = () => {
      store.dispatch("addClientsContacts", copyItem);
      context.emit("accept");
    };

    const change_value = (value, code) => (copyItem[code] = value);

    return { copyItem, fields, close, accept, change_value };
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
