export function usePreparationQueryParams() {
  const preparation_params = (params) => {
    let str = "";
    Object.entries(params).forEach((val, idx) => {
      idx === 0 ? (str += "?") : (str += "&");
      console.log(val[1], typeof val[1], val[1]?.length > 0);
      let a = "";
      typeof val[1] == "object" ? (a = "[" + val[1] + "]") : (a = val[1]);
      str += val[0] + "=" + a;
    });
    return str;
  };
  return { preparation_params };
}
