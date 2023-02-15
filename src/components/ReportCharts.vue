<template>
  <div class="wrapper">
    <apexchart
      v-if="chartType === 'bar'"
      :type="bar.type"
      :width="clientWidth > 400 ? 600 : 300"
      :options="bar.chartOptions"
      :series="bar.series"
    ></apexchart>
    <apexchart
      v-else-if="chartType === 'doughnut'"
      :type="doughnut.type"
      :width="clientWidth > 400 ? 600 : 300"
      :options="doughnut.chartOptions"
      :series="doughnut.series"
    ></apexchart>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  components: {},
  props: {
    chartType: String,
  },
  setup() {
    const clientWidth = computed(() => document.documentElement.clientWidth);
    const bar = reactive({
      type: "bar",
      series: [
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 31, 44, 39],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "65%",
            endingShape: "rounded",
          },
        },
        responsive: [
          {
            breakpoint: 880,
            options: {
              chart: {
                width: 320,
              },
              xaxis: {
                labels: {
                  rotateAlways: true,
                  show: true,
                  rotate: -45,
                },
              },
            },
          },
        ],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jen",
          ],
        },
        yaxis: {
          title: {
            text: "",
          },
        },
        fill: {
          opacity: 1,
        },
        colors: [
          function ({ value }) {
            if (value > 50) {
              return "#00E396";
            }
            if (value > 35) {
              return "#FEB019";
            }
            return "#FF4560";
          },
        ],
        legend: {
          position: "bottom",
        },
        tooltip: {
          y: {
            formatter: function (val) {
              const words = ["тысяча", "тысячи", "тысяч"];
              return (
                "₽ " +
                val +
                " " +
                words[
                  val % 100 > 4 && val % 100 < 20
                    ? 2
                    : [2, 0, 1, 1, 1, 2][val % 10 < 5 ? Math.abs(val) % 10 : 5]
                ]
              );
            },
          },
        },
      },
    });

    const doughnut = reactive({
      type: "donut",
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: "donut",
        },
        theme: {
          mode: "light",
          palette: "palette2",
        },
        responsive: [
          {
            breakpoint: 880,
            options: {
              chart: {
                width: 320,
              },
              legend: {
                position: "bottom",
                fontSize: "12px",
              },
              dataLabels: {
                style: {
                  fontSize: "10px",
                },
              },
            },
          },
        ],
        stroke: {
          show: false,
        },
        labels: ["Feb", "Mar", "Apr", "May", "Jun"],
        legend: {
          fontSize: "16px",
        },
      },
    });

    return { bar, doughnut, clientWidth };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  .vue-apexcharts {
    :deep(.apexcharts-legend-series) {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 0 5px;
      margin: 0 !important;
      line-height: 1.5;
    }
    :deep(.legend-mouseover-inactive) {
      opacity: 0.5;
    }
  }
}
</style>
