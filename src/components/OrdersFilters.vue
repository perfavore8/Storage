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
    </div>
  </div>
</template>

<script>
import FilterNumber from "@/components/FiltersSelections/FilterNumber.vue";
import FilterText from "@/components/FiltersSelections/FilterText.vue";
import FilterList from "@/components/FiltersSelections/FilterList.vue";
import FilterDate from "@/components/FiltersSelections/FilterDate.vue";
import FilterFlag from "@/components/FiltersSelections/FilterFlag.vue";
export default {
  components: {
    FilterNumber,
    FilterText,
    FilterList,
    FilterDate,
    FilterFlag,
  },
  setup() {
    const filtersValue = [
      {
        name: "Дата создания",
        type: 7,
        value: "",
      },
      {
        name: "Ответственые",
        type: 3,
        value: "",
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
    ];

    return { filtersValue };
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
  padding: 30px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 1;
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    gap: 10px;
    max-width: 300px;
    .title {
      @include font(500, 16px, 19px);
    }
  }
}
</style>
