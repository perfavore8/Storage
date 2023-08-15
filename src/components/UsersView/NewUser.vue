<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container p-8 rounded-xl mt-7 min-w-[70%]">
      <div class="header flex flex-row justify-between">
        <h5 class="text-lg text-slate-800 font-semibold">
          Добавление пользователя
        </h5>
        <button class="close" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="main flex flex-col gap-8">
        <form class="grid gap-6">
          <span>Имя</span>
          <input
            type="text"
            class="input"
            :class="{ input_error: errors.name && errors.trySubmit }"
            v-model="form.name"
          />
          <span>Email</span>
          <div class="relative">
            <MaskEmail
              v-model:value="form.email"
              placeholder="Email@example.com"
              class="mask-email input"
              :class="{ 'mask-email--error': errors.email && errors.trySubmit }"
            />
            <transition name="fade">
              <small
                v-if="existingUser.text"
                class="text-red-700 text-sm origin-top absolute top-full left-0"
              >
                {{ existingUser.text }}
              </small>
            </transition>
          </div>
        </form>
      </div>
      <div class="footer flex flex-row justify-end gap-4">
        <button
          class="btn order-0 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="close()"
        >
          Назад
        </button>
        <button class="btn btn_blue" @click="submit()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useValidate } from "@/composables/validate";
import store from "@/store";
export default {
  components: {},
  props: {},
  setup(props, context) {
    const { validateEmail } = useValidate();

    const form = reactive({
      name: "",
      email: "",
    });

    const errors = reactive({
      trySubmit: false,
      name: computed(() => !form.name),
      email: computed(() => !validateEmail(form.email)),
      global: function () {
        return this.name || this.email;
      },
    });

    const existingUser = reactive({
      text: "",
      set: function (name) {
        this.text = `Данный пользователь уже добавлен в этот аккаунт под именем: ${name}`;
      },
      drop: function () {
        this.text = "";
      },
    });

    const submit = async () => {
      if (errors.global()) {
        errors.trySubmit = true;
        return;
      }
      const { success, name } = await store.dispatch("checkLinkUser", {
        email: form.email,
      });
      if (success) {
        existingUser.set(name);
        return;
      }
      const { successAdd } = await store.dispatch("addUser");
      console.log(successAdd);
    };

    const close = () => context.emit("close");

    return { close, form, submit, errors, existingUser };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr 2fr;
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
</style>
