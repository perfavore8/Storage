<template>
  <div class="content">
    <div class="block">
      <div class="text">
        <form class="grid gap-6">
          <span>{{ $t("AccountSettings.general.accountName") }}</span>
          <input
            type="text"
            class="input"
            v-model="accountName"
            v-if="!(isTest && !currentSetSettingsInFolder.general.changeName)"
          />
          <span v-else>{{ accountName }}</span>
          <span>{{ $t("AccountSettings.general.accountCountry") }}</span>
          <AppInputSelect
            :list="country.list"
            :selected="country.selected"
            :SelectedInTitle="true"
            :requestDelay="0"
            :countLettersReq="0"
            @select="(op) => country.select(op)"
            @changeInputValue="(val) => (country.value = val)"
            id="123"
          />
        </form>
      </div>
    </div>
    <div class="block" v-if="false">
      <h6 class="my-9">{{ $t("AccountSettings.general.steps") }}</h6>
      <div class="text">
        <input
          type="checkbox"
          class="checkbox"
          v-model="divideRight"
          id="asd1"
        />
        <label for="asd1">{{ $t("AccountSettings.general.divide") }}</label>
      </div>
    </div>
  </div>
  <div class="footer">
    <BtnsSaveClose @save="save" @close="close" :disabledSave="isLocked" />
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import store from "@/store";
import { useLockBtn } from "@/composables/lockBtn";
import router from "@/router";
import { useRoleSettings } from "@/composables/roleSettings";
import { isTest } from "@/composables/isTest";
import AppInputSelect from "../AppInputSelect.vue";
import { useCountries } from "@/composables/countries";
export default {
  components: { BtnsSaveClose, AppInputSelect },
  setup() {
    const { list: countriesList } = useCountries();
    const { isLocked, lockBtn } = useLockBtn();
    const { currentSetSettingsInFolder } = useRoleSettings("accountSettings");

    const account = computed(() => {
      return store.state.account.account;
    });

    const divideRight = ref(false);
    const accountName = ref("");
    const country = reactive({
      selected: {},
      value: "",
      list: computed(() =>
        countriesList?.filter((item) =>
          item.name?.toUpperCase()?.includes(country.value?.toUpperCase())
        )
      ),
      select: function (option) {
        this.selected = option;
      },
      setSelected: function (value) {
        const item = this.list.find((el) => el.value == value);
        if (!item) return;
        this.select(item);
      },
    });
    onMounted(() => {
      divideRight.value = Boolean(account.value?.config?.divide_right);
      accountName.value = account.value?.name;
      country.setSelected(account.value?.config?.country);
    });

    const save = async () => {
      lockBtn();
      await store.dispatch("update_account", {
        divide_right: divideRight.value,
        name: accountName.value,
        country: country.selected.value,
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
      country,
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
