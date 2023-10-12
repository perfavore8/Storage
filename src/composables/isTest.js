import store from "@/store";
import { computed } from "vue";

const accountIds = [1, 591, 595];

export const isTest = computed(() =>
  accountIds.includes(store.state.account?.account?.id)
);
