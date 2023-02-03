<template>
  <div class="filters">
    <div class="item" v-for="(filter, idx) in filtersValue" :key="idx">
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
      <AppInputSelect
        v-if="filter.type == 14"
        :list="filter.selector_options"
        :countLettersReq="filter.minLength"
        @changeInputValue="(value) => changeInputValue(value, filter)"
        @select="(item) => selectField(item, filter.name)"
        @focusin="filter.inFocus = true"
        @focusout="filter.inFocus = false"
      />
    </div>
  </div>
</template>

<script>
import FilterNumber from "@/components/FiltersSelections/FilterNumber.vue";
import FilterText from "@/components/FiltersSelections/FilterText.vue";
import FilterList from "@/components/FiltersSelections/FilterList.vue";
import FilterDate from "@/components/FiltersSelections/FilterDate.vue";
import FilterFlag from "@/components/FiltersSelections/FilterFlag.vue";
import AppInputSelect from "@/components/AppInputSelect.vue";
import store from "@/store";
import { reactive } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
export default {
  components: {
    FilterNumber,
    FilterText,
    FilterList,
    FilterDate,
    FilterFlag,
    AppInputSelect,
  },
  setup() {
    const filtersValue = reactive([
      {
        name: "Дата создания",
        type: 7,
        value: "",
      },
      {
        name: "Ответственые",
        code: "responsible",
        type: 14,
        minLength: 0,
        inFocus: false,
        value: [],
        selector_options: [],
      },
      {
        name: "Статус заказа",
        type: 5,
        value: [],
        selector_options: [
          {
            name: "Открытый",
            value: 1,
          },
          {
            name: "Закрытый",
            value: 2,
          },
          {
            name: "Отмененный",
            value: 3,
          },
        ],
      },
    ]);

    const itemsInFocus = computed(() => {
      const arr = [];
      filtersValue.forEach((el) => arr.push(el.inFocus));
      return arr;
    });
    watch(itemsInFocus, (newVal, oldVal) => {
      if (oldVal.some((el) => el) && newVal.every((el) => !el))
        filtersValue[oldVal.indexOf(true)].selector_options = [];
    });

    const changeInputValue = async (value, filter) => {
      const verify = (value) => {
        return value.split("").at(-1) != " " && value.split("")[0] != " ";
      };
      const searchFilterByName = (Name) =>
        filtersValue.find((el) => el.name == Name);

      filter.selector_options = [];
      if (verify(value) && searchFilterByName(filter.name).inFocus) {
        await store.dispatch("getAutocompleteAnalytics", {
          field: filter.code,
          value: { query: value },
        });
        const list = store.state.analytics.autocomplete;
        if (list != undefined) {
          list.map((item) => (item.name = item.value));
          filter.selector_options = [...list];
        }
      }
    };
    const selectField = (item, field) => {
      this.fields.forEach((val) => {
        if (
          val.name === field &&
          !val.selected.filter((val) => val.value == item.value).length
        )
          val.selected.push(item);
      });
    };

    return { filtersValue, changeInputValue, selectField };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.filters {
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  // justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.03);
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 1;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 10px 0;
    background-color: #fff;
    gap: 10px;
    max-width: 200px;
    .title {
      @include font(500, 16px, 19px);
    }
    .input-select {
      margin: 0 auto;
      width: 80%;
    }
  }
}
</style>
