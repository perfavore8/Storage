<template>
  <div class="w-screen h-screen flex items-start justify-center bg-slate-50">
    <div
      class="w-80 sm:w-96 relative overflow-hidden flex flex-col gap-8 bg-white p-12 items-center shadow-xl rounded-2xl border mt-4 md:mt-24 border-slate-200"
    >
      <img src="@/assets/logo_transparent.png" class="w-3/4" />
      <h1 class="font-bold text-3xl text-slate-700 mb-5">Авторизация</h1>
      <template v-if="!showRestorePassword">
        <div class="flex items-center justify-center min-h-[142px]">
          <div class="h-min flex flex-col gap-5 justify-center relative">
            <template v-if="notificationSystem.selected.value === 'telegram'">
              <div class="min-h-[88px]">
                <input
                  class="input"
                  type="text"
                  name="login"
                  v-model="form.tgLogin"
                  :class="{
                    input_error:
                      inputErrors.trySubmit && inputErrors.tgLogin && !isSignUp,
                  }"
                  :placeholder="'Логин в Telegram (@login)'"
                  :disabled="isSignUp"
                />
              </div>
            </template>
            <template v-else-if="notificationSystem.selected.value === 'email'">
              <input
                class="input"
                type="email"
                name="email"
                v-model="form.email"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.email && !isSignUp,
                }"
                :placeholder="'Адресс почты'"
                :disabled="isSignUp"
              />
              <input
                class="input"
                type="password"
                name="password"
                v-model="form.password"
                :class="{
                  input_error:
                    inputErrors.trySubmit &&
                    inputErrors.password &&
                    !isSignUp &&
                    !inputErrors.tryRestorePassword,
                }"
                :placeholder="'Пароль от GoСклад'"
                :disabled="isSignUp"
              />
            </template>
            <template v-else>
              <SelectorVue
                :options_props="codes.list"
                :selected_option="codes.selected"
                @select="selectPhone"
                :disabled="isSignUp"
              />
              <input
                class="input"
                type="tel"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.phone && !isSignUp,
                }"
                v-model="form.phone"
                masked="false"
                v-mask="imask.mask"
                :placeholder="imask.mask"
                :disabled="isSignUp"
              />
              <input
                class="input"
                type="password"
                name="password"
                v-model="form.password"
                :class="{
                  input_error:
                    inputErrors.trySubmit &&
                    inputErrors.password &&
                    !isSignUp &&
                    !inputErrors.tryRestorePassword,
                }"
                :placeholder="'Пароль от GoСклад'"
                :disabled="isSignUp"
              />
            </template>
            <div
              class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
            >
              <a
                class="underline dark:text-slate-500 hover:no-underline focus:outline-offset-4 text-slate-700 text-sm"
                @click="tryRestorePassword()"
                :disabled="isSignUp"
              >
                Восстановить пароль
              </a>
              <transition name="fade">
                <small
                  v-if="isFailAuth"
                  class="text-red-700 text-sm origin-top"
                >
                  Неверный логин или пароль
                </small>
              </transition>
            </div>
          </div>
        </div>
        <div class="w-1/2 flex flex-col gap-4 items-center mt-5 mb-16">
          <AuthBtnsGroup
            class="w-min"
            :notificationSystem="notificationSystem"
            :isSignUp="isSignUp"
            :disabled="isSignUp"
          />
          <button class="btn btn_blue" @click="submit()" :disabled="isSignUp">
            Авторизоваться
          </button>
        </div>
        <div
          class="login flex flex-col gap-8 p-12 pt-[34px] items-center translate-y-5 sm:translate-y-10"
          ref="loginRef"
          :class="{ login_short: !isSignUp }"
          @click="toggleSignUp(true)"
        >
          <h1 class="font-bold text-3xl text-slate-700 mb-5">Регистрация</h1>
          <div class="flex flex-col gap-5 justify-center min-h-[142px]">
            <input
              class="input"
              type="text"
              name="name"
              v-model="form.name"
              :class="{
                input_error:
                  inputErrors.trySubmit && inputErrors.name && isSignUp,
              }"
              :placeholder="'Фамилия Имя'"
              :disabled="!isSignUp"
            />
            <template v-if="notificationSystem.selected.value === 'telegram'">
              <div class="min-h-[88px]">
                <input
                  class="input"
                  type="text"
                  name="login"
                  v-model="form.tgLogin"
                  :class="{
                    input_error:
                      inputErrors.trySubmit && inputErrors.tgLogin && isSignUp,
                  }"
                  :placeholder="'Логин в Telegram (@login)'"
                  :disabled="!isSignUp"
                />
              </div>
            </template>
            <template v-else-if="notificationSystem.selected.value === 'email'">
              <input
                class="input"
                type="email"
                name="email"
                v-model="form.email"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.email && !isSignUp,
                }"
                :placeholder="'Адресс почты'"
                :disabled="!isSignUp"
              />
            </template>
            <template v-else>
              <SelectorVue
                :options_props="codes.list"
                :selected_option="codes.selected"
                @select="selectPhone"
                :disabled="!isSignUp"
              />
              <input
                class="input"
                type="tel"
                name="phone-number"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.phone && isSignUp,
                }"
                v-model="form.phone"
                masked="false"
                v-mask="imask.mask"
                :placeholder="imask.mask"
                :disabled="!isSignUp"
              />
            </template>
          </div>
          <AuthBtnsGroup
            :notificationSystem="notificationSystem"
            :isSignUp="isSignUp"
            :disabled="!isSignUp"
          />
          <div class="w-1/2 flex justify-center mt-3 mb">
            <button
              class="btn btn_blue"
              @click="submit()"
              :disabled="!isSignUp"
            >
              Отправить
            </button>
          </div>
          <div class="flex justify-center w-full">
            <button
              class="flex justify-center items-center p-2 rounded-full text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              @click.stop="closeSignUp()"
              :disabled="!isSignUp"
            >
              <span class="material-icons-outlined text-[#757575]">
                close
              </span>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <span>
          Отправили новый пароль на :<br />
          {{
            notificationSystem.selected.value === "email"
              ? form.email
              : form.phone
          }}
        </span>
        <div class="pinBox" v-if="false">
          <input
            v-model="phoneCode"
            class="pinEntry"
            name="token"
            type="number"
            min="0"
            autocomplete="off"
          />
        </div>
        <button
          class="btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
          @click="toggleRestorePassword(false)"
        >
          Назад
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import AuthBtnsGroup from "@/components/AuthBtnsGroup.vue";
import { usePhoneCodes } from "../composables/phoneCodes";
import { usePhoneCode } from "../composables/phoneCode";
import { computed, reactive, ref, watch } from "vue";
import { onClickOutside, useToggle } from "@vueuse/core";
import store from "@/store";
import { useRedirectToAuth } from "@/composables/BaseURL";
import { useValidate } from "@/composables/validate";

export default {
  components: { SelectorVue, AuthBtnsGroup },
  setup() {
    const { checkPath, getCachedToken } = useRedirectToAuth();

    const [isSignUp, toggleSignUp] = useToggle(false);
    watch(isSignUp, () => {
      dropErrorInput();
      dropForm();
      notificationSystem.dropToDefault(0.3);
    });

    const loginRef = ref(null);
    onClickOutside(loginRef, () => {
      closeSignUp();
    });

    const closeSignUp = () => {
      toggleSignUp(false);
    };

    const form = reactive({
      name: "",
      tgLogin: "",
      email: "",
      password: "",
      phone: "",
    });
    const dropForm = () => {
      Object.keys(form).forEach((key) => (form[key] = ""));
    };

    const imask = reactive({
      mask: Number,
    });

    const { codes, deleteOther } = usePhoneCodes();

    const selectPhone = (option) => {
      codes.selected = { ...option, value: 1 };
      form.phone = "";
      imask.mask = option.phone;
    };
    selectPhone(codes.list[0]);

    const { validateEmail } = useValidate();

    const inputErrors = reactive({
      trySubmit: false,
      tryRestorePassword: false,
      phone: computed(
        () =>
          deleteOther(form.phone).length !==
          deleteOther(codes.selected.phone).length
      ),
      name: computed(() => !form.name),
      tgLogin: computed(() => !form.tgLogin),
      email: computed(() => !form.email || !validateEmail(form.email)),
      password: computed(() => !form.password),
      global: function () {
        let res = false;
        if (isSignUp.value) res = res || this.name;
        notificationSystem.selected.formReqFields.forEach((field) => {
          if (
            isSignUp.value &&
            notificationSystem.selected?.signUpOptionalFields?.includes(field)
          )
            return;
          res = res || this?.[field];
        });
        return res;
      },
      restorePassword: function () {
        let res = false;
        notificationSystem.selected.formReqFields.forEach((field) => {
          if (
            notificationSystem.selected?.signUpOptionalFields?.includes(field)
          )
            return;
          res = res || this?.[field];
        });
        return res;
      },
    });
    const dropErrorInput = () => {
      inputErrors.trySubmit = false;
      inputErrors.tryRestorePassword = false;
    };

    const submit = async () => {
      if (!inputErrors.global()) {
        if (isSignUp.value) {
          closeSignUp();
          await store.dispatch("authRegistration", {
            mode: notificationSystem.selected.mode,
            login:
              notificationSystem.selected.value === "email"
                ? form.email
                : deleteOther(form.phone),
            name: form.name,
          });
        } else {
          const res = await store.dispatch("authLogin", {
            mode: notificationSystem.selected.mode,
            login:
              notificationSystem.selected.value === "email"
                ? form.email
                : deleteOther(form.phone),
            password: form.password,
          });
          if (res.success) {
            getCachedToken();
            checkPath();
          } else {
            toggleFailAuth();
          }
        }
      } else {
        inputErrors.trySubmit = true;
      }
    };

    const notificationSystem = reactive({
      selected: {},
      list: [
        // {
        //   name: "",
        //   value: "amoCrm",
        //   iconUrl: "https://graph.digiseller.ru/img.ashx?idd=3380359",
        // },
        // {
        //   name: "",
        //   value: "telegram",
        //   iconUrl:
        //     "https://okeygeek.ru/wp-content/uploads/2020/08/telegram-2048x2048.png",
        //   formReqFields: ["tgLogin"],
        // },
        {
          name: "",
          value: "whatsapp",
          mode: "phone",
          default: true,
          iconUrl: "https://www.svgrepo.com/show/217789/whatsapp.svg",
          formReqFields: ["phone", "password"],
          signUpOptionalFields: ["password"],
        },
        {
          name: "",
          value: "email",
          mode: "email",
          iconUrl: "https://www.svgrepo.com/show/444193/brand-google-gmail.svg",
          formReqFields: ["email", "password"],
          signUpOptionalFields: ["password"],
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

    const [isFailAuth, toggleFailAuth] = useToggle(false);
    watch(
      () => isSignUp && notificationSystem.selected,
      () => toggleFailAuth(false),
      { deep: true }
    );

    const [showRestorePassword, toggleRestorePassword] = useToggle(false);
    const tryRestorePassword = () => {
      if (!inputErrors.restorePassword()) {
        toggleRestorePassword(true);
      } else {
        inputErrors.trySubmit = true;
        inputErrors.tryRestorePassword = true;
      }
    };

    return {
      form,
      codes,
      imask,
      showRestorePassword,
      toggleRestorePassword,
      submit,
      inputErrors,
      selectPhone,
      ...usePhoneCode(),
      isSignUp,
      toggleSignUp,
      loginRef,
      closeSignUp,
      notificationSystem,
      isFailAuth,
      tryRestorePassword,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.v-select {
  :deep(.options) {
    @apply max-w-[100%] max-h-[200px] md:max-w-fit md:max-h-[300px];
  }
}
.pinBox {
  --width: 289px;
  --height: 49px;
  --spacing: 29px;

  display: inline-block;
  position: relative;
  width: var(--width);
  height: var(--height);
  background-image: url("@/assets/Frame\ 1.png");

  @apply scale-75 sm:scale-100;
}

.pinEntry {
  font-variant-numeric: tabular-nums;
  position: absolute;
  padding-left: 16px;
  padding-top: 1px;
  font-family: "Inter", monospaced;
  font-size: var(--spacing);
  height: var(--height);
  letter-spacing: var(--spacing);
  background-color: transparent;
  border: 0;
  outline: none;
  clip: rect(0px, calc(var(--width) - 16px), var(--height), 0px);
}
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
.login {
  position: absolute;
  bottom: -2px;
  height: calc(100% - 80px);
  // transform: translateY(40px);
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9.7px);
  border: 1px solid rgba(255, 255, 255, 0.97);
  border-radius: 60% / 10%;
  transition: all 0.4s ease;
  > h1 {
    transition: all 0.4s ease;
  }
}
.login_short {
  cursor: pointer;
  padding: 1.5rem;
  transform: translateY(calc(100% - 80px));
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(0px);
  > h1 {
    transform: scale(0.8);
    opacity: 0.8;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
