import dataFromDatabase from "./data_source.json" with { type: "json" };

function inputValidation(array) {
  try {
    if (!Array.isArray(array)) {
      throw new Error();
    }
    return array;
  } catch {
    throw new Error("Invalid input");
  }
}

//This function essentially mimics fetching from database, ideally would take in values and only return
// the relevant information back, but in this case since our database is a small json, we can load all of it in memory
function loadDataFromStorage() {
  return dataFromDatabase;
}

function computeItemPrices(dataFromUser) {
  let total = 0;

  const set = new Set();

  for (let i = 0; i < dataFromUser.length; i++) {
    const code = dataFromUser[i].code;

    if (set.has(code)) {
      throw new Error("Duplicate items");
    }
    set.add(code);

    let quantity = dataFromUser[i]["quantity"];

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
  if (item === undefined) {
    throw new Error("Invalid Item, does not exist in the database");
  }
  return item;
}

function calculateSpecialPricing(items, quantity) {
  // Is this needed?
  const sortedItems = [...items].sort((a, b) => b.quantity - a.quantity);

  for (let i = 0; i < sortedItems.length; i++) {
    if (sortedItems[i].quantity <= quantity) {
      return [
        Math.floor(quantity / sortedItems[i].quantity) * sortedItems[i].price,
        quantity % sortedItems[i].quantity,
      ];
    }
  }
  return [0, quantity];
}

export function getTotal(inputData) {
  inputValidation(inputData);
  return computeItemPrices(inputData);
}
