import { computeItemPrices, getTotal } from "../checkout.js";
import { inputValidation } from "../checkout.js";

describe("full flow tests", () => {
  test("single item A", () => {
    const value = [{ code: "A", quantity: 1 }];
    const total = getTotal(value);
    expect(total).toBe(50);
  });

  test("single item C", () => {
    const value = [{ code: "C", quantity: 2 }];
    const total = getTotal(value);
    expect(total).toBe(50);
  });

  test("special item A 3 quantity", () => {
    const value = [{ code: "A", quantity: 3 }];
    const total = getTotal(value);
    expect(total).toBe(140);
  });

  test("special item A 9 quantity", () => {
    const value = [{ code: "A", quantity: 9 }];
    const total = getTotal(value);
    expect(total).toBe(420);
  });

  test("B negative quantity", () => {
    const value = [{ code: "B", quantity: -1 }];
    expect(() => getTotal(value)).toThrow();
  });

  test("item A B C and D", () => {
    const value = [
      { code: "A", quantity: 2 },
      { code: "B", quantity: 2 },
      { code: "C", quantity: 10 },
      { code: "D", quantity: 5 },
    ];
    const total = getTotal(value);
    expect(total).toBe(470);
  });

  test("item A C D but D negative quantity", () => {
    const value = [
      { code: "A", quantity: 2 },
      { code: "C", quantity: 5 },
      { code: "D", quantity: -10 },
    ];
    expect(() => getTotal(value)).toThrow();
  });
  test("item A B but B's quantity is a string", () => {
    const value = [
      { code: "A", quantity: 2 },
      { code: "B", quantity: "3" },
    ];
    expect(() => getTotal(value)).toThrow();
  });
  test("item A B but B's quantity is incorrect", () => {
    const value = [
      { code: "A", quantity: 2 },
      { code: "B", quantity: "3a" },
    ];
    expect(() => getTotal(value)).toThrow();
  });
  test("item A B but A's is duplicated", () => {
    const value = [
      { code: "A", quantity: 2 },
      { code: "B", quantity: 3 },
      { code: "A", quantity: 3 },
    ];
    expect(() => getTotal(value)).toThrow();
  });
});

describe("unit tests", () => {
  test("checking input validation, correct", () => {
    expect(inputValidation([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("checking input validation, incorrect", () => {
    expect(() => inputValidation({ 1: 1 })).toThrow();
  });

  test("checking compute prices", () => {
    expect(computeItemPrices([{ code: "A", quantity: 2 }])).toBe(100);
  });

  test("checking compute prices, incorrect quantity", () => {
    expect(() => computeItemPrices([{ code: "A", quantity: 0 }])).toThrow();
  });

  test("checking compute prices, incorrect naming", () => {
    expect(() => computeItemPrices([{ codee: "A", quantity: 2 }])).toThrow();
  });

  test("checking compute prices, invalid code", () => {
    expect(() => computeItemPrices([{ code: "AA", quantity: 2 }])).toThrow();
  });
});
