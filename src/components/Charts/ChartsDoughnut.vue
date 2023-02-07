<template>
  <div class="wrapper3">
    <h3>{{ title }}</h3>
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
  props: {
    propsData: Object,
    title: {
      type: String,
      required: false,
      default: () => {
        return "ChartsDoughnut";
      },
    },
  },
  setup(props) {
    const data = reactive({
      labels: props.propsData?.labels,
      datasets: props.propsData?.datasets,
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
  max-height: 400px;
}
</style>
