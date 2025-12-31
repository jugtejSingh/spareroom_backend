import { getTotal } from "./checkout.js";
import ValidationError from "./errors/validation-error.js";

import InvalidItemError from "./errors/invalid-item-error.js";
import DuplicationError from "./errors/duplication-error.js";

try {
  console.log(
    getTotal([
      { code: "A", quantity: "6" },
      { code: "B", quantity: "2" },
      { code: "E", quantity: "2" },
    ]),
  );
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Please check your inputs and ensure its an array");
  } else if (error instanceof DuplicationError) {
    console.log("Please check your inputs, There seems to be a duplication");
  } else if (error instanceof InvalidItemError) {
    console.log("An error has occurred, please try again");
  } else {
    console.error(error);
    console.log("An error has occurred, please try again");
  }
}
