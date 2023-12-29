import store from "@/store";
import { computed } from "vue";

const exceptions = {
  pages: {
    orders: { deny: ["427-74895"] },
    documents: { deny: ["427-74895"] },
    clients: { deny: ["427-74895"] },
  },
  analytics: {
    tabs: {
      customers: { deny: ["427-74895"] },
      sales: { deny: ["427-74895"] },
    },
  },
  remnants: {
    hideAllWhs: ["678"],
    hideService: ["678"],
    mainWhSelected: ["678"],
    hideMainWhs: ["464"],
  },
  names: {
    orders_deals: ["678"],
    remnants_objects: ["678"],
    mainWhs_allObjects: ["678"],
    service_menu: ["464"],
  },
};

const account = computed(() => store?.state?.account);
const onlyAccount = computed(() => `${account.value?.account?.id}`);
const accountUser = computed(
  () => `${account.value?.account?.id}-${account.value?.user?.id}`
);

export const currentExeptions = computed(() => {
  function convertObject(obj) {
    const result = {};

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        result[key] = convertObject(obj[key]);
      } else if (Array.isArray(obj[key])) {
        result[key] =
          obj[key].includes(accountUser.value) ||
          obj[key].includes(onlyAccount.value);
      }
    });

    return result;
  }

  return convertObject(exceptions);
});
