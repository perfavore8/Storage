import { useToggle } from "@vueuse/core";

export function useLockBtn(
  globalType = "timer",
  globalDelay = 3000,
  initialValue = false
) {
  // const types = [{ type: "timer" }, { type: "async" }, {type: "asyncWithTimer" }];

  const [isLocked, toggleLock] = useToggle(initialValue);

  const lockBtn = async (type = globalType, delay, promise) => {
    toggleLock(true);
    if (type === "timer")
      setTimeout(() => toggleLock(false), delay || globalDelay);
    if (type === "async" && promise) {
      await promise;
      toggleLock(false);
    }
    if (type === "asyncWithTimer" && promise) {
      setTimeout(async () => {
        await promise;
        toggleLock(false);
      }, delay || globalDelay);
    }
  };

  const handleUnLock = () => toggleLock(false);

  return { isLocked, lockBtn, handleUnLock };
}
