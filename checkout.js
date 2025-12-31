import dataFromDatabase from "./data_source.json" with { type: "json" };

function inputValidation(array) {
  if (!Array.isArray(array)) {
    throw new Error("Invalid Input");
  }
  return array;
}

//This function essentially mimics fetching from database, ideally would take in values and only return
// the relevant information back, but in this case since our database is a small json, we can load all of it in memory
function loadDataFromStorage() {
  return dataFromDatabase;
}

function computeItemPrices(dataFromUser) {
  let total = 0;

  const setForDuplicateChecking = new Set();

  for (let i = 0; i < dataFromUser.length; i++) {
    const code = dataFromUser[i].code;
    let quantity = dataFromUser[i].quantity;

    if (setForDuplicateChecking.has(code)) {
      throw new Error("Duplicate items");
    }
    setForDuplicateChecking.add(code);

    if (typeof quantity === "undefined" || quantity <= 0 || isNaN(quantity)) {
      throw new Error("Invalid quantity");
    }

    const item = checkingValuePresentInDB(code);

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

function checkingValuePresentInDB(key) {
  const dataFromDatabase = loadDataFromStorage();
  const item = dataFromDatabase["items"][key];
  if (!item) {
    throw new Error("Invalid Item, does not exist in the database");
  }
  return item;
}

function calculateSpecialPricing(specialPricingItem, quantity) {
  // Is this needed?
  specialPricingItem.sort((a, b) => b.quantity - a.quantity);

  for (let i = 0; i < specialPricingItem.length; i++) {
    if (specialPricingItem[i].quantity <= quantity) {
      return [
        Math.floor(quantity / specialPricingItem[i].quantity) *
          specialPricingItem[i].price,
        quantity % specialPricingItem[i].quantity,
      ];
    }
  }
  return [0, quantity];
}

export function getTotal(inputData) {
  try {
    inputValidation(inputData);
    return computeItemPrices(inputData);
  } catch (error) {
    console.log(`Error occurred: ${err.message}`);
  }
}
