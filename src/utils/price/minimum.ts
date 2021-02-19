export default function minimum(price: number): number {
  const min = 0;
  if (isNaN(price)) {
    return min;
  }
  return price < min ? (price = -price) : price;
}
