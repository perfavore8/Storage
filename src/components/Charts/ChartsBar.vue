<template>
  <div class="wrapper1">
    <h3>ChartsBar</h3>
    <Bar
      id="my-chart-id1"
      :options="chartOptions"
      :data="chartData"
      style="position: relative"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { reactive } from "@vue/reactivity";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "ChartsBar",
  components: {
    Bar,
  },

  setup() {
    const chartData = reactive({
      labels: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s"],
      datasets: [
        {
          label: "Data One",
          data: [40, 20, 10, 82, 73, 27, 23, 17, 52, 12, 54, 64, 56],
          fill: false,
          backgroundColor: "rgb(75, 192, 192)",
        },
      ],
    });
    const chartOptions = reactive({
      responsive: true,
      plugins: {
        customCanvasBackgroundColor: {
          color: "lightGreen",
        },
      },
    });
    return { chartData, chartOptions };
  },
};
</script>

<style lang="scss" scoped>
.wrapper1 {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
}
</style>
