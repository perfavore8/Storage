<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="row">
      <div class="left">
        <div class="flex flex-col w-full gap-3">
          <div class="filters">
            <component
              v-for="filter in documentsTitles"
              :key="filter.code"
              :is="filter.type"
              v-show="filter?.show?.value || true"
              :list="
                filter.isAutocomplete
                  ? filter.list
                  : filterList(filter.value, filter.list)
              "
              :selected="filter.selected"
              :countLettersReq="filter.minLength"
              :placeholder="filter.placeholder"
              :requestDelay="filter.requestDelay"
              :SelectedInTitle="true"
              :dateRange="filter.selected"
              :inputValue="filter.selected"
              @update:dateRange="(newValue) => (filter.selected = newValue)"
              @update:inputValue="(newValue) => (filter.selected = newValue)"
              @changeInputValue="
                (value) => (
                  (filter.value = value),
                  filter.isAutocomplete ? getAutocompleteList(filter) : null
                )
              "
              @select="
                (item) =>
                  filter.type === 'AppMultiSelect'
                    ? selectMulti(item, filter.code)
                    : (filter.selected = item)
              "
            />
          </div>
        </div>
        <div class="btns">
          <button class="btn btn_blue" @click="apply()">Применить</button>
          <button class="btn btn_grey" @click="clearAllFields()">
            Очистить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDateRange from "./AppDateRange.vue";
import AppInputSelect from "./AppInputSelect.vue";
import AppMultiSelect from "./AppMultiSelect.vue";
import AppInput from "./AppInput.vue";
import { useDocuments } from "../composables/documents";
import store from "@/store";
export default {
  components: { AppInputSelect, AppDateRange, AppInput, AppMultiSelect },

  setup() {
    const { documentsTitles, getDocuments, getAutocompleteList } =
      useDocuments();

    const clearAllFields = () => {
      documentsTitles.value.map((val) => {
        val.value = "";
        val.selected = {};
        if (val.type === "AppDateRange") val.selected = "-";
        if (val.type === "AppInput") val.selected = "";
      });
      apply();
    };
    const apply = () => {
      const filter = {};
      documentsTitles.value.forEach((val) => {
        let res = val.selected?.value;
        if (
          (val.type === "AppDateRange" || val.type === "AppInput") &&
          val.selected !== "-"
        ) {
          res = val.selected;
        } else if (val.code === "status_id") {
          res = val.selected.id;
        }
        filter[val.code] = res;
      });
      store.commit("updateDocumentsFilters", filter);
      getDocuments();
    };

    const filterList = (value, list) => {
      return list.filter((item) =>
        item?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
    };

    const selectMulti = (option, code) => {
      if (option.value === "all") {
        const item = documentsTitles.value?.find((el) => el.code === code);
        item?.list?.forEach((el) => {
          if (el.value !== "all") el.selected = !option.selected;
        });
      }
      option.selected = !option.selected;
    };

    return {
      documentsTitles,
      clearAllFields,
      apply,
      filterList,
      selectMulti,
      getAutocompleteList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
* {
  box-sizing: border-box;
}
.row {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    width: 100%;

    .filters {
      // display: flex;
      // flex-direction: row;
      // flex-wrap: wrap;
      // align-items: center;
      // gap: 10px;
      position: relative;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
      width: 100%;
      // width: 929px;
      > .v-select {
        width: 100%;
      }
      .add_new_button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: -43px;
        cursor: pointer;
        width: 34px;
        height: 34px;
        border: none;
        border-radius: 4px;
        color: #757575;
        > span {
          font-size: 28px;
        }
      }
    }

    // .input-select {
    //   // width: 20%;
    //   z-index: -1;
    // }
    // .date_range {
    //   z-index: -1;
    // }
  }
  .field {
    width: 40%;
    .ref {
      position: relative;
      .input {
        width: 100%;
      }
    }
  }
  .btns {
    width: 40%;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    .btn:first-child {
      border-radius: 5px 0 0 5px;
    }
    .btn:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
}
.selected_row {
  flex-wrap: wrap;
  justify-content: start;
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

      .icon {
        height: 6px;
        width: 6px;
        @include bg_image("@/assets/cross.svg", 100%);
      }
    }
  }
}
</style>
