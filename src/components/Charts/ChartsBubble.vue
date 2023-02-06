<template>
  <div class="wrapper2">
    <h3>ChartsBubble</h3>
    <Bubble :data="data" :options="options" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";
import { Bubble } from "vue-chartjs";
import { reactive } from "@vue/reactivity";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default {
  name: "ChartsBubble",
  components: {
    Bubble,
  },
  setup() {
    const data = reactive({
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [
            { x: 20, y: 25, r: 5 },
            { x: 40, y: 10, r: 10 },
            { x: 30, y: 22, r: 30 },
          ],
        },
        {
          label: "Data Two",
          backgroundColor: "#7C8CF8",
          data: [
            { x: 10, y: 30, r: 15 },
            { x: 20, y: 20, r: 10 },
            { x: 15, y: 8, r: 30 },
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
.wrapper2 {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  max-height: 80%;
}
</style>
