import { describe, it, expect } from "vitest";
import { formatKRW, getDiscountRate, cn } from "@/lib/utils";

describe("formatKRW", () => {
  it("formats with Korean locale commas", () => {
    expect(formatKRW(89000)).toBe("89,000");
    expect(formatKRW(1000000)).toBe("1,000,000");
    expect(formatKRW(0)).toBe("0");
  });
});

describe("getDiscountRate", () => {
  it("calculates discount percentage", () => {
    expect(getDiscountRate(90000, 100000)).toBe(10);
    expect(getDiscountRate(75000, 100000)).toBe(25);
  });
  it("rounds to nearest integer", () => {
    expect(getDiscountRate(66000, 99000)).toBe(33);
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
