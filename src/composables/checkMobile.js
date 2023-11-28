import { useMouse, usePointer } from "@vueuse/core";
import { computed } from "vue";

const { sourceType } = useMouse();
const { pointerType } = usePointer();
export function useCheckMobile() {
  const type = computed(() => pointerType.value || sourceType.value);

  const isMobile = computed(() => type.value === "touch");

  return { type, isMobile };
}
