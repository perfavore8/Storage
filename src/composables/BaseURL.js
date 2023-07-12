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

// Извлечение переменной из кэша
(() => {
  tokenPromise = new Promise((resolve) => {
    caches
      .open(cacheName)
      .then((cache) => {
        const key = "TOKEN";

        return cache.match(key);
      })
      .then((response) => {
        if (response) {
          return response.text();
        } else {
          throw new Error("Переменная не найдена в кэше");
        }
      })
      .then((value) => {
        if (process.env.NODE_ENV === "development")
          console.log("Извлеченная переменная из кэша:", value);
        savedToken = value;
        resolve();
      })
      .catch((err) => {
        console.error("Ошибка при извлечении переменной из кэша:", err);
      });
  });
})();

export const getTokenPromise = () => tokenPromise;

(async () => {
  await getTokenPromise();

  if (
    !(
      findGetParameter("token") ||
      savedToken ||
      location.pathname === "/authorization"
    )
  )
    location.replace("/authorization");
})();

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);
export const getTOKEN = () =>
  "Bearer " + (findGetParameter("token") || savedToken);
