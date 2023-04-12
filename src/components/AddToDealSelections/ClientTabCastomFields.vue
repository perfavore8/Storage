<template>
  <div class="flex flex-col gap-4 justify-center items-center">
    <h2 class="font-semibold text-gray-700">Кастомные поля</h2>
    <div
      class="max-w-md min-w-[40%] w-fit text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
    >
      <div
        class="flex flex-col pb-3 items-start w-full"
        v-for="item in list"
        :key="item.label"
      >
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ item.label }}
        </div>
        <div class="text-base font-medium">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      { label: "Статус заказа:", value: "Ожидает подтверждения" },
      { label: "Дата доставки:", value: "14.04.2023г." },
      {
        label: "Адрес доставки:",
        value: "г. Москва, ул. Пушкина, д. 10, кв. 50",
      },
      { label: "Телефон клиента:", value: "+7 (123) 456-78-90" },
      {
        label: "Примечание к заказу:",
        value: "Оставить на крыльце, не звонить.",
      },
    ]);

    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
