<template>
  <div class="backdrop" @click="close()" />
  <div class="container">
    <template v-if="isTasksInProgress">
      <TaskCard :task="task" v-for="task in tasks" :key="task.id" />
    </template>
    <p v-else>Нет задач в процессе</p>
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
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
