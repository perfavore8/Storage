<template>
  <div class="wrapper3">
    <h3>ChartsDoughnut</h3>
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { reactive } from "@vue/reactivity";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "ChartsDoughnut",
  components: {
    Doughnut,
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
      hoverOffset: 16,
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
.wrapper3 {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
  max-height: 80%;
}
</style>
