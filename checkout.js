import dataFromDatabase from "./data_source.json" with { type: "json" };
import ValidationError from "./errors/validation-error.js";
import DuplicationError from "./errors/duplication-error.js";
import InvalidItemError from "./errors/invalid-item-error.js";

export function inputValidation(array) {
  if (!Array.isArray(array)) {
    throw new ValidationError();
  }
  return array;
}

//This function essentially mimics fetching from database, ideally would take in values and only return
// the relevant information back, but in this case since our database is a small json, we can load all of it in memory
export function loadDataFromStorage() {
  return dataFromDatabase;
}

function checkingArrayAttributes(setForDuplicateChecking, code, quantity) {
  if (setForDuplicateChecking.has(code)) {
    throw new DuplicationError();
  }
  setForDuplicateChecking.add(code);

  if (typeof quantity !== "number" || quantity <= 0 || isNaN(quantity)) {
    throw new ValidationError();
  }
  return checkingValuePresentInDB(code);
}

export function checkingValuePresentInDB(key) {
  const dataFromDatabase = loadDataFromStorage();
  const item = dataFromDatabase["items"][key];
  if (!item) {
    throw new InvalidItemError();
  }
  return item;
}

export function computeItemPrices(dataFromUser) {
  let total = 0;
  const setForDuplicateChecking = new Set();

  for (let i = 0; i < dataFromUser.length; i++) {
    const code = dataFromUser[i].code;
    let quantity = dataFromUser[i].quantity;

    const item = checkingArrayAttributes(
      setForDuplicateChecking,
      code,
      quantity,
    );

    if (item["specials"]) {
      let quantityToCalculate = calculateSpecialPricing(
        item["specials"],
        quantity,
      );

      total += quantityToCalculate[0];
      quantity = quantityToCalculate[1];
    }

    total += quantity * item["unitPrice"];
  }

  return total;
}

export function calculateSpecialPricing(specialPricingItem, quantity) {
  specialPricingItem.sort((a, b) => b.quantity - a.quantity);
  let total = [0, quantity];
  for (let i = 0; i < specialPricingItem.length; i++) {
    if (specialPricingItem[i].quantity <= quantity) {
      total[0] =
        total[0] +
        Math.floor(total[1] / specialPricingItem[i].quantity) *
          specialPricingItem[i].price;

      total[1] = total[1] % specialPricingItem[i].quantity;
    }
  }
  return total;
}

export function getTotal(inputData) {
  inputValidation(inputData);
  return computeItemPrices(inputData);
}
