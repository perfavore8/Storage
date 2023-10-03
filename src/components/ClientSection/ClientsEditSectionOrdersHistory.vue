<template>
  <button
    class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-6 top-6 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
    @click="back()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
      />
    </svg>
  </button>
  <div class="mt-10 p-2 pt-3 lg:p-5 lg:pt-5">
    <table class="bg-white divide-y divide-gray-300 mx-auto">
      <tr
        v-for="item in list"
        :key="item.id"
        class="grid grid-cols-3 items-center lg:table-row"
      >
        <td class="cell main order-1">
          <span>{{ item.name }}</span>
        </td>
        <td class="cell order-4">
          <span>{{ item.status }}</span>
        </td>
        <td class="cell order-5">
          <span>{{ item.date }}</span>
        </td>
        <td class="cell order-2">
          <span>{{ item.sum }}</span>
        </td>
        <td class="cell order-3 row-span-2 place-self-center">
          <a class="link" href="#" @click="route()">
            {{ $t("Clients.Edit.follow") }}
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props, context) {
    const router = useRouter();

    const list = reactive([
      {
        name: "Тестовая",
        status: "Успешный",
        date: "2023-05-04 13:12:17",
        sum: "1200 RUB",
      },
      {
        name: "Test",
        status: "Открытый",
        date: "2023-01-17 12:18:32",
        sum: "200 RUB",
      },
      {
        name: "123",
        status: "Удален",
        date: "2023-01-13 08:45:24",
        sum: "12893 RUB",
      },
      {
        name: "ыаа",
        status: "Открытый",
        date: "2022-12-23 09:52:55",
        sum: "750 RUB",
      },
      {
        name: "Тестовая",
        status: "Успешный",
        date: "2022-12-20 08:15:08",
        sum: "314 RUB",
      },
    ]);

    const route = () => router.push("/orders");

    const back = () => context.emit("back");

    return { list, route, back };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.cell {
  @apply text-gray-500 font-medium text-base text-left whitespace-pre-line px-3 lg:px-2 py-1 lg:py-3;
}
.main {
  @apply text-gray-900;
}
.link {
  @apply font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline focus:outline-offset-4;
}
</style>
