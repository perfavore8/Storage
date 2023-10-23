import { reactive } from "vue";

export function useLockBtnByKey() {
  const lockedBtns = reactive({});

  const lockBtn = async (key, promise) => {
    lockedBtns[key] = true;
    await promise;
    lockedBtns[key] = false;
  };

  const isBtnLocked = (key) => Boolean(lockedBtns[key]);

  return { lockBtn, isBtnLocked };
}
