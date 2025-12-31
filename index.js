import { getTotal } from "./checkout.js";

try {
  // Not sure if this is meant to be a JSON yet
  console.log(
    getTotal([
      { code: "A", quantity: "6" },
      { code: "B", quantity: "2" },
    ]),
  );
} catch (err) {
  console.log(`Error occurred: ${err.message}`);
}
