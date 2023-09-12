<template>
  <div class="p-8 flex items-center justify-center w-full h-full" v-if="true">
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-9 mx-auto isolate gap-8"
    >
      <PlansCard v-for="item in list" :key="item.header" :item="item" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import PlansCard from "./PlansCard.vue";
import store from "@/store";
export default {
  components: { PlansCard },
  setup() {
    const list = reactive([
      {
        id: 0,
        accent: computed(() => store.state.account.account.tarif == 0),
        header: "",
        description: "The essentials to provide your best work for clients.",
        price: "0₽",
        period: "14 дней",
        advantages: [
          { text: "5 products" },
          { text: "Up to 1,000 subscribers" },
          { text: "Basic analytics" },
        ],
      },
      {
        id: 3,
        accent: computed(() => store.state.account.account.tarif == 0),
        header: "Hobby",
        description: "The essentials to provide your best work for clients.",
        price: "0₽",
        period: "-1",
        advantages: [
          { text: "5 products" },
          { text: "Up to 1,000 subscribers" },
          { text: "Basic analytics" },
        ],
      },
      {
        id: 2,
        accent: computed(() => store.state.account.account.tarif == 2),
        header: "Freelancer",
        description: "The essentials to provide your best work for clients.",
        price: "1700₽",
        period: "month",
        advantages: [
          { text: "5 products" },
          { text: "Up to 1,000 subscribers" },
          { text: "Basic analytics" },
          { text: "48-hour support response time" },
        ],
      },
    ]);

    return { list };
  },
};
</script>

<style></style>
