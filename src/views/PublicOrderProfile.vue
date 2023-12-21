<template>
  <button
    class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-2 top-2 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
    @click="back()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
      />
    </svg>
  </button>
  <div class="w-screen flex justify-center">
    <div
      class="flex flex-col gap-4 items-start my-5 mt-10 p-3 ring-1 ring-slate-500/20 rounded-lg origin-top"
    >
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
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { reactive } from "vue";

const back = () => router.go(-1);

const form = reactive({
  change: true,
  search: false,
  docs: false,
  password: "password",
  login: "",
});
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.row {
  @apply flex flex-col justify-center w-full gap-2;
}
</style>
