<template>
  <div class="w-1/2 relative z-20" ref="target" @keydown.enter="() => accept()">
    <div
      class="search relative w-full"
      @click="toggleFilters(true)"
      @focusin="toggleFilters(true)"
    >
      <AppInput
        v-model:inputValue="searchValue"
        :placeholder="t('orders.ser')"
      />
      <span
        class="material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"
      >
        search
      </span>
    </div>
    <div
      v-show="showFilters"
      class="absolute top-full mt-2 border border-slate-200 bg-white shadow-lg shadow-shark-100 left-1/2 -translate-x-1/2 p-4 rounded-lg w-full max-w-[150%] sm:min-w-[550px] max-h-[75vh] overflow-y-scroll flex flex-col gap-8"
    >
      <BtnsSaveClose
        :show_close="false"
        class="self-start"
        @save="() => accept()"
      >
        <template v-slot:other_btns>
          <button class="btn bg-transparent order-2" @click="reset()">
            {{ $t("global.drop") }}
          </button>
        </template>
        <template v-slot:save> {{ $t("global.apply2") }} </template>
      </BtnsSaveClose>
      <div
        v-for="source in Config.hasDifferentSources ? Config.sources : 1"
        :key="source"
        class="divide-y divide-solid divide-slate-400/40"
      >
        <h2
          v-if="Config.hasDifferentSources"
          class="font-medium text-lg text-gray-800"
        >
          {{ source.title }}
        </h2>
        <div class="filters grid-cols-1 sm:grid-cols-2 pt-2">
          <div>
            <SearchFiltersGroup
              :filters="
                Config.hasDifferentSources
                  ? splitArrays(baseFilteredfiltersValue)?.[source.title]
                  : baseFilteredfiltersValue
              "
              @change_filter_value="change_filter_value"
            />
          </div>
          <div>
            <AppInputSelect
              v-if="false"
              :list="specialFilteredfiltersValueNotSelected"
              :placeholder="'Добавить фильтр'"
              :requestDelay="100"
              :countLettersReq="0"
              @select="(val) => (val.selected = true)"
              @changeInputValue="(val) => (specialFiltersSearchValue = val)"
              :key="selectedTabComp.value"
            />
            <SearchFiltersGroup
              :special="false"
              :filters="
                Config.hasDifferentSources
                  ? splitArrays(specialFilteredfiltersValueNotSelected)?.[
                      source.title
                    ]
                  : specialFilteredfiltersValueNotSelected
              "
              @change_filter_value="change_filter_value"
            />
          </div>
        </div>
      </div>
      <BtnsSaveClose
        :show_close="false"
        class="self-start"
        @save="() => accept()"
      >
        <template v-slot:other_btns>
          <button class="btn bg-transparent order-2" @click="reset()">
            {{ $t("global.drop") }}
          </button>
        </template>
        <template v-slot:save> {{ $t("global.apply2") }} </template>
      </BtnsSaveClose>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "./BtnsSaveClose.vue";
import AppInputSelect from "./AppInputSelect.vue";
import SearchFiltersGroup from "./SearchFiltersGroup.vue";
import AppInput from "./AppInput.vue";
import { useToggle, onClickOutside } from "@vueuse/core";
import { useSearchFilters } from "@/composables/searchFilters";
import { computed, ref, watchEffect } from "vue";
import { useClientsTabs } from "@/composables/clientsTabs";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: {
    AppInput,
    BtnsSaveClose,
    AppInputSelect,
    SearchFiltersGroup,
  },
  props: { setOfInstructions: String },
  emits: { emitParams: null },
  setup(props, context) {
    const { t } = useLangConfiguration();
    const { tabs } = useClientsTabs();
    const selectedTabComp = computed(() => tabs.selected);

    const target = ref(null);

    onClickOutside(target, () => toggleFilters(false));

    const [showFilters, toggleFilters] = useToggle();

    watchEffect(() =>
      showFilters.value
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto")
    );

    const {
      searchValue,
      change_filter_value,
      fillFilters,
      baseFilteredfiltersValue,
      specialFilteredfiltersValueNotSelected,
      specialFilteredfiltersValueSelected,
      specialFiltersSearchValue,
      confirmFilters,
      dropSearchValue,
      Config,
    } = useSearchFilters(props.setOfInstructions);

    const accept = () => {
      context.emit("emitParams", {
        filter: confirmFilters(),
        q: searchValue,
        page: 1,
      });
      toggleFilters(false);
    };

    const reset = () => {
      fillFilters();
      dropSearchValue();
      context.emit("emitParams", { filter: {}, q: "", page: 1 });
      toggleFilters(false);
    };

    const splitArrays = (arr) => {
      return arr.reduce((acc, item) => {
        const title = item.title;
        if (!acc[title]) acc[title] = [];
        acc[title].push(item);
        return acc;
      }, {});
    };

    return {
      searchValue,
      change_filter_value,
      fillFilters,
      baseFilteredfiltersValue,
      specialFilteredfiltersValueNotSelected,
      specialFilteredfiltersValueSelected,
      specialFiltersSearchValue,
      confirmFilters,
      showFilters,
      toggleFilters,
      target,
      selectedTabComp,
      accept,
      reset,
      Config,
      splitArrays,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  display: grid;
  justify-items: stretch;
  align-items: start;
  gap: 24px;
  // background-color: rgba(0, 0, 0, 0.05);
}
</style>
