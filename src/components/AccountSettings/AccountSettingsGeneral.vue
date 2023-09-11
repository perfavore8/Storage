<template>
  <div class="content">
    <div class="block">
      <div class="text">
        <form class="grid gap-6">
          <span>Имя аккаунта</span>
          <input
            type="text"
            class="input"
            v-model="accountName"
            v-if="!(isTest && !currentSetSettingsInFolder.general.changeName)"
          />
          <span v-else>{{ accountName }}</span>
        </form>
      </div>
    </div>
    <div class="block" v-if="false">
      <h6 class="my-9">Этапы резервирования товаров со склада</h6>
      <div class="text">
        <input
          type="checkbox"
          class="checkbox"
          v-model="divideRight"
          id="asd1"
        />
        <label for="asd1">Разделять права</label>
      </div>
    </div>
  </div>
  <div class="footer">
    <BtnsSaveClose @save="save" @close="close" :disabledSave="isLocked" />
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import store from "@/store";
import { useLockBtn } from "@/composables/lockBtn";
import router from "@/router";
import { useRoleSettings } from "@/composables/roleSettings";
import { isTest } from "@/composables/isTest";
export default {
  components: { BtnsSaveClose },
  setup() {
    const { isLocked, lockBtn } = useLockBtn();
    const { currentSetSettingsInFolder } = useRoleSettings("accountSettings");

    const account = computed(() => {
      return store.state.account.account;
    });

    const divideRight = ref(false);
    const accountName = ref("");
    onMounted(() => {
      divideRight.value = Boolean(account.value?.config?.divide_right);
      accountName.value = account.value?.name;
    });

    const save = async () => {
      lockBtn();
      await store.dispatch("update_account", {
        divide_right: divideRight.value,
        name: accountName.value,
      });
      await store.dispatch("get_account");
    };

    const close = () => router.push("/");

    return {
      divideRight,
      accountName,
      account,
      close,
      save,
      isLocked,
      currentSetSettingsInFolder,
      isTest,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr 2fr;
}
.content {
  @include font(400, 16px);
  padding: 0 0 32px;
  border-bottom: 1px solid rgb(226 232 240 / 0.7);
  display: flex;
  flex-direction: column;
  gap: 20px;
  .block {
    display: flex;
    flex-direction: column;
    width: 100%;

    h6 {
      @include font(500, 16px);
    }

    .text {
      display: flex;
      flex-direction: column;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      padding: 16px;
    }
  }
}
.footer {
  display: flex;
  justify-content: end;
  padding: 0 0 32px 50;
}
</style>
