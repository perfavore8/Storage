<template>
  <div class="row">
    <div class="left">
      <div class="date_range">
        <input type="date" v-model="dateStart" />
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
    </div>
    <div class="btns">
      <button class="btn btn_blue" @click="apply()">Применить</button>
      <button class="btn btn_grey" @click="clearAllFields()">Очистить</button>
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
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
export default {
  components: { AppInputSelect },
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
      ],
    };
  },
  watch: {
    selected_field_autocomplete() {
      this.selected_field_autocomplete_list = [];
    },
  },
  methods: {
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
  max-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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
  .date_range {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0 3px;
    input {
      position: relative;
      width: 100%;
      height: 27px;
      background: white;
      border: 0.5px solid #c4c4c4;
      border-radius: 4px;
      color: #3f3f3f;
      outline: none;
      @include font(400, 14px, 17px);
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
