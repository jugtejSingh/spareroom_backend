import { getTotal } from "../checkout.js";

test("single item A", () => {
  const value = { A: 1 };
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(50);
});

test("single item C", () => {
  const value = { C: 2 };
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(50);
});

test("special item A 3 quantity", () => {
  const value = { A: 3 };
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(140);
});

test("special item A 9 quantity", () => {
  const value = { A: 9 };
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(420);
});

test("B negative quantity", () => {
  const value = { B: -1 };
  expect(() => getTotal(JSON.stringify(value))).toThrow("Invalid value");
});

test("item A B C and D", () => {
  const value = { A: 2, B: 2, C: 10, D: 5 };
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(470);
});

test("item A C D but D negative quantity", () => {
  const value = { A: 2, C: 5, D: -10 };
  expect(() => getTotal(JSON.stringify(value))).toThrow("Invalid value");
});
test("item A B but B is a string", () => {
  const value = { A: 2, B: "3" };
  expect(getTotal(JSON.stringify(value))).toBe(195);
});
