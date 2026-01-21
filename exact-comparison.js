/**
 * Object.is() vs == vs ===
 * 
 * Key Differences:
 * 
 * == (Loose Equality):
 * - Performs type coercion before comparison
 * - Can lead to unexpected results: "5" == 5 is true
 * - Not recommended for most use cases
 * 
 * === (Strict Equality):
 * - No type coercion, compares both value and type
 * - Most commonly used equality check
 * - Special cases: NaN !== NaN, +0 === -0
 * 
 * Object.is():
 * - Same as === for most cases
 * - Key differences: Object.is(NaN, NaN) is true, Object.is(+0, -0) is false
 * - Used when you need to distinguish +0 and -0, or check for NaN
 */

// ===== Basic Comparisons =====
console.log("=== Basic Comparisons ===");

console.log("5 == '5':", 5 == '5');              // true (type coercion)
console.log("5 === '5':", 5 === '5');            // false (no coercion)
console.log("Object.is(5, '5'):", Object.is(5, '5')); // false (no coercion)

console.log("\nnull == undefined:", null == undefined);        // true
console.log("null === undefined:", null === undefined);        // false
console.log("Object.is(null, undefined):", Object.is(null, undefined)); // false

// ===== The Key Differences: NaN and Signed Zeros =====
console.log("\n=== Key Differences: NaN and Signed Zeros ===");

// NaN comparison
console.log("NaN == NaN:", NaN == NaN);           // false
console.log("NaN === NaN:", NaN === NaN);         // false
console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN)); // true ✓

// Signed zeros comparison
console.log("\n+0 == -0:", +0 == -0);             // true
console.log("+0 === -0:", +0 === -0);             // true
console.log("Object.is(+0, -0):", Object.is(+0, -0)); // false ✓

// ===== Side-by-Side Comparison Table =====
console.log("\n=== Side-by-Side Comparison ===");

let comparisons = [
  { a: 5, b: 5, name: "5 == 5" },
  { a: 5, b: "5", name: "5 == '5'" },
  { a: 0, b: -0, name: "0 == -0" },
  { a: NaN, b: NaN, name: "NaN == NaN" },
  { a: null, b: undefined, name: "null == undefined" },
  { a: true, b: 1, name: "true == 1" },
  { a: false, b: 0, name: "false == 0" },
  { a: "", b: 0, name: "'' == 0" },
  { a: " ", b: 0, name: "' ' == 0" },
  { a: [], b: 0, name: "[] == 0" },
  { a: [1], b: 1, name: "[1] == 1" },
];

comparisons.forEach(({ a, b, name }) => {
  let loose = a == b;
  let strict = a === b;
  let objectIs = Object.is(a, b);
  console.log(`${name.padEnd(20)} | ==: ${String(loose).padEnd(5)} | ===: ${String(strict).padEnd(5)} | Object.is: ${String(objectIs).padEnd(5)}`);
});

// ===== Practical Examples =====
console.log("\n=== Practical Examples ===");

// Checking for NaN
let result = Math.sqrt(-1);
console.log("Math.sqrt(-1):", result); // NaN

// Wrong way to check NaN
if (result === NaN) {  // Always false!
  console.log("This will never run");
}

// Correct ways to check NaN
if (isNaN(result)) {
  console.log("isNaN() works");
}

if (Number.isNaN(result)) {
  console.log("Number.isNaN() works (more precise)");
}

if (Object.is(result, NaN)) {
  console.log("Object.is() works");
}

// Distinguishing +0 and -0
let positiveZero = +0;
let negativeZero = -0;

console.log("\n+0 === -0:", positiveZero === negativeZero);  // true
console.log("Object.is(+0, -0):", Object.is(positiveZero, negativeZero)); // false

// Use case: When sign matters (e.g., direction, before/after)
function getDirection(value) {
  if (Object.is(value, -0)) {
    return "negative direction";
  } else if (Object.is(value, +0)) {
    return "positive direction";
  }
  return "non-zero";
}

console.log("getDirection(-0):", getDirection(-0));  // "negative direction"
console.log("getDirection(+0):", getDirection(+0));   // "positive direction"

// ===== When to Use Each =====
console.log("\n=== When to Use Each ===");

// Use === (most common)
let userAge = 25;
if (userAge === 25) {  // Standard comparison
  console.log("Standard comparison with ===");
}

// Use Object.is() for special cases
let calculation = 1 / Infinity;  // 0
if (Object.is(calculation, -0)) {  // Check if result is negative zero
  console.log("Result is negative zero");
}

// Use Object.is() for NaN checks (alternative to Number.isNaN)
let invalid = parseInt("not a number");
if (Object.is(invalid, NaN)) {
  console.log("Invalid number detected with Object.is()");
}

// ===== Summary Table =====
console.log("\n=== Summary ===");
console.log("==  : Type coercion, not recommended");
console.log("=== : Strict equality, most common (99% of cases)");
console.log("Object.is(): Same as ===, but:");
console.log("  - Object.is(NaN, NaN) = true (vs === which is false)");
console.log("  - Object.is(+0, -0) = false (vs === which is true)");
console.log("  - Use when you need to distinguish +0/-0 or check NaN");

