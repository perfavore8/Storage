<template>
  <div class="row">
    <div class="left">
      <div class="date_range">
        <input type="date" v-model="dateStart" />
        <input type="date" v-model="dateEnd" />
      </div>
      <div
        v-for="field in fields"
        :key="field.id"
        class="field"
        v-show="
          (isClient && field.clientShow) || (!isClient && field.salesShow)
        "
      >
        <div
          :ref="
            (el) =>
              selected_field_autocomplete.field == field.name
                ? (targetAutocomplete = el)
                : null
          "
          v-if="
            (isClient && field?.clientShow) || (!isClient && field?.salesShow)
          "
          class="ref"
        >
          <input
            type="text"
            class="input"
            v-model="field.value"
            :placeholder="field.placeholder"
            @focusin="
              set_selected_field_autocomplete(
                field.name,
                field.value,
                field.minLength
              )
            "
            @focusout="set_selected_field_autocomplete('', '', field.minLength)"
            @input="
              set_selected_field_autocomplete(
                field.name,
                field.value,
                field.minLength
              )
            "
          />
        </div>
      </div>
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
  <teleport
    :to="targetAutocomplete"
    v-if="selected_field_autocomplete_list.length || isLoading"
  >
    <ul class="autocomplete_teleport" v-if="!isLoading">
      <li
        v-for="item in selected_field_autocomplete_list"
        :key="item"
        @click="selectField(item, selected_field_autocomplete.field)"
        class="item"
      >
        {{ item.value }}
      </li>
    </ul>
    <ul class="autocomplete_teleport" v-else>
      <li
        v-for="item in autocompletePlaceholderList"
        :key="item"
        class="placeholder"
      >
        {{ item }}
      </li>
    </ul>
  </teleport>
</template>

<script>
import { nextTick } from "@vue/runtime-core";
export default {
  props: {
    isClient: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      selected_field_autocomplete: {
        idx: null,
        field: "",
        value: "",
        minLength: 0,
      },
      selected_field_autocomplete_list: [],
      autocompletePlaceholderList: ["...", "...", "...", "..."],
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
    selected_field_autocomplete: {
      async handler() {
        clearTimeout(this.timer);
        const verify = () => {
          const complete = this.selected_field_autocomplete;
          return (
            complete.field !== "" &&
            complete.value.length >= complete.minLength &&
            complete.value.split("").at(-1) != " " &&
            complete.value.split("")[0] != " "
          );
        };
        nextTick(() => {
          if (verify()) this.isLoading = true;
        });
        this.timer = setTimeout(async () => {
          this.selected_field_autocomplete_list = [];
          if (verify()) {
            const complete = this.selected_field_autocomplete;
            await this.$store.dispatch("getAutocompleteAnalytics", {
              field: complete.field,
              value: { query: complete.value },
            });
            const list = this.$store.state.analytics.autocomplete;
            if (list != undefined)
              this.selected_field_autocomplete_list = [...list];
          }
          this.isLoading = false;
        }, 500);
      },
      deep: true,
    },
  },
  methods: {
    set_selected_field_autocomplete(field, value, minLength) {
      setTimeout(() => {
        // if (field == "") this.targetAutocomplete = null;
        this.selected_field_autocomplete = {
          field: field,
          value: value,
          minLength: minLength,
        };
      }, 200);
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
      this.fields.map((val) => (val.selected = []));
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
      this.fields.forEach((val) => {
        const list = [];
        val.selected.forEach((value) => list.push(value.value));
        if (
          (this.isClient && val.clientShow) ||
          (!this.isClient && val.salesShow)
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
.autocomplete_teleport {
  position: absolute;
  top: 40px;
  left: 0;
  border-radius: 4px;
  list-style: none;
  max-height: 400px;
  min-height: 40px;
  overflow-y: scroll;
  scrollbar-width: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  scrollbar-width: 0;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 4px;
  z-index: 5;

  box-sizing: border-box;
  .item {
    box-sizing: border-box;
    cursor: pointer;
    height: 40px;
    width: 100%;
    padding: 6px 12px;
    transition: background-color 0.15s ease-out;
    white-space: pre;
  }
  .item:hover {
    background-color: rgb(13 110 253 / 25%);
  }
  .item:last-child {
    border-radius: 0 0 4px 4px;
  }
  .item:first-child {
    border-radius: 4px 4px 0 0;
  }
  .item:active {
    background-color: #3261a7;
  }
  .placeholder {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 8px;
    height: 34px;
    width: 200px;
    margin: 3px;
    @include font(700, 24px);
    color: rgb(100, 100, 100);
    background-color: #edf0f2;
    border-radius: 8px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
  }
}
</style>
