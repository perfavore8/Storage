<template>
  <div
    class="w-full m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100"
  >
    <EditSectionFields
      :fields="fields"
      :copyItem="copyItem"
      @change_value="change_value"
    />
    <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
      <template v-slot:other_btns>
        <button class="btn bg-transparent" @click="close()">Назад</button>
      </template>
    </BtnsSaveClose>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import EditSectionFields from "./EditSectionFields.vue";
import { computed, onMounted, reactive, watch } from "vue";
import store from "@/store";
export default {
  components: { BtnsSaveClose, EditSectionFields },
  props: {
    isNew: { type: Boolean, required: true },
    item: { type: Object, required: false },
  },
  setup(props, context) {
    const copyItem = reactive({ fields: {} });

    const fields = computed(() => store.state.clientsCompany.fields);

    onMounted(async () => {
      await store.dispatch("getClientsCompanyFields");
      fillCopyItem();
    });

    const fillCopyItem = () => {
      if (!props.isNew) {
        Object.keys(copyItem.fields).forEach((key) => {
          delete copyItem.fields[key];
        });
        Object.assign(copyItem, props.item);
      }
    };
    const itemProp = computed(() => props.item);
    watch(itemProp, () => fillCopyItem());

    const close = () => context.emit("close");
    const accept = () => {
      // store.dispatch("addClientsContacts", copyItem);
      context.emit("accept");
      close();
    };

    const change_value = (value, code) => (copyItem.fields[code] = value);
    return { copyItem, fields, close, accept, change_value };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
