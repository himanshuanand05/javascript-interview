/**
 * Rest vs Spread Operator, `this`, and `arguments`
 *
 * As we remember, arrow functions don’t have their own `this`.
 * Now we know they also don’t have their own special `arguments` object either.
 *
 * In modern JavaScript, we almost always use the REST operator (`...param`)
 * instead of `arguments` to collect a function's parameters.
 *
 * This file shows:
 *  - The difference between REST and SPREAD
 *  - Why arrow functions need REST (because they don’t have `arguments`)
 *  - How this ties into arrow functions not having their own `this`
 */

// ---------------------------------------------------------------------------
// 1. REST vs SPREAD in one glance
// ---------------------------------------------------------------------------

// REST: "Pack" separate arguments into an array parameter.
function sumWithRest(...nums) {
  // `nums` is a real array
  return nums.reduce((total, n) => total + n, 0);
}

console.log('sumWithRest(1, 2, 3) =', sumWithRest(1, 2, 3)); // 6

// SPREAD: "Unpack" an iterable (like an array) into separate arguments.
const numsArray = [1, 2, 3];
console.log('sumWithRest(...numsArray) =', sumWithRest(...numsArray)); // 6

// So:
//  - REST is used in parameter lists: function fn(...args) {}
//  - SPREAD is used in call sites / array/object literals: fn(...argsArray)

// ---------------------------------------------------------------------------
// 2. `arguments` in regular functions vs arrow functions
// ---------------------------------------------------------------------------

function regularFunctionExample() {
  console.log('regularFunctionExample `arguments`:', arguments);
}

regularFunctionExample(10, 20, 30);

// Arrow functions DO NOT have their own `arguments`.
// If you try to log `arguments` directly inside an arrow function,
// you either get a ReferenceError (in strict mode) or inherit `arguments`
// from the outer (non-arrow) function, which is usually NOT what you want.

const arrowFunctionBad = () => {
  // console.log(arguments); // ❌ Not what you want; no own `arguments`
};

// Instead, with arrow functions we use REST parameters:
const arrowFunctionWithRest = (...args) => {
  console.log('arrowFunctionWithRest args:', args); // `args` is a real array
};

arrowFunctionWithRest(10, 20, 30);

// Key idea:
//  - Regular functions: have their own `this` and `arguments`
//  - Arrow functions:   do NOT have their own `this` or `arguments`
//                       → use REST (`...args`) when you need parameters as an array

// ---------------------------------------------------------------------------
// 3. Arrow functions, `this`, and REST together
// ---------------------------------------------------------------------------

const user = {
  name: 'Alice',

  // Regular method: has its own `this` and `arguments`
  logWithRegular: function () {
    console.log('logWithRegular this.name:', this.name); // "Alice"
    console.log('logWithRegular arguments:', arguments);
  },

  // Arrow method: `this` is lexically inherited (from where `user` is defined)
  // and there is NO own `arguments`, so we use REST instead.
  logWithArrow: (...args) => {
    // In this context, `this` is usually `window`/`global` or `undefined` in strict mode,
    // NOT the `user` object.
    console.log('logWithArrow this === user ?', this === user); // false
    console.log('logWithArrow args via REST:', args);
  },
};

user.logWithRegular('hello', 'world');
user.logWithArrow('hello', 'world');

// Summary:
//  - REST (`...args`) is how we collect parameters into an array.
//  - SPREAD (`...array`) is how we expand an array (or iterable) into separate values.
//  - Arrow functions don’t have their own `this` or `arguments`,
//    so REST parameters are the idiomatic way to work with their arguments.


