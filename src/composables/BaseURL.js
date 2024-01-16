import { useCheckDevMode } from "./checkDevMode";
import { inFrame } from "./checkInFrame";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
const { isDev } = useCheckDevMode();

export const BaseURL = "https://api.gosklad.ru/v1/";

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

export const POToken = location.hash.split("potoken=")[1];
export const isPOTokenGetted = ref(false);
if (location.search) {
  localStorage.setItem(TokenName, JSON.stringify(findGetParameter("token")));
  location.replace(location.href.replace(location.search, ""));
}
if (POToken) {
  console.log(1);
  localStorage.setItem(TokenName, JSON.stringify(""));
  const poinstance = axios.create({
    baseURL: BaseURL,
    // headers: { Authorization: "Beared " + POToken },
  });

  poinstance({
    url: "public-order/token/get",
    params: { public_token: POToken },
  }).then(({ data }) => {
    console.log(2);
    if (!data.token) return;
    savedToken = data.token;
    localStorage.setItem(TokenName, JSON.stringify(data.token));
    location.replace(location.href.replace(location.search, ""));
    getCachedToken();
    createInstance();
    isPOTokenGetted.value = true;
  });
}

export let savedToken = "";
export const getCachedToken = () => {
  const val = localStorage.getItem(TokenName);
  if (val === "undefinded") return;
  savedToken = JSON.parse(val);
};
if (!POToken) getCachedToken();

const isTokenFail = ref(false);

export function useRedirectToAuth() {
  const checkPath = async () => {
    if (POToken) return;
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
if (!POToken) createInstance();
