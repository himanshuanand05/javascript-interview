/**
 * Array Slice Method Example
 * 
 * The slice() method returns a shallow copy of a portion of an array
 * into a new array object selected from start to end (end not included)
 * where start and end represent the index of items in that array.
 * The original array will not be modified.
 */

// Example: Basic slice usage
const fruits = ['apple', 'banana', 'orange', 'grape', 'kiwi'];

// Extract elements from index 1 to 3 (end not included)
const sliced = fruits.slice(1, 3);
console.log('Original array:', fruits);  // ['apple', 'banana', 'orange', 'grape', 'kiwi']
console.log('Sliced array:', sliced);    // ['banana', 'orange']

// Example: Using slice() to create a copy of an array
const original = ['red', 'green', 'blue'];
const copy = original.slice();  // No arguments creates a copy of the entire array

console.log('\nOriginal array:', original);  // ['red', 'green', 'blue']
console.log('Copy array:', copy);            // ['red', 'green', 'blue']
console.log('Are they the same reference?', original === copy);  // false (different arrays)

// A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf:
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)

// Example: Using thisArg parameter with array methods
// The thisArg parameter allows you to specify the value of 'this' inside the callback function

const numbers = [1, 2, 3, 4, 5];

// Object to use as 'this' context
const multiplier = {
  factor: 10,
  multiply(value) {
    return value * this.factor;
  }
};

// Using forEach with thisArg
console.log('\nUsing forEach with thisArg:');
numbers.forEach(function(value) {
  console.log(`${value} * ${this.factor} = ${this.multiply(value)}`);
}, multiplier);  // multiplier is passed as thisArg

// Using map with thisArg
console.log('\nUsing map with thisArg:');
const multiplied = numbers.map(function(value) {
  return this.multiply(value);
}, multiplier);  // multiplier is passed as thisArg
console.log('Multiplied array:', multiplied);  // [10, 20, 30, 40, 50]

// Note: Arrow functions don't have their own 'this', so thisArg won't work with them
// The 'this' in arrow functions is lexically bound

// ===== arr.fill(value, start, end) =====
// Fills the array with repeating value from index start to end (end not included)
// Modifies the original array

console.log('\n=== Array.fill() Method ===');

// Fill entire array
const arr1 = [1, 2, 3, 4, 5];
arr1.fill(0);
console.log('fill(0):', arr1);  // [0, 0, 0, 0, 0]

// Fill from start index to end
const arr2 = [1, 2, 3, 4, 5];
arr2.fill('x', 1, 3);  // Fill from index 1 to 3 (end not included)
console.log('fill("x", 1, 3):', arr2);  // [1, 'x', 'x', 4, 5]

// Fill from start index to end of array
const arr3 = [1, 2, 3, 4, 5];
arr3.fill(99, 2);  // Fill from index 2 to end
console.log('fill(99, 2):', arr3);  // [1, 2, 99, 99, 99]

// ===== arr.copyWithin(target, start, end) =====
// Copies its elements from position start till position end into itself, at position target (overwrites existing)
// Modifies the original array in place

console.log('\n=== Array.copyWithin() Method ===');

// Copy elements from index 0 to 3 to position starting at index 3
const arr4 = [1, 2, 3, 4, 5];
arr4.copyWithin(3, 0, 3);  // Copy indices 0-3 to position 3
console.log('copyWithin(3, 0, 3):', arr4);  // [1, 2, 3, 1, 2]

// Copy elements from index 2 to end to position 0
const arr5 = [1, 2, 3, 4, 5, 6];
arr5.copyWithin(0, 2);  // Copy from index 2 to end, starting at position 0
console.log('copyWithin(0, 2):', arr5);  // [3, 4, 5, 6, 5, 6]

// Copy last 3 elements to the beginning
const arr6 = [1, 2, 3, 4, 5, 6, 7, 8];
arr6.copyWithin(0, 5, 8);  // Copy indices 5-8 to position 0
console.log('copyWithin(0, 5, 8):', arr6);  // [6, 7, 8, 4, 5, 6, 7, 8]

// ===== arr.flat(depth) / arr.flatMap(fn) =====
// Create a new flat array from a multidimensional array

console.log('\n=== Array.flat() Method ===');

// Flatten one level (default depth is 1)
const nested1 = [1, 2, [3, 4], [5, 6]];
const flat1 = nested1.flat();
console.log('Original:', nested1);  // [1, 2, [3, 4], [5, 6]]
console.log('flat():', flat1);      // [1, 2, 3, 4, 5, 6]

// Flatten multiple levels
const nested2 = [1, [2, [3, [4, 5]]]];
const flat2 = nested2.flat(1);  // Flatten 1 level
console.log('\nflat(1):', flat2);  // [1, 2, [3, [4, 5]]]

const flat3 = nested2.flat(2);  // Flatten 2 levels
console.log('flat(2):', flat3);  // [1, 2, 3, [4, 5]]

const flat4 = nested2.flat(Infinity);  // Flatten all levels
console.log('flat(Infinity):', flat4);  // [1, 2, 3, 4, 5]

// Handle sparse arrays (holes)
const sparse = [1, , 3, [4, , 6]];
const flatSparse = sparse.flat();
console.log('\nSparse array flat():', flatSparse);  // [1, 3, 4, 6] (holes are removed)

console.log('\n=== Array.flatMap() Method ===');

// flatMap() is equivalent to map().flat(1) - maps each element and flattens the result

const arr7 = [1, 2, 3];
// Using map + flat
const mapped = arr7.map(x => [x, x * 2]);
const flattened = mapped.flat();
console.log('map + flat:', flattened);  // [1, 2, 2, 4, 3, 6]

// Using flatMap (same result, more efficient)
const flatMapped = arr7.flatMap(x => [x, x * 2]);
console.log('flatMap:', flatMapped);  // [1, 2, 2, 4, 3, 6]

// flatMap only flattens one level
const arr8 = ['Hello', 'World'];
const words = arr8.flatMap(str => str.split(''));
console.log('\nflatMap split:', words);  // ['H', 'e', 'l', 'l', 'o', 'W', 'o', 'r', 'l', 'd']

// flatMap can return arrays of different lengths
const arr9 = [1, 2, 3, 4];
const expanded = arr9.flatMap(x => x % 2 === 0 ? [x, x * 10] : [x]);
console.log('flatMap conditional:', expanded);  // [1, 2, 20, 3, 4, 40]