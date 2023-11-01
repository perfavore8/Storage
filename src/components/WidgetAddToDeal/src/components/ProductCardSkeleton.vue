<template>
  <div
    class="w-full p-5 my-2 flex flex-col gap-4 origin-top rounded-md ring-1 ring-gray-900 ring-opacity-5 py-1 bg-slate-100 shadow-none transition-all animate-pulse"
  >
    <div class="flex flex-row flex-wrap justify-start items-center gap-2 pr-11">
      <span class="text"> 123123123123123123123 </span>
      <span class="text"> 1231231231 </span>
      <span class="text"> 12312312313 </span>
      <span class="text"> 123 </span>
      <span class="text"> 12312312312 </span>
      <span class="text"> 12312313123123123 </span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
.text {
  @apply text-slate-900 bg-slate-300 rounded-full leading-none text-transparent;
}
</style>
