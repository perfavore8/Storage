<template>
  <div class="min-w-full w-screen min-h-full h-screen">
    <div class="container w-1/2">
      <table class="text-left">
        <tr>
          <td></td>
          <td v-for="title in data.titles" :key="title.value">
            {{ title.name }}
          </td>
          <td></td>
        </tr>
        <tr v-for="field in data.fields" :key="field.id">
          <td>{{ field.name }}</td>
          <td v-for="title in data.titles" :key="title.value">
            <div class="flex flex-col items-center">
              <div
                v-for="option in field.values"
                :key="option.value"
                class="min-h-[24px]"
              >
                <input
                  type="radio"
                  :id="field.id + title.value + option.value"
                  :value="option.value"
                  v-model="field.selected[title.value].value"
                />
                <label :for="field.id + title.value + option.value">
                  <!-- {{ option.name }} -->
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="flex flex-col items-start">
              <span
                v-for="option in field.values"
                :key="option.value"
                class="min-h-[24px] whitespace-nowrap"
              >
                {{ option.name }}
              </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const data = reactive({
      fields: [
        {
          id: 1312312312,
          name: "Заказы",
          selected: {
            creation: { value: 0, hidden: false },
            viewing: { value: 1, hidden: false },
            editing: { value: 2, hidden: false },
            removal: { value: 3, hidden: false },
          },
          values: [
            { name: "Запрещено", value: 0 },
            { name: "Если ответственный", value: 1 },
            { name: "Для группы", value: 2 },
            { name: "Разрешено", value: 3 },
          ],
        },
      ],
      titles: [
        { name: "Создание", value: "creation" },
        { name: "Просмотр", value: "viewing" },
        { name: "Редактирование", value: "editing" },
        { name: "Удаление", value: "removal" },
      ],
    });

    return { data };
  },
};
</script>

<style lang="scss" scoped>
td {
  padding: 8px;
}
</style>
