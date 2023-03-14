<template>
  <div class="w-screen h-screen flex items-start justify-center bg-slate-50">
    <div
      class="w-80 sm:w-96 flex flex-col gap-8 bg-white p-12 items-center shadow-xl rounded-2xl border mt-24 border-slate-200"
    >
      <img src="@/assets/logo_transparent.png" class="w-3/4" />
      <h1 class="font-bold text-3xl text-slate-700 mb-5">Авторизация</h1>
      <template v-if="!isCode">
        <div class="flex flex-col gap-5">
          <SelectorVue
            :options_props="codes.list"
            :selected_option="codes.selected"
            @select="selectPhone"
          />
          <input
            class="input"
            type="tel"
            :class="{ input_error: isErrorInput }"
            v-model="imask.numberModel"
            masked="false"
            v-mask="imask.mask"
            :placeholder="imask.mask"
          />
        </div>
        <div class="w-1/2 flex justify-center mt-5">
          <button class="btn btn_blue" @click="submit()">Отправить код</button>
        </div>
      </template>
      <template v-else>
        <span>
          Отправили сообщение на номер:<br />
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
      </template>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import { usePhoneCodes } from "../composables/phoneCodes";
import { usePhoneCode } from "../composables/phoneCode";
import { reactive, ref } from "vue";

export default {
  components: { SelectorVue },
  setup() {
    const isCode = ref(false);

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

    const isErrorInput = ref(false);

    const submit = () => {
      const checked =
        deleteOther(imask.numberModel).length ==
        deleteOther(codes.selected.phone).length;
      if (checked) {
        isCode.value = true;
      } else {
        isErrorInput.value = true;
      }
    };

    return {
      codes,
      imask,
      isCode,
      submit,
      isErrorInput,
      selectPhone,
      ...usePhoneCode(),
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
</style>
