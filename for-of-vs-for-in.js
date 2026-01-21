/**
 * for...of vs for...in with Arrays
 * 
 * Key Differences:
 * 
 * for...of:
 * - Iterates over VALUES (array elements)
 * - Works with iterable objects (arrays, strings, maps, sets, etc.)
 * - Returns the actual elements in order
 * - Does NOT iterate over non-index properties
 * - Does NOT iterate over undefined holes in sparse arrays
 * - Preferred for arrays when you need the values
 * 
 * for...in:
 * - Iterates over KEYS/INDICES (array indices and enumerable properties)
 * - Works with any object (not just iterables)
 * - Returns property names as strings (even for array indices)
 * - DOES iterate over non-index properties (if enumerable)
 * - DOES iterate over undefined holes in sparse arrays
 * - Returns indices/keys in arbitrary order (implementation-dependent)
 * - Generally NOT recommended for arrays (use for...of or .forEach() instead)
 */

// ===== Basic Array Iteration =====
console.log("=== Basic Array Iteration ===");

let arr = ['a', 'b', 'c'];

console.log("\n--- for...of (values) ---");
for (let value of arr) {
  console.log("Value:", value);  // 'a', 'b', 'c'
}

console.log("\n--- for...in (keys/indices) ---");
for (let key in arr) {
  console.log("Key:", key, "| Value:", arr[key]);  // '0': 'a', '1': 'b', '2': 'c'
  console.log("Key type:", typeof key);  // 'string' (not 'number'!)
}

// ===== Key Type Difference =====
console.log("\n=== Key Type Difference ===");

let numbers = [10, 20, 30];

console.log("\n--- for...of ---");
for (let value of numbers) {
  console.log("Value:", value, "| Type:", typeof value);  // number
}

console.log("\n--- for...in ---");
for (let index in numbers) {
  console.log("Index:", index, "| Index type:", typeof index);  // string!
  console.log("Value:", numbers[index], "| Value type:", typeof numbers[index]);  // number
}

// ===== Custom Properties =====
console.log("\n=== Custom Properties ===");

let fruits = ['apple', 'banana', 'cherry'];
fruits.customProp = 'I am a custom property';
fruits.anotherProp = 42;

console.log("\nArray with custom properties:", fruits);

console.log("\n--- for...of (only array elements) ---");
for (let fruit of fruits) {
  console.log("Fruit:", fruit);  // Only 'apple', 'banana', 'cherry'
  // Does NOT iterate over customProp or anotherProp
}

console.log("\n--- for...in (includes custom properties) ---");
for (let key in fruits) {
  console.log("Key:", key, "| Value:", fruits[key]);
  // Iterates over: '0', '1', '2', 'customProp', 'anotherProp'
}

// ===== Sparse Arrays =====
console.log("\n=== Sparse Arrays ===");

let sparse = [1, , , 4];  // Holes at indices 1 and 2
console.log("Sparse array:", sparse);
console.log("Length:", sparse.length);  // 4

console.log("\n--- for...of (skips holes) ---");
for (let value of sparse) {
  console.log("Value:", value);  // Only 1 and 4 (skips holes)
}

console.log("\n--- for...in (includes holes) ---");
for (let index in sparse) {
  console.log("Index:", index, "| Value:", sparse[index]);
  // Iterates over: '0': 1, '3': 4
  // Note: Holes (undefined indices) are skipped in for...in too
  // But if you explicitly set undefined, it will be included
}

// Explicitly setting undefined vs holes
let sparse2 = [1];
sparse2[3] = 4;  // Creates a sparse array
sparse2[1] = undefined;  // Explicitly set to undefined
console.log("\nSparse array with explicit undefined:", sparse2);

console.log("\n--- for...of ---");
for (let value of sparse2) {
  console.log("Value:", value);  // 1, undefined, 4
}

console.log("\n--- for...in ---");
for (let index in sparse2) {
  console.log("Index:", index, "| Value:", sparse2[index]);
  // Iterates over: '0': 1, '1': undefined, '3': 4
  // Skips index 2 (the hole)
}

// ===== Order Guarantee =====
console.log("\n=== Order Guarantee ===");

let ordered = ['first', 'second', 'third'];

console.log("\n--- for...of (guaranteed order) ---");
for (let value of ordered) {
  console.log(value);  // Always: first, second, third
}

console.log("\n--- for...in (usually in order, but not guaranteed) ---");
for (let index in ordered) {
  console.log(index, ":", ordered[index]);
  // Usually: 0: first, 1: second, 2: third
  // But order is not guaranteed by spec for non-array indices
}

// ===== Performance and Best Practices =====
console.log("\n=== Performance and Best Practices ===");

let largeArray = Array.from({ length: 1000 }, (_, i) => i);

console.log("\n--- for...of (recommended for arrays) ---");
let sum1 = 0;
for (let num of largeArray) {
  sum1 += num;
}
console.log("Sum (for...of):", sum1);

console.log("\n--- for...in (not recommended for arrays) ---");
let sum2 = 0;
for (let index in largeArray) {
  sum2 += largeArray[index];
}
console.log("Sum (for...in):", sum2);

// ===== Iterating with Index in for...of =====
console.log("\n=== Getting Index with for...of ===");

let colors = ['red', 'green', 'blue'];

console.log("\n--- Using entries() method ---");
for (let [index, value] of colors.entries()) {
  console.log(`Index: ${index}, Value: ${value}`);
}

console.log("\n--- Using forEach (alternative) ---");
colors.forEach((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
});

// ===== Breaking vs Continue =====
console.log("\n=== Breaking and Continuing ===");

let data = [1, 2, 3, 4, 5];

console.log("\n--- for...of (can use break/continue) ---");
for (let num of data) {
  if (num === 3) break;
  console.log(num);  // 1, 2
}

console.log("\n--- for...in (can use break/continue) ---");
for (let index in data) {
  if (Number(index) === 3) break;
  console.log(data[index]);  // 1, 2, 3 (index is string '3')
}

// ===== Nested Arrays =====
console.log("\n=== Nested Arrays ===");

let matrix = [[1, 2], [3, 4], [5, 6]];

console.log("\n--- for...of (clean iteration) ---");
for (let row of matrix) {
  for (let cell of row) {
    console.log("Cell:", cell);
  }
}

console.log("\n--- for...in (more verbose) ---");
for (let i in matrix) {
  for (let j in matrix[i]) {
    console.log("Cell:", matrix[i][j]);
  }
}

// ===== Objects vs Arrays =====
console.log("\n=== Objects vs Arrays ===");

let obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };

console.log("\n--- Object with numeric keys (array-like) ---");
console.log("for...of does NOT work with plain objects:", obj);

try {
  for (let value of obj) {
    console.log(value);
  }
} catch (e) {
  console.log("Error:", e.message);  // obj is not iterable
}

console.log("\n--- for...in works with objects ---");
for (let key in obj) {
  console.log("Key:", key, "| Value:", obj[key]);
  // Iterates over: '0', '1', '2', 'length'
}

// ===== Modifying Array During Iteration =====
console.log("\n=== Modifying Array During Iteration ===");

let mutating = [1, 2, 3];

console.log("\n--- for...of (safe iteration) ---");
let newArr1 = [];
for (let num of mutating) {
  newArr1.push(num * 2);
}
console.log("Original:", mutating);
console.log("New:", newArr1);

console.log("\n--- for...in (be careful with modifications) ---");
let newArr2 = [];
for (let index in mutating) {
  newArr2.push(mutating[index] * 2);
}
console.log("New:", newArr2);

// ===== Array Methods vs Loops =====
console.log("\n=== Array Methods vs Loops ===");

let nums = [1, 2, 3, 4, 5];

console.log("\n--- for...of equivalent with forEach ---");
nums.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});

console.log("\n--- for...of equivalent with map ---");
let doubled = [];
for (let num of nums) {
  doubled.push(num * 2);
}
console.log("Doubled (for...of):", doubled);

console.log("\n--- Using map() method (more functional) ---");
let doubledMap = nums.map(num => num * 2);
console.log("Doubled (map):", doubledMap);

// ===== Common Mistakes =====
console.log("\n=== Common Mistakes ===");

let items = ['x', 'y', 'z'];

console.log("\n--- Mistake 1: Using for...in when you need values ---");
console.log("❌ Don't do this:");
for (let item in items) {
  console.log(item);  // Prints '0', '1', '2' (not the values!)
}

console.log("\n✅ Do this instead:");
for (let item of items) {
  console.log(item);  // Prints 'x', 'y', 'z'
}

console.log("\n--- Mistake 2: Assuming for...in keys are numbers ---");
console.log("❌ Don't do this:");
for (let index in items) {
  if (index === 1) {  // This won't work! index is string '1', not number 1
    console.log("Found index 1");
  }
}

console.log("\n✅ Do this instead:");
for (let index in items) {
  if (Number(index) === 1) {
    console.log("Found index 1");
  }
}

// Better: use for...of with entries()
for (let [index, value] of items.entries()) {
  if (index === 1) {
    console.log("Found index 1 with value:", value);
  }
}

// ===== Real-World Use Cases =====
console.log("\n=== Real-World Use Cases ===");

// Processing API response data
let apiData = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

console.log("\n--- Processing data (for...of) ---");
for (let user of apiData) {
  console.log(`User ${user.id}: ${user.name}`);
}

// Filtering and transforming
let prices = [19.99, 29.99, 39.99, 49.99];
let discounted = [];

for (let price of prices) {
  discounted.push(price * 0.9);  // 10% discount
}
console.log("\nOriginal prices:", prices);
console.log("Discounted prices:", discounted);

// ===== When to Use Each =====
console.log("\n=== When to Use Each ===");

console.log("\nUse for...of when:");
console.log("  - Iterating over arrays (values)");
console.log("  - Iterating over strings (characters)");
console.log("  - Iterating over Maps, Sets, NodeLists");
console.log("  - You need the actual values");
console.log("  - You want guaranteed order");
console.log("  - You want to skip sparse array holes");

console.log("\nUse for...in when:");
console.log("  - Iterating over object properties");
console.log("  - You need both keys and values (but prefer Object.entries())");
console.log("  - Debugging (to see all enumerable properties)");
console.log("  - Working with array-like objects that aren't iterable");

console.log("\nAvoid for...in for:");
console.log("  - Regular array iteration (use for...of instead)");
console.log("  - When order matters critically");
console.log("  - When you want to skip non-index properties");

// ===== Summary =====
console.log("\n=== Summary ===");
console.log("for...of:");
console.log("  - Iterates over VALUES");
console.log("  - Works with iterables (arrays, strings, etc.)");
console.log("  - Keys/indices are strings in for...in");
console.log("  - Does NOT include custom properties");
console.log("  - Guaranteed order");
console.log("  - ✅ RECOMMENDED for arrays");

console.log("\nfor...in:");
console.log("  - Iterates over KEYS/INDICES");
console.log("  - Works with any object");
console.log("  - Keys/indices are strings");
console.log("  - DOES include enumerable custom properties");
console.log("  - Order not guaranteed");
console.log("  - ⚠️ NOT RECOMMENDED for arrays (use for...of instead)");

console.log("\n=== Quick Reference ===");
console.log(`
Array iteration:
  for (let value of array) { ... }        ✅ Use this
  for (let index in array) { ... }        ⚠️ Avoid for arrays
  
Object iteration:
  for (let key in object) { ... }         ✅ Use this (or Object.keys/entries/values)
  for (let value of object) { ... }       ❌ Won't work (objects aren't iterable)
`);

