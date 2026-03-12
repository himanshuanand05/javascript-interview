/**
 * Closures in JavaScript
 *
 * A closure is when a function "remembers" the variables from its enclosing
 * scope, even after that scope has finished executing. The inner function
 * keeps a reference to the outer function's lexical environment.
 *
 * In other words: a function bundled with its lexical environment.
 */

// ===== Basic Closure =====
console.log("=== Basic Closure ===\n");

function outer() {
  const message = "Hello from outer";

  function inner() {
    console.log(message); // inner "closes over" message
  }

  return inner;
}

const fn = outer();
fn(); // "Hello from outer" - message still exists even though outer() finished

// ===== Why It Matters: Data Persists =====
console.log("\n=== Data Persists After Outer Returns ===\n");

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Each call to createCounter creates a NEW closure with its own count
const counter2 = createCounter();
console.log(counter2()); // 1 (separate state)

// ===== Lexical Scope - Where Was It Defined? =====
console.log("\n=== Lexical Scope ===\n");

function outerScope() {
  const x = 10;

  function innerScope() {
    console.log(x); // looks up the chain, finds x in outerScope
  }

  return innerScope;
}

const inner = outerScope();
inner(); // 10 - innerScope "sees" x from where it was defined

// ===== Common Pattern: Factory Functions =====
console.log("\n=== Factory / Private Variables ===\n");

function createGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHi = createGreeter("Hi");
const sayHello = createGreeter("Hello");
console.log(sayHi("Alice"));   // "Hi, Alice!"
console.log(sayHello("Bob"));  // "Hello, Bob!"

// ===== Common Mistake: Loop + Closure =====
console.log("\n=== Loop + Closure (Classic Pitfall) ===\n");

// WRONG: All closures share the same 'i'
function badExample() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(function () {
      return i;
    });
  }
  return arr;
}

const badFns = badExample();
console.log("var in loop (all see final i):", badFns[0](), badFns[1](), badFns[2]());
// 3 3 3 - because var is function-scoped, there's only one i

// FIX 1: Use let (block-scoped, new binding each iteration)
function goodExample1() {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(function () {
      return i;
    });
  }
  return arr;
}
const goodFns1 = goodExample1();
console.log("let in loop:", goodFns1[0](), goodFns1[1](), goodFns1[2]());
// 0 1 2

// FIX 2: IIFE to create a new scope per iteration (pre-ES6)
function goodExample2() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(
      (function (j) {
        return function () {
          return j;
        };
      })(i)
    );
  }
  return arr;
}
const goodFns2 = goodExample2();
console.log("IIFE capture:", goodFns2[0](), goodFns2[1](), goodFns2[2]());
// 0 1 2

// ===== Practical: Module Pattern =====
console.log("\n=== Module Pattern (Private State) ===\n");

const calculator = (function () {
  let total = 0;

  return {
    add(x) {
      total += x;
      return this;
    },
    subtract(x) {
      total -= x;
      return this;
    },
    getTotal() {
      return total;
    },
    reset() {
      total = 0;
      return this;
    },
  };
})();

calculator.add(10).add(5).subtract(3);
console.log("Calculator total:", calculator.getTotal()); // 12
// total is "private" - not directly accessible

// ===== Practical: Event Handlers / Callbacks =====
console.log("\n=== Event Handler Pattern ===\n");

function setupButton(id) {
  const elementId = id;

  return function onClick() {
    console.log("Clicked button:", elementId);
  };
}

const handleClick = setupButton("submit-btn");
// When handleClick runs later (e.g. on click), it still has elementId
handleClick(); // "Clicked button: submit-btn"

// ===== Summary ====
console.log("\n=== Summary ===");
console.log("• Closure = function + its lexical environment");
console.log("• Inner function can access outer variables even after outer returns");
console.log("• Used for: private state, factories, callbacks, partial application");
console.log("• Watch out: loops with var (use let or IIFE to capture per iteration)");
