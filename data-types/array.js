/**
 * Array Length Property - Writable Behavior
 * 
 * Key Concept:
 * 
 * The `length` property of arrays is WRITABLE, which means you can manually
 * set it to any non-negative integer value.
 * 
 * Important Behaviors:
 * 
 * 1. Increasing Length:
 *    - Creates a sparse array (holes/empty slots)
 *    - Original elements remain unchanged
 *    - New slots are empty (not undefined, but actual holes)
 *    - Can be reversed by setting length back
 * 
 * 2. Decreasing Length:
 *    - TRUNCATES the array (removes elements permanently)
 *    - Elements beyond the new length are LOST FOREVER
 *    - This process is IRREVERSIBLE
 *    - Cannot recover deleted elements
 */

// ===== Sparse Arrays: Holes vs Undefined =====
console.log("=== Sparse Arrays: Holes vs Undefined ===");

let arr = ['a', 'b', 'c'];
arr.length = 5;

// Critical distinction: holes are not undefined values
console.log("Sparse array:", arr);  // ['a', 'b', 'c', empty × 2]
console.log("arr[3] === undefined:", arr[3] === undefined);  // true (but it's a hole!)
console.log("3 in arr:", 3 in arr);  // false (hole, not a property)
console.log("arr.hasOwnProperty(3):", arr.hasOwnProperty(3));  // false
console.log("Object.prototype.hasOwnProperty.call(arr, '3'):", 
  Object.prototype.hasOwnProperty.call(arr, '3'));  // false

// Setting explicit undefined creates a property
arr[3] = undefined;
console.log("\nAfter arr[3] = undefined:");
console.log("3 in arr:", 3 in arr);  // true (now has property)
console.log("arr.hasOwnProperty(3):", arr.hasOwnProperty(3));  // true
console.log("arr[3] === undefined:", arr[3] === undefined);  // true (but now it's a value!)

// Array methods treat holes differently
let sparse = [1, , , 4];  // Holes at 1, 2
console.log("\nSparse array behavior with methods:");
console.log("Sparse:", sparse);
console.log("forEach (skips holes):");
sparse.forEach((val, idx) => console.log(`  ${idx}: ${val}`));  // Only 0 and 3
console.log("map (preserves holes):", sparse.map(x => x * 2));  // [2, empty × 2, 8]
console.log("filter (removes holes):", sparse.filter(x => true));  // [1, 4]

// Performance implication: sparse arrays can be slower
let dense = Array(1000000).fill(0);
let sparseLarge = [];
sparseLarge[999999] = 0;
console.log("\nDense array length:", dense.length);
console.log("Sparse array length:", sparseLarge.length);
console.log("Dense actual properties:", Object.keys(dense).length);
console.log("Sparse actual properties:", Object.keys(sparseLarge).length);  // Only 1!

// ===== Decreasing Length: Irreversible Deletion =====
console.log("\n=== Decreasing Length: Irreversible Deletion ===");

// Truncation triggers property deletion (not just hiding)
let arr3 = [10, 20, 30, 40, 50];
console.log("Before truncation:");
console.log("Properties:", Object.keys(arr3));  // ['0', '1', '2', '3', '4']
console.log("Property descriptors:", Object.getOwnPropertyDescriptors(arr3));

arr3.length = 3;
console.log("\nAfter length = 3:");
console.log("Properties:", Object.keys(arr3));  // ['0', '1', '2']
console.log("Properties 3 and 4 are DELETED (not just hidden)");

// Attempting to recover by increasing length doesn't work
arr3.length = 5;
console.log("\nAfter increasing length back to 5:");
console.log("Properties:", Object.keys(arr3));  // Still only ['0', '1', '2']
console.log("arr3[3]:", arr3[3]);  // undefined (hole, NOT the original 40)
console.log("arr3[4]:", arr3[4]);  // undefined (hole, NOT the original 50)
console.log("⚠️ Elements 40 and 50 are PERMANENTLY DELETED");

// Memory implications: truncated properties are eligible for GC
let largeArr = Array.from({ length: 1000000 }, (_, i) => ({ id: i, data: 'x'.repeat(100) }));
console.log("\nLarge array memory test:");
console.log("Before truncation - properties count:", Object.keys(largeArr).length);
largeArr.length = 1000;
console.log("After truncation - properties count:", Object.keys(largeArr).length);
console.log("Elements beyond index 999 are deleted and can be garbage collected");

// ===== Reference Semantics: arr.length = 0 vs arr = [] =====
console.log("\n=== Reference Semantics: arr.length = 0 vs arr = [] ===");

// Scenario: Multiple references to the same array
function processArray(arr) {
  arr.length = 0;  // Clears the array
}

let sharedArray = [1, 2, 3, 4, 5];
let reference1 = sharedArray;
let reference2 = sharedArray;

console.log("Before clear - all references point to same array:");
console.log("sharedArray === reference1:", sharedArray === reference1);  // true
console.log("sharedArray === reference2:", sharedArray === reference2);  // true

processArray(sharedArray);
console.log("\nAfter arr.length = 0:");
console.log("sharedArray:", sharedArray);  // []
console.log("reference1:", reference1);  // [] (same reference cleared)
console.log("reference2:", reference2);  // [] (same reference cleared)
console.log("All references see the cleared array");

// Contrast with reassignment
let arr1 = [1, 2, 3];
let ref2 = arr1;
arr1 = [];  // New array assigned
console.log("\nAfter arr1 = []:");
console.log("arr1:", arr1);  // [] (new array)
console.log("ref1:", ref2);  // [1, 2, 3] (old array still exists)
console.log("arr1 === ref1:", arr1 === ref2);  // false (different arrays)

// Impact on closures and event handlers
let callbacks = [];
for (let i = 0; i < 3; i++) {
  callbacks.push(() => console.log("Callback", i));
}
console.log("\nCallbacks array:", callbacks);
console.log("callbacks.length:", callbacks.length);  // 3

// Clear callbacks (maintains reference for all holders)
callbacks.length = 0;
console.log("After length = 0, all references to callbacks see empty array");
console.log("This is useful when you want to clear but maintain references");

// ===== Interaction with Array Methods =====
console.log("\n=== Interaction with Array Methods ===");

// Methods that respect length
let arr4 = [1, 2, 3, 4, 5];
arr4.length = 3;
console.log("After truncation:", arr4);  // [1, 2, 3]
console.log("slice:", arr4.slice(0));  // [1, 2, 3]
console.log("map:", arr4.map(x => x * 2));  // [2, 4, 6]

// Methods that ignore holes vs truncation
let arr5 = [1, 2, 3];
arr5.length = 5;  // Create sparse
console.log("\nSparse array:", arr5);  // [1, 2, 3, empty × 2]
console.log("forEach (skips holes):");
arr5.forEach((val, idx) => console.log(`  ${idx}: ${val}`));  // Only 0, 1, 2

let arr6 = [1, 2, 3, 4, 5];
arr6.length = 3;  // Truncate
console.log("\nTruncated array:", arr6);  // [1, 2, 3]
console.log("forEach:");
arr6.forEach((val, idx) => console.log(`  ${idx}: ${val}`));  // 0, 1, 2 (no holes)

// ===== Edge Cases and Type Coercion =====
console.log("\n=== Edge Cases and Type Coercion ===");

// Negative numbers: coerced via ToUint32
let arr7 = [1, 2, 3, 4, 5];
arr7.length = -1;
console.log("After length = -1 (negative):");
console.log("Length:", arr7.length);  // ToUint32(-1) = 2^32 - 1 (very large!)
console.log("Array:", arr7);  // Original preserved, but length is huge
console.log("⚠️ Negative length wraps to unsigned 32-bit int");

// Reset and test proper negative handling
arr7.length = 3;  // Reset to valid

// Non-integer: coerced via ToUint32 (truncates toward zero)
let arr8 = [1, 2, 3, 4, 5];
arr8.length = 2.7;
console.log("\nAfter length = 2.7 (non-integer):");
console.log("Length:", arr8.length);  // 2 (truncated, not rounded)
console.log("Array:", arr8);  // [1, 2] (truncated)

arr8.length = -2.7;
console.log("After length = -2.7:");
console.log("Length:", arr8.length);  // ToUint32(-2.7) = ToUint32(-2) = 2^32 - 2

// String coercion
let arr9 = [1, 2, 3];
arr9.length = "5";
console.log("\nAfter length = '5' (string):");
console.log("Length:", arr9.length);  // 5 (coerced to number)
console.log("Type:", typeof arr9.length);  // number

arr9.length = "abc";
console.log("After length = 'abc':");
console.log("Length:", arr9.length);  // NaN -> ToUint32(NaN) = 0
console.log("Array:", arr9);  // []

// Maximum safe length
let arr10 = [1, 2, 3];
console.log("\nMax array length (2^32 - 1):");
console.log("MAX_SAFE_INTEGER:", Number.MAX_SAFE_INTEGER);
arr10.length = Number.MAX_SAFE_INTEGER;
console.log("After setting to MAX_SAFE_INTEGER:", arr10.length);

// ===== Typed Arrays vs Regular Arrays =====
console.log("\n=== Typed Arrays vs Regular Arrays ===");

// Regular array: length is writable
let regularArr = [1, 2, 3];
regularArr.length = 5;
console.log("Regular array after length = 5:", regularArr);

// Typed array: length is read-only!
let typedArr = new Int8Array([1, 2, 3]);
console.log("Typed array length:", typedArr.length);  // 3
try {
  typedArr.length = 5;  // This will fail silently or throw
  console.log("Typed array length after assignment:", typedArr.length);  // Still 3
} catch (e) {
  console.log("Error:", e.message);
}
console.log("⚠️ Typed array length is read-only property");

// ===== Non-Enumerable and Symbol Properties =====
console.log("\n=== Non-Enumerable and Symbol Properties ===");

let arr11 = [1, 2, 3];
Object.defineProperty(arr11, 'customProp', {
  value: 'test',
  enumerable: false,
  writable: true
});

let symbolKey = Symbol('test');
arr11[symbolKey] = 'symbol value';

console.log("Array with non-enumerable and symbol properties:");
console.log("Length:", arr11.length);  // 3
console.log("Object.keys:", Object.keys(arr11));  // ['0', '1', '2']
console.log("Object.getOwnPropertyNames:", Object.getOwnPropertyNames(arr11));  // Includes 'customProp'
console.log("Symbol key:", arr11[symbolKey]);  // 'symbol value'

// Setting length doesn't affect non-index properties
arr11.length = 0;
console.log("\nAfter length = 0:");
console.log("Length:", arr11.length);  // 0
console.log("Index properties cleared, but customProp remains:", arr11.customProp);
console.log("Symbol property remains:", arr11[symbolKey]);

// ===== Performance Comparison: Clearing Methods =====
console.log("\n=== Performance Comparison: Clearing Methods ===");

// Method 1: arr.length = 0
// - Fastest (direct property assignment)
// - Maintains reference
// - Triggers property deletion
let arr10 = [1, 2, 3];
let ref1 = arr10;
arr10.length = 0;
console.log("arr.length = 0:");
console.log("arr10 === ref1:", arr10 === ref2);  // true (same reference)
console.log("arr10:", arr10);  // []

// Method 2: arr = []
// - Creates new array object
// - Old array may remain in memory if referenced
// - Breaks reference equality
let arr11 = [1, 2, 3];
let ref2 = arr11;
arr11 = [];
console.log("\narr = []:");
console.log("arr11 === ref2:", arr11 === ref2);  // false (different arrays)
console.log("Old array still exists:", ref2);  // [1, 2, 3]

// Method 3: arr.splice(0)
// - Slower (method call overhead)
// - Maintains reference
// - Returns removed elements
let arr12 = [1, 2, 3];
let ref3 = arr12;
let removed = arr12.splice(0);
console.log("\narr.splice(0):");
console.log("arr12 === ref3:", arr12 === ref3);  // true
console.log("arr12:", arr12);  // []
console.log("Removed:", removed);  // [1, 2, 3]

// Method 4: arr.splice(0, arr.length)
// - Similar to splice(0) but explicit
let arr13 = [1, 2, 3];
arr13.splice(0, arr13.length);
console.log("\narr.splice(0, arr.length):", arr13);  // []

// Performance considerations
console.log("\nPerformance characteristics:");
console.log("1. arr.length = 0: Fastest, maintains reference");
console.log("2. arr = []: Fast, but creates new object");
console.log("3. arr.splice(0): Slower (method call), maintains reference");
console.log("Use arr.length = 0 when you want to clear while maintaining references");

// ===== Important Technical Notes =====
console.log("\n=== Important Technical Notes ===");

console.log("1. Sparse Arrays (holes):");
console.log("   - Holes are missing properties, not undefined values");
console.log("   - Check with: 'index' in arr or hasOwnProperty()");
console.log("   - Array methods (forEach, map, filter) handle holes differently");
console.log("   - Performance: Sparse arrays can be slower due to property lookups");

console.log("\n2. Truncation Mechanism:");
console.log("   - Setting length < current length triggers property deletion");
console.log("   - Properties beyond new length are deleted via Delete() operation");
console.log("   - Deleted elements become eligible for garbage collection");
console.log("   - IRREVERSIBLE: Increasing length again creates holes, not original values");

console.log("\n3. Type Coercion:");
console.log("   - Length assignment uses ToUint32() conversion");
console.log("   - Negative numbers wrap: ToUint32(-1) = 2^32 - 1");
console.log("   - Non-integers truncate toward zero");
console.log("   - NaN converts to 0");

console.log("\n4. Reference Semantics:");
console.log("   - arr.length = 0: Modifies existing object, maintains reference equality");
console.log("   - arr = []: Creates new object, breaks reference equality");
console.log("   - Important for closures, event handlers, shared references");

console.log("\n5. Typed Arrays:");
console.log("   - TypedArray.length is READ-ONLY (unlike regular arrays)");
console.log("   - Attempting to set length has no effect or throws");

console.log("\n6. Non-Index Properties:");
console.log("   - Length manipulation only affects integer index properties");
console.log("   - Non-enumerable, symbol, and non-integer properties unaffected");

// ===== Summary =====
console.log("\n=== Summary ===");
console.log("Array length property behavior:");
console.log("  • Writable on regular arrays (read-only on TypedArrays)");
console.log("  • Increasing: Creates sparse arrays with holes (reversible)");
console.log("  • Decreasing: Permanently deletes properties (IRREVERSIBLE)");
console.log("  • Type coercion: Uses ToUint32() conversion");
console.log("  • Reference semantics: Maintains object identity");
console.log("  • Performance: Direct property assignment is fastest clearing method");
console.log("  • Memory: Truncated elements eligible for GC");

console.log("\n=== Key Takeaways for Senior Engineers ===");
console.log(`
1. arr.length = 0 is optimal for clearing while maintaining references
2. Holes (sparse arrays) are not undefined - they're missing properties
3. Truncation is irreversible - deleted properties cannot be recovered
4. Type coercion can lead to unexpected behavior (negative → large positive)
5. Typed arrays have different behavior (read-only length)
6. Consider memory implications when truncating large arrays
`);

