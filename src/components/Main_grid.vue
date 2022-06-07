<template>
  <!-- <div>
    <div class="bar"></div>
    <div class="raws">
      <div class="raw" v-for="user in data" :key="user.id">
        <div class="item" v-for="item in user" :key="item">{{ item }}</div>
      </div>
    </div>
  </div> -->
  <div></div>
</template>

<script>
export default {
  name: "Main_grid",
  props: {
    data: [],
  },
};
</script>

<style lang="scss" scoped>
.raws {
  display: flex;
  flex-direction: column;
}
.raw {
  display: flex;
  flex-direction: row;
  flex-grow: 3;
}
.item {
  width: auto;
  border: 0.5px solid #c9c9c9;
  flex-wrap: wrap;
}
</style>
