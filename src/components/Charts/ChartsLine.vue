<template>
  <div class="wrapper4">
    <h3>{{ title }}</h3>
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
  props: {
    propsData: Object,
    propsOptions: { type: Object, required: false },
    title: {
      type: String,
      required: false,
      default: () => {
        return "ChartsLine";
      },
    },
  },
  setup(props) {
    const data = reactive({
      labels: props.propsData?.labels,
      datasets: props.propsData?.datasets,
    });

    const options = reactive({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 100,
        },
      },
    });

    Object.assign(options, props.propsOptions);

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
  max-height: 400px;
}
</style>
