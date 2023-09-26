<template>
  <div
    class="ring-1 ring-gray-200 p-8 rounded-3xl relative"
    :class="{
      'ring-indigo-600 ring-2': item.accent,
      'ring-slate-300 ring-2': item.current && !item.accent,
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      class="absolute top-3 right-3 text-green-600"
      v-if="item.current"
    >
      <g fill="currentColor">
        <path
          d="M10.243 16.314L6 12.07l1.414-1.414l2.829 2.828l5.656-5.657l1.415 1.415l-7.071 7.07Z"
        />
        <path
          fill-rule="evenodd"
          d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12Zm11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18Z"
          clip-rule="evenodd"
        />
      </g>
    </svg>
    <h2
      class="text-lg text-gray-900 leading-8 font-semibold"
      :class="{ 'text-indigo-600': item.accent }"
    >
      {{ item.header }}
    </h2>
    <p class="text-gray-600 leading-6 text-sm mt-4">
      {{ item.description }}
    </p>
    <p class="flex gap-1 items-baseline mt-5 relative">
      <small
        class="absolute top-full -translate-y-0.5 left-1 text-xs text-gray-600/80 leading-6 font-semibold inline-flex"
      >
        {{ item.priceSmall }}
      </small>
      <span class="text-4xl text-gray-900 tracking-tight font-bold">
        {{ item.price }}
      </span>
      <span class="text-sm text-gray-600 leading-6 font-semibold inline-flex">
        <span class="mr-0.5">/</span>
        <span v-if="item.period != -1">
          {{ item.period }}
        </span>
        <span v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5l72.3 72.2l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2c-27.3 27.2-64.2 42.5-102.7 42.5C65 416 0 351 0 270.9v-29.8zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8c-44.8 0-81.1 36.3-81.1 81.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8l72.2-72.1zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1v-29.8c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"
            />
          </svg>
        </span>
      </span>
    </p>
    <a
      @click="item.current || item.select()"
      class="cursor-pointer ring-1 ring-inset ring-indigo-200 text-indigo-600 text-sm leading-6 font-semibold text-center py-2 px-3 rounded-md block mt-6"
      :class="{
        'bg-indigo-500 shadow-sm shadow-black/5 text-white': item.accent,
        '!cursor-default text-slate-400': item.current && !item.accent,
        '!cursor-default text-slate-500 bg-indigo-500/70':
          item.current && item.accent,
      }"
    >
      {{ $t("tarifs.buyBtn", { n: Number(item.current) + 1 }) }}
    </a>
    <ol class="text-gray-600 text-sm leading-6 mt-8 list-none">
      <li
        class="flex gap-3"
        v-for="advantage in item.advantages"
        :key="advantage.text"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          viewBox="0 0 20 24"
          fill="currentColor"
          class="text-gray-600 flex-none w-5 h-5"
          v-if="advantage.type === 1"
        >
          <path
            fill="currentColor"
            d="M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          v-else-if="advantage.type === 2"
        >
          <path
            fill="currentColor"
            d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          class="text-indigo-600 flex-none w-5 h-5"
          v-else
        >
          <path
            fill-rule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 650 512"
            v-if="advantage.inf"
          >
            <path
              fill="currentColor"
              d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5l72.3 72.2l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2c-27.3 27.2-64.2 42.5-102.7 42.5C65 416 0 351 0 270.9v-29.8zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8c-44.8 0-81.1 36.3-81.1 81.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8l72.2-72.1zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1v-29.8c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z"
            />
          </svg>
          {{ advantage.text }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: { item: Object },
  setup() {},
};
</script>

<style></style>
