<template>
  <div class="wrapper4">
    <h3>ChartsScatter</h3>
    <Scatter :data="data" :options="options" />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "vue-chartjs";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default {
  name: "ChartsScatter",
  components: {
    Scatter,
  },
  setup() {
    const data = reactive({
      datasets: [
        {
          label: "Scatter Dataset 1",
          fill: false,
          borderColor: "#f87979",
          backgroundColor: "#f87979",
          data: [
            { x: -2, y: 4 },
            { x: -1, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 4 },
          ],
        },
        {
          label: "Scatter Dataset 2",
          fill: false,
          borderColor: "#7acbf9",
          backgroundColor: "#7acbf9",
          data: [
            { x: -2, y: -4 },
            { x: -1, y: -1 },
            { x: 0, y: 1 },
            { x: 1, y: -1 },
            { x: 2, y: -4 },
          ],
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
