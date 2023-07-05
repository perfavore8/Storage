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

const savedToken = JSON.parse(localStorage.getItem("TOKEN"))?.split(" ")?.[1];
// console.log(location.replace("/"));
if (!(findGetParameter("token") || savedToken))
  location.replace("/authorization");

export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + (findGetParameter("token") || savedToken);

localStorage.setItem("TOKEN", JSON.stringify(TOKEN));
