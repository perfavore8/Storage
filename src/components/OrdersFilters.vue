<template>
  <div class="flex flex-col gap-2">
    <div class="filters">
      <div
        class="item"
        :class="{ item_wide: filter.type == 14 }"
        v-for="(filter, idx) in filtersValue"
        :key="idx"
      >
        <div class="title">
          {{ filter.name }}
        </div>
        <filter-number
          v-if="filter.type == 1 || filter.type == 2"
          :item="filter"
          :idx="idx"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <filter-text
          v-if="filter.type == 3 || filter.type == 4"
          :item="filter"
          :idx="idx"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <filter-list
          v-if="filter.type == 5 || filter.type == 6"
          :item="filter"
          :idx="idx"
          :selector_options="filter.selector_options"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <filter-list
          v-if="filter.type == 12"
          :item="filter"
          :idx="idx"
          :selector_options="filter.selector_options"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <filter-date
          v-if="filter.type == 7 || filter.type == 8"
          :item="filter"
          :idx="idx"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <filter-flag
          v-if="filter.type == 9"
          :item="filter"
          :idx="idx"
          @change_filter_value="(val) => change_filter_value(val, idx)"
        />
        <AppInputSelect
          v-if="filter.type == 14"
          :list="filter.selector_options"
          :countLettersReq="filter.minLength"
          @changeInputValue="(value) => changeInputValue(value, filter)"
          @select="(item) => selectField(item, filter)"
          @focusin="filter.inFocus = true"
          @focusout="filter.inFocus = false"
        />
        <div class="selected" v-if="filter.value.length && filter.type === 14">
          <div
            v-for="(item, idx) in filter.value"
            :key="item.value"
            class="item"
            @click="deleteField(filter, idx)"
          >
            {{ item.value }}
            <div class="icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="btns self-end">
      <button class="btn btn_blue" @click="apply()">Применить</button>
      <button class="btn btn_grey" @click="clearAllFields()">Очистить</button>
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
        code: "date_create",
        type: 7,
        value: "~",
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
        code: "status",
        type: 12,
        value: [],
        selector_options: [
          {
            name: "Открытый",
            value: 1,
          },
          {
            name: "Закрытый",
            value: 0,
          },
          // {
          //   name: "Отмененный",
          //   value: 3,
          // },
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
    const selectField = (item, filter) => {
      if (!filter.value.some((el) => el.value == item.value))
        filter.value.push(item);
    };

    const deleteField = (filter, idx) => filter.value.splice(idx, 1);

    const change_filter_value = (value, idx) => {
      Object.assign(filtersValue[idx], value);
    };

    const apply = () => {
      const filter = {};

      const date_create_from = filtersValue
        .find((el) => el.code === "date_create")
        .value?.split("~")[0];
      if (date_create_from) filter.date_create_from = date_create_from;

      const date_create_to = filtersValue
        .find((el) => el.code === "date_create")
        .value?.split("~")[1];
      if (date_create_to) filter.date_create_to = date_create_to;

      const responsible_id = [];
      filtersValue
        .find((el) => el.code === "responsible")
        ?.value?.forEach((resp) =>
          resp.id ? responsible_id.push(resp.id) : null
        );
      if (responsible_id) filter.responsible_id = responsible_id;

      const status_id = [];
      filtersValue
        .find((el) => el.code === "status")
        ?.value?.forEach((stat) => (stat !== "" ? status_id.push(stat) : null));
      if (status_id) filter.status_id = status_id;
    };
    const clearAllFields = () => {
      filtersValue.map((filter) => {
        if (filter.type === 1 || filter.type === 1) filter.value = 0;
        if (filter.type === 3 || filter.type === 4) filter.value = "";
        if (
          filter.type === 5 ||
          filter.type === 6 ||
          filter.type === 12 ||
          filter.type === 14
        )
          filter.value = [];
        if (filter.type === 7 || filter.type === 8) filter.value = "~";
        if (filter.type === 9) filter.value = 1;
      });
      apply();
    };

    return {
      filtersValue,
      changeInputValue,
      selectField,
      deleteField,
      change_filter_value,
      apply,
      clearAllFields,
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
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 10px 0;
    background-color: #fff;
    gap: 10px;
    max-width: 200px;
    padding: 8px 16px;
    &_wide {
      max-width: 400px;
    }
    .title {
      @include font(500, 16px, 19px);
    }
    .input-select {
      margin: 0 auto;
      width: 80%;
    }
  }
}
.btns {
  display: flex;
  flex-direction: row;
  justify-self: end;
  .btn:first-child {
    border-radius: 5px 0 0 5px;
  }
  .btn:last-child {
    border-radius: 0 5px 5px 0;
  }
}
.selected {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  span {
    @include font(700, 16px);
  }
  .item {
    cursor: pointer;
    @include font(400, 12px);
    color: white;
    background-color: #6c757d;
    padding: 2px 6px;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    width: min-content;
    white-space: nowrap;

    .icon {
      height: 6px;
      width: 6px;
      @include bg_image("@/assets/cross.svg", 100%);
    }
  }
}
</style>
