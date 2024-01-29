<template>
  <button
    class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-2 top-2 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
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
  <div class="w-screen flex justify-center">
    <div class="w-full md:max-w-[50%] h-full z-[50] p-3">
      <div class="w-fit dark:bg-gray-700 relative z-[49]">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ $t("newOrder.ordersList") }}
          </h3>
        </div>

        <ul
          class="text-sm font-medium w-full sm:w-fit flex flex-col gap-2 p-2 text-gray-900 dark:bg-gray-700 dark:text-white max-h-[500px] overflow-y-auto"
        >
          <li
            v-for="order in list.filter((el) => el.pivot.enabled)"
            :key="order.id"
            @click="follow(order.id)"
            class="w-full px-4 py-2 bg-slate-100 rounded-lg cursor-pointer"
          >
            {{
              `${order.fields?.name} - ${order.budget}р - ${
                order.user || ""
              } - ${dateFormater(order.created_at)} - ${dateFormater(
                order.updated_at
              )}`
            }}
          </li>
          <div class="w-full h-4"></div>
          <li
            v-for="order in list.filter((el) => !el.pivot.enabled)"
            :key="order.id"
            @click="follow(order.id)"
            class="w-full px-4 py-2 bg-slate-100 rounded-lg cursor-pointer opacity-75"
          >
            {{
              `${order.fields?.name} - ${order.budget}р - ${
                order.user || ""
              } - ${dateFormater(order.created_at)} - ${dateFormater(
                order.updated_at
              )}`
            }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useList } from "@/components/PublicOrder";
import { useValidate } from "@/composables/validate";
import router from "@/router";
const { getList, list, follow } = useList();

const back = () => router.go(-1);
getList();
const { dateFormater } = useValidate();
</script>

<style lang="scss" scoped></style>
