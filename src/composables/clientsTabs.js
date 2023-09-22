import { reactive } from "vue";
import { useLangConfiguration } from "./langConfiguration";

const { t } = useLangConfiguration();

const tabs = reactive({
  selected: {
    name: t("Clients.tabs.contact"),
    value: "Contacts",
    value2: "contact",
    value3: "contacts",
    oppositeValue: "Company",
    oppositeValue2: "company",
    oppositeValue3: "companies",
  },
  list: [
    {
      name: t("Clients.tabs.contact"),
      value: "Contacts",
      value2: "contact",
      value3: "contacts",
      oppositeValue: "Company",
      oppositeValue2: "company",
      oppositeValue3: "companies",
    },
    {
      name: t("Clients.tabs.company"),
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
