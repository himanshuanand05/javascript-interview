/**
 * parseInt() vs parseFloat()
 * 
 * Key Differences:
 * 
 * parseInt():
 * - Parses a string and returns an INTEGER
 * - Stops parsing at the first non-numeric character (except for leading whitespace and sign)
 * - Can accept a radix (base) parameter (2-36)
 * - Returns NaN if the first character cannot be converted
 * - Truncates decimal part (doesn't round)
 * 
 * parseFloat():
 * - Parses a string and returns a FLOATING-POINT NUMBER
 * - Stops parsing at the first invalid character for a floating-point number
 * - Only works in base 10 (no radix parameter)
 * - Returns NaN if the first character cannot be converted
 * - Preserves decimal part
 */

// ===== Basic Parsing =====
console.log("=== Basic Parsing ===");

console.log("parseInt('123'):", parseInt('123'));           // 123
console.log("parseFloat('123'):", parseFloat('123'));       // 123

console.log("\nparseInt('123.456'):", parseInt('123.456')); // 123 (truncates decimal)
console.log("parseFloat('123.456'):", parseFloat('123.456')); // 123.456 (preserves decimal)

console.log("\nparseInt('123.99'):", parseInt('123.99'));   // 123 (truncates, doesn't round)
console.log("parseFloat('123.99'):", parseFloat('123.99')); // 123.99

// ===== Parsing with Non-Numeric Characters =====
console.log("\n=== Parsing with Non-Numeric Characters ===");

console.log("parseInt('123abc'):", parseInt('123abc'));     // 123 (stops at 'a')
console.log("parseFloat('123abc'):", parseFloat('123abc')); // 123 (stops at 'a')

console.log("\nparseInt('123.45abc'):", parseInt('123.45abc'));   // 123 (stops at '.')
console.log("parseFloat('123.45abc'):", parseFloat('123.45abc')); // 123.45 (stops at 'a')

console.log("\nparseInt('abc123'):", parseInt('abc123'));   // NaN (starts with non-numeric)
console.log("parseFloat('abc123'):", parseFloat('abc123')); // NaN (starts with non-numeric)

// ===== Leading Whitespace =====
console.log("\n=== Leading Whitespace ===");

console.log("parseInt('  123'):", parseInt('  123'));       // 123 (ignores leading whitespace)
console.log("parseFloat('  123'):", parseFloat('  123'));   // 123 (ignores leading whitespace)

console.log("\nparseInt('  123.45'):", parseInt('  123.45'));     // 123
console.log("parseFloat('  123.45'):", parseFloat('  123.45'));   // 123.45

// ===== Scientific Notation =====
console.log("\n=== Scientific Notation ===");

console.log("parseInt('1e10'):", parseInt('1e10'));         // 1 (stops at 'e')
console.log("parseFloat('1e10'):", parseFloat('1e10'));     // 10000000000 (parses scientific notation)

console.log("\nparseInt('1.5e2'):", parseInt('1.5e2'));     // 1 (stops at '.')
console.log("parseFloat('1.5e2'):", parseFloat('1.5e2'));   // 150 (parses scientific notation)

// ===== Radix (Base) - parseInt only =====
console.log("\n=== Radix (Base) - parseInt only ===");

console.log("parseInt('10', 2):", parseInt('10', 2));       // 2 (binary)
console.log("parseInt('10', 8):", parseInt('10', 8));       // 8 (octal)
console.log("parseInt('10', 10):", parseInt('10', 10));     // 10 (decimal)
console.log("parseInt('10', 16):", parseInt('10', 16));     // 16 (hexadecimal)

console.log("\nparseInt('FF', 16):", parseInt('FF', 16));   // 255 (hexadecimal)
console.log("parseInt('1010', 2):", parseInt('1010', 2));   // 10 (binary)

// parseFloat doesn't support radix
console.log("\nparseFloat('10', 2):", parseFloat('10', 2)); // 10 (ignores radix, always base 10)

// ===== Edge Cases =====
console.log("\n=== Edge Cases ===");

// Empty string
console.log("parseInt(''):", parseInt(''));                 // NaN
console.log("parseFloat(''):", parseFloat(''));             // NaN

// Whitespace only
console.log("\nparseInt('   '):", parseInt('   '));         // NaN
console.log("parseFloat('   '):", parseFloat('   '));       // NaN

// Null and undefined
console.log("\nparseInt(null):", parseInt(null));           // NaN (in strict mode, but may vary)
console.log("parseFloat(null):", parseFloat(null));         // NaN

console.log("\nparseInt(undefined):", parseInt(undefined)); // NaN
console.log("parseFloat(undefined):", parseFloat(undefined)); // NaN

// Infinity
console.log("\nparseInt('Infinity'):", parseInt('Infinity')); // NaN
console.log("parseFloat('Infinity'):", parseFloat('Infinity')); // Infinity

// Leading zeros (octal interpretation without radix)
console.log("\nparseInt('010'):", parseInt('010'));         // 10 (modern JS, base 10)
console.log("parseInt('010', 8):", parseInt('010', 8));    // 8 (explicit octal)
console.log("parseFloat('010'):", parseFloat('010'));       // 10

// ===== Side-by-Side Comparison =====
console.log("\n=== Side-by-Side Comparison ===");

let testValues = [
  '123',
  '123.456',
  '123.99',
  '123abc',
  '123.45abc',
  'abc123',
  '  123',
  '1e10',
  '1.5e2',
  '010',
  '',
  '   ',
  'Infinity',
  '-123.45',
  '+123.45'
];

testValues.forEach(val => {
  let parseIntResult = parseInt(val);
  let parseFloatResult = parseFloat(val);
  let valStr = val.padEnd(15);
  let parseIntStr = String(parseIntResult).padEnd(12);
  let parseFloatStr = String(parseFloatResult).padEnd(12);
  console.log(`Value: ${valStr} | parseInt: ${parseIntStr} | parseFloat: ${parseFloatStr}`);
});

// ===== Use Cases =====
console.log("\n=== Common Use Cases ===");

// parseInt - When you need an integer
let userInput = "42 years old";
let age = parseInt(userInput);  // 42
console.log("Age from input:", age);

// parseInt - Parsing hex colors
let hexColor = "#FF5733";
let red = parseInt(hexColor.substring(1, 3), 16);  // 255
let green = parseInt(hexColor.substring(3, 5), 16);  // 87
let blue = parseInt(hexColor.substring(5, 7), 16);  // 51
console.log(`Hex ${hexColor} = RGB(${red}, ${green}, ${blue})`);

// parseFloat - When you need decimal precision
let priceString = "$19.99";
let price = parseFloat(priceString.replace('$', ''));  // 19.99
console.log("Price:", price);

// parseFloat - Parsing measurements
let measurement = "3.14159 meters";
let value = parseFloat(measurement);  // 3.14159
console.log("Measurement value:", value);

// ===== Important Notes =====
console.log("\n=== Important Notes ===");

// Always specify radix for parseInt (best practice)
console.log("parseInt('08'):", parseInt('08'));           // 8 (modern JS)
console.log("parseInt('08', 10):", parseInt('08', 10));   // 8 (explicit, recommended)

// parseInt truncates, doesn't round
console.log("\nparseInt('9.9'):", parseInt('9.9'));       // 9 (not 10!)
console.log("Math.round(parseFloat('9.9')):", Math.round(parseFloat('9.9'))); // 10

// parseFloat handles scientific notation
console.log("\nparseFloat('2e-3'):", parseFloat('2e-3')); // 0.002
console.log("parseInt('2e-3'):", parseInt('2e-3'));       // 2 (stops at 'e')

// ===== Alternative: Number() and Unary + =====
console.log("\n=== Comparison with Number() and Unary + ===");

let testStr = "123.45abc";

console.log("parseInt('123.45abc'):", parseInt(testStr));     // 123
console.log("parseFloat('123.45abc'):", parseFloat(testStr)); // 123.45
console.log("Number('123.45abc'):", Number(testStr));         // NaN (strict, no partial parsing)
console.log("+'123.45abc':", +testStr);                       // NaN (strict, no partial parsing)

console.log("\nFor strict conversion (no partial parsing), use Number() or +");
console.log("For partial parsing, use parseInt() or parseFloat()");

// ===== Summary =====
console.log("\n=== Summary ===");
console.log("parseInt():");
console.log("  - Returns INTEGER");
console.log("  - Supports radix (base 2-36)");
console.log("  - Truncates decimal part");
console.log("  - Stops at first non-numeric character");
console.log("  - Use for: ages, counts, hex colors, binary data");
console.log("\nparseFloat():");
console.log("  - Returns FLOATING-POINT NUMBER");
console.log("  - Only base 10");
console.log("  - Preserves decimal part");
console.log("  - Handles scientific notation");
console.log("  - Stops at first invalid character");
console.log("  - Use for: prices, measurements, coordinates, percentages");


