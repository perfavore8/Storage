<template>
  <teleport to="body">
    <div class="wrapper">
      <div class="backdrop" />
      <div class="container">
        <ChartsDoughnut :propsData="ChartsDoughnut" />
      </div>
    </div>
  </teleport>
</template>

<script>
import { useColor } from "@/composables/color";
import ChartsDoughnut from "@/components/Charts/ChartsDoughnut.vue";
import { reactive } from "@vue/reactivity";
export default {
  components: { ChartsDoughnut },
  props: {
    reportsData: Object,
    total: Object,
  },
  setup(props) {
    const { getRandomColor } = useColor();

    const ChartsDoughnut = reactive({
      title: [
        { code: "sum", name: "Оборот" },
        { code: "cost_sum", name: "Себестоимость" },
        { code: "prib", name: "Прибыль" },
      ],
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
      fillData: () => {
        ChartsDoughnut.title.forEach((val) => {
          ChartsDoughnut.labels.push(val.name);
          ChartsDoughnut.datasets[0].data.push(
            Number(props.total[val.code].split(" ")[0])
          );
          ChartsDoughnut.datasets[0].backgroundColor.push(getRandomColor());
        });
      },
    });

    ChartsDoughnut.fillData();

    return { ChartsDoughnut };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
* {
  box-sizing: border-box;
}
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  .backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    z-index: 49;
  }
  .container {
    background-color: #fff;
    z-index: 50;
    white-space: pre;
  }
}
</style>
