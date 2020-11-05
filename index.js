/**
 * @Descdription
 *  Determine if the value is boolean type.
 * @params {String|Number|Boolean} value
 * @Returns {Boolean}
 */
function isBoolean(value) {
   return ['true', 'false'].indexOf(value) !== -1;
}

/**
 * @Descdription
 *  Determine if the value is a valid number.
 * @params {String|Number|Boolean} value
 * @Returns {Boolean}
 */
// Todo: Fix the issue for numbers having negative sign not at the begining.
function isNumber(value) {
   let validNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'],
      arr = value && value.length > 1 && value.split(''),
      arrLength = arr.length;

   if (arrLength > 1) {
      for (let i = 0; i < arr.length; i++) {
         if (validNumbers.indexOf(arr[i]) === -1) {
            return false;
         }
      }
   }

   return true;
}

function processDataTypes(data) {
   let result;

   if (typeof data instanceof Object) {
      result = processData(data);
   }
   else if (isBoolean(data)) {
      result = (data === 'true');
   }
   else if (isNumber(data)) {
      result = Number(data);
   }
   else {
      result = (data === 'null' || data === 'nul') ? null : data;
   }
   return result;
}

/**
 * @description
 *  Process incopming Json data and validate data types
 * @param {Object} data
 * @returns {Object}
 */
function processData(data) {
   let result = {};

   if (data) {
      Object.keys(data).forEach(key => {
         let currentField = data[key];

         if (Array.isArray(currentField)) {
            let newArr = [];
            currentField.forEach(arrItem => {
               let tmp = (typeof arrItem === 'object' || Array.isArray(arrItem)) ?
                  processData(arrItem) : processDataTypes(arrItem);
               newArr.push(tmp);
            })
            result[key] = newArr;
         }
         else if (typeof currentField === 'object') {
            result[key] = processData(currentField);
         }
         else {
            result[key] = processDataTypes(currentField);
         }
      })
   }

   return result;
}

const incomingData = {
   "name": "John Smith",
   "age": "27",
   "negativeNumber": "-33",
   "positiveNumber": "33+e1",
   "trueValue": "true",
   "falseValue": "false",
   "favoriteColors": ["green", "blue", "red", "4"],
   "nestedArray": [{ name: "Sam" }],
   "favoriteNumber": "null",
   "birth": {
      "location": "Kitchener",
      "year": "1990"
   }
};

console.log(processData(incomingData));
// console.log(isNumber('-123'));
// console.log(isNumber('asd'));
// console.log(Number.isNaN(('33+e1')));
// console.log(Number(33+e1 * 1));