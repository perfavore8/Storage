export function useValidate() {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  function formatNumber(number) {
    const wideSpace = " ";
    const narrowSpace = " ";
    wideSpace, narrowSpace;
    number = round(Number(number), 2);
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, narrowSpace);

    return parts.join(".");
  }

  const dateFormater = (date, params = []) => {
    const res = new Date(date);
    return res.toLocaleString(...params);
  };

  return { validateEmail, formatNumber, dateFormater };
}
