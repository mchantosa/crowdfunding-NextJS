
import {
  convertWeiToEther,
  convertWeiToDollars,
  convertEtherToDollars,
} from "../../../src/utils/web3/web3";

describe("convertEtherToDollars", () => {
  it("should correctly convert Ether to dollars with a valid input", () => {
    const ether = "2";
    const conversionRate = 2000; // Assume 1 Ether = 2000 USD
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("4000.00");
  });

  it("should return 0.00 if Ether is 0", () => {
    const ether = "0";
    const conversionRate = 1500;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("0.00");
  });

  it("should handle small Ether values correctly", () => {
    const ether = "0.0005";
    const conversionRate = 1800;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("0.90");
  });

  it("should return 'NaN' if Ether is not a valid number", () => {
    const ether = "invalid";
    const conversionRate = 2500;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("NaN");
  });

  it("should handle negative Ether values", () => {
    const ether = "-1.5";
    const conversionRate = 2000;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("-3000.00");
  });

  it("should handle zero conversion rate", () => {
    const ether = "1.5";
    const conversionRate = 0;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("0.00");
  });

  it("should handle very large Ether values", () => {
    const ether = "1000000";
    const conversionRate = 1500;
    const result = convertEtherToDollars(ether, conversionRate);
    expect(result).toBe("1500000000.00");
  });
});
