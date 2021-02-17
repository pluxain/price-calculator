import format from "@/utils/price/format";

describe("format price utils", () => {
  it("should keep the two first decimals if price has more", () => {
    let actual = format(1.2345);
    expect(actual).toBe("1.23");
    actual = format(1.2456);
    expect(actual).toBe("1.25");
  });

  it("should return one decimal digit if price has less than two", () => {
    const actual = format(4.3);
    expect(actual).toBe("4.3");
  });

  it("should return 0 as decimal if price has no decimal digit ", () => {
    const actual = format(1);
    expect(actual).toBe("1.0");
  });

  it("should return 0.0 if no price is provided", () => {
    const actual = format(undefined);
    expect(actual).toBe("0.0");
  });
});
