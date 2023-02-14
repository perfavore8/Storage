<template>
  <div class="wrapper3">
    <h3>{{ title }}</h3>
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "ChartsDoughnut",
  components: {
    Doughnut,
  },
  props: {
    data: { type: Object, required: true },
    options: { type: Object, required: true },
    title: {
      type: String,
      required: false,
      default: () => {
        return "ChartsDoughnut";
      },
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.wrapper3 {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  max-height: 80%;
  max-height: 400px;
}
</style>
