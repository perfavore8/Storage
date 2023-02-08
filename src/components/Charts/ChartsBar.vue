<template>
  <div class="wrapper1">
    <h3>{{ title }}</h3>
    <Bar
      id="my-chart-id1"
      :options="options"
      :data="data"
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
  props: {
    data: { type: Object, required: true },
    options: { type: Object, required: true },
    title: {
      type: String,
      required: false,
      default() {
        return "ChartsBar";
      },
    },
  },
  setup() {},
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
