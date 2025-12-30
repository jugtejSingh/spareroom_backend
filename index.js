import { getTotal } from "./checkout.js";

try {
  console.log(getTotal(JSON.stringify({ A: 6, B: 4, D: 2 })));
} catch (err) {
  console.log(err);
}
