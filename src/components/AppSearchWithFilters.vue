<template>
  <div class="w-1/2 relative" ref="target">
    <div
      class="seacrh relative w-full"
      @click="toggleFilters(true)"
      @focusin="toggleFilters(true)"
    >
      <AppInput
        v-model:inputValue="searchValue"
        :placeholder="'Поиск и фильтр'"
      />
      <span
        class="material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"
      >
        search
      </span>
    </div>
    <div
      v-show="showFilters"
      class="absolute top-full mt-2 border border-slate-200 bg-white bg-opacity-80 backdrop-blur-md shadow-lg shadow-shark-100 left-1/2 -translate-x-1/2 p-4 rounded-lg w-max max-w-[150%] min-w-full flex flex-col gap-2"
    >
      <div class="filters">
        <div>
          <span class="text-lg font-medium">Системные</span>
          <SearchFiltersGroup
            :filters="baseFilteredfiltersValue"
            @change_filter_value="change_filter_value"
          />
        </div>
        <div>
          <span class="text-lg font-medium">Кастомные</span>
          <AppInputSelect
            :list="spacialFilteredfiltersValueNotSelected"
            :placeholder="'Добавить фильтр'"
            :requestDelay="0"
            :countLettersReq="0"
            @select="(val) => (val.selected = true)"
            @changeInputValue="(val) => (specialFiltersSearchValue = val)"
          />
          <SearchFiltersGroup
            :special="true"
            :filters="specialFilteredfiltersValueSelected"
            @change_filter_value="change_filter_value"
          />
        </div>
      </div>
      <BtnsSaveClose :show_close="false" class="self-end" @save="accept">
        <template v-slot:other_btns>
          <button class="btn bg-transparent" @click="fillFilters()">
            Сбросить
          </button>
        </template>
        <template v-slot:save> Применить </template>
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
import { ref } from "vue";
export default {
  components: {
    AppInput,
    BtnsSaveClose,
    AppInputSelect,
    SearchFiltersGroup,
  },
  setup() {
    const target = ref(null);

    onClickOutside(target, () => toggleFilters(false));

    const [showFilters, toggleFilters] = useToggle();

    return {
      showFilters,
      toggleFilters,
      target,
      ...useSearchFilters(showFilters),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  display: grid;
  grid-template-columns: auto auto;
  justify-items: stretch;
  align-items: start;
  gap: 5px;
  // background-color: rgba(0, 0, 0, 0.05);
}
</style>