import { reactive } from "vue";

export function useClientsTabs() {
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

  return { tabs };
}
