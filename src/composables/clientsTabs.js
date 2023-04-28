import { reactive } from "vue";

const tabs = reactive({
  selected: {
    name: "Компании",
    value: "Company",
    component: "EditCompanySection",
  },
  list: [
    {
      name: "Контакты",
      value: "Contacts",
      component: "EditContactsSection",
    },
    { name: "Компании", value: "Company", component: "EditCompanySection" },
  ],
  select: function (option) {
    this.selected = option;
  },
});
export function useClientsTabs() {
  return { tabs };
}
