# Shopping Cart

### Description

The program is a simple cart pricing calculator, It calculates the total of the cart based on items and their prices
found in the database.

Special pricing is also applied if available for the said product, such as buying 2 of the same product will the price by 10

The solution is made with production-ready capabilities in mind with strict validation, custom error handling, proper testing and a clear
structure

### Tech Stack

- Javascript, specifically Node.js
- Database is a JSON
- Jest
- ES Modules

### Installation

**To Install**
> npm i

**To Run**
> node index.js

**To Test**
> npm test


### Inputs
The getTotal function is considered the entry point into the solution
In order to change the output,Input must be changed for the getTotal function in the index.js
The following is the only correct way to send data.

- Input is an array
- The array holds objects, each object should only have a code and a quantity
- the code attribute should relate to a code found in the database and quantity should be any value 1 or higher
**Example for input**
> [{code : "A", quantity : 2}, {code : "B", quantity : 4}]

### Outputs
The outputs are shown by a console log. An input of 
> [{code : "A", quantity : 2}, {code : "B", quantity : 4}]

will show an output of
>220

### Functions
**inputValidation**:
A function that ensures the value input is of the correct data type

**loadDataFromDatabase**:
Used to show decoupling of database from the core logic, in this case however due to the datasource being a static
JSON. its used to load the json into memory. In case of the Database this be taking a query and outputting only
the relevant information, not the entire table

**checkingArrayAttributes**:
Verifies if the value is not a duplicate, checks if quantity is of correct nature and calls checkingValuePresentInDB and returns its value

**checkingValuePresentInDB**:
checks if the code from the cart is in the DB, if not throws an error and if found then returns the value

**computeItemPrices**:
Checks if special pricing applies, if so calls calculateSpecialPricing. The returned value is added to the total and quantity.
Either way the function then calculates the remaining quantity and returns total

**calculateSpecialPricing**:
Calculates the highest special pricing found for the item and adds it repeatedly, if from the remaining quantity a smaller
special price is found then it continues to add the special pricing until no more special pricing can be added and returns
the total and quantity back. 

**getTotal**:
Entry for the solutionvcalls the validation, runs the compute and returns the value

### Assumptions
**Duplicates**:
Duplicates are handled by throwing an error, the assumption here is that duplication of the same item, should
not happen in a cart and instead should have a higher quantity. The front-end should make that merge before running the
function

**Special Rates**:
Special rates are applied greedily, Which means that the highest quantity special pricing is applied.
If a special rate is available for the quantities of 10 and 3 and an order of 13 is passed for the said item. The output
will be the special rate for 10 plus the special rate for 3. If the same rates apply and 20 is passed through as the quantity
then the special rate of 10 will be multiplied by 2. If the quantity of 5 is sent then a special rate will be applied for 3
and the rest 2 will be charged at the usual item price




