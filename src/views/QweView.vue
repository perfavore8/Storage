<template>
  <div class="wrapper">
    <div class="item"><ChartsBar /></div>
    <div class="item"><ChartsBubble /></div>
    <div class="item"><ChartsDoughnut :propsData="dataDoughnut" /></div>
    <div class="item">
      <ChartsLine :propsData="dataLine" :animations="dataLine.animations" />
    </div>
    <div class="item"><ChartsPie /></div>
    <div class="item"><ChartsPolarArea /></div>
    <div class="item"><ChartsRadar /></div>
    <div class="item"><ChartsScatter /></div>
  </div>
</template>

<script>
import ChartsBar from "@/components/Charts/ChartsBar.vue";
import ChartsBubble from "@/components/Charts/ChartsBubble.vue";
import ChartsDoughnut from "@/components/Charts/ChartsDoughnut.vue";
import ChartsLine from "@/components/Charts/ChartsLine.vue";
import ChartsPie from "@/components/Charts/ChartsPie.vue";
import ChartsPolarArea from "@/components/Charts/ChartsPolarArea.vue";
import ChartsRadar from "@/components/Charts/ChartsRadar.vue";
import ChartsScatter from "@/components/Charts/ChartsScatter.vue";
import { reactive } from "@vue/reactivity";
export default {
  components: {
    ChartsBar,
    ChartsBubble,
    ChartsDoughnut,
    ChartsLine,
    ChartsPie,
    ChartsPolarArea,
    ChartsRadar,
    ChartsScatter,
  },

  setup() {
    const dataDoughnut = reactive({
      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 20, 80, 10],
        },
      ],
    });
    const dataLine = reactive({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 0.5,
          to: 0.2,
          loop: true,
        },
      },
    });

    return { dataDoughnut, dataLine };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10%;
  .item {
    max-width: 80%;
    min-width: 34vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
  }
}
</style>
