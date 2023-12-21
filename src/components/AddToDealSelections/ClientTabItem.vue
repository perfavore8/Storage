<template>
  <li
    class="flex flex-col items-start sm:flex-row justify-between max-w-xl p-2 sm:px-6 sm:py-5 rounded-xl w-full transition-all relative mt-1 h-full"
    :class="{
      'bg-slate-100': show,
      'cursor-pointer, hover:bg-slate-50 opacity-80': !alwaysShow,
      'bg-slate-100 !opacity-100': !alwaysShow && !item?.isUnLink,
    }"
    @click="() => (alwaysShow ? null : toggle())"
  >
    <template v-if="!show && !alwaysShow">
      <div class="min-w-0 flex-auto text-left">
        <p class="text-lg font-semibold leading-6 text-gray-800">
          {{ item?.fields?.[placeholders.title] }}
        </p>
        <p class="mt-1 truncate text-sm leading-5 text-gray-500">
          {{ item?.fields?.[placeholders.subTitle] }}
        </p>
      </div>
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-base leading-6 text-gray-900">
          {{ item?.fields?.[placeholders.descriton] }}
        </p>
        <div class="flex flex-row gap-2 items-center mt-1">
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center"
            :style="{
              'background-color':
                getColor(item?.fields?.[placeholders.subDescriton] * 10) + '50',
            }"
          >
            <div
              class="w-2 h-2 rounded-full"
              :style="{
                'background-color':
                  getColor(item?.fields?.[placeholders.subDescriton] * 10) +
                  '99',
              }"
            ></div>
          </div>
          <p class="text-sm leading-5 text-gray-500">
            {{ item?.fields?.[placeholders.subDescriton] }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="min-w-[40%] w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
      >
        <div
          class="flex flex-col pb-3 items-start w-full"
          v-for="field in fields"
          :key="field.code"
        >
          <div
            class="mb-1 text-gray-500 md:text-base dark:text-gray-400 text-left"
          >
            {{ field.name }}
          </div>
          <div class="text-base font-medium text-left">
            {{ item?.fields?.[field.code] }}
          </div>
        </div>
        <div
          class="flex flex-row justify-between items-center pt-2"
          @click.stop=""
          v-if="!item?.isUnLink"
        >
          <input
            type="checkbox"
            class="checkbox"
            :id="item.id"
            v-model="havePublicOrder"
          />
          <label :for="item.id">Публичный заказ</label>
          <div class="flex flex-row gap-2 items-center" v-if="!havePublicOrder">
            <button
              class="p-2 bg-slate-400/90 rounded-xl text-white"
              @click="copyLink(123)"
            >
              <transition name="opacity" mode="out-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  v-if="copied"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M13.488 3.43a.75.75 0 0 1 .081 1.058l-6 7a.75.75 0 0 1-1.1.042l-3.5-3.5A.75.75 0 0 1 4.03 6.97l2.928 2.927l5.473-6.385a.75.75 0 0 1 1.057-.081Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  v-else
                >
                  <path
                    fill="currentColor"
                    d="M9 3.25A5.75 5.75 0 0 0 3.25 9v7.107a.75.75 0 0 0 1.5 0V9A4.25 4.25 0 0 1 9 4.75h7.013a.75.75 0 0 0 0-1.5z"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M18.403 6.793a44.372 44.372 0 0 0-9.806 0a2.011 2.011 0 0 0-1.774 1.76a42.581 42.581 0 0 0 0 9.894a2.01 2.01 0 0 0 1.774 1.76c3.241.362 6.565.362 9.806 0a2.01 2.01 0 0 0 1.774-1.76a42.579 42.579 0 0 0 0-9.894a2.011 2.011 0 0 0-1.774-1.76M8.764 8.284c3.13-.35 6.342-.35 9.472 0a.51.51 0 0 1 .45.444a40.95 40.95 0 0 1 0 9.544a.51.51 0 0 1-.45.444c-3.13.35-6.342.35-9.472 0a.511.511 0 0 1-.45-.444a40.95 40.95 0 0 1 0-9.544a.511.511 0 0 1 .45-.444"
                    clip-rule="evenodd"
                  />
                </svg>
              </transition>
            </button>
            <!-- <button class="p-2 bg-slate-400/90 rounded-xl text-white" @click="follow()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M574 665.4a8.03 8.03 0 0 0-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0c-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 0 0-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 0 0 0 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0c59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 0 0 0 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1M610.1 372.3a8.03 8.03 0 0 0-11.3 0L372.3 598.7a8.03 8.03 0 0 0 0 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3z"
                />
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </template>
    <button
      v-if="alwaysShow || show"
      class="btn absolute -top-2 sm:top-5 right-0 sm:right-4 bg-transparent focus-visible:underline focus-visible:underline-offset-4 hover:underline hover:underline-offset-4"
      @click="item?.isUnLink ? link() : unLink()"
    >
      {{ item?.isUnLink ? "Привязать" : " Отвязать" }}
    </button>
  </li>
</template>

<script>
import { useClipboard, useToggle } from "@vueuse/core";
import { useClients } from "@/composables/clients";
import { computed } from "vue";
export default {
  props: {
    item: Object,
    placeholders: Object,
    fields: Array,
    alwaysShow: Boolean,
    have_public_order: Boolean,
  },
  emits: ["unLink", "link"],
  setup(props, context) {
    const { getColor } = useClients();

    const [show, toggle] = useToggle(false);

    const unLink = () => context.emit("unLink");
    const link = () => context.emit("link");

    const havePublicOrder = computed({
      get: () => props.have_public_order,
      set: (val) => context.emit("togglePublicOrder", val),
    });

    const { copy } = useClipboard();

    const [copied, toggleCopied] = useToggle(false);

    const copyLink = async () => {
      await copy(props.item?.publicLink);
      toggleCopied(true);
      setTimeout(() => toggleCopied(false), 3000);
    };

    return {
      show,
      toggle,
      getColor,
      unLink,
      link,
      havePublicOrder,
      copyLink,
      copied,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
