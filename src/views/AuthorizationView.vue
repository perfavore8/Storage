<template>
  <div class="w-screen h-screen flex items-start justify-center bg-slate-50">
    <div
      class="w-80 sm:w-96 relative overflow-hidden flex flex-col gap-8 bg-white p-12 items-center shadow-xl rounded-2xl border mt-4 md:mt-24 border-slate-200"
    >
      <img src="@/assets/logo_en_transparent.png" class="w-3/4" />
      <h1 class="font-bold text-3xl text-slate-700 mb-5 mt-4">Авторизация</h1>
      <template v-if="!showPin">
        <div class="flex items-center justify-center min-h-[142px]">
          <div class="h-min flex flex-col gap-5 justify-center relative">
            <template v-if="notificationSystem.selected.value === 'telegram'">
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
                :disabled="isSignUp || showRestorePassword"
              />
              <div class="relative">
                <input
                  class="input"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  name="password"
                  v-model="form.password"
                  :class="{
                    input_error:
                      inputErrors.trySubmit &&
                      inputErrors.password &&
                      !isSignUp,
                  }"
                  :placeholder="'Пароль от GoSklad'"
                  :disabled="isSignUp || showRestorePassword"
                />
                <input
                  type="checkbox"
                  class="checkbox visibility"
                  v-model="showCurrentPassword"
                  id="visibility"
                />
                <label for="visibility" class="text-slate-400">
                  <transition name="modal" mode="out-in">
                    <span
                      class="material-icons-outlined icon"
                      v-if="showCurrentPassword"
                    >
                      visibility
                    </span>
                    <span class="material-icons-outlined icon" v-else>
                      visibility_off
                    </span>
                  </transition>
                </label>
              </div>
            </template>
            <template v-else-if="notificationSystem.selected.value === 'email'">
              <!-- <input
                class="input"
                type="email"
                name="email"
                v-model="form.email"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.email && !isSignUp,
                }"
                :placeholder="'Адресс почты'"
                :disabled="isSignUp || showRestorePassword"
              /> -->
              <MaskEmail
                :class="{
                  'mask-email--error':
                    inputErrors.trySubmit &&
                    inputErrors.email &&
                    (isSignUp || showRestorePassword),
                }"
                v-model:value="form.email"
                placeholder="Example@email.com"
                :disabled="isSignUp || showRestorePassword"
                class="mask-email input"
              />
              <div class="relative">
                <input
                  class="input"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  name="password"
                  v-model="form.password"
                  :class="{
                    input_error:
                      inputErrors.trySubmit &&
                      inputErrors.password &&
                      !isSignUp,
                  }"
                  :placeholder="'Пароль от GoSklad'"
                  :disabled="isSignUp || showRestorePassword"
                />
                <input
                  type="checkbox"
                  class="checkbox visibility"
                  v-model="showCurrentPassword"
                  id="visibility"
                />
                <label for="visibility" class="text-slate-400">
                  <transition name="modal" mode="out-in">
                    <span
                      class="material-icons-outlined icon"
                      v-if="showCurrentPassword"
                    >
                      visibility
                    </span>
                    <span class="material-icons-outlined icon" v-else>
                      visibility_off
                    </span>
                  </transition>
                </label>
              </div>
            </template>
            <template v-else>
              <SelectorVue
                :options_props="codes.list"
                :selected_option="codes.selected"
                @select="selectPhone"
                :disabled="isSignUp || showRestorePassword"
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
                autocomplete="off"
                :placeholder="imask.mask"
                :disabled="isSignUp || showRestorePassword"
              />
              <div class="relative">
                <input
                  class="input"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  name="password"
                  v-model="form.password"
                  :class="{
                    input_error:
                      inputErrors.trySubmit &&
                      inputErrors.password &&
                      !isSignUp,
                  }"
                  :placeholder="'Пароль от GoSklad'"
                  :disabled="isSignUp || showRestorePassword"
                />
                <input
                  type="checkbox"
                  class="checkbox visibility"
                  v-model="showCurrentPassword"
                  id="visibility"
                />
                <label for="visibility" class="text-slate-400">
                  <transition name="modal" mode="out-in">
                    <span
                      class="material-icons-outlined icon"
                      v-if="showCurrentPassword"
                    >
                      visibility
                    </span>
                    <span class="material-icons-outlined icon" v-else>
                      visibility_off
                    </span>
                  </transition>
                </label>
              </div>
            </template>
            <div
              class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
            >
              <a
                class="cursor-pointer underline dark:text-slate-500 hover:no-underline focus:outline-offset-4 text-slate-700 text-sm"
                @click="toggleRestorePassword()"
                :disabled="isSignUp || showRestorePassword"
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
        <div class="w-1/2 flex flex-col gap-4 items-center mt-8 mb-16">
          <AuthBtnsGroup
            class="w-min"
            :notificationSystem="notificationSystem"
            :isSignUp="isSignUp"
            :disabled="isSignUp || showRestorePassword"
          />
          <button
            class="btn btn_blue"
            @click="submit()"
            :disabled="isSignUp || showRestorePassword || isLocked"
          >
            Авторизоваться
          </button>
        </div>
        <div
          class="login flex flex-col gap-8 p-12 pt-[34px] items-center translate-y-5 sm:translate-y-10"
          ref="loginRef"
          :class="{ login_short: !(isSignUp || showRestorePassword) }"
          @click="!showRestorePassword ? toggleSignUp(true) : null"
        >
          <h1 class="font-bold text-3xl text-slate-700 mb-5">
            {{ showRestorePassword ? "Сброс пароля" : "Регистрация" }}
          </h1>
          <div class="flex items-center justify-center min-h-[142px]">
            <div class="h-min flex flex-col gap-5 justify-center relative">
              <input
                class="input"
                type="text"
                name="name"
                v-model="form.name"
                v-if="!showRestorePassword"
                :class="{
                  input_error:
                    inputErrors.trySubmit && inputErrors.name && isSignUp,
                }"
                :placeholder="'Имя'"
                :disabled="!(isSignUp || showRestorePassword)"
              />
              <template v-if="notificationSystem.selected.value === 'telegram'">
                <button
                  class="btn order-0 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-full rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Отправить сообщение боту
                </button>
              </template>
              <template
                v-else-if="notificationSystem.selected.value === 'email'"
              >
                <!-- <input
                  class="input"
                  type="email"
                  name="email"
                  v-model="form.email"
                  :placeholder="'Адресс почты'"
                /> -->
                <MaskEmail
                  :class="{
                    'mask-email--error':
                      inputErrors.trySubmit &&
                      inputErrors.email &&
                      (isSignUp || showRestorePassword),
                  }"
                  v-model:value="form.email"
                  placeholder="Example@email.com"
                  :disabled="!(isSignUp || showRestorePassword)"
                  class="mask-email input"
                />
              </template>
              <template v-else>
                <SelectorVue
                  :options_props="codes.list"
                  :selected_option="codes.selected"
                  @select="selectPhone"
                  :disabled="!(isSignUp || showRestorePassword)"
                />
                <input
                  class="input"
                  type="tel"
                  name="phone-number"
                  :class="{
                    input_error:
                      inputErrors.trySubmit &&
                      inputErrors.phone &&
                      (isSignUp || showRestorePassword),
                  }"
                  v-model="form.phone"
                  masked="false"
                  v-mask="imask.mask"
                  autocomplete="off"
                  :placeholder="imask.mask"
                  :disabled="!(isSignUp || showRestorePassword)"
                />
              </template>
              <div
                class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
              >
                <transition name="fade">
                  <small
                    v-if="isFailAuth"
                    class="text-red-700 text-sm origin-top"
                  >
                    Что-то пошло не так...
                  </small>
                </transition>
              </div>
            </div>
          </div>
          <div class="w-1/2 flex flex-col gap-4 items-center mt-3">
            <AuthBtnsGroup
              :notificationSystem="notificationSystem"
              :isSignUp="isSignUp"
              :disabled="!(isSignUp || showRestorePassword)"
            />
            <button
              class="btn btn_blue"
              @click="submit()"
              :disabled="
                !(isSignUp || showRestorePassword) ||
                isLocked ||
                (isSignUp && notificationSystem.selected.value == 'telegram')
              "
            >
              Отправить
            </button>
          </div>
          <div class="flex justify-center w-full">
            <button
              class="flex justify-center items-center p-2 rounded-full text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
              @click.stop="
                showRestorePassword ? closeRestorePassword() : closeSignUp()
              "
              :disabled="!(isSignUp || showRestorePassword)"
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
          Отправили код на :<br />
          {{
            notificationSystem.selected.value === "email"
              ? form.email
              : form.phone
          }}
        </span>
        <div class="pinBox relative">
          <input
            v-model="phoneCode"
            class="pinEntry"
            name="token"
            type="number"
            min="0"
            autocomplete="off"
          />
          <div
            class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
          >
            <transition name="fade">
              <small v-if="isFailAuth" class="text-red-700 text-sm origin-top">
                Что-то пошло не так...
              </small>
            </transition>
          </div>
        </div>
        <button
          class="btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
          @click="togglePin(false)"
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
import { onClickOutside, useToggle, watchThrottled } from "@vueuse/core";
import store from "@/store";
import { useRedirectToAuth } from "@/composables/BaseURL";
import { useValidate } from "@/composables/validate";
import { useNotification } from "@/composables/notification";
import { useLockBtn } from "@/composables/lockBtn";

export default {
  components: { SelectorVue, AuthBtnsGroup },
  setup() {
    const { checkPath, getCachedToken } = useRedirectToAuth();
    const { addNotification } = useNotification();
    const [showCurrentPassword, toggleCurrentPassword] = useToggle(false);
    const { isLocked, lockBtn } = useLockBtn();

    checkPath();

    const [isSignUp, toggleSignUp] = useToggle(false);
    watch(isSignUp, () => {
      dropErrorInput();
    });

    const loginRef = ref(null);
    onClickOutside(loginRef, () => {
      closeSignUp();
      closeRestorePassword();
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
    const dropFormLogins = () => {
      form.tgLogin = "";
      form.email = "";
      form.phone = "";
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
            (isSignUp.value || showRestorePassword.value) &&
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
    };

    const submit = async () => {
      if (!inputErrors.global()) {
        lockBtn();
        let res = { success: false };
        if (showRestorePassword.value) {
          if (showPin.value) {
            res = await store.dispatch("authRestorePasswordEnd", {
              code: phoneCode.value,
              mode: notificationSystem.selected.mode,
              login:
                notificationSystem.selected.value === "email"
                  ? form.email
                  : deleteOther(form.phone),
            });
          } else {
            res = await store.dispatch("authRestorePassword", {
              mode: notificationSystem.selected.mode,
              login:
                notificationSystem.selected.value === "email"
                  ? form.email
                  : deleteOther(form.phone),
            });
          }
          tryRestorePassword(res.success);
          if (!res.success && phoneCode.value) {
            toggleFailAuth(true);
            return;
          } else if (res.success && phoneCode.value) {
            addNotification(
              1,
              "Сброс пароля",
              "Мы выслали вам новый пароль на: " +
                (notificationSystem.selected.value === "email"
                  ? form.email
                  : form.phone)
            );
            return;
          } else if (res.success && !phoneCode.value) {
            addNotification(
              0,
              "Сброс пароля",
              "Мы выслали вам код подтверждения на: " +
                (notificationSystem.selected.value === "email"
                  ? form.email
                  : form.phone)
            );
            return;
          }
        } else if (isSignUp.value) {
          res = await store.dispatch("authRegistration", {
            mode: notificationSystem.selected.mode,
            login:
              notificationSystem.selected.value === "email"
                ? form.email
                : deleteOther(form.phone),
            name: form.name,
          });
          if (res.success) {
            addNotification(
              1,
              "Регистрация",
              "Вы зарегистрированы смотрите пароль на: " +
                (notificationSystem.selected.value === "email"
                  ? form.email
                  : form.phone)
            );
            closeSignUp();
          }
        } else {
          res = await store.dispatch("authLogin", {
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
          }
        }
        if (!res.success) toggleFailAuth(true);
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
        {
          name: "",
          value: "telegram",
          iconUrl:
            "https://okeygeek.ru/wp-content/uploads/2020/08/telegram-2048x2048.png",
          formReqFields: ["tgLogin"],
        },
        {
          name: "",
          value: "whatsapp",
          mode: "phone",
          default: true,
          iconUrl:
            "https://cdn.icon-icons.com/icons2/2108/PNG/512/whatsapp_icon_130788.png",
          iconSize: "28px",
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
        dropFormLogins();
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

    const countTryPhoneCode = ref(0);
    const phoneCode = ref(null);
    watch(phoneCode, () => {
      if (phoneCode.value > 999999)
        phoneCode.value = Math.floor(phoneCode.value / 10);
    });
    watchThrottled(
      phoneCode,
      () => {
        if (phoneCode.value?.toString()?.length === 6) {
          if (countTryPhoneCode.value > 9) {
            togglePin(false);
            closeRestorePassword();
            addNotification(
              3,
              "Сброс пароля",
              "Вы использовали слишком много попыток ввода кода"
            );
          }
          countTryPhoneCode.value += 1;
          submit();
        }
      },
      { throttle: 3000 }
    );

    const [showRestorePassword, toggleRestorePassword] = useToggle(false);
    const closeRestorePassword = () => toggleRestorePassword(false);
    watch(showRestorePassword, () => dropErrorInput());
    const tryRestorePassword = (success) => {
      if (!inputErrors.restorePassword() && success && !showPin.value) {
        togglePin(true);
      } else if (!inputErrors.restorePassword() && success && showPin.value) {
        togglePin(false);
        closeRestorePassword();
      } else {
        inputErrors.trySubmit = true;
      }
    };

    const [showPin, togglePin] = useToggle(false);
    watch(showPin, () => (phoneCode.value = null));

    const [isFailAuth, toggleFailAuth] = useToggle(false);
    watch(
      () => (
        isSignUp.value,
        notificationSystem.selected.value,
        showRestorePassword.value,
        showPin.value
      ),
      () => toggleFailAuth(false),
      { deep: true }
    );
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
      closeRestorePassword,
      dropForm,
      showPin,
      togglePin,
      phoneCode,
      isLocked,
      showCurrentPassword,
      toggleCurrentPassword,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.v-select {
  width: 100%;
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
  height: calc(100% - 70px);
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
    margin-top: -5px;
  }
}
.login_short {
  transition: all 0.4s ease;
  cursor: pointer;
  padding: 1.5rem;
  transform: translateY(calc(100% - 70px));
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

.visibility {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.visibility + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
}
.visibility + label::before {
  content: "";
  display: inline-block;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 0.25em;
  position: absolute;
  border: none;

  // @include bg_image("@/assets/grid.svg", 100%);
  cursor: pointer;
  background: transparent !important;
}
.login_short {
  h1 {
    color: black !important;
  }
  background: #fe701f;
}
.pinBoxDisabled {
  background-image: url("@/assets/Frame2.png");
}
</style>
