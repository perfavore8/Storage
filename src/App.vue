<template>
  <router-view></router-view>
</template>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
  width: fit-content;
  overflow: auto;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}

*::-webkit-scrollbar-track {
  // background: #ddd;
  border-radius: 20px;
}
</style>
