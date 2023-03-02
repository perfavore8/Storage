<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="row">
      <div class="left">
        <div class="flex flex-col w-full gap-3">
          <div class="filters">
            <div class="date_range">
              <input type="date" v-model="dateStart" />
              <span> - </span>
              <input type="date" v-model="dateEnd" />
            </div>
            <AppInputSelect
              :list="selected_field_autocomplete_list"
              :countLettersReq="field.minLength"
              :placeholder="field.placeholder"
              @changeInputValue="(value) => changeInputValue(value, field.name)"
              @select="(item) => selectField(item, field.name)"
              @focusin="selected_field_autocomplete = field.name"
              @focusout="selected_field_autocomplete = null"
              v-for="field in fields"
              :key="field.id"
              v-show="
                (isClient && field.clientShow) || (!isClient && field.salesShow)
              "
            />
            <AppMultiSelect
              v-for="field in multiSelectorData"
              :key="field.id"
              :list="field.list"
              :placeholder="field.placeholder"
              @select="(option) => field.select(option, field.id)"
            />
            <SelectorVue
              v-for="field in selectorData"
              :key="field.id"
              :options_props="field.list"
              :selected_option="field.selected"
              @select="(option) => field.select(option, field.id)"
            />
          </div>
          <div
            class="filters"
            v-for="(filteringSystem, idx) in filteringSystems"
            :key="filteringSystem"
          >
            <div
              class="add_new_button"
              @click="addFilteringSystem()"
              v-if="idx === filteringSystems.length - 1"
            >
              <span class="material-icons-outlined"> add </span>
            </div>
            <AppInputSelect
              :list="
                filteringSystem.filterList(
                  filteringSystem.SystemInputValue,
                  filteringSystem.systems
                )
              "
              :selected="filteringSystem.selectedSystem"
              :countLettersReq="0"
              :placeholder="'Система'"
              :requestDelay="0"
              :SelectedInTitle="true"
              @changeInputValue="filteringSystem.changeSystemInputValue"
              @select="(item) => filteringSystem.selectSystem(item)"
            />
            <AppInputSelect
              v-for="filter in filteringSystem.selectedSystem?.filtersList"
              :key="filter.id"
              v-show="filter.show?.value"
              :list="filteringSystem.filterList(filter.value, filter.list)"
              :selected="filter.selected"
              :countLettersReq="filter.minLength"
              :placeholder="filter.placeholder"
              :requestDelay="0"
              :SelectedInTitle="true"
              @changeInputValue="(value) => (filter.value = value)"
              @select="(item) => (filter.selected = item)"
            />
          </div>
        </div>
        <div class="btns">
          <button class="btn btn_blue" @click="apply()">Применить</button>
          <button
            class="btn btn_yellow"
            v-if="!coincideSelectedItems"
            style="border-radius: 0"
            @click="createReport()"
          >
            Создать шаблон
          </button>
          <button class="btn btn_grey" @click="clearAllFields()">
            Очистить
          </button>
        </div>
      </div>
    </div>
    <div class="row selected_row">
      <div
        class="selected"
        v-for="(field, idx1) in fields"
        :key="field.id"
        v-show="field.selected.length"
      >
        <span>{{ field.placeholder }}: </span>
        <div
          v-for="(item, idx2) in field.selected"
          :key="item"
          class="item"
          @click="deleteField(idx1, idx2)"
        >
          {{ item.value }}
          <div class="icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
import SelectorVue from "./SelectorVue.vue";
import AppMultiSelect from "./AppMultiSelect.vue";
import { useSystems } from "@/composables/systemsForReports";
import {
  computed,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import store from "@/store";
export default {
  components: { AppInputSelect, AppMultiSelect, SelectorVue },
  props: {
    isClient: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const filteringSystems = reactive([useSystems()]);
    const addFilteringSystem = () => filteringSystems.push(useSystems());

    const selected_field_autocomplete = ref(null);
    const selected_field_autocomplete_list = ref([]);
    const copySelectedItems = ref([]);
    const dateStart = ref("");
    const dateEnd = ref("");
    const fields = reactive([
      {
        id: 0,
        name: "product",
        value: "",
        minLength: 3,
        placeholder: "Артикулы/Названия",
        clientShow: false,
        salesShow: true,
        selected: [],
      },
      {
        id: 4,
        name: "responsible",
        value: "",
        minLength: 0,
        placeholder: "Ответственные",
        clientShow: true,
        salesShow: true,
        selected: [],
      },
      {
        id: 1,
        name: "pipeline",
        value: "",
        minLength: 0,
        placeholder: "Воронки",
        clientShow: true,
        salesShow: false,
        selected: [],
      },
      {
        id: 2,
        name: "company",
        value: "",
        minLength: 3,
        placeholder: "Компании",
        clientShow: true,
        salesShow: false,
        selected: [],
      },
      {
        id: 3,
        name: "contact",
        value: "",
        minLength: 3,
        placeholder: "Контакты",
        clientShow: true,
        salesShow: false,
        selected: [],
      },
      {
        id: 5,
        name: "position",
        value: "",
        minLength: 3,
        placeholder: "Позиции",
        clientShow: true,
        salesShow: false,
        selected: [],
      },
    ]);
    const multiSelectorData = reactive([
      {
        type: 6,
        id: 6,
        name: "position",
        list: [
          { name: "Все", value: "all", selected: false },
          { name: "1", value: 1, selected: false },
          { name: "2", value: 2, selected: false },
          { name: "3", value: 3, selected: false },
          { name: "4", value: 4, selected: false },
        ],
        placeholder: "Этапы сделок amoSRM",
        clientShow: true,
        salesShow: false,
        select: (option, id) => {
          if (option.value === "all") {
            const item = multiSelectorData.find((el) => el.id === id);
            item?.list?.forEach((el) => {
              if (el.value !== "all") el.selected = !option.selected;
            });
          }
          option.selected = !option.selected;
        },
      },
    ]);
    const selectorData = reactive([
      {
        type: 6,
        id: 7,
        name: "data",
        selected: { name: "Остатки", value: 1 },
        list: [
          { name: "Остатки", value: 1 },
          { name: "Заказы", value: 2 },
        ],
        clientShow: true,
        salesShow: false,
        select: (option, id) => {
          const item = selectorData.find((el) => el.id == id);
          item ? (item.selected = option) : null;
        },
      },
    ]);

    const selectedItems = computed(() => {
      const arr = [];
      fields.forEach((field) => arr.push(field.selected));
      multiSelectorData.forEach((field) =>
        arr.push(field.list.some((el) => el.selected))
      );
      selectorData.forEach((field) => arr.push(field.selected));
      filteringSystems.forEach((system) => {
        arr.push(system.selectedSystem);
        system?.systems?.forEach((syst) =>
          syst?.filtersList?.forEach((filter) => arr.push(filter.selected))
        );
      });
      return arr;
    });
    const coincideSelectedItems = computed(() => {
      return (
        JSON.stringify(copySelectedItems.value) ==
        JSON.stringify(selectedItems.value)
      );
    });

    onMounted(() => {
      nextTick(() => {
        copySelectedItems.value = structuredClone(selectedItems.value);
      });
    });

    watch(selected_field_autocomplete, () => {
      selected_field_autocomplete_list.value = [];
    });

    const createReport = () => {
      alert("потом будем сохранять шаблон");
    };
    const changeInputValue = async (value, name) => {
      const verify = (value) => {
        return value.split("").at(-1) != " " && value.split("")[0] != " ";
      };
      selected_field_autocomplete_list.value = [];
      if (verify(value) && selected_field_autocomplete.value == name) {
        await store.dispatch("getAutocompleteAnalytics", {
          field: name,
          value: { query: value },
        });
        const list = store.state.analytics.autocomplete;
        if (list != undefined) {
          list.map((item) => (item.name = item.value));
          selected_field_autocomplete_list.value = [...list];
        }
      }
    };
    const selectField = (item, field) => {
      fields.forEach((val) => {
        if (
          val.name === field &&
          !val.selected.filter((val) => val.value == item.value).length
        )
          val.selected.push(item);
      });
    };
    const deleteField = (idx1, idx2) => {
      fields[idx1].selected.splice(idx2, 1);
    };
    const clearAllFields = () => {
      dateStart.value = "";
      dateEnd.value = "";
      fields.map((val) => (val.selected = []));
      apply();
    };
    const apply = () => {
      const preparationDate = (date) => {
        const a = date.split("-");
        const b = a[0];
        a.splice(0, 1);
        a.push(b);
        return a.join("/");
      };
      const filter = {
        date:
          preparationDate(dateStart.value) +
          "-" +
          preparationDate(dateEnd.value),
      };
      if (filter.date == "-") delete filter.date;
      fields.forEach((val) => {
        const list = [];
        val.selected.forEach((value) => list.push(value.value));
        if (
          ((props.isClient && val.clientShow) ||
            (!props.isClient && val.salesShow)) &&
          list != 0
        )
          filter[val.name] = list;
      });
      context.emit("getFilter", filter);
    };

    return {
      selected_field_autocomplete,
      selected_field_autocomplete_list,
      copySelectedItems,
      dateStart,
      dateEnd,
      fields,
      multiSelectorData,
      selectorData,
      coincideSelectedItems,
      createReport,
      changeInputValue,
      selectField,
      deleteField,
      clearAllFields,
      apply,
      ...useSystems(),
      filteringSystems,
      addFilteringSystem,
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
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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

    .input-select {
      // width: 20%;
    }
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
  .date_range {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    margin: 0 3px;
    font-size: 16px;
    input::-webkit-datetime-edit-day-field,
    input::-webkit-datetime-edit-month-field,
    input::-webkit-datetime-edit-year-field {
      background: transparent;
      color: #3f3f3f;
    }
    input::-webkit-datetime-edit-day-field:focus,
    input::-webkit-datetime-edit-month-field:focus,
    input::-webkit-datetime-edit-year-field:focus {
      color: black;
    }
    input:focus {
      outline: 1px solid #c4c4c4;
    }
    input {
      position: relative;
      width: 100%;
      height: 34px;
      background: white;
      border: 1px solid #c4c4c4;
      border-radius: 4px;
      color: #3f3f3f;
      outline: none;
      @include font(400, 16px);
    }
    input::-webkit-datetime-edit-fields-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    input::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      appearance: none;
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
