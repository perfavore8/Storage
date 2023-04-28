import { reactive } from "vue";

const tabs = reactive({
  selected: {
    name: "Контакты",
    value: "Contacts",
    value2: "contact",
    value3: "contacts",
    oppositeValue: "Company",
    oppositeValue2: "company",
    oppositeValue3: "companies",
  },
  list: [
    {
      name: "Контакты",
      value: "Contacts",
      value2: "contact",
      value3: "contacts",
      oppositeValue: "Company",
      oppositeValue2: "company",
      oppositeValue3: "companies",
    },
    {
      name: "Компании",
      value: "Company",
      value2: "company",
      value3: "companies",
      oppositeValue: "Contacts",
      oppositeValue2: "contact",
      oppositeValue3: "contacts",
    },
  ],
  select: function (option) {
    this.selected = option;
  },
});
export function useClientsTabs() {
  return { tabs };
}
