import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCheckDevMode } from "./checkDevMode";

function findGetParameter(parameterName) {
  var result = null,
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

export const cacheName = "salesup";

let savedToken = "";
let tokenPromise = null;
const { isDev } = useCheckDevMode();
// Извлечение переменной из кэша
const getCachedToken = () =>
  (tokenPromise = new Promise((resolve) => {
    const func = async () => {
      try {
        const cache = await caches.open(cacheName);
        const key = "TOKEN";
        const response = await cache.match(key);

        if (response) {
          const value = await response.text();
          if (isDev.value) {
            console.log("Извлеченная переменная из кэша:", value);
          }
          savedToken = value;
        } else {
          throw new Error("Переменная не найдена в кэше");
        }
      } catch (err) {
        if (isDev.value) {
          console.error("Ошибка при извлечении переменной из кэша:", err);
        }
      } finally {
        resolve();
      }
    };
    func();
  }));

getCachedToken();

export const getTokenPromise = () => tokenPromise;

export function useRedirectToAuth() {
  const router = useRouter();

  const checkPath = async () => {
    const path = computed(() => router.currentRoute.value.path);

    await getTokenPromise();

    if (!(findGetParameter("token") || savedToken))
      router.push("/authorization");

    if (
      (findGetParameter("token") || savedToken) &&
      path.value === "/authorization"
    )
      router.push("/");
  };
  checkPath();

  return { checkPath, getCachedToken };
}

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);
export const getTOKEN = () =>
  "Bearer " + (findGetParameter("token") || savedToken);
