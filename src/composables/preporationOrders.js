import store from "@/store";
import { useOrdersPipelinesSelect } from "./ordersPipelinesSelect";
import { nextTick, onMounted } from "vue";
import { computed } from "vue";
import { useValidate } from "./validate";
import { ref } from "vue";

const userList = ref([]);

export function usePreparationOrders() {
  const { formatNumber, dateFormater } = useValidate();
  onMounted(async () => {
    if (!userList.value.length) {
      const users = await store.dispatch("getUsersList");
      userList.value = users;
    }
  });

  let pipelines = null;
  nextTick(() => {
    const { pipelines: pip } = useOrdersPipelinesSelect();
    pipelines = pip;
  });

  const statList = [
    {
      name: "Открытый",
      value: 0,
    },
    {
      name: "В резерве",
      value: 1,
    },
    {
      name: "Успешный",
      value: 2,
    },
    {
      name: "Отменен",
      value: 3,
    },
    {
      name: "Удален",
      value: 4,
    },
  ];

  const getValue = (value, code) =>
    value?.[code] || value?.fields?.[code] || "";

  const preparationValueByType = (value, field) => {
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
        if (code === "sum")
          stepRes = String(formatNumber(stepRes)) + " " + value.currency;
        if (code === "budget")
          stepRes = String(formatNumber(stepRes)) + " " + value.currency;
        if (code === "profit")
          stepRes = String(formatNumber(stepRes)) + " " + value.currency;
        if (code === "cost_price")
          stepRes = String(formatNumber(stepRes)) + " " + value.currency;
        if (code === "user") {
          stepRes = userList.value.find(
            (user) => user.id == getValue(value, "user_id")
          )?.name;
        }
        if (code === "status") {
          if (value.lead_id) {
            stepRes = statList.find(
              (el) => el.value == getValue(value, "status")
            )?.name;
          } else {
            stepRes = pipelines.allStatuses.find(
              (el) => el.id == getValue(value, "status_id")
            )?.name;
          }
        }
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
    if (!categories.value.length && !store.state.categories.isLoading)
      store.dispatch("get_fields_properties");
  });

  const prePreparationValueByType = (value, field) => {
    let intermediate = value;
    if (field.type === 1 || field.type === 2) {
      if (!value) intermediate = 0;
      intermediate = Number(value);
      if (field.value === "product_free_4_reserve" ?? value == -1)
        intermediate = "∞";
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
    } else if (field.type === 11) {
      intermediate = formatNumber(
        Number(typeof value === "object" ? value.cost : value)
      );
    }

    return intermediate;
  };

  return { preparationOrder };
}
