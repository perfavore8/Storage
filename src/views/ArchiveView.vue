<template>
  <div class="app">
    <div class="header">
      <NavBar />
    </div>
    <div class="content">
      <div class="top">
        <p>Найдено: {{ coun_archive }}</p>
      </div>
      <archive-grid class="grid"></archive-grid>
    </div>
  </div>
</template>

<script>
import ArchiveGrid from "@/components/ArchiveGrid.vue";
import NavBar from "@/components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "ArchiveView",
  components: {
    ArchiveGrid,
    NavBar,
  },
  computed: {
    ...mapGetters(["catalog"]),
    coun_archive() {
      return this.$store.state.products.products.length;
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
}
.content {
  margin-top: 50px;
  .top {
    text-align: left;
    p {
      margin-left: 10px;
      color: #757575;
      @include font(400, 16px);
    }
  }
}
</style>
