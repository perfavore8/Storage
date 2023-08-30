import store from "@/store";
import { computed } from "vue";

const { users } = store.dispatch("getUsersList");

export function useCheckIsMainUser() {
  const isMain = computed(() => users.find((user) => user.is_main));

  return isMain;
}
