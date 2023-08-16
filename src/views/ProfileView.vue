<template>
  <div class="wrapper p-6 w-screen">
    <div class="header pb-8">
      <AppHeader :selectedWH="{ name: 'Заказы', value: 'orders' }" />
    </div>
    <div class="mt-20 max-w-7xl mx-auto">
      <div class="flex flex-row justify-between items-center mb-8">
        <h1 class="text-2xl text-gray-900 font-semibold">Профиль</h1>
      </div>
      <div
        class="main flex flex-col gap-8 items-center rounded-lg ring-1 ring-slate-900/10 px-8 py-32 sm:px-6 sm:py-32 lg:px-8"
      >
        <div class="pagination flex justify-center">
          <AppRadioBtnsGroup
            :selected="pagination.selected"
            :list="pagination.list"
            @select="(op) => pagination.select(op)"
          >
            <template
              v-for="(item, idx) in pagination.list"
              :key="item.value"
              #[`item${idx}`]
            >
              <div
                v-if="item.haveErrors && trySubmit"
                class="w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-0 z-10"
                :style="{
                  'background-color': '#fb718570',
                }"
              >
                <div
                  class="w-2 h-2 rounded-full"
                  :style="{
                    'background-color': '#fb7185ff',
                  }"
                ></div>
              </div>
            </template>
          </AppRadioBtnsGroup>
        </div>
        <div class="max-w-2xl w-full">
          <KeepAlive>
            <component
              :is="pagination.selected.component"
              :user="user.data"
              :trySubmit="trySubmit"
              :ref="(ref) => pagination.saveRef(ref, pagination.selected.value)"
            />
          </KeepAlive>
          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-gray-900"
              @click="user.setData()"
            >
              Сбросить
            </button>
            <button
              type="submit"
              class="btn max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] !font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              @click="submit()"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppRadioBtnsGroup from "@/components/AppRadioBtnsGroup.vue";
import EditUserProfile from "@/components/UsersView/EditUserProfile.vue";
import EditUserChangePassword from "@/components/UsersView/EditUserChangePassword.vue";
import EditUserConfiguration from "@/components/UsersView/EditUserConfiguration.vue";
import { useToggle } from "@vueuse/core";
import store from "@/store";
import { reactive } from "vue";
export default {
  components: {
    AppHeader,
    AppRadioBtnsGroup,
    EditUserProfile,
    EditUserChangePassword,
    EditUserConfiguration,
  },
  setup() {
    const pagination = reactive({
      selected: {},
      list: [
        {
          name: "Профиль",
          value: "profile",
          component: "EditUserProfile",
          ref: null,
          haveErrors: false,
          default: true,
        },
        {
          name: "Изменение пароля",
          value: "changePassword",
          component: "EditUserChangePassword",
          ref: null,
          haveErrors: false,
        },
      ],
      select: function (option) {
        this.selected = option;
      },
      dropToDefault: function () {
        const def = this.list.find((el) => el.default);
        this.select(def);
      },
      saveRef: function (ref, value) {
        if (!ref) return;
        const item = this.list.find((el) => el.value === value);
        if (item.ref) return;
        item.ref = ref;
        this.selected.ref = ref;
      },
    });
    pagination.dropToDefault();

    const user = reactive({
      data: {},
      setData: async function () {
        const data = await store.dispatch("getUser", {
          id: store.state.account.user?.id,
        });
        this.data = data;
      },
    });
    user.setData();

    const close = () => null;

    const [trySubmit, toggleTrySubmit] = useToggle(false);
    const submit = () => {
      let success = true;
      pagination.list.forEach((item) => {
        if (!item.ref) return;
        item.haveErrors = !item.ref?.submit();
        success = success && !item.haveErrors;
      });
      if (success) {
        close();
      } else {
        toggleTrySubmit(true);
      }
    };

    return { pagination, user, trySubmit, toggleTrySubmit, close, submit };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  width: calc(100vw - 8px);
}
</style>
