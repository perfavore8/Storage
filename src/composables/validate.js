export function useValidate() {
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function formatNumber(number) {
    number = Math.round(number * 100) / 100;
    let parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (parts.length > 1) {
      parts[1] = parts[1].substring(0, 2);
      parts.push(",");
    } else {
      parts.push(", 00");
    }
    return parts.join("");
  }

  return { validateEmail, formatNumber };
}
