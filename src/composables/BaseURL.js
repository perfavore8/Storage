import { useRouter } from "vue-router";
import { useCheckDevMode } from "./checkDevMode";
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

  return { checkPath, getCachedToken };
}

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);
export const getTOKEN = () =>
  "Bearer " + (findGetParameter("token") || savedToken);
export const haveAnyTOKEN = () =>
  Boolean(findGetParameter("token") || savedToken);
