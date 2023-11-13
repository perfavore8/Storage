import router from "@/router";
import { computed } from "vue";

export const isPublicOrder = computed(
  () => router?.currentRoute?.value?.name === "publicOrder"
);

export function useOrder() {
  return {};
}
