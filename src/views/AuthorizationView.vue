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
      </template>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import { usePhoneCodes } from "../composables/phoneCodes";
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

    return { codes, imask, isCode, submit, isErrorInput, selectPhone };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.v-select {
  :deep(.options) {
    @apply max-w-[100%] max-h-[200px];
  }
}
</style>
