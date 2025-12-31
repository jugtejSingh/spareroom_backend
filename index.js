import { getTotal } from "./checkout.js";

console.log(
  getTotal([
    { code: "A", quantity: "6" },
    { code: "B", quantity: "2s" },
  ]),
);
