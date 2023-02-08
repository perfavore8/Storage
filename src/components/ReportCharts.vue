<template>
  <div class="wrapper">
    <ChartsBar :data="bar.data" :options="bar.options" :title="bar.title" />
  </div>
</template>

<script>
import ChartsBar from "@/components/Charts/ChartsBar.vue";
import { reactive } from "@vue/reactivity";
export default {
  components: { ChartsBar },
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

    return { bar };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 70%;
  margin: 0 auto;
}
</style>
