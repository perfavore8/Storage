<template>
  <div class="app">
    <div class="header">
      <div class="btns">
        <button
          class="btns_btn"
          :class="{ selected_catalog: $route.name === page.value }"
          @click="route(page.value)"
          v-for="page in catalog"
          :key="page"
        >
          {{ page.name }}
        </button>
      </div>
    </div>
    <div class="content">
      <h1>Analytics Page</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AnalyticsView",
  computed: {
    ...mapGetters(["catalog"]),
  },
  methods: {
    route(page_name) {
      this.$router.push("/" + page_name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 60px);
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  user-select: none;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  .btns {
    display: flex;
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
    .btns_btn {
      height: 40px;
      padding: 9px;
      cursor: pointer;
      text-align: center;
      vertical-align: center;
      box-sizing: border-box;
      border: 1px solid #1b3546;
      border-radius: 4px;
      color: #1b3546;
      background: white;

      transition: all 0.15s ease-out;
      @include font(400, 18px, 22px);
    }
    .btns_btn:hover {
      border-color: #396f93;
      color: #396f93;
    }
    .selected_catalog {
      transition: all 0.15s ease-out;
      background: #1b3546;
      color: white;
    }
    .selected_catalog:hover {
      color: hsl(204, 44%, 95%);
    }
  }
}
</style>