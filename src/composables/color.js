export function useColor() {
  function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function getRandomColor2() {
    var letters = "0123456789ABCD";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 14)];
    }
    return color;
  }
  function getRandomColor3(opacity) {
    const h = Math.floor(Math.random() * 256);

    let color = hslToHex(h, 100, 50);
    if (opacity) color = color + opacity;

    return color;
  }

  return { getRandomColor, getRandomColor2, getRandomColor3 };
}
