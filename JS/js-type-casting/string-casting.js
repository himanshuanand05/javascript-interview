/**
 * String type casting (conversion & coercion)
 *
 * Focus:
 * - Converting *to* string via String(), template literals, + ""
 * - Converting strings to number/boolean
 * - Common gotchas: whitespace, "0", "false"
 *
 * High‑level ToString(x) rules (for primitives):
 * - null      -> "null"
 * - undefined -> "undefined"
 * - boolean   -> "true" / "false"
 * - number    -> "0", "NaN", "Infinity", etc.
 * - string    -> itself
 * - symbol    -> "Symbol(desc)" when using String(symbol); implicit concat may throw
 * - object/array -> usually x.toString(), then that result is used
 */

// To String
console.log("String(123):", String(123)); // "123"
console.log("String(null):", String(null)); // "null"
console.log("String(undefined):", String(undefined)); // "undefined"
console.log("String(true):", String(true)); // "true"
console.log("'' + 123:", "" + 123); // "123"
console.log("`${123}`:", `${123}`); // "123"

// Objects / arrays to string
console.log("String([]):", String([])); // ""          (array -> ''.toString())
console.log("String([1,2]):", String([1, 2])); // "1,2" (array -> "1,2")
console.log("String({a: 1}):", String({ a: 1 })); // "[object Object]"
console.log("String(new Date(0)):", String(new Date(0))); // date string via toString()

// String -> Number
console.log("Number('  10  '):", Number("  10  ")); // 10
console.log("Number(''):", Number("")); // 0
console.log("Number('0'):", Number("0")); // 0
console.log("Number('00'):", Number("00")); // 0
console.log("Number('10px'):", Number("10px")); // NaN
console.log("+('10.5'):", +"10.5"); // 10.5
console.log("parseInt('10px', 10):", parseInt("10px", 10)); // 10

// String -> Boolean (truthiness)
console.log("Boolean(''):", Boolean("")); // false
console.log("Boolean(' '):", Boolean(" ")); // true (non-empty string)
console.log("Boolean('0'):", Boolean("0")); // true
console.log("Boolean('false'):", Boolean("false")); // true
console.log("!!'hello':", !!"hello"); // true

// Coercion with +
console.log("'1' + 2:", "1" + 2); // "12"
console.log("'1' - 2:", "1" - 2); // -1 (numeric coercion)
console.log("'1' * 2:", "1" * 2); // 2

// Abstract equality examples involving strings
console.log("'0' == 0:", "0" == 0); // true  -> "0" ToNumber -> 0
console.log("'0' == false:", "0" == false); // true  -> false -> 0, "0" -> 0
console.log("'1' == true:", "1" == true); // true   -> true -> 1, "1" -> 1
console.log("'true' == true:", "true" == true); // false -> "true" ToNumber -> NaN


