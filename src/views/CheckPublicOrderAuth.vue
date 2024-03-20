<template>
  <div class="w-screen flex justify-center px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg w-full">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        {{ $t("newOrder.gs") }}
      </h1>

      <AppRadioBtnsGroupUnderlined
        :list="type.list"
        :selected="type.selected"
        @select="(val) => type.select(val)"
      />

      <div class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <template v-if="isSignUp">
          <p class="text-center text-lg font-medium">
            {{ $t("newOrder.siya") }}
          </p>
          <div>
            <input
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              type="text"
              name="name"
              v-model="form2.name"
              v-if="!showRestorePassword"
              :class="{
                input_error:
                  inputErrors.trySubmit && inputErrors.name && isSignUp,
              }"
              :placeholder="t('Auth.name')"
            />
          </div>
          <div>
            <template v-if="notificationSystem.selected.value === 'email'">
              <MaskEmail
                :class="{
                  'mask-email--error':
                    inputErrors.trySubmit && inputErrors.email,
                }"
                v-model:value="form2.email"
                placeholder="Example@email.com"
                class="mask-email w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
            </template>
            <template v-else>
              <SelectorVue
                class="select pb-4"
                :options_props="codes.list"
                :selected_option="codes.selected"
                @select="selectPhone"
              />
              <input
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                type="tel"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.phone && !isSignUp,
                }"
                v-model="form2.phone"
                masked="false"
                v-mask="imask.mask"
                autocomplete="off"
                :placeholder="imask.mask"
              />
            </template>
          </div>
          <button
            type="submit"
            @click="submit()"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            {{ $t("newOrder.si") }}
          </button>
        </template>
        <template v-else>
          <p class="text-center text-lg font-medium">
            {{ $t("newOrder.siya") }}
          </p>

          <div>
            <label class="sr-only">{{ $t("newOrder.login") }}</label>

            <div class="relative">
              <input
                autocomplete="off"
                v-model="form.login"
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                :placeholder="t('newOrder.el')"
              />
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">{{ $t("newOrder.p") }}</label>

            <div class="relative">
              <input
                type="password"
                v-model="form.password"
                autocomplete="off"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                :placeholder="t('newOrder.ep')"
              />
            </div>
          </div>

          <button
            type="submit"
            @click="submit()"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            {{ $t("newOrder.si") }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import SelectorVue from "@/components/SelectorVue.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { usePhoneCodes } from "@/composables/phoneCodes";
import { useSaveLS } from "@/composables/saveLS";
import { useValidate } from "@/composables/validate";
import router from "@/router";
import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";

const { saveLSParam } = useSaveLS();

const { t } = useLangConfiguration();

const form = reactive({
  password: "",
  login: "",
});

const submit = async () => {
  const res = await store.dispatch("POLogin", {
    login: form.login,
    pass: form.password,
  });
  if (!res.success) return;
  saveLSParam("POAuth", true);
  saveLSParam("POROKEN", res.access_token);
  router.push("/availablePublicOrderList");
};

const type = reactive({
  selected: { name: "Вход", value: "signin" },
  list: [
    { name: "Вход", value: "signin" },
    { name: "Регистрация", value: "signup" },
  ],
  select: function (val) {
    this.selected = val;
  },
});
const form2 = reactive({
  name: "",
  email: "",
  phone: "",
});
const isSignUp = computed(() => type.selected.value === "signup");

const imask = reactive({
  mask: Number,
});

const { codes, deleteOther } = usePhoneCodes();

const selectPhone = (option) => {
  codes.selected = { ...option, value: 1 };
  form2.phone = "";
  imask.mask = option.phone;
};
selectPhone(codes.list[0]);

const { validateEmail } = useValidate();

const inputErrors = reactive({
  trySubmit: false,
  phone: computed(
    () =>
      deleteOther(form2.phone).length !==
      deleteOther(codes.selected.phone).length
  ),
  name: computed(() => !form2.name),
  email: computed(() => !form2.email || !validateEmail(form2.email)),
  global: function () {
    let res = false;
    if (isSignUp.value) res = res || this.name;
    notificationSystem.selected.formReqFields.forEach((field) => {
      res = res || this?.[field];
    });
    return res;
  },
  restorePassword: function () {
    let res = false;
    notificationSystem.selected.formReqFields.forEach((field) => {
      res = res || this?.[field];
    });
    return res;
  },
});
const dropErrorInput = () => {
  inputErrors.trySubmit = false;
};

const notificationSystem = reactive({
  selected: {},
  list: [
    {
      name: "",
      value: "whatsapp",
      mode: "phone",
      form2: "phone",
      login: computed(() => deleteOther(form2.phone)),
      default: true,
      iconUrl:
        "https://cdn.icon-icons.com/icons2/2108/PNG/512/whatsapp_icon_130788.png",
      iconSize: "28px",
      formReqFields: ["phone", "password"],
    },
    {
      name: "",
      value: "email",
      mode: "email",
      form2: "email",
      login: computed(() => form2.email),
      iconUrl: "https://www.svgrepo.com/show/444193/brand-google-gmail.svg",
      formReqFields: ["email", "password"],
      signUpHide: false,
    },
  ],
  select: function (option) {
    dropErrorInput();
    this.selected = option;
  },
  dropToDefault: function (delay) {
    const defaultItem = this.list.find((el) => el.default);
    if (delay) {
      setTimeout(() => this.select(defaultItem), delay * 1000);
    } else {
      this.select(defaultItem);
    }
  },
});
notificationSystem.dropToDefault();
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.select {
  width: 100%;
  :deep(.title) {
    border: none;
    @apply w-full rounded-lg border-gray-200 h-[52px] p-4 text-sm shadow-sm;
  }
}
</style>
