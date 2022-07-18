<template>
  <button @click="disabled = !disabled">123</button>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { name: "Число целое", value: 1 },
        { name: "Дробное число", value: 2 },
        { name: "Строка", value: 3 },
        { name: "Текст", value: 4 },
        { name: "Список", value: 5 },
        { name: "Мильтисписок", value: 6 },
        { name: "Дата", value: 7 },
        { name: "Дата-Время", value: 8 },
        { name: "Флаг", value: 9 },
      ],
      selected_option: { name: "Текст", value: 4 },
      disabled: false,
    };
  },
  methods: {
    select(option) {
      Object.assign(this.selected_option, option);
    },
  },
};
</script>

<style></style>
