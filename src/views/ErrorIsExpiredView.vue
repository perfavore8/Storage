<template>
  <div class="view">
    <h1>Внимание!</h1>
    <p>
      Срок подписки виджета Sales-Склад подошел к концу. Для продления
      обратитесь в отдел продаж: +7 (495) 278-18-15 или sales@sls-up.ru
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.view {
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  user-select: none;
  text-align: center;
}
h1 {
  @include font(500, 2rem);
  margin: 80px auto 0;
}
p {
  margin: 12px auto 0;
  width: 40%;
  color: #6c757d;
  @include font(300, 1.25rem);
}
</style>
