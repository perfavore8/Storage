<template>
  <div class="w-screen h-screen flex items-start justify-center bg-slate-50">
    <div
      class="w-80 sm:w-96 relative overflow-hidden flex flex-col gap-8 bg-white p-12 items-center shadow-xl rounded-2xl border mt-24 border-slate-200"
    >
      <img src="@/assets/logo_transparent.png" class="w-3/4" />
      <h1 class="font-bold text-3xl text-slate-700 mb-5">Авторизация</h1>
      <template v-if="!showPin">
        <div class="flex flex-col gap-5">
          <SelectorVue
            :options_props="codes.list"
            :selected_option="codes.selected"
            @select="selectPhone"
          />
          <input
            class="input"
            type="tel"
            :class="{
              input_error:
                inputErrors.trySubmit && inputErrors.phone && !isSignUp,
            }"
            v-model="imask.numberModel"
            masked="false"
            v-mask="imask.mask"
            :placeholder="imask.mask"
          />
        </div>
        <AuthBtnsGroup />
        <div class="w-1/2 flex justify-center mt-5 mb-16">
          <button class="btn btn_blue" @click="submit()">Отправить код</button>
        </div>
        <div
          class="login flex flex-col gap-8 p-12 pt-[34px] items-center"
          ref="loginRef"
          :class="{ login_short: !isSignUp }"
          @click="toggleSignUp(true)"
        >
          <h1 class="font-bold text-3xl text-slate-700 mb-5">Регистрация</h1>
          <div class="flex flex-col gap-5">
            <input
              class="input"
              type="text"
              name="name"
              v-model="name"
              :class="{
                input_error:
                  inputErrors.trySubmit && inputErrors.name && isSignUp,
              }"
              :placeholder="'Фамилия Имя'"
            />
            <SelectorVue
              :options_props="codes.list"
              :selected_option="codes.selected"
              @select="selectPhone"
            />
            <input
              class="input"
              type="tel"
              name="phone-number"
              :class="{
                input_error:
                  inputErrors.trySubmit && inputErrors.phone && isSignUp,
              }"
              v-model="imask.numberModel"
              masked="false"
              v-mask="imask.mask"
              :placeholder="imask.mask"
            />
          </div>
          <AuthBtnsGroup />
          <div class="w-1/2 flex justify-center mt-5 mb">
            <button class="btn btn_blue" @click="submit()">
              Отправить код
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <span>
          {{ isSignUp ? name + ", отправили" : "Отправили" }} сообщение на
          номер:<br />
          {{ imask.numberModel }}
        </span>
        <div class="pinBox">
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
import { usePhoneCodes } from "../composables/phoneCodes";
import { usePhoneCode } from "../composables/phoneCode";
import { computed, reactive, ref, watch } from "vue";
import AuthBtnsGroup from "@/components/AuthBtnsGroup.vue";
import { onClickOutside, useToggle } from "@vueuse/core";

export default {
  components: { SelectorVue, AuthBtnsGroup },
  setup() {
    const [showPin, togglePin] = useToggle(false);
    const [isSignUp, toggleSignUp] = useToggle(false);
    watch(isSignUp, () => dropErrorInput());

    const loginRef = ref(null);
    onClickOutside(loginRef, () => {
      toggleSignUp(false);
      name.value = "";
    });

    const name = ref("");

    const imask = reactive({
      mask: Number,
      numberModel: "",
    });

    const { codes, deleteOther } = usePhoneCodes();

    const selectPhone = (option) => {
      codes.selected = { ...option, value: 1 };
      imask.numberModel = "";
      imask.mask = option.phone;
    };
    selectPhone(codes.list[0]);

    const inputErrors = reactive({
      trySubmit: false,
      phone: computed(
        () =>
          deleteOther(imask.numberModel).length !==
          deleteOther(codes.selected.phone).length
      ),
      name: !name.value,
      global: function () {
        return this.phone || (this.name && isSignUp.value);
      },
    });
    const dropErrorInput = () => {
      inputErrors.trySubmit = false;
    };
    const submit = () => {
      if (!inputErrors.global()) {
        togglePin(true);
      } else {
        inputErrors.trySubmit = true;
      }
    };

    return {
      name,
      codes,
      imask,
      showPin,
      togglePin,
      submit,
      inputErrors,
      selectPhone,
      ...usePhoneCode(),
      isSignUp,
      toggleSignUp,
      loginRef,
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
  transform: translateY(40px);
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
</style>
