<template>
  <div
    class="w-full m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100"
  >
    <AppInputSelect
      v-if="!isNew"
      :list="binding.list"
      :countLettersReq="3"
      :requestDelay="300"
      :selected="binding.selected"
      :placeholder="'Привязка'"
      @changeInputValue="
        (val) => ((binding.value = val), binding.getList(copyItem.id))
      "
      @select="() => binding.add()"
    />
    <EditSectionFields
      :fields="fields"
      :copyItem="copyItem"
      @change_value="change_value"
    />
    <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
      <template v-slot:other_btns>
        <button class="btn bg-transparent" @click="close()">Назад</button>
        <AppDelBtnSwipe v-if="!isNew" @del="del" />
      </template>
    </BtnsSaveClose>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import EditSectionFields from "./EditSectionFields.vue";
import AppDelBtnSwipe from "../AppDelBtnSwipe.vue";
import AppInputSelect from "../AppInputSelect.vue";
import { computed, onMounted, ref, watch } from "vue";
import store from "@/store";
import { useClientBinding } from "@/composables/clientEditSectionBinding";
import { useClientsTabs } from "@/composables/clientsTabs";
export default {
  components: {
    BtnsSaveClose,
    EditSectionFields,
    AppDelBtnSwipe,
    AppInputSelect,
  },
  props: {
    isNew: { type: Boolean, required: true },
    item: { type: Object, required: false },
  },
  setup(props, context) {
    const { tabs } = useClientsTabs();
    const selectedTabComp = computed(() => tabs.selected);
    const { binding } = useClientBinding(selectedTabComp);

    const copyItem = ref({ fields: {} });

    const fields = computed(() => store.state.clientsContacts.fields);

    onMounted(async () => {
      await store.dispatch("getClientsContactsFields");
      fillCopyItem();
    });

    const fillCopyItem = () => {
      if (!props.isNew) {
        copyItem.value = JSON.parse(JSON.stringify(props.item));
      }
    };
    const itemProp = computed(() => props.item);
    watch(itemProp, () => fillCopyItem());

    const close = () => context.emit("close");
    const accept = () => {
      store.dispatch(
        props.isNew ? "addClientsContacts" : "updateClientsContacts",
        { contacts: [copyItem.value] }
      );
      context.emit("accept");
      close();
    };

    const del = () => {
      store.dispatch("deleteClientsContacts", { id: copyItem.value.id });
      close();
    };

    const change_value = (value, code) => (copyItem.value.fields[code] = value);

    return { copyItem, fields, close, accept, change_value, del, binding };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
