const users = require('./task2.json');
// наколхозил чутка=)
const userFilter = (arr, acc = [], jsonAcc = []) => {
    for (let item of arr) {
      if (!jsonAcc.includes(JSON.stringify(item))) {
        jsonAcc.push(JSON.stringify(item));
        acc.push(item);
      }
    }
    return acc;
  };
  
  console.log(userFilter(users));