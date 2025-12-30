import { getTotal } from "./checkout.js";

try {
  console.log(getTotal(JSON.stringify([{ code: "A", quantity: 6 }])));
} catch (err) {
  console.log(err);
}
