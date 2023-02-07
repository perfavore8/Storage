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
        <ChartsLine
          v-if="ChartsLineMounth.datasets.length"
          :propsData="ChartsLineMounth"
          :title="ChartsLineMounth.name"
          :propsOptions="ChartsLineMounth.propsOptions"
        />
      </div>
    </div>
  </teleport>
</template>

<script>
import { useColor } from "@/composables/color";
import ChartsDoughnut from "@/components/Charts/ChartsDoughnut.vue";
import ChartsLine from "@/components/Charts/ChartsLine.vue";
import { reactive } from "@vue/reactivity";
import store from "@/store";
export default {
  components: { ChartsDoughnut, ChartsLine },
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

    const mounths = reactive([
      {
        name: "Март",
        data: [],
        date: "03/01/2022-03/31/2022",
      },
      {
        name: "Апрель",
        data: [],
        date: "04/01/2022-04/30/2022",
      },
      {
        name: "Май",
        data: [],
        date: "05/01/2022-05/31/2022",
      },
      {
        name: "Июнь",
        data: [],
        date: "06/01/2022-06/30/2022",
      },
      {
        name: "Июль",
        data: [],
        date: "07/01/2022-07/31/2022",
      },
      {
        name: "Август",
        data: [],
        date: "08/01/2022-08/31/2022",
      },
      {
        name: "Сентябрь",
        data: [],
        date: "09/01/2022-09/30/2022",
      },
      {
        name: "Октябрь",
        data: [],
        date: "10/01/2022-10/31/2022",
      },
      {
        name: "Ноябрь",
        data: [],
        date: "11/01/2022-11/30/2022",
      },
      {
        name: "Декабрь",
        data: [],
        date: "11/01/2022-11/31/2022",
      },
      {
        name: "Январь",
        data: [],
        date: "01/01/2023-01/31/2023",
      },
      {
        name: "Февраль",
        data: [],
        date: "02/01/2023-02/28/2023",
      },
    ]);

    mounths.map(async (mounth, idx) => {
      const data = await store.dispatch("getCustomersTotal", {
        filter: { date: mounth.date },
        page: 1, // FIXME временно <----
      });
      data.sum === null ? (data.sum = 0) : null;
      data.cost_sum === null ? (data.cost_sum = 0) : null;
      data.prib = data.sum - data.cost_sum;
      mounths[idx].data = data;
    });

    const ChartsLineMounth = reactive({
      dataCode: [
        { code: "sum", name: "Оборот", color: "" },
        { code: "prib", name: "Прибыль", color: "" },
      ],
      titleCode: "company",
      name: "Отчет по месяцам",
      labels: [],
      datasets: [],
      propsOptions: {
        scales: {
          y: {
            // min: 0,
            // max: 200,
            // step: 100,
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.2,
            to: 0.5,
          },
        },
      },
      fillData: () => {
        ChartsLineMounth.dataCode.map((val) => {
          val.color = getRandomColor();
        });
        mounths.forEach((mounth) => ChartsLineMounth.labels.push(mounth.name));
        ChartsLineMounth.dataCode.forEach((code) => {
          const dataset = {
            label: code.name,
            backgroundColor: code.color,
            data: [],
          };
          mounths.forEach((mounth) => {
            dataset.data.push(mounth.data[code.code]);
          });
          ChartsLineMounth.datasets.push(dataset);
        });
      },
    });
    setTimeout(() => {
      ChartsLineMounth.fillData();
    }, 2000);

    const close = () => context.emit("close");

    return {
      ChartsDoughnutMoney,
      ChartsDoughnutCompanies,
      ChartsLineMounth,
      close,
    };
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
