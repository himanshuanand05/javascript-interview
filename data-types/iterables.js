/**
 * Iterables in JavaScript
 * 
 * An iterable is an object that implements the Symbol.iterator method.
 * Iterables can be used with:
 * - for...of loops
 * - Spread operator (...)
 * - Array destructuring
 * - Array.from()
 * - Promise.all(), Promise.race()
 * - Map() and Set() constructors
 */

console.log("=== Built-in Iterables ===");

// 1. Arrays are iterable
const array = [1, 2, 3];
console.log('\nArray iteration:');
for (const item of array) {
  console.log(item);  // 1, 2, 3
}

// 2. Strings are iterable
const str = "hello";
console.log('\nString iteration:');
for (const char of str) {
  console.log(char);  // 'h', 'e', 'l', 'l', 'o'
}

// 3. Maps are iterable
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);
console.log('\nMap iteration:');
for (const [key, value] of map) {
  console.log(`${key} => ${value}`);  // 'a => 1', 'b => 2', 'c => 3'
}

// 4. Sets are iterable
const set = new Set([1, 2, 3, 3, 4]);
console.log('\nSet iteration:');
for (const value of set) {
  console.log(value);  // 1, 2, 3, 4 (duplicates removed)
}

// 5. TypedArrays are iterable
const typedArray = new Uint8Array([10, 20, 30]);
console.log('\nTypedArray iteration:');
for (const value of typedArray) {
  console.log(value);  // 10, 20, 30
}

// 6. NodeList (from DOM) is iterable
// const nodeList = document.querySelectorAll('div');
// for (const node of nodeList) { ... }

// 7. Arguments object is iterable (in non-strict mode)

console.log("\n=== Using Spread Operator with Iterables ===");

// Spread operator works with any iterable
const arr1 = [...str];
console.log('Spread string:', arr1);  // ['h', 'e', 'l', 'l', 'o']

const arr2 = [...map.keys()];
console.log('Spread map keys:', arr2);  // ['a', 'b', 'c']

const arr3 = [...set];
console.log('Spread set:', arr3);  // [1, 2, 3, 4]

console.log("\n=== Array.from() with Iterables ===");

// Array.from() can convert any iterable to an array
const arrFromString = Array.from(str);
console.log('Array.from(string):', arrFromString);  // ['h', 'e', 'l', 'l', 'o']

const arrFromMap = Array.from(map);
console.log('Array.from(map):', arrFromMap);  // [['a', 1], ['b', 2], ['c', 3]]

// Array.from() can also take a mapping function
const doubled = Array.from([1, 2, 3], x => x * 2);
console.log('Array.from with mapping:', doubled);  // [2, 4, 6]

console.log("\n=== Array Destructuring with Iterables ===");

const [first, second, third] = str;
console.log('Destructured string:', first, second, third);  // 'h', 'e', 'l'

const [mapFirst, mapSecond] = map;
console.log('Destructured map:', mapFirst, mapSecond);  // ['a', 1], ['b', 2]

console.log("\n=== Symbol.iterator ===");

// All iterables have a Symbol.iterator method
console.log('Array has Symbol.iterator:', typeof array[Symbol.iterator] === 'function');
console.log('String has Symbol.iterator:', typeof str[Symbol.iterator] === 'function');
console.log('Map has Symbol.iterator:', typeof map[Symbol.iterator] === 'function');

// Calling Symbol.iterator returns an iterator
const arrayIterator = array[Symbol.iterator]();
console.log('\nArray iterator:', arrayIterator);
console.log('First next():', arrayIterator.next());  // { value: 1, done: false }
console.log('Second next():', arrayIterator.next());  // { value: 2, done: false }
console.log('Third next():', arrayIterator.next());  // { value: 3, done: false }
console.log('Fourth next():', arrayIterator.next());  // { value: undefined, done: true }

console.log("\n=== Creating Custom Iterables ===");

// Example 1: Range iterable
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

console.log('\nCustom range iterable:');
for (const num of range) {
  console.log(num);  // 1, 2, 3, 4, 5
}

// Spread custom iterable
const rangeArray = [...range];
console.log('Spread range:', rangeArray);  // [1, 2, 3, 4, 5]

// Example 2: Fibonacci sequence iterable
const fibonacci = {
  [Symbol.iterator]() {
    let prev = 0;
    let curr = 1;
    return {
      next() {
        const value = prev;
        [prev, curr] = [curr, prev + curr];
        return { value, done: false };
      }
    };
  }
};

console.log('\nFibonacci sequence (first 10):');
let count = 0;
for (const num of fibonacci) {
  console.log(num);
  if (++count >= 10) break;  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}

// Example 3: Iterable with generator function (cleaner syntax)
function* numberRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const numberRangeIterable = {
  start: 10,
  end: 15,
  [Symbol.iterator]() {
    return numberRange(this.start, this.end);
  }
};

console.log('\nGenerator-based range:');
for (const num of numberRangeIterable) {
  console.log(num);  // 10, 11, 12, 13, 14, 15
}

// Example 4: Iterable object using generator directly
const countdown = {
  from: 5,
  *[Symbol.iterator]() {
    for (let i = this.from; i > 0; i--) {
      yield i;
    }
  }
};

console.log('\nCountdown iterable:');
for (const num of countdown) {
  console.log(num);  // 5, 4, 3, 2, 1
}

console.log("\n=== Iterables vs Non-Iterables ===");

// Plain objects are NOT iterable by default
const plainObj = { a: 1, b: 2, c: 3 };
console.log('Plain object has Symbol.iterator:', typeof plainObj[Symbol.iterator] === 'function');

try {
  for (const item of plainObj) {
    console.log(item);
  }
} catch (e) {
  console.log('Error iterating plain object:', e.message);  // plainObj is not iterable
}

// But we can make plain objects iterable
const iterableObj = {
  data: { a: 1, b: 2, c: 3 },
  *[Symbol.iterator]() {
    for (const key in this.data) {
      yield [key, this.data[key]];
    }
  }
};

console.log('\nMade object iterable:');
for (const [key, value] of iterableObj) {
  console.log(`${key} => ${value}`);  // 'a => 1', 'b => 2', 'c => 3'
}

console.log("\n=== Iterable Methods on Built-in Types ===");

// Arrays have many iterable-related methods
const numbers = [1, 2, 3, 4, 5];

// entries() - returns iterable of [index, value] pairs
console.log('\nArray.entries():');
for (const [index, value] of numbers.entries()) {
  console.log(`Index ${index}: ${value}`);
}

// keys() - returns iterable of indices
console.log('\nArray.keys():');
for (const key of numbers.keys()) {
  console.log(key);  // 0, 1, 2, 3, 4
}

// values() - returns iterable of values
console.log('\nArray.values():');
for (const value of numbers.values()) {
  console.log(value);  // 1, 2, 3, 4, 5
}

// Map also has entries(), keys(), values()
const myMap = new Map([['x', 10], ['y', 20]]);
console.log('\nMap.entries():');
for (const [key, value] of myMap.entries()) {
  console.log(`${key} => ${value}`);
}

console.log('\nMap.keys():');
for (const key of myMap.keys()) {
  console.log(key);  // 'x', 'y'
}

console.log('\nMap.values():');
for (const value of myMap.values()) {
  console.log(value);  // 10, 20
}

console.log("\n=== Converting Iterables ===");

// Convert iterable to array
const setToArray = Array.from(set);
console.log('Set to array:', setToArray);  // [1, 2, 3, 4]

// Convert to Set (removes duplicates)
const arrayToSet = new Set([1, 2, 2, 3, 3, 4]);
console.log('Array to set:', Array.from(arrayToSet));  // [1, 2, 3, 4]

// Convert to Map
const entries = [['a', 1], ['b', 2], ['c', 3]];
const entriesToMap = new Map(entries);
console.log('Entries to map:', entriesToMap);

// Convert Map to array of entries
const mapToEntries = Array.from(map);
console.log('Map to entries:', mapToEntries);  // [['a', 1], ['b', 2], ['c', 3]]

console.log("\n=== Practical Examples ===");

// Example: Chunking an array using iterable
function* chunk(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const largeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('\nChunking array:');
for (const chunked of chunk(largeArray, 3)) {
  console.log(chunked);  // [1, 2, 3], [4, 5, 6], [7, 8, 9], [10]
}

// Example: Combining multiple iterables
function* zip(...iterables) {
  const iterators = iterables.map(iter => iter[Symbol.iterator]());
  while (true) {
    const results = iterators.map(iter => iter.next());
    if (results.some(result => result.done)) break;
    yield results.map(result => result.value);
  }
}

const zipped = zip([1, 2, 3], ['a', 'b', 'c'], ['x', 'y', 'z']);
console.log('\nZipping iterables:');
for (const group of zipped) {
  console.log(group);  // [1, 'a', 'x'], [2, 'b', 'y'], [3, 'c', 'z']
}

console.log("\n=== Summary ===");
console.log(`
Key points about iterables:
1. Iterables implement Symbol.iterator method
2. Built-in iterables: Array, String, Map, Set, TypedArray, NodeList
3. Can be used with: for...of, spread operator, Array.from(), destructuring
4. Plain objects are NOT iterable by default
5. Can create custom iterables using Symbol.iterator or generators
6. Iterators return objects with {value, done} structure
`);




