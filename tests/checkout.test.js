import { getTotal } from "../checkout.js";

test("single item A", () => {
  const value = [{ code: "A", quantity: 1 }];
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(50);
});

test("single item C", () => {
  const value = [{ code: "C", quantity: 2 }];
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(50);
});

test("special item A 3 quantity", () => {
  const value = [{ code: "A", quantity: 3 }];
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(140);
});

test("special item A 9 quantity", () => {
  const value = [{ code: "A", quantity: 9 }];
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(420);
});

test("B negative quantity", () => {
  const value = [{ code: "B", quantity: -1 }];
  expect(() => getTotal(JSON.stringify(value))).toThrow("Invalid value");
});

test("item A B C and D", () => {
  const value = [
    { code: "A", quantity: 2 },
    { code: "B", quantity: 2 },
    { code: "C", quantity: 10 },
    { code: "D", quantity: 5 },
  ];
  const total = getTotal(JSON.stringify(value));
  expect(total).toBe(470);
});

test("item A C D but D negative quantity", () => {
  const value = [
    { code: "A", quantity: 2 },
    { code: "C", quantity: 5 },
    { code: "D", quantity: -10 },
  ];
  expect(() => getTotal(JSON.stringify(value))).toThrow("Invalid value");
});
test("item A B but B's quantity is a string", () => {
  const value = [
    { code: "A", quantity: 2 },
    { code: "B", quantity: "3d" },
  ];
  expect(getTotal(JSON.stringify(value))).toBe(195);
});
