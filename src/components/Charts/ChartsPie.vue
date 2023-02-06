<template>
  <div class="wrapper4">
    <h3>ChartsPie</h3>
    <Pie :data="data" :options="options" />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "ChartsPie",
  components: {
    Pie,
  },
  setup() {
    const data = reactive({
      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 20, 80, 10],
        },
      ],
    });

    const options = reactive({
      responsive: true,
      maintainAspectRatio: false,
    });

    return { data, options };
  },
};
</script>

<style lang="scss" scoped>
.wrapper4 {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  max-height: 80%;
}
</style>
