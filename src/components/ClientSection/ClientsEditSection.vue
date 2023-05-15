<template>
  <div
    class="w-full m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100"
  >
    <div class="w-full">
      <div class="flex flex-col gap-3 items-center p-5">
        <AppInputSelect
          v-if="!isNew || true"
          :list="isNew ? binding.filteredOppositeList : binding.list"
          :countLettersReq="isNew ? 0 : 3"
          :requestDelay="300"
          :placeholder="'Привязка'"
          @changeInputValue="
            (val) => (
              (binding.value = val),
              isNew ? binding.getOppositeList() : binding.getList(copyItem.id)
            )
          "
          @select="(val) => binding.add(copyItem.id, val, isNew ? true : false)"
        />
        <div class="flex flex-row gap-1 flex-wrap">
          <span
            v-for="(sel, idx) in binding.selected"
            :key="sel.id"
            class="cursor-pointer relative font-medium py-1 px-2 text-xs text-green-700 bg-green-50 ring-inset ring-1 ring-green-600 ring-opacity-20 hover:text-big-stone-600 hover:bg-big-stone-50 hover:ring-big-stone-500 hover:ring-opacity-20 rounded-md w-fit transition-all"
            :class="{ blue: selectedBind.id === sel.id }"
            @click.self="() => selectedBind.select(sel.id, idx)"
            :ref="
              (el) =>
                selectedBind.id === sel.id ? (selectedBind.ref = el) : null
            "
          >
            {{ sel.name }}
          </span>
        </div>
      </div>
      <teleport :to="selectedBind.ref" v-if="selectedBind.ref">
        <OnClickOutside
          @trigger="() => selectedBind.close()"
          :options="{ ignore: [selectedBind.ref] }"
        >
          <div
            class="absolute right-0 z-10 mt-2 w-24 origin-top-right transform scale-100 rounded-md bg-white opacity-100 shadow-lg ring-1 ring-gray-900 ring-opacity-5 transition-all"
            :class="animationStarted ? 'in' : 'out'"
          >
            <a
              class="text-gray-900 text-sm leading-6 py-1 px-3 block hover:bg-gray-50 rounded-[inherit]"
              @click="selectedBind.follow()"
            >
              Перейти
            </a>
            <a
              class="text-gray-900 text-sm leading-6 py-1 px-3 block hover:bg-gray-50 rounded-[inherit]"
              @click="selectedBind.del()"
            >
              Удалить
            </a>
          </div>
        </OnClickOutside>
      </teleport>
      <EditSectionFields
        :fields="fields"
        :copyItem="copyItem"
        :tryAccept="tryAccept"
        @change_value="change_value"
      />
    </div>
    <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
      <template v-slot:other_btns>
        <button
          class="btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
          @click="close()"
        >
          Назад
        </button>
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import store from "@/store";
import { useClientBinding } from "@/composables/clientEditSectionBinding";
import { useClientsTabs } from "@/composables/clientsTabs";
import { OnClickOutside } from "@vueuse/components";
export default {
  components: {
    BtnsSaveClose,
    EditSectionFields,
    AppDelBtnSwipe,
    AppInputSelect,
    OnClickOutside,
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
    const sistemsFields = computed(() =>
      fields.value.filter((field) => field.is_system)
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
      } else {
        binding.getOppositeList();
      }
    };
    const itemProp = computed(() => props.item);
    watch(itemProp, () => fillCopyItem());

    const close = () => context.emit("close");
    const accept = async () => {
      tryAccept.value = true;
      if (checkValues()) return;
      const params = {};
      params[`${selectedTabComp.value.value3}`] = [copyItem.value];

      const { added } = await store.dispatch(
        props.isNew
          ? `addClients${selectedTabComp.value.value}`
          : `updateClients${selectedTabComp.value.value}`,
        params
      );
      binding.addAll(added[0]);
      if (props.isNew) {
        const { added } = await store.dispatch(
          `addClients${selectedTabComp.value.value}`,
          params
        );
        binding.addAll(added[0]);
      } else {
        await store.dispatch(
          `updateClients${selectedTabComp.value.value}`,
          params
        );
      }

      context.emit("accept");
      close();
    };

    const tryAccept = ref(false);
    const checkValues = () => {
      return (
        sistemsFields.value.some(
          (field) => !copyItem.value.fields[field.code]
        ) || copyItem.value.fields?.name?.length < 3
      );
    };

    const del = () => {
      store.dispatch("deleteClientsContacts", { id: copyItem.value.id });
      close();
    };

    const change_value = (value, code) => (copyItem.value.fields[code] = value);

    const selectedBind = reactive({
      ref: null,
      id: null,
      idx: null,
      select: function (id, idx) {
        if (this.id !== null) {
          this.close();
          return;
        }
        this.id = id;
        this.idx = idx;
      },
      close: function () {
        this.idx = null;
        setTimeout(() => {
          this.id = null;
          this.ref = null;
        }, 100);
      },
      del: function () {
        binding.del(copyItem.value.id, this.id, this.idx, !!props.isNew);
        this.close();
      },
      follow() {
        context.emit("follow", this.id);
      },
    });

    const animationStarted = ref(false);
    watch(
      () => selectedBind.idx,
      (val) => (animationStarted.value = val !== null)
    );

    return {
      copyItem,
      fields,
      close,
      accept,
      change_value,
      del,
      binding,
      tryAccept,
      selectedBind,
      animationStarted,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.blue {
  @apply text-big-stone-600 bg-big-stone-50 ring-big-stone-500 ring-opacity-20;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}
.in {
  animation: fadeIn 0.1s ease-out forwards;
}
.out {
  animation: fadeOut 0.1s ease-out forwards;
}
</style>
