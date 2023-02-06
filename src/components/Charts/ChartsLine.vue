<template>
  <div class="wrapper4">
    <h3>ChartsLine</h3>
    <Line :data="data" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { reactive } from "@vue/reactivity";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  name: "ChartsLine",
  components: {
    Line,
  },
  setup() {
    const data = reactive({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    });

    const options = reactive({
      responsive: true,
      maintainAspectRatio: false,
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 0.5,
          to: 0.2,
          loop: true,
        },
      },
      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 100,
        },
      },
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
