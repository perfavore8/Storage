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
// console.log(findGetParameter("token"));
export const BaseURL = "https://api.gosklad.ru/v1/";
export const TOKEN = "Bearer " + findGetParameter("token");
// export const TOKEN =
//   "Bearer $2y$10$IbrftJL/LZ/BFwMY0Luudu0lNAEViMpUC0sId7FKu/YsZArpocNO2";
// export const TOKEN =
//   "Bearer $2y$10$9Bv6CdEPu12Ru24JwNyGgem7BLAY0g7SZFzqurppPXoD34osrbWvW";
// export const TOKEN =
//   "Bearer $2y$10$01gwcGtO/gujucIAW2Y2kOX0dOi.kaGmZnuKMZs4uvlFPXS1rVlLu";
