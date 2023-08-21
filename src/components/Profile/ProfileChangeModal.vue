<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container p-8 rounded-xl mt-7 min-w-[50%]">
      <div class="header flex flex-row justify-between">
        <h5 class="text-lg text-slate-800 font-semibold">
          Изменение {{ types.selected.forTitle }}
        </h5>
        <button class="close" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="main flex flex-col gap-8">
        <form class="grid gap-6 items-center">
          <template v-for="(item, idx) in params.order" :key="item">
            <template
              v-if="
                params[item].isCode &&
                ((idx === 0 && !skipFirstStep) ||
                  params[params.order[idx - 1]]?.success)
              "
            >
              <span>
                Код отправленный на
                {{ idx > 0 ? params[params.order[idx - 1]]?.value : login }}:
              </span>
              <div
                class="pinBox relative justify-self-center"
                :class="{ pinBoxDisabled: params[item].success }"
              >
                <input
                  v-model="params[item].value"
                  class="pinEntry"
                  name="token"
                  type="number"
                  min="0"
                  autocomplete="off"
                  :disabled="params[item].success"
                />
                <div
                  class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
                >
                  <transition name="fade">
                    <small
                      v-if="params[item].errors.value"
                      class="text-red-700 text-sm origin-top"
                    >
                      {{ params[item].errors.text || "Что-то пошло не так..." }}
                    </small>
                  </transition>
                </div>
              </div>
            </template>
            <template
              v-if="
                !params[item].isCode &&
                (idx === 0 || params[params.order[idx - 1]]?.success)
              "
            >
              <span>Введите {{ types.selected.textForField }}</span>
              <div v-if="types.selected.value === 'phone'" class="relative">
                <SelectorVue
                  :options_props="codes.list"
                  :selected_option="codes.selected"
                  @select="selectPhone"
                  :disabled="params[item].success"
                />
                <div class="flex gap-2 items-center">
                  <input
                    class="input"
                    type="tel"
                    name="phone-number"
                    :class="{
                      input_error: params[item].errors.value,
                    }"
                    v-model="params[item].value"
                    masked="false"
                    v-mask="imask?.mask"
                    autocomplete="off"
                    :placeholder="imask?.mask"
                    :disabled="params[item].success"
                  />
                  <button
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900 disabled:text-gray-500 disabled:cursor-default disabled:font-medium"
                    v-if="params[item].errors.showReqBtn"
                    :disabled="isLocked || params[item].success"
                    @click="params[item].req()"
                  >
                    Отправить
                    <AppCountDown v-if="isLocked" :initialTime="globalDelay" />
                  </button>
                </div>
                <div
                  class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
                >
                  <transition name="fade">
                    <small
                      v-if="params[item].errors.value"
                      class="text-red-700 text-sm origin-top"
                    >
                      {{ params[item].errors.text || "Что-то пошло не так..." }}
                    </small>
                  </transition>
                </div>
              </div>
              <div
                v-else-if="types.selected.value === 'email'"
                class="flex gap-2 items-center relative"
              >
                <MaskEmail
                  :class="{
                    'mask-email--error': params[item].errors.value,
                  }"
                  v-model:value="params[item].value"
                  placeholder="Example@email.com"
                  :disabled="params[item].success"
                  class="mask-email input"
                />
                <button
                  type="button"
                  class="text-sm font-semibold leading-6 text-gray-900 disabled:text-gray-500 disabled:cursor-default disabled:font-medium"
                  v-if="params[item].errors.showReqBtn"
                  :disabled="isLocked || params[item].success"
                  @click="params[item].req()"
                >
                  Отправить
                  <AppCountDown v-if="isLocked" :initialTime="globalDelay" />
                </button>
                <div
                  class="absolute flex flex-col gap-1 -bottom-1 left-1 translate-y-full"
                >
                  <transition name="fade">
                    <small
                      v-if="params[item].errors.value"
                      class="text-red-700 text-sm origin-top"
                    >
                      {{ params[item].errors.text || "Что-то пошло не так..." }}
                    </small>
                  </transition>
                </div>
              </div>
            </template>
          </template>
        </form>
      </div>
      <div class="footer flex flex-row justify-end gap-4">
        <button
          class="btn order-0 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="close()"
        >
          Назад
        </button>
        <!-- <button class="btn btn_blue" @click="submit()">Сохранить</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import AppCountDown from "@/components/AppCountDown.vue";
import { computed, onMounted, reactive, watch } from "vue";
import { watchThrottled } from "@vueuse/core";
import { useNotification } from "@/composables/notification";
import store from "@/store";
import { usePhoneCodes } from "@/composables/phoneCodes";
import { useValidate } from "@/composables/validate";
import { useLockBtn } from "@/composables/lockBtn";
export default {
  components: { SelectorVue, AppCountDown },
  props: {
    type: { type: String, required: true },
    login: String,
    skipFirstStep: { type: Boolean, required: false },
  },
  setup(props, context) {
    const { addNotification } = useNotification();
    const { validateEmail } = useValidate();
    const globalDelay = 30000;
    const { isLocked, lockBtn, handleUnLock } = useLockBtn(
      "timer",
      globalDelay
    );

    const types = reactive({
      selected: {},
      list: [
        {
          id: 1,
          forTitle: "почты",
          textForField: "новую почту",
          value: "email",
          countAuthentication: 2,
        },
        {
          id: 2,
          forTitle: "номера телефона",
          textForField: "новый номер телефона",
          value: "phone",
          countAuthentication: 2,
        },
      ],
      select: function (value) {
        const el = this.list.find((el) => el.value === value);
        if (el) this.selected = el;
      },
    });
    types.select(props.type);

    const params = reactive({
      code1: {
        value: null,
        isCode: true,
        success: props.skipFirstStep || false,
        errors: {
          value: false,
          text: "",
        },
        countTry: 0,
        req: async function () {
          const { success, message } = await store.dispatch(
            "profileCheckChange",
            {
              mode: types.selected.value,
              code: this.value,
              login: props.login,
              isNew: false,
              isConfirm: true,
            }
          );
          this.errors.text = message || "";
          this.errors.value = !success;
          if (!success) {
            return;
          }
          this.success = true;
          if (types.selected.countAuthentication !== 1) return;
          close();
        },
        setWatcher: function () {
          watch(
            () => this.value,
            () => {
              if (this.value > 999999) this.value = Math.floor(this.value / 10);
            }
          );
          watchThrottled(
            () => this.value,
            () => {
              if (this.value?.toString()?.length === 6) {
                if (this.countTry > 9) {
                  addNotification(
                    3,
                    "Изменение " + types.selected.forTitle,
                    "Вы использовали слишком много попыток ввода кода"
                  );
                  close();
                }
                this.req();
                this.countTry += 1;
              }
            },
            { throttle: 3000 }
          );
        },
      },
      field: {
        value: "",
        success: false,
        errors: {
          showReqBtn: computed(() => {
            if (types.selected.value === "phone")
              return (
                deleteOther(params.field.value).length ===
                deleteOther(codes.selected.phone).length
              );
            if (types.selected.value === "email")
              return validateEmail(params.field.value);
            return false;
          }),
          value: false,
          text: "",
        },
        req: async function () {
          lockBtn();
          const { success, message } = await store.dispatch(
            "profileCheckChange",
            {
              mode: types.selected.value,
              login:
                types.selected.value === "phone"
                  ? deleteOther(this.value)
                  : this.value,
              isNew: true,
              isConfirm: false,
            }
          );
          this.errors.text = message || "";
          this.errors.value = !success;
          if (!success) {
            handleUnLock();
            return;
          }
          this.success = true;
        },
      },
      code2: {
        value: null,
        isCode: true,
        success: false,
        errors: {
          value: false,
          text: "",
        },
        countTry: 0,
        req: async function () {
          const { success, message } = await store.dispatch(
            "profileCheckChange",
            {
              mode: types.selected.value,
              code: this.value,
              login:
                types.selected.value === "phone"
                  ? deleteOther(params.field.value)
                  : params.field.value,
              isNew: true,
              isConfirm: true,
            }
          );
          this.errors.text = message || "";
          this.errors.value = !success;
          if (!success) {
            return;
          }
          this.success = true;
          if (types.selected.countAuthentication !== 2) return;
          addNotification(1, "Изменение " + types.selected.forTitle, "Успешно");
          close();
        },
        setWatcher: function () {
          watch(
            () => this.value,
            () => {
              if (this.value > 999999) this.value = Math.floor(this.value / 10);
            }
          );
          watchThrottled(
            () => this.value,
            () => {
              if (this.value?.toString()?.length === 6) {
                if (this.countTry > 9) {
                  addNotification(
                    3,
                    "Изменение " + types.selected.forTitle,
                    "Вы использовали слишком много попыток ввода кода"
                  );
                  close();
                }
                this.req();
                this.countTry += 1;
              }
            },
            { throttle: 3000 }
          );
        },
      },
      order: ["code1", "field", "code2"],
    });

    onMounted(() => {
      if (!props.skipFirstStep)
        store.dispatch("profileCheckChange", {
          mode: types.selected.value,
          login:
            types.selected.value === "phone"
              ? deleteOther(props.login)
              : props.login,
          isNew: false,
          isConfirm: false,
        });
    });

    const addWatchers = () => {
      Object.keys(params).forEach((key) => {
        const item = params[key];
        if (!params[key].isCode) return;
        item?.setWatcher();
      });
    };
    addWatchers();

    const imask = reactive({
      mask: Number,
    });
    const { codes, deleteOther } = usePhoneCodes();
    const selectPhone = (option) => {
      codes.selected = { ...option, value: 1 };
      params.field.value = "";
      imask.mask = option.phone;
    };
    selectPhone(codes.list[0]);

    const close = () => context.emit("close");

    const submit = () => {
      close();
    };

    return {
      types,
      close,
      submit,
      params,
      imask,
      codes,
      selectPhone,
      isLocked,
      globalDelay,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr auto;
}
.wrapper {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  @include font(400, 16px);
  .backdrop {
    z-index: 259;
  }
  .container {
    position: relative;
    width: fit-content;
    z-index: 260;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.75rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}
.close {
  background: transparent;
  border-radius: 0 5px 5px 0;
  height: 30px;
  width: 30px;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0;
  margin-right: -10px;
  .icon {
    width: inherit;
    height: inherit;
    transition: transform 0.15s ease-in-out;
    @include bg_image("@/assets/cross_black.svg", 60%);
  }
  .icon:hover {
    transform: rotate(90deg);
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

.pinBoxDisabled {
  background-image: url("@/assets/Frame2.png");
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
.v-select {
  width: 100%;
  margin-bottom: 8px;
  :deep(.options) {
    @apply max-w-[100%] max-h-[200px] md:max-w-fit md:max-h-[300px];
  }
}
</style>
