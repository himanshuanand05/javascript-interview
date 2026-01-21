/**
 * A primitive as an object
 * 
 * JavaScript faces a paradox: primitives need to be fast and lightweight,
 * but developers also need to access methods on them (like str.toUpperCase()).
 * 
 * Solution: When a method or property is accessed on a primitive, JavaScript
 * temporarily creates a special "object wrapper" (String, Number, Boolean, 
 * Symbol, or BigInt) that provides the functionality, then destroys it.
 * 
 * This allows primitives to remain primitive (single values) while still
 * providing access to useful methods and properties.
 */

// Example: Demonstrating the difference between object wrappers and primitives
// 
// Using 'new Number()' explicitly creates a persistent object wrapper (not recommended).
// This is different from the automatic temporary wrappers created when accessing
// methods on primitives. The object wrapper is truthy because it's an object.
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}

// Note: Number("123") without 'new' is a conversion function, not a wrapper.
// It returns a primitive number, not an object.
let num = Number("123"); // convert a string to number
