import dataFromDatabase from "./data_source.json" with { type: "json" };
function jsonToDict(json) {
  return JSON.parse(json);
}

//This function essentially mimics fetching from database, ideally would take in values and only return
// the relevant information back, but in this case since our database is a small json, we can load all of it in memory
function loadDataFromStorage() {
  return dataFromDatabase;
}

function computeItemPrices(dataFromUser, dataFromDatabase) {
  for (const [key, value] of Object.entries(dataFromUser)) {
    const item = dataFromDatabase["items"][key];
    if (item["specials"]) {
      calculateSpecialPricing(item["specials"]);
    }
  }
}

function calculateSpecialPricing(item) {
  const array = [];
  item.map((pricing) => {
    array.push(pricing["quantity"]);
  });
  console.log(array.sort());
}

export function getTotal(json) {
  const dataFromUser = jsonToDict(json);
  const dataFromDatabase = loadDataFromStorage();
  const totalValues = computeItemPrices(dataFromUser, dataFromDatabase);
  return totalValues;
}
