<template>
  <div class="view">
    <h1>{{ $t("Errors.at") }}</h1>
    <p>
      {{ $t("Errors.at2") }}
    </p>
    <div class="icons">
      <a href="https://t.me/goskladbot" target="black">
        <img src="@/assets/telegram.jpg" alt="Telegram" />
      </a>
      <a href="https://wa.me/74954199745" target="black">
        <img src="@/assets/whats_app.jpg" alt="WhatsApp" />
      </a>
    </div>
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
.icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin: 8px;
  }
}
</style>
