import { useCheckDevMode } from "./checkDevMode";
import { inFrame } from "./checkInFrame";
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { useSaveLS } from "./saveLS";
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

export let savedToken = "";
export let POToken = location.hash.split("potoken=")[1];
export const TokenName = "TOKEN";
export const POTokenName = "POTOKEN";
export const isPOTokenGetted = ref(false);
export let POsavedToken = JSON.parse(localStorage.getItem(POTokenName)) || "";
export const getPOTOKEN = () => "Bearer " + POsavedToken;
if (location.search) {
  localStorage.setItem(TokenName, JSON.stringify(findGetParameter("token")));
  location.replace(location.href.replace(location.search, ""));
}
const { saveLSParam } = useSaveLS();
saveLSParam("POAuth", Boolean(POToken));

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
  Boolean(findGetParameter("token") || savedToken || POsavedToken);

export let instance = null;
export const createInstance = (token) =>
  (instance = axios.create({
    baseURL: BaseURL,
    headers: { Authorization: token || getTOKEN() },
  }));
if (!POToken) createInstance();

export let poinstance = null;
export const createPOInstance = (token) =>
  (poinstance = axios.create({
    baseURL: BaseURL,
    headers: { Authorization: token || getPOTOKEN() },
  }));
const qwe = () => {
  POToken = true;
  createPOInstance(getPOTOKEN());
  isPOTokenGetted.value = true;
};

if (POToken) {
  const poinstance2 = axios.create({
    baseURL: BaseURL,
    // headers: { Authorization: "Beared " + POToken },
  });

  poinstance2({
    url: "public-order/token/get",
    params: { public_token: POToken },
  }).then(({ data }) => {
    if (!data.token) return;
    POsavedToken = data.token;
    localStorage.setItem(POTokenName, JSON.stringify(data.token));
    location.replace(
      location.href.replace(
        "&potoken=" + location.href.split("&potoken=")[1],
        ""
      )
    );
    delete router.currentRoute.value.query.potoken;
    qwe();
  });
} else qwe();
