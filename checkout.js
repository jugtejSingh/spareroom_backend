import dataFromDatabase from "./data_source.json" with { type: "json" };
function jsonToDict(json) {
  try {
    return JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON input");
  }
}

//This function essentially mimics fetching from database, ideally would take in values and only return
// the relevant information back, but in this case since our database is a small json, we can load all of it in memory
function loadDataFromStorage() {
  return dataFromDatabase;
}

function computeItemPrices(dataFromUser) {
  let total = 0;

  if (typeof dataFromUser !== "object" || dataFromUser === null) {
    throw new Error("Invalid format of JSON");
  }

  for (const [key, value] of Object.entries(dataFromUser)) {
    const item = checkingValuePresentInDB(key);
    if (typeof value === "undefined" || value <= 0) {
      throw new Error("Invalid value");
    }
    let quantity = value;

    if (item["specials"]) {
      if (!Array.isArray(item.specials)) {
        throw new Error(
          `Invalid specials for ${key}, double check the database`,
        );
      }
      let quantityToCalculate = calculateSpecialPricing(
        item["specials"],
        value,
      );

      total += quantityToCalculate[0];
      quantity = quantityToCalculate[1];
    }

    total += quantity * item["unit_price"];
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
  items.sort((a, b) => b.quantity - a.quantity);

  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity <= quantity) {
      return [
        Math.floor(quantity / items[i].quantity) * items[i].price,
        quantity % items[i].quantity,
      ];
      break;
    }
  }
  return [0, quantity];
}

export function getTotal(json) {
  const dataFromUser = jsonToDict(json);
  return computeItemPrices(dataFromUser);
}
