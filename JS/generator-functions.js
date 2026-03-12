/**
 * Generator Functions in JavaScript
 * 
 * Generator functions are special functions that can be paused and resumed.
 * They use the function* syntax and the yield keyword to produce a sequence of values.
 * 
 * Key features:
 * - Use function* syntax (or *method() for methods)
 * - Use yield to pause execution and return a value
 * - Return an iterator object when called
 * - Can be iterated with for...of, spread operator, etc.
 * - Support two-way communication via next(), return(), and throw()
 * - Memory efficient for large sequences (lazy evaluation)
 */

console.log("=== Basic Generator Function ===");

// Basic generator function
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log('Generator object:', gen);  // Object [Generator] {}
console.log('First next():', gen.next());  // { value: 1, done: false }
console.log('Second next():', gen.next());  // { value: 2, done: false }
console.log('Third next():', gen.next());  // { value: 3, done: false }
console.log('Fourth next():', gen.next());  // { value: undefined, done: true }

console.log("\n=== Using Generators with for...of ===");

function* numberSequence() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

console.log('Iterating generator:');
for (const num of numberSequence()) {
  console.log(num);  // 1, 2, 3, 4, 5
}

console.log("\n=== Generator with Parameters ===");

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log('Range generator (1-5):');
for (const num of range(1, 5)) {
  console.log(num);  // 1, 2, 3, 4, 5
}

console.log("\n=== Infinite Generator ===");

function* infiniteCounter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const counter = infiniteCounter();
console.log('Infinite counter (first 5 values):');
console.log(counter.next().value);  // 0
console.log(counter.next().value);  // 1
console.log(counter.next().value);  // 2
console.log(counter.next().value);  // 3
console.log(counter.next().value);  // 4

console.log("\n=== Fibonacci Generator ===");

function* fibonacci() {
  let prev = 0;
  let curr = 1;
  while (true) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log('Fibonacci sequence (first 10):');
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);  // 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}

console.log("\n=== Generator with return Statement ===");

function* generatorWithReturn() {
  yield 1;
  yield 2;
  return 3;  // return ends the generator
  yield 4;  // This will never execute
}

const genWithReturn = generatorWithReturn();
console.log('Generator with return:');
console.log(genWithReturn.next());  // { value: 1, done: false }
console.log(genWithReturn.next());  // { value: 2, done: false }
console.log(genWithReturn.next());  // { value: 3, done: true }
console.log(genWithReturn.next());  // { value: undefined, done: true }

console.log("\n=== Passing Values to Generator (Two-way Communication) ===");

function* twoWayGenerator() {
  const x = yield 'First';
  const y = yield `Received: ${x}`;
  yield `Received: ${y}`;
}

const twoWay = twoWayGenerator();
console.log('Two-way communication:');
console.log(twoWay.next());        // { value: 'First', done: false }
console.log(twoWay.next('Hello')); // { value: 'Received: Hello', done: false }
console.log(twoWay.next('World')); // { value: 'Received: World', done: false }
console.log(twoWay.next());        // { value: undefined, done: true }

console.log("\n=== Generator Methods (in Objects) ===");

const obj = {
  *generatorMethod() {
    yield 1;
    yield 2;
    yield 3;
  }
};

console.log('Generator method:');
for (const value of obj.generatorMethod()) {
  console.log(value);  // 1, 2, 3
}

// Computed property name with generator
const obj2 = {
  *[Symbol.iterator]() {
    yield 'a';
    yield 'b';
    yield 'c';
  }
};

console.log('Generator as Symbol.iterator:');
for (const value of obj2) {
  console.log(value);  // 'a', 'b', 'c'
}

console.log("\n=== Delegating to Another Generator (yield*) ===");

function* innerGenerator() {
  yield 1;
  yield 2;
}

function* outerGenerator() {
  yield 'start';
  yield* innerGenerator();  // Delegates to inner generator
  yield 'end';
}

console.log('Generator delegation:');
for (const value of outerGenerator()) {
  console.log(value);  // 'start', 1, 2, 'end'
}

// yield* can also delegate to arrays, strings, etc.
function* delegateToArray() {
  yield 'before';
  yield* [1, 2, 3];
  yield 'after';
}

console.log('\nDelegating to array:');
for (const value of delegateToArray()) {
  console.log(value);  // 'before', 1, 2, 3, 'after'
}

function* delegateToString() {
  yield 'Letters: ';
  yield* 'ABC';
  yield ' done';
}

console.log('\nDelegating to string:');
for (const value of delegateToString()) {
  console.log(value);  // 'Letters: ', 'A', 'B', 'C', ' done'
}

console.log("\n=== Using Spread Operator with Generators ===");

function* squares(n) {
  for (let i = 1; i <= n; i++) {
    yield i * i;
  }
}

const squaresArray = [...squares(5)];
console.log('Spread generator to array:', squaresArray);  // [1, 4, 9, 16, 25]

console.log("\n=== Array Destructuring with Generators ===");

function* threeValues() {
  yield 'first';
  yield 'second';
  yield 'third';
}

const [first, second, third] = threeValues();
console.log('Destructured values:', first, second, third);  // 'first', 'second', 'third'

console.log("\n=== Generator with try-catch ===");

function* generatorWithError() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (error) {
    console.log('Caught error in generator:', error.message);
    yield 'error handled';
  }
}

const genError = generatorWithError();
console.log('Generator error handling:');
console.log(genError.next());  // { value: 1, done: false }
console.log(genError.next());  // { value: 2, done: false }
genError.throw(new Error('Something went wrong'));  // Caught error in generator: Something went wrong
console.log(genError.next());  // { value: 'error handled', done: false }
console.log(genError.next());  // { value: undefined, done: true }

console.log("\n=== Early Termination with return() ===");

function* earlyTermination() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log('Generator cleanup (finally block)');
  }
}

const genTerminate = earlyTermination();
console.log('Early termination:');
console.log(genTerminate.next());  // { value: 1, done: false }
console.log(genTerminate.return('stopped'));  // Generator cleanup (finally block)
                                              // { value: 'stopped', done: true }
console.log(genTerminate.next());  // { value: undefined, done: true }

console.log("\n=== Practical Examples ===");

// Example 1: Chunking an array
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

// Example 2: Filtering with generator
function* filter(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('\nFiltering even numbers:');
for (const even of filter(numbers, n => n % 2 === 0)) {
  console.log(even);  // 2, 4, 6, 8, 10
}

// Example 3: Mapping with generator
function* map(iterable, transform) {
  for (const item of iterable) {
    yield transform(item);
  }
}

console.log('\nMapping to squares:');
for (const squared of map([1, 2, 3, 4], n => n * n)) {
  console.log(squared);  // 1, 4, 9, 16
}

// Example 4: Take first N items
function* take(iterable, n) {
  let count = 0;
  for (const item of iterable) {
    if (count++ >= n) break;
    yield item;
  }
}

console.log('\nTaking first 5 items:');
for (const item of take(fibonacci(), 5)) {
  console.log(item);  // 0, 1, 1, 2, 3
}

// Example 5: Zipping multiple iterables
function* zip(...iterables) {
  const iterators = iterables.map(iter => iter[Symbol.iterator]());
  while (true) {
    const results = iterators.map(iter => iter.next());
    if (results.some(result => result.done)) break;
    yield results.map(result => result.value);
  }
}

console.log('\nZipping arrays:');
for (const group of zip([1, 2, 3], ['a', 'b', 'c'], ['x', 'y', 'z'])) {
  console.log(group);  // [1, 'a', 'x'], [2, 'b', 'y'], [3, 'c', 'z']
}

// Example 6: Flattening nested arrays
function* flatten(array) {
  for (const item of array) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}

const nested = [1, [2, 3], [4, [5, 6]], 7];
console.log('\nFlattening nested array:');
const flattened = [...flatten(nested)];
console.log(flattened);  // [1, 2, 3, 4, 5, 6, 7]

// Example 7: Unique values from iterable
function* unique(iterable) {
  const seen = new Set();
  for (const item of iterable) {
    if (!seen.has(item)) {
      seen.add(item);
      yield item;
    }
  }
}

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
console.log('\nUnique values:');
for (const value of unique(duplicates)) {
  console.log(value);  // 1, 2, 3, 4, 5
}

// Example 8: Pagination generator
function* paginate(items, pageSize) {
  for (let i = 0; i < items.length; i += pageSize) {
    yield {
      page: Math.floor(i / pageSize) + 1,
      items: items.slice(i, i + pageSize)
    };
  }
}

const allItems = Array.from({ length: 20 }, (_, i) => i + 1);
console.log('\nPagination:');
for (const page of paginate(allItems, 5)) {
  console.log(`Page ${page.page}:`, page.items);
  // Page 1: [1, 2, 3, 4, 5]
  // Page 2: [6, 7, 8, 9, 10]
  // Page 3: [11, 12, 13, 14, 15]
  // Page 4: [16, 17, 18, 19, 20]
}

// Example 9: Permutations generator
function* permutations(arr) {
  if (arr.length <= 1) {
    yield arr;
  } else {
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const perm of permutations(rest)) {
        yield [arr[i], ...perm];
      }
    }
  }
}

console.log('\nPermutations of [1, 2, 3]:');
for (const perm of permutations([1, 2, 3])) {
  console.log(perm);  // [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
}

// Example 10: Async-like behavior with generators
function* asyncLikeGenerator() {
  console.log('Step 1');
  yield;
  console.log('Step 2');
  yield;
  console.log('Step 3');
}

const asyncGen = asyncLikeGenerator();
console.log('\nAsync-like behavior:');
asyncGen.next();  // Step 1
setTimeout(() => {
  asyncGen.next();  // Step 2
  setTimeout(() => {
    asyncGen.next();  // Step 3
  }, 100);
}, 100);

console.log("\n=== Generator vs Regular Function ===");

// Regular function - creates entire array in memory
function regularRange(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Generator - lazy evaluation, memory efficient
function* generatorRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

console.log('Regular function (creates full array):');
const regularResult = regularRange(1, 1000000);  // Creates array with 1M elements
console.log('Array length:', regularResult.length);

console.log('\nGenerator (lazy evaluation):');
const genResult = generatorRange(1, 1000000);  // No array created yet
console.log('First value:', genResult.next().value);  // Only computes when needed
console.log('Second value:', genResult.next().value);

console.log("\n=== Generator Composition ===");

function* evens() {
  let n = 0;
  while (true) {
    yield n;
    n += 2;
  }
}

function* squaresFrom(iterable) {
  for (const n of iterable) {
    yield n * n;
  }
}

function* takeFirst(iterable, count) {
  let taken = 0;
  for (const item of iterable) {
    if (taken++ >= count) break;
    yield item;
  }
}

console.log('Composed generators (first 5 even squares):');
const composed = takeFirst(squaresFrom(evens()), 5);
for (const value of composed) {
  console.log(value);  // 0, 4, 16, 36, 64
}

console.log("\n=== Summary ===");
console.log(`
Key points about generator functions:
1. Use function* syntax to define generators
2. Use yield to pause execution and return a value
3. Calling a generator returns an iterator object
4. Generators support two-way communication via next(value)
5. Use yield* to delegate to another generator/iterable
6. Generators are memory efficient (lazy evaluation)
7. Can be used with for...of, spread operator, destructuring
8. Support error handling with try-catch and throw()
9. Can be terminated early with return()
10. Useful for creating infinite sequences, pagination, and data processing pipelines
`);
