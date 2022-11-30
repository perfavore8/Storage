<template>
  <div class="row">
    <AppRadioBtnsGroup
      v-for="field in fields"
      :key="field.value"
      :list="field.list"
      :selected="field.selected"
      @select="field.select"
    />
  </div>
</template>

<script>
import AppRadioBtnsGroup from "@/components/AppRadioBtnsGroup.vue";
import { reactive } from "@vue/reactivity";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: { AppRadioBtnsGroup },
  props: {},
  setup(props, context) {
    const { t } = useLangConfiguration();

    const fields = reactive([
      {
        value: "date",
        name: t("Analytics.chartsFilters.type"),
        selected: { name: t("Analytics.chartsFilters.days"), value: "days" },
        list: [
          { name: t("Analytics.chartsFilters.days"), value: "days" },
          { name: t("Analytics.chartsFilters.months"), value: "months" },
          { name: t("Analytics.chartsFilters.years"), value: "years" },
        ],
        select(option) {
          fields[0].selected = option;
          apply();
        },
      },
      {
        value: "type",
        name: t("Analytics.chartsFilters.type"),
        selected: { name: t("Analytics.chartsFilters.total"), value: "total" },
        list: [
          { name: t("Analytics.chartsFilters.total"), value: "total" },
          { name: t("Analytics.chartsFilters.customers"), value: "customers" },
          { name: t("Analytics.chartsFilters.sales"), value: "sales" },
        ],
        select(option) {
          fields[1].selected = option;
          apply();
        },
      },
    ]);

    const apply = () => {
      const filter = {};
      fields.forEach((field) => (filter[field.value] = field.selected.value));
      context.emit("getFilter", filter);
    };

    return { fields };
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
  margin: 0 auto;
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
