import { getTotal } from "./checkout.js";

// Not sure if this is meant to be a JSON yet
console.log(
  getTotal([
    { code: "A", quantity: "6" },
    { code: "B", quantity: "2" },
  ]),
);
