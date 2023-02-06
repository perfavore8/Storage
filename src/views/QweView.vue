<template>
  <div class="wrapper">
    <div class="item"><ChartsBar /></div>
    <div class="item"><ChartsBubble /></div>
    <div class="item"><ChartsDoughnut /></div>
    <div class="item"><ChartsLine /></div>
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
