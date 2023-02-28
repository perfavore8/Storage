<template>
  <div class="flex flex-col gap-5 w-full">
    <div class="row">
      <div class="left">
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
import { nextTick } from "@vue/runtime-core";
export default {
  components: { AppInputSelect, AppMultiSelect, SelectorVue },
  props: {
    isClient: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selected_field_autocomplete: null,
      selected_field_autocomplete_list: [],
      copySelectedItems: [],
      dateStart: "",
      dateEnd: "",
      fields: [
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
      ],
      multiSelectorData: [
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
              const item = this.multiSelectorData.find((el) => el.id === id);
              item?.list?.forEach((el) => {
                if (el.value !== "all") el.selected = !option.selected;
              });
            }
            option.selected = !option.selected;
          },
        },
      ],
      selectorData: [
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
            const item = this.selectorData.find((el) => el.id == id);
            item ? (item.selected = option) : null;
          },
        },
      ],
    };
  },
  mounted() {
    nextTick(() => {
      this.copySelectedItems = structuredClone(this.selectedItems);
    });
  },
  computed: {
    selectedItems() {
      const arr = [];
      this.fields.forEach((field) => arr.push(field.selected));
      this.multiSelectorData.forEach((field) =>
        arr.push(field.list.some((el) => el.selected))
      );
      this.selectorData.forEach((field) => arr.push(field.selected));
      return arr;
    },
    coincideSelectedItems() {
      return (
        JSON.stringify(this.copySelectedItems) ==
        JSON.stringify(this.selectedItems)
      );
    },
  },
  watch: {
    selected_field_autocomplete() {
      this.selected_field_autocomplete_list = [];
    },
    selectedItems: {
      handler: function () {},
      deep: true,
    },
  },
  methods: {
    createReport() {
      alert("потом будем сохранять шаблон");
    },
    async changeInputValue(value, name) {
      const verify = (value) => {
        return value.split("").at(-1) != " " && value.split("")[0] != " ";
      };
      this.selected_field_autocomplete_list = [];
      if (verify(value) && this.selected_field_autocomplete == name) {
        await this.$store.dispatch("getAutocompleteAnalytics", {
          field: name,
          value: { query: value },
        });
        const list = this.$store.state.analytics.autocomplete;
        if (list != undefined) {
          list.map((item) => (item.name = item.value));
          this.selected_field_autocomplete_list = [...list];
        }
      }
    },
    selectField(item, field) {
      this.fields.forEach((val) => {
        if (
          val.name === field &&
          !val.selected.filter((val) => val.value == item.value).length
        )
          val.selected.push(item);
      });
    },
    deleteField(idx1, idx2) {
      this.fields[idx1].selected.splice(idx2, 1);
    },
    clearAllFields() {
      this.dateStart = "";
      this.dateEnd = "";
      this.fields.map((val) => (val.selected = []));
      this.apply();
    },
    apply() {
      const preparationDate = (date) => {
        const a = date.split("-");
        const b = a[0];
        a.splice(0, 1);
        a.push(b);
        return a.join("/");
      };
      const filter = {
        date:
          preparationDate(this.dateStart) + "-" + preparationDate(this.dateEnd),
      };
      if (filter.date == "-") delete filter.date;
      this.fields.forEach((val) => {
        const list = [];
        val.selected.forEach((value) => list.push(value.value));
        if (
          ((this.isClient && val.clientShow) ||
            (!this.isClient && val.salesShow)) &&
          list != 0
        )
          filter[val.name] = list;
      });
      this.$emit("getFilter", filter);
    },
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

    > .filters {
      // display: flex;
      // flex-direction: row;
      // flex-wrap: wrap;
      // align-items: center;
      // gap: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 10px;
      width: 100%;
      // width: 929px;
      > .v-select {
        width: 100%;
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
