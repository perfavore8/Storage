import { computed } from "vue";

export function useCheckDevMode() {
  const isDev = computed(() => process.env.NODE_ENV === "development");

  return { isDev };
}
