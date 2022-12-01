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
console.log(findGetParameter("token"));
export const BaseURL = "https://api.gosklad.ru/v1/";
export let TOKEN = "Bearer " + findGetParameter("token");
