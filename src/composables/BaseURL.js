import { useCheckDevMode } from "./checkDevMode";
import { inFrame } from "./checkInFrame";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
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

if (location.search) {
  localStorage.setItem(TokenName, JSON.stringify(findGetParameter("token")));
  location.replace(location.href.replace(location.search, ""));
}

let savedToken = "";
export const getCachedToken = () => {
  savedToken = JSON.parse(localStorage.getItem(TokenName));
};
getCachedToken();

const isTokenFail = ref(false);

export function useRedirectToAuth() {
  const checkPath = async () => {
    if (
      !haveAnyTOKEN() &&
      router.currentRoute.value.path !== "/authorization"
    ) {
      router.push("/authorization");
    } else if (haveAnyTOKEN() && !isDev.value) {
      createInstance();
      router.push("/");
    }
  };

  const redirectToErrorPage = () => {
    isTokenFail.value = true;
    if (inFrame) {
      router.push("/Error_token_not_valid");
    } else {
      savedToken = "";
      createInstance();
      router.push("/authorization");
    }
  };

  return {
    checkPath,
    getCachedToken,
    isTokenFail,
    redirectToErrorPage,
  };
}

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);
export const getTOKEN = () =>
  "Bearer " + (findGetParameter("token") || savedToken);
export const haveAnyTOKEN = () =>
  Boolean(findGetParameter("token") || savedToken);

export let instance = null;

export const createInstance = () =>
  (instance = axios.create({
    baseURL: BaseURL,
    headers: { Authorization: getTOKEN() },
  }));
createInstance();
