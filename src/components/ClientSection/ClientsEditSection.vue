<template>
  <div
    class="w-full m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100"
  >
    <div class="w-full">
      <div class="flex flex-col gap-3 items-center p-5">
        <AppInputSelect
          v-if="!isNew"
          :list="binding.list"
          :countLettersReq="3"
          :requestDelay="300"
          :placeholder="'Привязка'"
          @changeInputValue="
            (val) => ((binding.value = val), binding.getList(copyItem.id))
          "
          @select="(val) => binding.add(copyItem.id, val)"
        />
        <div class="flex flex-row gap-1 flex-wrap">
          <span
            v-for="(sel, idx) in binding.selected"
            :key="sel.id"
            class="cursor-pointer font-medium py-1 px-2 text-xs text-green-700 bg-green-50 ring-inset ring-1 ring-green-600 ring-opacity-20 hover:text-red-700 hover:bg-red-50 hover:ring-red-600 hover:ring-opacity-10 rounded-md w-fit"
            :class="{ grey: sel.isNew }"
            @click="binding.del(copyItem.id, sel.id, idx)"
          >
            {{ sel.name }}
          </span>
        </div>
      </div>
      <EditSectionFields
        :fields="fields"
        :copyItem="copyItem"
        @change_value="change_value"
      />
    </div>
    <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
      <template v-slot:other_btns>
        <button class="btn bg-transparent" @click="close()">Назад</button>
        <AppDelBtnSwipe v-if="!isNew" @del="del" :key="copyItem" />
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

    const fields = computed(
      () => store.state?.[`clients${selectedTabComp.value.value}`].fields
    );

    const addCurrentLinks = () => {
      if (copyItem.value?.[`${selectedTabComp.value.oppositeValue3}`])
        binding.addCurrentLinks(
          copyItem.value?.[`${selectedTabComp.value.oppositeValue3}`]
        );
    };

    onMounted(async () => {
      await store.dispatch(`getClients${selectedTabComp.value.value}Fields`);
      fillCopyItem();
    });

    const fillCopyItem = () => {
      if (!props.isNew) {
        copyItem.value = JSON.parse(JSON.stringify(props.item));
        addCurrentLinks();
      }
    };
    const itemProp = computed(() => props.item);
    watch(itemProp, () => fillCopyItem());

    const close = () => context.emit("close");
    const accept = () => {
      const params = {};
      params[`${selectedTabComp.value.value3}`] = [copyItem.value];

      store.dispatch(
        props.isNew
          ? `addClients${selectedTabComp.value.value}`
          : `updateClients${selectedTabComp.value.value}`,
        params
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
.grey {
  @apply text-gray-600 bg-gray-50 ring-gray-500 ring-opacity-10 hover:text-red-700 hover:bg-red-50 hover:ring-red-600 hover:ring-opacity-10;
}
</style>
