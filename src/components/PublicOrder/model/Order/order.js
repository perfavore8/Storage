import router from "@/router";
import { computed } from "vue";

export const POLIST = [
  "publicOrder",
  "AvailablePublicOrderList",
  "CheckPublicOrderAuth",
  "PublicOrderProfile",
  "/publicOrder",
  "/availablePublicOrderList",
  "/publicOrderAuth",
  "/PublicOrderProfile",
];

export const isPublicOrder = computed(() =>
  POLIST.includes(router?.currentRoute?.value?.name)
);

export function useOrder() {
  return {};
}
