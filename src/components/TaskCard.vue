<template>
  <div
    class="card"
    :class="{
      done: task.status == 2,
      in_progress: task.status == 1,
      not_started: task.status == 0,
      error: task.status == 3,
    }"
  >
    <div class="bar">
      <div class="active_bar" :style="{ width: task.progress + '%' }" />
    </div>
    <p>{{ task.name }}</p>
    <div ref="result" class="result"></div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  computed: {
    resultRef() {
      return this.$refs.result;
    },
    result() {
      return this.task.result;
    },
  },
  mounted() {
    if (this.result) {
      this.resultRef.innerHTML = this.result;
    }
  },
  watch: {
    result() {
      if (this.result) {
        this.resultRef.innerHTML = this.result;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.card {
  @include font(400, 16px);
  box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);
  background-color: rgb(230, 230, 230);
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease-out;
  .bar {
    position: relative;
    width: 100%;
    height: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    .active_bar {
      max-width: 100%;
      position: absolute;
      left: 0px;
      height: inherit;
      border-radius: inherit;
      background: #fff;
      transition: width 0.2s ease-out;
    }
  }
  p {
    margin-top: 16px;
  }
  .result:deep(a) {
    color: -webkit-link !important;
    cursor: pointer;
    text-decoration: underline !important;
  }
}
.done {
  color: #044a29;
  background-color: #caebd9;
}
.in_progress {
  color: #09347a;
  background-color: #cae1fc;
}
.not_started {
  color: #ab3f05;
  background-color: #ffe0c9;
}
.error {
  color: #c4314b;
  background-color: #f3d6d8;
}
</style>
