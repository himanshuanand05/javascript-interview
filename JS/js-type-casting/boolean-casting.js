/**
 * Boolean type casting (conversion & coercion)
 *
 * Focus:
 * - Converting *to* boolean via Boolean() and !!
 * - Truthy/falsy list and common surprises
 * - Boolean -> number/string
 *
 * High‑level ToBoolean(x) rules:
 * - FALSY only: false, 0, -0, 0n, NaN, "", null, undefined
 * - Everything else is TRUTHY (including "0", "false", [], {}, function(){})
 *
 * In abstract equality (==):
 * - If one side is boolean, JS does ToNumber(boolean) first (true -> 1, false -> 0)
 *   then continues the numeric/string comparison rules.
 */

// To Boolean
console.log("Boolean(0):", Boolean(0)); // false
console.log("Boolean(-0):", Boolean(-0)); // false
console.log("Boolean(NaN):", Boolean(NaN)); // false
console.log("Boolean(''):", Boolean("")); // false
console.log("Boolean(null):", Boolean(null)); // false
console.log("Boolean(undefined):", Boolean(undefined)); // false

console.log("Boolean('0'):", Boolean("0")); // true
console.log("Boolean([]):", Boolean([])); // true
console.log("Boolean({}):", Boolean({})); // true
console.log("Boolean(function(){}):", Boolean(function () {})); // true

console.log("!!'hello':", !!"hello"); // true
console.log("!!0:", !!0); // false

// Boolean -> Number
console.log("Number(true):", Number(true)); // 1
console.log("Number(false):", Number(false)); // 0
console.log("+true:", +true); // 1
console.log("+false:", +false); // 0

// Boolean -> String
console.log("String(true):", String(true)); // "true"
console.log("String(false):", String(false)); // "false"

// == vs ===
console.log("false == 0:", false == 0); // true (coercion)
console.log("false === 0:", false === 0); // false
console.log("false == '0':", false == "0"); // true -> false -> 0, '0' -> 0
console.log("true == 1:", true == 1); // true
console.log("true === 1:", true === 1); // false (no coercion)
console.log("Boolean('0') === !!'0':", Boolean("0") === !!"0"); // true (both true)

