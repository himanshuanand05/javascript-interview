/**
 * Math.floor() vs Math.trunc()
 * 
 * Key Differences:
 * 
 * Math.floor():
 * - Rounds DOWN to the nearest integer (toward negative infinity)
 * - For positive numbers: same as trunc()
 * - For negative numbers: goes further down (more negative)
 * 
 * Math.trunc():
 * - Removes the decimal part (truncates toward zero)
 * - For positive numbers: same as floor()
 * - For negative numbers: goes toward zero (less negative)
 */

// ===== Positive Numbers (Same Behavior) =====
console.log("=== Positive Numbers ===");

let pos1 = 3.7;
let pos2 = 3.2;

console.log(Math.floor(pos1));   // 3
console.log(Math.trunc(pos1));   // 3
console.log(Math.floor(pos2));   // 3
console.log(Math.trunc(pos2));   // 3

// ===== Negative Numbers (Different Behavior) =====
console.log("\n=== Negative Numbers (Key Difference!) ===");

let neg1 = -3.7;
let neg2 = -3.2;

console.log("Value: -3.7");
console.log("Math.floor(-3.7):", Math.floor(neg1));   // -4 (rounds DOWN)
console.log("Math.trunc(-3.7):", Math.trunc(neg1));   // -3 (toward zero)

console.log("\nValue: -3.2");
console.log("Math.floor(-3.2):", Math.floor(neg2));   // -4 (rounds DOWN)
console.log("Math.trunc(-3.2):", Math.trunc(neg2));   // -3 (toward zero)

// ===== Visual Comparison =====
console.log("\n=== Side-by-Side Comparison ===");

let values = [3.7, 3.2, -3.7, -3.2, 0.5, -0.5];

values.forEach(val => {
  console.log(`Value: ${val.toString().padStart(5)} | floor: ${Math.floor(val).toString().padStart(3)} | trunc: ${Math.trunc(val).toString().padStart(3)}`);
});

// ===== Use Cases =====
console.log("\n=== Common Use Cases ===");

// Math.floor() - When you need to round down (e.g., array indexing, pagination)
let itemsPerPage = 10;
let totalItems = 37;
let pages = Math.floor(totalItems / itemsPerPage);  // 3 (always rounds down)
console.log("Pages needed:", pages);

// Math.trunc() - When you need integer part (e.g., removing decimals)
let price = 19.99;
let dollars = Math.trunc(price);  // 19 (just remove cents)
console.log("Dollars:", dollars);

// For negative numbers - be careful!
let temperature = -3.7;
console.log("Temperature:", temperature);
console.log("Floor (more negative):", Math.floor(temperature));  // -4
console.log("Trunc (toward zero):", Math.trunc(temperature));     // -3

// ===== Edge Cases =====
console.log("\n=== Edge Cases ===");

console.log("Math.floor(0.5):", Math.floor(0.5));     // 0
console.log("Math.trunc(0.5):", Math.trunc(0.5));     // 0

console.log("Math.floor(-0.5):", Math.floor(-0.5));   // -1
console.log("Math.trunc(-0.5):", Math.trunc(-0.5));   // 0

console.log("Math.floor(Infinity):", Math.floor(Infinity));     // Infinity
console.log("Math.trunc(Infinity):", Math.trunc(Infinity));     // Infinity

console.log("Math.floor(-Infinity):", Math.floor(-Infinity));   // -Infinity
console.log("Math.trunc(-Infinity):", Math.trunc(-Infinity));   // -Infinity

