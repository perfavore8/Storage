<template>
  <div class="w-1/2 relative" ref="target">
    <div
      class="seacrh relative w-full"
      @click="toggleFilters(true)"
      @focusin="toggleFilters(true)"
    >
      <AppInput v-model:inputValue="searchValue" />
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
        <template v-for="(filter, idx) in filteredfiltersValue" :key="idx">
          <div class="item bg-transparent">
            <div class="title">
              {{ filter.name }}
            </div>
            <filter-number
              v-if="filter.type == 1 || filter.type == 2"
              :item="filter"
              :idx="idx"
              @change_filter_value="change_filter_value"
            />
            <filter-text
              v-if="filter.type == 3 || filter.type == 4"
              :item="filter"
              :idx="idx"
              @change_filter_value="change_filter_value"
            />
            <filter-list
              v-if="filter.type == 5 || filter.type == 6"
              :item="filter"
              :idx="idx"
              :selector_options="filter.selector_options"
              @change_filter_value="change_filter_value"
            />
            <filter-list
              v-if="filter.type == 12"
              :item="filter"
              :idx="idx"
              :selector_options="categories_options"
              @change_filter_value="change_filter_value"
            />
            <filter-date
              v-if="filter.type == 7 || filter.type == 8"
              :item="filter"
              :idx="idx"
              @change_filter_value="change_filter_value"
            />
            <filter-flag
              v-if="filter.type == 9"
              :item="filter"
              :idx="idx"
              @change_filter_value="change_filter_value"
            />
          </div>
        </template>
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
import FilterNumber from "../components/FiltersSelections/FilterNumber.vue";
import FilterText from "../components/FiltersSelections/FilterText.vue";
import FilterList from "../components/FiltersSelections/FilterList.vue";
import FilterDate from "../components/FiltersSelections/FilterDate.vue";
import FilterFlag from "../components/FiltersSelections/FilterFlag.vue";
import BtnsSaveClose from "../components/BtnsSaveClose.vue";
import AppInput from "./AppInput.vue";
import { useToggle, onClickOutside } from "@vueuse/core";
import { computed, reactive, ref, watch } from "vue";
import store from "@/store";
export default {
  components: {
    AppInput,
    FilterNumber,
    FilterText,
    FilterList,
    FilterDate,
    FilterFlag,
    BtnsSaveClose,
  },
  setup() {
    const searchValue = ref("");
    const target = ref(null);

    onClickOutside(target, () => toggleFilters(false));

    const [showFilters, toggleFilters] = useToggle();
    watch(showFilters, () => (showFilters ? fillFilters() : null));

    const fields = computed(() => store.state.clientsCompany.fields);
    store.dispatch("getClientsCompanyFields");

    const filteredfiltersValue = computed(() =>
      filtersValue.filter((filter) =>
        filter.name.toUpperCase().includes(searchValue.value.toUpperCase())
      )
    );
    const change_filter_value = (new_obj, idx) => {
      Object.assign(filtersValue[idx], new_obj);
    };
    const filtersValue = reactive([]);
    const fillFilters = () => {
      filtersValue.length = 0;
      const copyFields = [];
      fields.value.forEach((val) => {
        let item = {};
        item = { ...val };

        copyFields.push(item);
      });
      copyFields.forEach((val) => {
        const preparation_data = (arr) => {
          const result = [];
          if (arr != null)
            arr.forEach((val, idx) => result.push({ name: val, value: idx }));
          return result;
        };
        let value = null;
        if (val.type == 5 || val.type == 6) {
          value = [];
        }
        if (val.type == 9) {
          value = 1;
        }
        if (val.type == 12) {
          value = [];
        }
        const obj = {
          type: val.type,
          code: val.code,
          option: "=",
          selector_options: preparation_data(val.data),
          value: value,
          name: val.name,
        };
        filtersValue.push(obj);
      });
    };

    return {
      searchValue,
      showFilters,
      toggleFilters,
      target,
      filtersValue,
      filteredfiltersValue,
      change_filter_value,
      fillFilters,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  flex-wrap: wrap;
  gap: 5px;
  // background-color: rgba(0, 0, 0, 0.05);
  .item {
    // max-width: 23%;
    // width: min-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    // justify-content: space-between;
    // flex-grow: 1;
    // border: 1px solid #c9c9c9;
    // border-radius: 5px;
    padding: 12px 5px;
    height: 52px;
    // background-color: #fff;
    gap: 5px;
    .title {
      @include font(500, 16px, 19px);
    }
  }
}
.item:deep(.filter) {
  min-width: 80px;
  width: min-content;
  // max-width: none;
}
</style>
