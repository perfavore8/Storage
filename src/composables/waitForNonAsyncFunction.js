import { watch } from "vue";

export function waitForNonAsyncFunction(value) {
  return new Promise((resolve) => {
    let watcher = watch(value, () => value.value && resolve(watcher()));
  });
}
