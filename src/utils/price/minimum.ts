export default function minimum(price: number): number {
  return price < 0 ? (price = -price) : price;
}
