<template>
  <div class="grid grid-cols-3 justify-items-center w-full mx-auto gap-10 mt-4">
    <div
      class="max-w-md min-w-[40%] w-fit text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
      v-for="col in list"
      :key="col"
    >
      <div
        class="flex flex-col pb-3 items-start w-full"
        v-for="item in col"
        :key="item.label"
      >
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ item.label }}
        </div>
        <div class="text-base font-medium">{{ item.value }}</div>
      </div>
    </div>
    кастомные поля
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      [
        { label: "Название:", value: 'ТОО "Умный Дом"' },
        { label: "Адрес:", value: "г. Алматы, ул. Желтоксан, дом 25, кв. 15" },
        { label: "ИНН:", value: "1234567890" },
        { label: "КПП:", value: "0987654321" },
        { label: "ОГРН(ИП):", value: "112233445566778" },
        { label: "Банк:", value: 'АО "Банк Развития"' },
        { label: "Р/С:", value: "98765432101234567890" },
        { label: "БИК:", value: "044525100" },
        { label: "К/С:", value: "09876543210987654321" },
      ],
      [{ label: "Контактное лицо:", value: "Иванов Иван Иванович" }],
    ]);

    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
