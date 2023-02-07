<template>
  <teleport to="body">
    <div class="wrapper">
      <div class="backdrop" @click="close()" />
      <div class="container">
        <ChartsDoughnut
          :propsData="ChartsDoughnutMoney"
          :title="ChartsDoughnutMoney.name"
        />
        <ChartsDoughnut
          :propsData="ChartsDoughnutCompanies"
          :title="ChartsDoughnutCompanies.name"
        />
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
  setup(props, context) {
    const { getRandomColor } = useColor();

    const ChartsDoughnutMoney = reactive({
      title: [
        { code: "sum", name: "Оборот" },
        { code: "prib", name: "Прибыль" },
      ],
      name: "Отчет по деньгам",
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
      fillData: () => {
        ChartsDoughnutMoney.title.forEach((val) => {
          ChartsDoughnutMoney.labels.push(val.name);
          ChartsDoughnutMoney.datasets[0].data.push(
            Number(props.total[val.code].split(" ")[0])
          );
          ChartsDoughnutMoney.datasets[0].backgroundColor.push(
            getRandomColor()
          );
        });
      },
    });

    ChartsDoughnutMoney.fillData();

    const ChartsDoughnutCompanies = reactive({
      dataCode: [
        { code: "sum", name: "Оборот", color: "" },
        { code: "prib", name: "Прибыль", color: "" },
      ],
      titleCode: "company",
      name: "Отчет по клиентам",
      labels: [],
      datasets: [],
      fillData: () => {
        ChartsDoughnutCompanies.dataCode.map((val) => {
          val.color = getRandomColor();
          ChartsDoughnutCompanies.labels.push(val.name);
        });
        props.reportsData.data.forEach((val) => {
          const dataset = {
            label: val[ChartsDoughnutCompanies.titleCode],
            backgroundColor: [],
            data: [],
          };
          ChartsDoughnutCompanies.dataCode.forEach((code) => {
            dataset.data.push(val[code.code].split(" ")[0]);
            dataset.backgroundColor.push(code.color);
          });
          ChartsDoughnutCompanies.datasets.push(dataset);
        });
      },
    });
    ChartsDoughnutCompanies.fillData();

    const close = () => context.emit("close");

    return { ChartsDoughnutMoney, ChartsDoughnutCompanies, close };
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
    backdrop-filter: blur(4px);
    z-index: 49;
  }
  .container {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    z-index: 50;
    white-space: pre;
    padding: 40px;
    padding-bottom: 80px;
    border: 1px solid #aeaeae;
    border-radius: 8px;
  }
}
</style>
