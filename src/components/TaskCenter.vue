<template>
  <div class="backdrop" @click="close()" />
  <div class="container">
    <template v-if="isTasksInProgress">
      <TaskCard :task="task" v-for="task in tasks" :key="task.id" />
    </template>
    <div class="text" v-else>
      <h4>Нет задач в процессе</h4>
    </div>
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard.vue";
export default {
  components: {
    TaskCard,
  },
  data() {
    return {
      interval: null,
    };
  },

  mounted() {
    this.getTasks();
    this.startTracking();
  },
  unmounted() {
    clearInterval(this.interval);
  },

  computed: {
    tasks() {
      return this.$store.state.tasks.tasks;
    },
    isTasksInProgress() {
      let res =
        this.tasks.filter((val) => val.status == 0 || val.status == 1).length >
        0;
      return res;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    getTasks() {
      this.$store.dispatch("getTasks");
    },
    startTracking() {
      this.interval = setInterval(() => {
        this.getTasks();
        if (!this.isTasksInProgress) clearInterval(this.interval);
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.backdrop {
  background-color: transparent;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
}
.container {
  position: relative;
  z-index: 2001;
  // border: 1px solid #00000033;
  // border-radius: 0.3rem;
  padding: 16px;
  // background-color: #fff;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.text {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  @include font(400, 16px);
  box-shadow: 0 8px 16px rgb(0 0 0 / 20%), 0 8px 8px rgb(0 0 0 / 22%);
  background-color: rgb(241, 241, 241);
  border-radius: 8px;
  color: #757575;
  h4 {
    margin: 0;
  }
}
</style>
