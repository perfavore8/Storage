<template>
  <div
    class="ring-1 ring-gray-200 p-8 rounded-3xl"
    :class="{ 'ring-indigo-600 ring-2': item.accent }"
  >
    <h2
      class="text-lg text-gray-900 leading-8 font-semibold"
      :class="{ 'text-indigo-600': item.accent }"
    >
      {{ item.header }}
    </h2>
    <p class="text-gray-600 leading-6 text-sm mt-4">
      {{ item.description }}
    </p>
    <p class="flex gap-1 items-baseline mt-5">
      <span class="text-4xl text-gray-900 tracking-tight font-bold">
        {{ item.price }}
      </span>
      <span class="text-sm text-gray-600 leading-6 font-semibold inline-flex">
        <span>/</span>
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
      @click="item.select()"
      class="cursor-pointer ring-1 ring-inset ring-indigo-200 text-indigo-600 text-sm leading-6 font-semibold text-center py-2 px-3 rounded-md block mt-6"
      :class="{
        'bg-indigo-500 shadow-sm shadow-black/5 text-white': item.accent,
      }"
    >
      Buy plan
    </a>
    <ul class="text-gray-600 text-sm leading-6 mt-8 list-none">
      <li
        class="flex gap-3"
        v-for="advantage in item.advantages"
        :key="advantage.text"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          class="text-indigo-600 flex-none w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clip-rule="evenodd"
          ></path>
        </svg>
        {{ advantage.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { item: Object },
  setup() {},
};
</script>

<style></style>
