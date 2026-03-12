/**
 * Number type casting (conversion & coercion)
 *
 * Focus:
 * - Converting *to* number via Number(), unary +, parseInt/parseFloat
 * - Converting numbers to string/boolean
 * - Special values: NaN, Infinity, -0
 *
 * High‑level ToNumber(x) rules (for primitives):
 * - true  -> 1
 * - false -> 0
 * - null  -> 0
 * - undefined -> NaN
 * - string -> parsed numeric value (or NaN)
 * - number -> itself
 * - object/array -> ToPrimitive(x, "number") first, then apply rules above
 */

// To Number
console.log("Number('42'):", Number("42")); // 42
console.log("+('42'):", +"42"); // 42
console.log("Number(''):", Number("")); // 0
console.log("Number('   '):", Number("   ")); // 0
console.log("Number(null):", Number(null)); // 0
console.log("Number(undefined):", Number(undefined)); // NaN
console.log("Number(true):", Number(true)); // 1
console.log("Number(false):", Number(false)); // 0
console.log("Number('0x10'):", Number("0x10")); // 16
console.log("Number('08'):", Number("08")); // 8
console.log("Number('1_000'):", Number("1_000")); // NaN (string underscore not allowed)

// parseInt / parseFloat (string parsing, not general casting)
console.log("parseInt('12px', 10):", parseInt("12px", 10)); // 12
console.log("parseFloat('12.5px'):", parseFloat("12.5px")); // 12.5
console.log("parseInt(''):", parseInt("")); // NaN
console.log("parseInt('0x10'):", parseInt("0x10")); // 16 (hex prefix)
console.log("parseInt('08'):", parseInt("08")); // 8 (modern JS)

// From Number
console.log("String(42):", String(42)); // "42"
console.log("42 + '':", 42 + ""); // "42"
console.log("Boolean(0):", Boolean(0)); // false
console.log("Boolean(-0):", Boolean(-0)); // false
console.log("Boolean(NaN):", Boolean(NaN)); // false
console.log("Boolean(Infinity):", Boolean(Infinity)); // true

// NaN behavior
console.log("NaN === NaN:", NaN === NaN); // false
console.log("Number.isNaN(NaN):", Number.isNaN(NaN)); // true
console.log("Number.isNaN('x'):", Number.isNaN("x")); // false (no coercion)
console.log("isNaN('x'):", isNaN("x")); // true (coerces to Number first)

// -0 behavior
console.log("Object.is(-0, 0):", Object.is(-0, 0)); // false
console.log("1 / 0:", 1 / 0); // Infinity
console.log("1 / -0:", 1 / -0); // -Infinity

// Objects / arrays to number (via ToPrimitive):
// 1) JS first tries to turn the object/array into a *primitive* value.
//    For most arrays this is done by calling .toString(), e.g. [1,2].toString() -> "1,2".
//    For plain objects it becomes "[object Object]" unless you define valueOf/toString yourself.
// 2) That primitive is then passed through the normal ToNumber rules shown above.
//    So effectively: Number(x) for non-primitives is often Number(x.toString()).
console.log("Number([]):", Number([])); // 0  -> ''.trim() -> 0
console.log("Number([1]):", Number([1])); // 1 -> '1' -> 1
console.log("Number([1,2]):", Number([1, 2])); // NaN -> '1,2' -> NaN
console.log("Number({}):", Number({})); // NaN -> '[object Object]' -> NaN

// Abstract equality with numbers (selected rules)
console.log("0 == '':", 0 == ""); // true -> '' ToNumber -> 0
console.log("0 == '0':", 0 == "0"); // true -> '0' ToNumber -> 0
console.log("0 == false:", 0 == false); // true -> false ToNumber -> 0
console.log("null == 0:", null == 0); // false (null only == undefined)
console.log("null == undefined:", null == undefined); // true


