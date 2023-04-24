<template>
  <div v-if="selectedTab" class="flex flex-col gap-4">
    <button class="btn btn_light_dark_blue self-end" @click="add()">
      Добавить
    </button>

    <div class="grid grid-cols-2">
      <ul class="flex flex-col divide-y p-4 divide-gray-100">
        <li
          v-for="item in list"
          :key="item.id"
          class="flex justify-between px-6 py-5 cursor-pointer rounded-xl hover:bg-slate-50"
          :class="{ 'bg-slate-100': selected.id === item.id }"
          @click="() => selected.select(item.id)"
        >
          <div class="min-w-0 flex-auto text-left">
            <p class="text-lg font-semibold leading-6 text-gray-800">
              {{ item.firstName + " " + item.lastName }}
            </p>
            <p class="mt-1 truncate text-sm leading-5 text-gray-500">
              {{ item.phoneNumber }}
            </p>
          </div>
          <div class="sm:flex sm:flex-col sm:items-end">
            <p class="text-base leading-6 text-gray-900">{{ item.position }}</p>
            <p class="mt-1 text-sm leading-5 text-gray-500">
              {{ item.rating }}
            </p>
          </div>
        </li>
      </ul>
      <div class="h-full" @click.self="closeAdd()">
        <component
          :is="selectedTab.component"
          :isNew="addNew"
          v-if="selected.id || addNew"
          @close="closeAdd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditContactsSection from "./EditContactsSection.vue";
import EditCompanySection from "./EditCompanySection.vue";
import { nextTick, reactive, ref } from "vue";
export default {
  components: {
    EditContactsSection,
    EditCompanySection,
  },
  props: {
    selectedTab: { type: Object, required: false },
  },
  setup() {
    const selected = reactive({
      ref: null,
      id: null,
      select: function (id) {
        addNew.value = false;
        nextTick(() => (this.id = id));
      },
    });

    const addNew = ref(false);
    const add = () => {
      selected.ref = null;
      selected.id = null;
      nextTick(() => (addNew.value = true));
    };
    const closeAdd = () => {
      selected.ref = null;
      selected.id = null;
      addNew.value = false;
    };

    const list = reactive([
      {
        id: 123456,
        firstName: "Анастасия",
        lastName: "Иванова",
        position: "менеджер",
        phoneNumber: "123-456-789",
        rating: "8",
      },
      {
        id: 234567,
        firstName: "Алексей",
        lastName: "Петров",
        position: "разработчик",
        phoneNumber: "234-567-890",
        rating: "8",
      },
      {
        id: 345678,
        firstName: "Екатерина",
        lastName: "Сидорова",
        position: "специалист по маркетингу",
        phoneNumber: "345-678-901",
        rating: "8",
      },
      {
        id: 456789,
        firstName: "Дмитрий",
        lastName: "Федоров",
        position: "аналитик",
        phoneNumber: "456-789-012",
        rating: "8",
      },
      {
        id: 567890,
        firstName: "Ирина",
        lastName: "Морозова",
        position: "дизайнер",
        phoneNumber: "567-890-123",
        rating: "8",
      },
      {
        id: 678901,
        firstName: "Максим",
        lastName: "Королев",
        position: "веб-разработчик",
        phoneNumber: "678-901-234",
        rating: "8",
      },
      {
        id: 789012,
        firstName: "Оксана",
        lastName: "Козлова",
        position: "копирайтер",
        phoneNumber: "789-012-345",
        rating: "8",
      },
      {
        id: 890123,
        firstName: "Александра",
        lastName: "Егорова",
        position: "HR-менеджер",
        phoneNumber: "890-123-456",
        rating: "8",
      },
      {
        id: 901234,
        firstName: "Владимир",
        lastName: "Кузнецов",
        position: "SEO-специалист",
        phoneNumber: "901-234-567",
        rating: "8",
      },
      {
        id: 1123789,
        firstName: "Сергей",
        lastName: "Новиков",
        position: "аналитик данных",
        phoneNumber: "012-345-678",
        rating: "3",
      },
      {
        id: 1234890,
        firstName: "Алина",
        lastName: "Беляева",
        position: "контент-менеджер",
        phoneNumber: "987-654-321",
        rating: "3",
      },
      {
        id: 1345901,
        firstName: "Дарья",
        lastName: "Романова",
        position: "дизайнер интерфейсов",
        phoneNumber: "876-543-210",
        rating: "3",
      },
      {
        id: 1456012,
        firstName: "Иван",
        lastName: "Смирнов",
        position: "программист",
        phoneNumber: "765-432-109",
        rating: "8",
      },
      {
        id: 1567123,
        firstName: "Мария",
        lastName: "Крылова",
        position: "SMM-менеджер",
        phoneNumber: "654-321-098",
        rating: "8",
      },
      {
        id: 1678234,
        firstName: "Василий",
        lastName: "Тихонов",
        position: "специалист по продажам",
        phoneNumber: "543-210-987",
        rating: "8",
      },
      {
        id: 1789345,
        firstName: "Андрей",
        lastName: "Колесников",
        position: "исследователь",
        phoneNumber: "432-109-876",
        rating: "3",
      },
      {
        id: 1890456,
        firstName: "Евгения",
        lastName: "Ильина",
        position: "маркетолог",
        phoneNumber: "321-098-765",
        rating: "8",
      },
      {
        id: 1901567,
        firstName: "Глеб",
        lastName: "Калинин",
        position: "администратор",
        phoneNumber: "210-987-654",
        rating: "8",
      },
      {
        id: 1123045,
        firstName: "Юлия",
        lastName: "Сазонова",
        position: "консультант",
        phoneNumber: "109-876-543",
        rating: "8",
      },
      {
        id: 2234156,
        firstName: "Артем",
        lastName: "Богданов",
        position: "бизнес-аналитик",
        phoneNumber: "098-765-432",
        rating: "3",
      },
    ]);

    return { selected, list, addNew, add, closeAdd };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.add_section_selected {
  @apply bg-slate-100;
}
</style>
