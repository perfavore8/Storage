<template>
  <div
    class="w-auto m-4 p-4 flex flex-col gap-6 items-center rounded-xl border h-fit shadow-lg shadow-slate-100 relative"
  >
    <div class="w-full flex flex-col items-center">
      <BtnsSaveClose
        v-show="!downButtonsIsVisible"
        :show_close="false"
        class="self-end"
        @save="accept"
      >
        <template v-slot:other_btns>
          <button
            class="btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
            @click="close()"
          >
            {{ $t("global.back") }}
          </button>
          <AppDelBtnAccept
            v-if="!isNew"
            @confirm="del"
            :key="copyItem"
            :btnClass="'btn_grey'"
          >
            <template v-slot:label>
              {{ $t("Clients.Edit.archivate") }}
            </template>
          </AppDelBtnAccept>
        </template>
      </BtnsSaveClose>
      <div class="flex flex-col gap-3 items-center p-5">
        <div
          class="grid grid-cols-1 gap-2 justify-items-center items-center lg:grid-cols-2 xl:grid-cols-3"
        >
          <button
            class="btn order-1 max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
            @click="followStep1(tabs.selected?.value2, item?.fields?.name)"
            v-if="!isNew"
          >
            {{ $t("Clients.Edit.orders") }}
          </button>
          <div class="order-1" v-else />
          <AppInputSelect
            class="order-3 xl:order-2 lg:col-span-2 xl:col-span-1"
            :list="isNew ? binding.filteredOppositeList : binding.list"
            :countLettersReq="isNew ? 0 : 3"
            :requestDelay="300"
            :placeholder="t('Clients.Edit.link')"
            @changeInputValue="
              (val) => (
                (binding.value = val),
                isNew ? binding.getOppositeList() : binding.getList(copyItem.id)
              )
            "
            @select="
              (val) => binding.add(copyItem.id, val, isNew ? true : false)
            "
          />
          <div class="relative order-2 xl:order-3 my-2">
            <input
              name="rating"
              type="text"
              class="input"
              v-model="copyItem.fields.rating"
              :class="{
                tryAccept: checkError(rating).value,
              }"
            />
            <small
              v-if="checkError(rating).value"
              class="absolute right-0 -top-5 text-xs text-red-700"
            >
              {{
                checkError(rating).empty
                  ? t("Clients.Edit.emptyF")
                  : checkError(rating).short
                  ? t("Clients.Edit.lenght")
                  : ""
              }}
            </small>
            <label
              for="rating"
              class="absolute -top-[10px] left-4 text-sm bg-white/80 text-slate-700/80 px-2"
            >
              {{ $t("Clients.Edit.rating") }}
            </label>
          </div>
        </div>
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
            {{ sel.fields?.name || sel?.name }}
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
              {{ $t("Clients.Edit.follow") }}
            </a>
            <a
              class="text-gray-900 text-sm leading-6 py-1 px-3 block hover:bg-gray-50 rounded-[inherit]"
              @click="selectedBind.del()"
            >
              {{ $t("Clients.Edit.delete") }}
            </a>
          </div>
        </OnClickOutside>
      </teleport>
      <EditSectionFields
        :fields="filteredFields"
        :copyItem="copyItem"
        :tryAccept="tryAccept"
        @change_value="change_value"
      />
    </div>
    <BtnsSaveClose
      :show_close="false"
      class="self-end"
      @save="accept"
      ref="downButtons"
    >
      <template v-slot:other_btns>
        <button
          class="btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
          @click="close()"
        >
          {{ $t("global.back") }}
        </button>
        <AppDelBtnAccept
          v-if="!isNew"
          @confirm="del"
          :key="copyItem"
          :btnClass="'btn_grey'"
        >
          <template v-slot:label>
            {{ $t("Clients.Edit.archivate") }}
          </template>
        </AppDelBtnAccept>
      </template>
    </BtnsSaveClose>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import EditSectionFields from "./EditSectionFields.vue";
import AppDelBtnAccept from "../AppDelBtnAccept.vue";
import AppInputSelect from "../AppInputSelect.vue";
import { computed, onMounted, reactive, ref, unref, watch } from "vue";
import store from "@/store";
import { useClientBinding } from "@/composables/clientEditSectionBinding";
import { useClientsTabs } from "@/composables/clientsTabs";
import { OnClickOutside } from "@vueuse/components";
import { useElementVisibility } from "@vueuse/core";
import { useCheckError } from "@/composables/checkError";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { useFollowAnalytics } from "@/composables/followAnalytics";
export default {
  components: {
    BtnsSaveClose,
    EditSectionFields,
    AppDelBtnAccept,
    AppInputSelect,
    OnClickOutside,
  },
  props: {
    isNew: { type: Boolean, required: true },
    item: { type: Object, required: false },
  },
  setup(props, context) {
    const { t } = useLangConfiguration();

    const { tabs } = useClientsTabs();
    const selectedTabComp = computed(() => tabs.selected);
    const { binding } = useClientBinding(selectedTabComp);
    const { followStep1 } = useFollowAnalytics();

    const copyItem = ref({ fields: {} });

    const fields = computed(
      () => store.state?.[`clients${selectedTabComp.value.value}`].fields
    );
    const filteredFields = computed(() =>
      fields.value.filter((field) => field.code !== "rating")
    );
    const rating = computed(() =>
      fields.value.find((field) => field.code === "rating")
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
    const { checkError } = useCheckError(copyItem, tryAccept);
    const checkValues = () => {
      return sistemsFields.value.some((field) => checkError(field).global);
    };

    const del = () => {
      store.dispatch(`deleteClients${selectedTabComp.value.value}`, {
        id: copyItem.value.id,
      });
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

    const downButtons = ref(null);
    let downButtonsIsVisible = ref(true);
    onMounted(() => {
      downButtonsIsVisible.value = unref(useElementVisibility(downButtons));
    });

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
      filteredFields,
      checkError,
      rating,
      downButtons,
      downButtonsIsVisible,
      t,
      followStep1,
      tabs,
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
.tryAccept {
  @extend .input_error;
}
</style>
