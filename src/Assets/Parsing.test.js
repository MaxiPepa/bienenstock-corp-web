import {
  parsingDateTime,
  parsingDate,
  parsingEachFirstLetterToUppercase,
} from "./Parsing";

describe("ParsingDates", () => {
  test("parsingDateTime should format a given ISO string correctly to DD/MM/YYYY HH:MM", () => {
    const isoString = "2023-06-20 17:01:16.217";
    const expectedOutput = "20/06/2023 17:01";

    expect(parsingDateTime(isoString)).toBe(expectedOutput);
  });

  test("parsingDate should format a given ISO string correctly to DD/MM/YYYY", () => {
    const isoString = "2023-06-21T14:30:00Z";
    const expectedOutput = "21/06/2023";

    expect(parsingDate(isoString)).toBe(expectedOutput);
  });

  test("parsingEachFirstLetterToUppercase should capitalize the first letter of each word in a string", () => {
    const inputString = "name lastname";
    const expectedOutput = "Name Lastname";

    expect(parsingEachFirstLetterToUppercase(inputString)).toBe(expectedOutput);
  });
});
