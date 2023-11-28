import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

export function useScreenSize() {
  const isSm = computed(() => width.value < 640);

  const { width } = useWindowSize();

  return { isSm };
}
