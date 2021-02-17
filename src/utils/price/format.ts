export default function format(price: number | undefined) {
  if (typeof price === "undefined") {
    return "0.0";
  } else if (typeof price === "number") {
    const s = String(price);
    if (s.indexOf(".") !== -1) {
      const parts = s.split(".");
      if (parts[1].length < 2) {
        return price.toFixed(1);
      } else {
        return price.toFixed(2);
      }
    } else {
      return price.toFixed(1);
    }
  }
  return "0.0";
}
