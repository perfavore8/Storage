<template>
  <div class="wrapper">
    <ChartsBar
      v-if="chartType === 'bar'"
      :data="bar.data"
      :options="bar.options"
      :title="bar.title"
    />
    <ChartsDoughnut
      v-else-if="chartType === 'doughnut'"
      :data="doughnut.data"
      :options="doughnut.options"
      :title="doughnut.title"
    />
  </div>
</template>

<script>
import ChartsBar from "@/components/Charts/ChartsBar.vue";
import ChartsDoughnut from "@/components/Charts/ChartsDoughnut.vue";
import { reactive } from "@vue/reactivity";
export default {
  components: { ChartsBar, ChartsDoughnut },
  props: {
    chartType: String,
  },
  setup() {
    const bar = reactive({
      title: "",
      data: {
        labels: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s"],
        datasets: [
          {
            label: "Data One",
            data: [40, 20, 10, 82, 73, 27, 23, 17, 52, 12, 54, 64, 56],
            fill: false,
            backgroundColor: "#5DADE2",
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
    const doughnut = reactive({
      title: "",
      data: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return { bar, doughnut };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 60%;
  margin: 0 auto;
}
</style>
