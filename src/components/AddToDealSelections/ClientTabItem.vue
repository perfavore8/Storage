<template>
  <li
    class="flex justify-between px-6 py-5 rounded-xl w-full transition-all relative"
    :class="{
      'bg-slate-100': show,
      'cursor-pointer, hover:bg-slate-50': !alwaysShow,
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
        class="max-w-md min-w-[40%] w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
      >
        <div
          class="flex flex-col pb-3 items-start w-full"
          v-for="field in fields"
          :key="field.code"
        >
          <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
            {{ field.name }}
          </div>
          <div class="text-base font-medium">
            {{ item?.fields?.[field.code] }}
          </div>
        </div>
      </div>
    </template>
    <button
      v-if="alwaysShow || show"
      class="btn absolute top-5 right-4 bg-transparent focus-visible:underline focus-visible:underline-offset-4 hover:underline hover:underline-offset-4"
      @click="unLink()"
    >
      Отвязать
    </button>
  </li>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { useClients } from "@/composables/clients";
export default {
  props: {
    item: Object,
    placeholders: Object,
    fields: Array,
    alwaysShow: Boolean,
  },
  emits: ["unLink"],
  setup(props, context) {
    const { getColor } = useClients();

    const [show, toggle] = useToggle(false);

    const unLink = () => context.emit("unLink");

    return { show, toggle, getColor, unLink };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
