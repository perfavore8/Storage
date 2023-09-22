<template>
  <div
    class="old"
    v-if="account?.is_exist_old_data && !account?.is_old_data_loaded"
  >
    <template v-if="account?.is_old_data_load_start">
      <p>
        {{ $t("ostatki.att") }}
      </p>
    </template>
    <template v-else>
      <p>
        {{ $t("ostatki.att2") }}
      </p>
      <button class="btn btn_yellow" @click="importOldData('click')">
        {{ $t("ostatki.d") }}
      </button>
    </template>
  </div>
</template>

<script>
import store from "@/store";
import { computed } from "@vue/runtime-core";

export default {
  emits: ["importComplete"],
  setup(props, context) {
    const account = computed(() => store.state.account.account);
    const importOldData = async (a) => {
      if (
        account.value?.is_exist_old_data &&
        !account.value?.is_old_data_loaded
      ) {
        if (!account.value?.is_old_data_load_start && a == "click")
          await store.dispatch("importOldData");
        if (account.value?.is_old_data_load_start || a == "click") {
          store.dispatch("get_account");
          const interval = setInterval(async () => {
            await store.dispatch("get_account");
            if (
              account.value?.is_old_data_loaded ??
              !account.value?.is_old_data_load_start
            ) {
              clearInterval(interval);
              context.emit("importComplete");
            }
          }, 5000);
        }
      }
    };
    return { account, importOldData };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.old {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 65%;
  margin-right: 5%;
  p {
    margin: 0;
    text-align: left;
    @include font(400, 16px);
  }
}
</style>
