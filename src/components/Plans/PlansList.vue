<template>
  <div class="p-8 flex items-center justify-center w-full h-full min-w-[100vw]">
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-9 mx-auto isolate gap-8"
    >
      <PlansCard v-for="item in list" :key="item.header" :item="item" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import PlansCard from "./PlansCard.vue";
export default {
  components: { PlansCard },
  setup() {
    const list = reactive([
      {
        accent: false,
        header: "Hobby",
        description: "The essentials to provide your best work for clients.",
        price: "$15",
        period: "/month",
        advantages: [
          { text: "5 products" },
          { text: "Up to 1,000 subscribers" },
          { text: "Basic analytics" },
        ],
      },
      {
        accent: false,
        header: "Freelancer",
        description: "The essentials to provide your best work for clients.",
        price: "$30",
        period: "/month",
        advantages: [
          { text: "5 products" },
          { text: "Up to 1,000 subscribers" },
          { text: "Basic analytics" },
          { text: "48-hour support response time" },
        ],
      },
      {
        accent: true,
        header: "Startup",
        description: "A plan that scales with your rapidly growing business.",
        price: "$60",
        period: "/month",
        advantages: [
          { text: "25 productsw" },
          { text: "Up to 10,000 subscribersw" },
          { text: "Advanced analyticsw" },
          { text: "24-hour support response timew" },
          { text: "Marketing automationsw" },
        ],
      },
      {
        accent: false,
        header: "Enterprise",
        description: "Dedicated support and infrastructure for your company.",
        price: "$90",
        period: "/month",
        advantages: [
          { text: "Unlimited products" },
          { text: "Unlimited subscribers" },
          { text: "Advanced analytics" },
          { text: "1-hour, dedicated support response time" },
          { text: "Marketing automations" },
          { text: "Custom reporting tools" },
        ],
      },
    ]);

    return { list };
  },
};
</script>

<style></style>
