import store from "@/store";
import { useOrdersPipelinesSelect } from "./ordersPipelinesSelect";
import { nextTick } from "vue";
import { computed } from "vue";

export function usePreparationOrders() {
  let pipelines = null;
  nextTick(() => {
    const { pipelines: pip } = useOrdersPipelinesSelect();
    pipelines = pip;
  });

  const getValue = (value, code) =>
    value?.[code] || value?.fields?.[code] || "";

  const dateFormater = (date) => {
    const res = new Date(date);
    // const [dateTime] = date.split(".");
    // const [day, time] = dateTime.split("T");
    // return day + " " + time;
    return res.toLocaleString();
  };

  const preparationValueByType = (value, field) => {
    if (field.code === "status")
      return pipelines.allStatuses.find((el) => el.id == value)?.name;

    if (field.type === 8) return value && dateFormater(value);
    return value;
  };

  const preparationOrder = (value) => {
    const res = {};

    store.getters.preporatedTableConfig.forEach((field) => {
      const [source, code] = field.value.split(/_(.*)/s);
      let stepRes = null;

      if (source === "order") {
        stepRes = getValue(value, code);
      } else if (source === "company") {
        stepRes = getValue(value.company, code);
      } else if (source === "contact") {
        const contacts = [];
        value.contacts?.forEach((contact) =>
          contacts.push(getValue(contact, code))
        );
        stepRes = contacts.join(", ");
      } else if (source === "product") {
        const contacts = [];
        value.positions?.forEach((position) => {
          const val1 = getValue(position, code);
          const val2 = getValue(position.product, code);
          contacts.push(prePreparationValueByType(val1 || val2, field));
        });
        stepRes = contacts.join(", ");
      }

      stepRes = preparationValueByType(stepRes, field);

      if (stepRes !== null && stepRes !== undefined) res[field.value] = stepRes;
    });

    return res;
  };
  const categories = computed(() => store.state.categories.fields_properties);
  nextTick(() => {
    if (!categories.value.length) store.dispatch("get_fields_properties");
  });

  const prePreparationValueByType = (value, field) => {
    let intermediate = value;
    if (field.type === 1 || field.type === 2) {
      if (!value) intermediate = 0;
      intermediate = Number(value);
    } else if (field.type === 3 || field.type === 4) {
      if (!value) intermediate = "";
      intermediate = String(value);
    } else if (field.type === 5 || field.type === 6) {
      if (!value) intermediate = "";
    } else if (field.type === 7 || field.type === 8) {
      if (!value) intermediate = "";
    } else if (field.type === 9) {
      if (!value) intermediate = false;

      if (value == "0") intermediate = false;
      if (value == "1") {
        intermediate = true;
      } else {
        intermediate = Boolean(value);
      }
    } else if (field.type === 12) {
      const cat = categories.value.find((el) => el.id === value);
      if (cat) intermediate = cat.name;
    }

    return intermediate;
  };

  return { preparationOrder };
}
