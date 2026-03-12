/**
 * call(), apply(), and bind() - Explicitly Setting "this"
 *
 * All three are methods on Function.prototype. They let you control what "this"
 * refers to when a function runs, and are the primary way to "borrow" methods
 * or fix lost context.
 *
 * Syntax:
 *   func.call(thisArg, arg1, arg2, ...)   - calls immediately, args as list
 *   func.apply(thisArg, [arg1, arg2, ...]) - calls immediately, args as array
 *   func.bind(thisArg, arg1, arg2, ...)    - returns new function, no immediate call
 */

// ===== Shared Setup =====
function introduce(city, hobby) {
  return `${this.name} is from ${city} and likes ${hobby}`;
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

// ===== call() =====
console.log("=== call(thisArg, arg1, arg2, ...) ===\n");
console.log("Calls the function immediately with a given 'this' and arguments passed individually.\n");

console.log(introduce.call(person1, "New York", "reading"));
// "Alice is from New York and likes reading"

console.log(introduce.call(person2, "London", "cooking"));
// "Bob is from London and likes cooking"

// call() with no args - 'this' can be null/undefined (strict mode: undefined, non-strict: global)
console.log("\nNo 'this' needed (e.g. pure function):");
function add(a, b) {
  return a + b;
}
console.log(add.call(null, 2, 3)); // 5

// ===== apply() =====
console.log("\n=== apply(thisArg, [arg1, arg2, ...]) ===\n");
console.log("Same as call(), but arguments are passed as a single array.\n");

console.log(introduce.apply(person1, ["Paris", "painting"]));
// "Alice is from Paris and likes painting"

// Classic use: pass array to a function that expects individual args
const numbers = [5, 6, 2, 3, 7];
console.log("\nMath.max with apply (pre-ES6 spread):");
console.log(Math.max.apply(null, numbers)); // 7
console.log("ES6 equivalent: Math.max(...numbers) =>", Math.max(...numbers));

// ===== bind() =====
console.log("\n=== bind(thisArg, arg1?, arg2?, ...) ===\n");
console.log("Returns a NEW function with 'this' (and optional args) fixed. Does NOT call immediately.\n");

const introduceAlice = introduce.bind(person1);
console.log(introduceAlice("Tokyo", "hiking"));
// "Alice is from Tokyo and likes hiking"

// Partial application - pre-fill some arguments
const introduceBobFromLondon = introduce.bind(person2, "London");
console.log(introduceBobFromLondon("cycling"));
// "Bob is from London and likes cycling"

// Fixing lost context (common pattern)
const person = {
  name: "Eve",
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};
const greetFn = person.greet;
// greetFn(); // "Hello, I'm undefined" - this is lost!

const boundGreet = person.greet.bind(person);
console.log("\nLost context vs bound:");
console.log("boundGreet():", boundGreet());
// "Hello, I'm Eve"

// ===== Side-by-Side Comparison =====
console.log("\n=== Side-by-Side Comparison ===");

const fn = function (a, b) {
  return `${this.x} + ${a} + ${b}`;
};
const obj = { x: 10 };

console.log("fn.call(obj, 1, 2):", fn.call(obj, 1, 2));   // "10 + 1 + 2"
console.log("fn.apply(obj, [1, 2]):", fn.apply(obj, [1, 2])); // "10 + 1 + 2"
const bound = fn.bind(obj, 1);
console.log("bound(2):", bound(2)); // "10 + 1 + 2" - bound returns function, we call it

// ===== Method Borrowing =====
console.log("\n=== Method Borrowing ===");

const dog = { name: "Rex", sound: "woof" };
const cat = { name: "Whiskers", sound: "meow" };

function speak() {
  return `${this.name} says ${this.sound}`;
}

console.log(speak.call(dog));  // "Rex says woof"
console.log(speak.call(cat));  // "Whiskers says meow"

// Array-like objects
const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
console.log("\nArray.prototype.join on array-like:");
console.log(Array.prototype.join.call(arrayLike, "-"));
// "a-b-c"

// ===== When to Use Each =====
console.log("\n=== When to Use Each ===");
console.log("• call()   - When you have individual args and want to invoke now");
console.log("• apply()  - When your args are in an array, or calling variadic functions");
console.log("• bind()   - When you need a function to call LATER with fixed 'this'");
console.log("             (e.g. event handlers, callbacks, setTimeout)");

// ===== Summary Table =====
console.log("\n=== Summary ===");
console.log("| Method   | Invokes? | Args format | Returns        |");
console.log("|----------|----------|-------------|----------------|");
console.log("| call()   | Yes      | arg1, arg2  | function result|");
console.log("| apply()  | Yes      | [args]      | function result|");
console.log("| bind()   | No       | arg1, arg2  | new function   |");
