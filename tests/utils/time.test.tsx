import { formatDate, getDateFromSeconds } from "../../src/utils/time";

describe("formatDate", () => {
  it("should return an empty string if the date is undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("should return the correctly formatted date string", () => {
    const pstOffset = -7; // PDT (Pacific Daylight Time) offset in June
    const date = new Date(Date.UTC(2020, 5, 15, 19 - pstOffset, 0, 0));
    expect(formatDate(date)).toBe("15-Jun-2020 22:00 EST");
  });

  it("should handle a different time zone format gracefully", () => {
    const date = new Date("2020-06-15T07:01:01Z");
    expect(formatDate(date)).toBe("15-Jun-2020 03:01 EST"); //offset is -7 hours (PST) + 3 hours (EST)
  });
});

describe("getDateFromSeconds", () => {
  it("should correctly convert seconds to a Date object when given a number", () => {
    const seconds = 1714867200; // Equivalent to "2024-05-05T00:00:00Z"
    const expectedDate = new Date("2024-05-05T00:00:00Z");

    expect(getDateFromSeconds(seconds)).toEqual(expectedDate);
  });

  it("should correctly convert seconds to a Date object when given a bigint", () => {
    const seconds = BigInt(1714867200); // Equivalent to "2024-05-05T00:00:00Z"
    const expectedDate = new Date("2024-05-05T00:00:00Z");

    expect(getDateFromSeconds(seconds)).toEqual(expectedDate);
  });

  it("should handle zero seconds correctly", () => {
    const seconds = 0; // "1970-01-01T00:00:00Z"
    const expectedDate = new Date("1970-01-01T00:00:00Z");

    expect(getDateFromSeconds(seconds)).toEqual(expectedDate);
  });

  it("should handle negative seconds correctly", () => {
    const seconds = -86400; // Equivalent to "1969-12-31T00:00:00Z"
    const expectedDate = new Date("1969-12-31T00:00:00Z");

    expect(getDateFromSeconds(seconds)).toEqual(expectedDate);
  });
});
