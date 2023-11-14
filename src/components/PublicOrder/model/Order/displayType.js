import { useToggle } from "@vueuse/core";

const [displayTypeIsCard, toggleDisplayType] = useToggle(true);

export function useDisplayType() {
  const dropToDefault = () => toggleDisplayType(true);
  dropToDefault();
  return { displayTypeIsCard, toggleDisplayType, dropToDefault };
}
