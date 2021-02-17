import minimum from "@/utils/price/minimum";

describe("minimum price util", () => {
  it("should return the price if price is positive", () => {
    let actual = minimum(123);
    expect(actual).toBe(123);
    actual = minimum(345.123);
    expect(actual).toBe(345.123);
  });

  it("should return the opposite of price if negative", () => {
    let actual = minimum(-123);
    expect(actual).toBe(123);
    actual = minimum(-567.1002);
    expect(actual).toBe(567.1002);
  });
});
