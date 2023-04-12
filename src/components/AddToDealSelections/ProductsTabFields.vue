<template>
  <div class="flex flex-col gap-4 justify-center items-center">
    <h2 class="font-semibold text-gray-700 w-full text-start">В РЕЗЕРВЕ</h2>
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
      { label: "Сумма заказа:", value: "12 784 руб." },
      { label: "Себестоимость:", value: "7 286 руб. " },
      { label: "Прибыль:", value: "5 498 руб. " },
      { label: "Сотрудник:", value: "Иванов Иван " },
      { label: "Бонус сотрудника:", value: "1 278 руб. " },
      { label: "Создан:", value: "08.04.2023г." },
    ]);

    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
