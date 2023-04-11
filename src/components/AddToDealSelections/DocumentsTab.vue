<template>456</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const list = reactive([
      { label: "Название:" },
      { label: "Контактное лицо:" },
      { label: "Адрес:" },
      { label: "ИНН:" },
      { label: "КПП:" },
      { label: "ОГРН(ИП):" },
      { label: "Банк:" },
      { label: "Р/С:" },
      { label: "БИК:" },
      { label: "К/С:" },
    ]);

    return { list };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
