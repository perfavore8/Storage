<template>
  <div :class="{ dark: isDarkTest }">
    <div class="app min-h-screen px-4 md:px-[30px] dark:bg-slate-900">
      <div class="header w-full">
        <NavBar />
      </div>
      <div class="content w-full mt-2 md:mt-12">
        <div class="top">
          <p
            class="my-2 md:my-4 text-sm md:text-base text-slate-500 dark:text-slate-300"
          >
            Найдено: {{ coun_archive }}
          </p>
        </div>
        <archive-grid class="grid"></archive-grid>
      </div>
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
    isDarkTest() {
      return this.$route.query.test === "dark";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  min-width: 100vw;
  width: 100%;
  height: 100%;
  // padding: 0 30px;

  display: flex;
  flex-direction: column;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.content {
  // margin-top: 50px;
  .top {
    text-align: left;
    p {
      margin-left: 10px;
      // color: #757575;
      // @include font(400, 16px);
    }
  }
}
</style>
