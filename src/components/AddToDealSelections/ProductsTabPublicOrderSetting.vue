<template>
  <div>
    <button
      class="btn order-1 max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
      @click="togglePublicOrderSettings(true)"
    >
      {{ $t("newOrder.makePublic") }}
    </button>
    <transition name="fade">
      <div
        v-if="showPublicOrderSettings"
        class="flex flex-col gap-4 items-start my-5 p-3 ring-1 ring-slate-500/20 rounded-lg origin-top"
      >
        <div class="row">
          <input
            type="checkbox"
            class="checkbox"
            id="change"
            v-model="form.change"
          />
          <label for="change">{{ $t("newOrder.change") }}</label>
        </div>
        <div class="row" v-if="form.change">
          <input
            type="checkbox"
            class="checkbox"
            id="search"
            v-model="form.search"
          />
          <label for="search">{{ $t("newOrder.search") }}</label>
        </div>
        <div class="row" v-if="form.change">
          <input
            type="checkbox"
            class="checkbox"
            id="docs"
            v-model="form.docs"
          />
          <label for="docs">{{ $t("newOrder.docs") }}</label>
        </div>
        <div class="row">
          <span>{{ $t("newOrder.login") }}</span>
          <input
            type="text"
            autocomplete="new-password"
            class="input"
            v-model="form.login"
          />
        </div>
        <div class="row">
          <span>{{ $t("newOrder.password") }}</span>
          <input
            type="password"
            autocomplete="new-password"
            class="input"
            v-model="form.password"
          />
        </div>
        <div class="row !grid grid-cols-2 w-full">
          <button
            class="btn max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-full items-center justify-center rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
            @click="confirm()"
          >
            {{ $t("global.confirm") }}
          </button>
          <button
            class="max-h-[34px] pointer-events-auto relative inline-flex whitespace-nowrap w-full items-center justify-center btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
            @click="togglePublicOrderSettings(false)"
          >
            {{ $t("global.сancel2") }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { reactive } from "vue";
export default {
  setup() {
    const [showPublicOrderSettings, togglePublicOrderSettings] =
      useToggle(false);

    const form = reactive({
      change: true,
      search: false,
      docs: false,
      password: "",
      login: "",
    });

    const confirm = () => console.log(123) || togglePublicOrderSettings(false);

    return {
      showPublicOrderSettings,
      togglePublicOrderSettings,
      form,
      confirm,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.row {
  @apply flex flex-row items-center gap-2;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
