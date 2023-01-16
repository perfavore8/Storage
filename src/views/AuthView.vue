<template>
  <div class="app">
    <div class="container">
      <header>
        <div class="logo">
          <img src="@/assets/logo_transparent.png" alt="GoСклад" />
        </div>
      </header>
      <main>
        <div class="form">
          <!-- <label for="email">Email:</label> -->
          <span class="material-icons-outlined"> email </span>
          <input
            type="email"
            class="input"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div class="form">
          <!-- <label for="password">Пароль:</label> -->
          <span class="material-icons-outlined"> lock </span>
          <div class="password">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="input"
              name="password"
              id="password"
              placeholder="Пароль"
            />
            <transition name="modal">
              <span
                class="material-icons-outlined"
                @click="showPassword = false"
                v-if="showPassword"
              >
                visibility_off
              </span>
              <span
                class="material-icons-outlined"
                @click="showPassword = true"
                v-else
              >
                visibility
              </span>
            </transition>
          </div>
        </div>
      </main>
      <footer>
        <button class="btn btn_blue">Войти</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  height: 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  text-align: center;
  @include font(400, 16px);
  .container {
    margin-top: 10%;
    padding: 60px;
    padding-bottom: 40px;
    // border: 1px solid #aeaeae;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
    display: flex;
    flex-direction: column;
    gap: 40px;
    header {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .logo {
        width: min-content;
        min-width: 280px;
        img {
          width: 100%;
          // box-shadow: 0 8px 28px rgb(0 0 0 / 25%), 0 6px 10px rgb(0 0 0 / 22%);
          // border-radius: 8px;
        }
      }
    }
    main {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .form {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        span {
          color: #757575;
          font-size: x-large;
        }
        input {
          transition: all 0.2s ease-out;
        }
        .password {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: end;
          span {
            cursor: pointer;
            position: absolute;
            right: 8px;
          }
        }
      }
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
