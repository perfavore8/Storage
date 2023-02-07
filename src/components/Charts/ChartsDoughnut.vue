<template>
  <Doughnut :data="data" :options="options" />
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
  props: { propsData: Object },
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

<style lang="scss" scoped></style>
