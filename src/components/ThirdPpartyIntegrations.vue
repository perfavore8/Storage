<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container">
      <div class="header">
        <label>{{ $t("Integrations.header") }}</label>
        <button class="btn_del" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="content">
        <template v-if="account.install">
          <div class="item relative">
            <div class="relative">
              <img
                class="icon"
                src="@/assets/genezis.jpg"
                @click="route('genezis')"
              />
              <img
                class="absolute -bottom-3 -left-3 rounded-full w-10"
                src="https://wp.static-cdn-shsp.com/wp-content/uploads/2017/06/amo_fon.png"
              />
            </div>
            <a
              href=" https://www.amocrm.ru/oauth/?state=%7B%22external_source%22:%22gosklad%22%7D&client_id=d9322b36-0001-4269-bb61-976571e8a51a"
              target="blank"
            >
              <button class="btn btn_dark_blue" :disabled="account?.g_install">
                {{
                  account?.g_install
                    ? $t("Integrations.btnInstalled")
                    : $t("Integrations.btnInstall")
                }}
              </button>
            </a>
            <small v-if="!account?.g_install">
              {{ $t("Integrations.oneCText") }}
            </small>
            <a @click="route('genezis')">
              <button class="btn btn_dark_blue" :disabled="!account?.g_install">
                {{ $t("Integrations.btnSettings") }}
              </button>
            </a>
          </div>
          <div class="item">
            <div class="relative">
              <img class="icon" src="@/assets/lo.jpg" />
              <img
                class="absolute -bottom-3 -left-3 rounded-full w-10"
                src="https://wp.static-cdn-shsp.com/wp-content/uploads/2017/06/amo_fon.png"
              />
            </div>
            <a
              href="https://www.amocrm.ru/oauth/?client_id=a4864c29-6b9b-470b-bb0e-9a1c22496087"
              target="blank"
              ><button class="btn btn_dark_blue">
                {{ $t("Integrations.btnInstall") }}
              </button></a
            >
            <small>{{ $t("Integrations.free") }}</small>
          </div>
          <div class="item" v-if="false">
            <img class="icon" src="@/assets/re.jpg" />
            <a
              href="https://www.amocrm.ru/oauth/?client_id=47855e7f-c170-44b3-8d95-a3fe357d2cc7"
              target="blank"
              ><button class="btn btn_dark_blue">
                {{ $t("Integrations.btnInstall") }}
              </button></a
            >
            <small>{{ $t("Integrations.free") }}</small>
          </div>
        </template>
        <div class="item">
          <img
            class="icon"
            src="https://wp.static-cdn-shsp.com/wp-content/uploads/2017/06/amo_fon.png"
          />
          <a :href="urlSutupInAmoCrm" target="blank" :inert="account?.install">
            <button class="btn btn_dark_blue" :disabled="account?.install">
              {{
                account?.install
                  ? $t("Integrations.btnInstalled")
                  : $t("Integrations.btnInstall")
              }}
            </button>
          </a>
          <small v-if="!account?.install">
            {{ $t("Integrations.amoError") }}
          </small>
          <a @click="route('amoCRM')" v-if="account?.install">
            <button class="btn btn_dark_blue">
              {{ $t("Integrations.btnSettings") }}
            </button>
          </a>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const oneC = computed(() => store.state.account.account?.config?.g_enabled);
    const account = computed(() => store.state.account.account);
    const user = computed(() => store.state.account.user);

    const route = (page_name) => {
      close();
      router.push("/" + page_name);
    };
    const close = () => store.commit("openCloseThirdPpartyIntegrations", false);

    const urlSutupInAmoCrm = encodeURI(
      `https://www.amocrm.ru/oauth/?state={"external_source":"gs", "user_id":${user.value?.id}}&client_id=5cd3ee16-5f4c-4b3f-828f-9f575bcaeb2e`
    );

    const amoTest = computed(() => store.state.account?.account?.id == 454);

    return { oneC, account, route, close, urlSutupInAmoCrm, amoTest };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  @include font(400, 16px);
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
    max-width: 1140px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px 50px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
      .btn_del {
        background: transparent;
        border-radius: 0 5px 5px 0;
        height: 30px;
        width: 30px;
        margin: 0 auto;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
        margin: 0;
        margin-right: -10px;
        .icon {
          width: inherit;
          height: inherit;
          transition: transform 0.15s ease-in-out;
          @include bg_image("@/assets/cross_black.svg", 60%);
        }
        .icon:hover {
          transform: rotate(90deg);
        }
      }
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
      display: flex;
      flex-direction: row;
      gap: 20px;
      .item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: calc(20% - 20px);
        padding: 16px;
        box-shadow: 0px 4px 4px #00000040;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        .icon {
          cursor: pointer;
          border-radius: 10px;
          width: 142px;
          height: 97px;
          object-fit: cover;
        }
        small {
          @include font(400, 10px);
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
</style>
