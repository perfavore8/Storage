import store from "@/store";
import { computed } from "vue";

const accountIds = [1, 591, 595];
// const accountIds2 = [1, 591, 595, 485];

export const isTest = computed(() =>
  accountIds.includes(store.state.account?.account?.id)
);
export const isTest2 = computed(() => true);
