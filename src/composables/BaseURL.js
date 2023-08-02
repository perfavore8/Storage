import { useRouter } from "vue-router";
import { useCheckDevMode } from "./checkDevMode";
import { checkInFrame } from "./checkInFrame";
import store from "@/store";
import { ref } from "vue";
const { isDev } = useCheckDevMode();

function findGetParameter(parameterName) {
  let result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

export const TokenName = "TOKEN";

let savedToken = "";
const getCachedToken = () => {
  savedToken = JSON.parse(localStorage.getItem(TokenName));
};
getCachedToken();

const isTokenFail = ref(false);

export function useRedirectToAuth() {
  const router = useRouter();

  const checkPath = async () => {
    if (
      !haveAnyTOKEN() &&
      router.currentRoute.value.path !== "/authorization"
    ) {
      router.push("/authorization");
    } else if (haveAnyTOKEN() && !isDev.value) {
      router.push("/");
    }
  };
  checkPath();

  const startCheckIsValidToken = () => {
    const f = async () => {
      const tokenFail = await store.dispatch("accountCheck");
      isTokenFail.value = tokenFail;
      if (tokenFail && checkInFrame) {
        router.push("/Error_token_not_valid");
      }
    };
    f();
    setInterval(() => f(), 10000);
  };

  return { checkPath, getCachedToken, startCheckIsValidToken, isTokenFail };
}

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);
export const getTOKEN = () =>
  "Bearer " + (findGetParameter("token") || savedToken);
export const haveAnyTOKEN = () =>
  Boolean(findGetParameter("token") || savedToken);
