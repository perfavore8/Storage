<template>
  <span class="block">{{ countdownNormalized }} c.</span>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
  props: { initialTime: Number },
  setup(props) {
    const countdown = ref(props.initialTime);

    const timer = ref(null);

    onMounted(
      () =>
        (timer.value = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value -= 100;
          } else {
            clearInterval(timer);
          }
        }, 100))
    );

    const countdownNormalized = computed(() => {
      const s = Math.floor(countdown.value / 1000);
      const ds = Math.floor((countdown.value % 1000) / 100);

      return s + "." + ds;
    });

    return { countdownNormalized };
  },
};
</script>

<style lang="scss" scoped></style>
