<template>
  <div class="w-screen flex justify-center px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg w-full">
      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
        {{ $t("newOrder.gs") }}
      </h1>

      <div class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">{{ $t("newOrder.siya") }}</p>

        <div>
          <label class="sr-only">{{ $t("newOrder.login") }}</label>

          <div class="relative">
            <input
              autocomplete="off"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLangConfiguration } from "@/composables/langConfiguration";
import { useSaveLS } from "@/composables/saveLS";
import router from "@/router";

const { saveLSParam } = useSaveLS();

const { t } = useLangConfiguration();

const submit = () => {
  saveLSParam("POAuth", true);
  router.go(-1);
};
</script>

<style lang="scss" scoped></style>
