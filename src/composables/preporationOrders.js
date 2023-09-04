import store from "@/store";
import { useOrdersPipelinesSelect } from "./ordersPipelinesSelect";
import { nextTick } from "vue";

export function usePreparationOrders() {
  let pipelines = null;
  nextTick(() => {
    const { pipelines: pip } = useOrdersPipelinesSelect();
    pipelines = pip;
  });

  const getValue = (value, code) => value?.[code] || value?.fields?.[code];

  const dateFormater = (date) => {
    const [dateTime] = date.split(".");
    const [day, time] = dateTime.split("T");
    return day + " " + time;
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
        value.contacts.forEach((contact) =>
          contacts.push(getValue(contact, code))
        );
        stepRes = contacts.join(", ");
      }

      stepRes = preparationValueByType(stepRes, field);

      if (stepRes !== null && stepRes !== undefined) res[field.value] = stepRes;
    });

    return res;
  };

  return { preparationOrder };
}
