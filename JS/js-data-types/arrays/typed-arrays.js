/**
 * TypedArrays in JavaScript
 * 
 * TypedArrays are array-like objects that provide a mechanism for accessing
 * raw binary data. Unlike regular arrays, TypedArrays have a fixed length
 * and contain only numeric values of a specific type.
 * 
 * Key Characteristics:
 * - Fixed length (cannot be resized)
 * - Store binary data in a contiguous memory block
 * - Faster performance for numeric operations
 * - Length is read-only
 * - Used for working with binary data, buffers, WebGL, Web Audio API, etc.
 */

console.log("=== TypedArray Overview ===");

// TypedArrays are backed by ArrayBuffer
const buffer = new ArrayBuffer(16); // 16 bytes
console.log('ArrayBuffer size:', buffer.byteLength); // 16 bytes

// Different TypedArray views can share the same buffer
const int8View = new Int8Array(buffer);
const int16View = new Int16Array(buffer);
console.log('Int8Array length:', int8View.length); // 16 (8-bit = 1 byte per element)
console.log('Int16Array length:', int16View.length); // 8 (16-bit = 2 bytes per element)

console.log("\n=== All TypedArray Types ===");

// ===== 1. Int8Array - Signed 8-bit integers =====
// Range: -128 to 127
// Size: 1 byte per element
console.log("\n1. Int8Array (1 byte per element, range: -128 to 127)");
const int8 = new Int8Array([127, -128, 50, -50]);
console.log('Values:', int8); // Int8Array(4) [127, -128, 50, -50]
console.log('Byte length:', int8.byteLength); // 4 bytes
console.log('Length:', int8.length); // 4

// Overflow example
const int8Overflow = new Int8Array([128]); // 128 is too large
console.log('Overflow (128 -> ?):', int8Overflow[0]); // -128 (wraps around)

// ===== 2. Uint8Array - Unsigned 8-bit integers =====
// Range: 0 to 255
// Size: 1 byte per element
console.log("\n2. Uint8Array (1 byte per element, range: 0 to 255)");
const uint8 = new Uint8Array([255, 0, 128, 200]);
console.log('Values:', uint8); // Uint8Array(4) [255, 0, 128, 200]
console.log('Byte length:', uint8.byteLength); // 4 bytes

// Overflow example
const uint8Overflow = new Uint8Array([256]); // 256 is too large
console.log('Overflow (256 -> ?):', uint8Overflow[0]); // 0 (wraps around)

// ===== 3. Uint8ClampedArray - Unsigned 8-bit integers (clamped) =====
// Range: 0 to 255
// Size: 1 byte per element
// Clamps values instead of wrapping
console.log("\n3. Uint8ClampedArray (1 byte per element, clamped to 0-255)");
const uint8Clamped = new Uint8ClampedArray([300, -10, 128, 255]);
console.log('Values:', uint8Clamped); // Uint8ClampedArray(4) [255, 0, 128, 255]
console.log('300 clamped to:', uint8Clamped[0]); // 255 (not wrapped to 44)
console.log('-10 clamped to:', uint8Clamped[1]); // 0 (not wrapped to 246)

// ===== 4. Int16Array - Signed 16-bit integers =====
// Range: -32,768 to 32,767
// Size: 2 bytes per element
console.log("\n4. Int16Array (2 bytes per element, range: -32,768 to 32,767)");
const int16 = new Int16Array([32767, -32768, 1000, -1000]);
console.log('Values:', int16); // Int16Array(4) [32767, -32768, 1000, -1000]
console.log('Byte length:', int16.byteLength); // 8 bytes (4 elements * 2 bytes)

// ===== 5. Uint16Array - Unsigned 16-bit integers =====
// Range: 0 to 65,535
// Size: 2 bytes per element
console.log("\n5. Uint16Array (2 bytes per element, range: 0 to 65,535)");
const uint16 = new Uint16Array([65535, 0, 32768, 10000]);
console.log('Values:', uint16); // Uint16Array(4) [65535, 0, 32768, 10000]
console.log('Byte length:', uint16.byteLength); // 8 bytes

// ===== 6. Int32Array - Signed 32-bit integers =====
// Range: -2,147,483,648 to 2,147,483,647
// Size: 4 bytes per element
console.log("\n6. Int32Array (4 bytes per element, range: -2^31 to 2^31-1)");
const int32 = new Int32Array([2147483647, -2147483648, 1000000, -1000000]);
console.log('Values:', int32); // Int32Array(4) [2147483647, -2147483648, 1000000, -1000000]
console.log('Byte length:', int32.byteLength); // 16 bytes (4 elements * 4 bytes)
console.log('Max value:', int32[0]); // 2,147,483,647

// ===== 7. Uint32Array - Unsigned 32-bit integers =====
// Range: 0 to 4,294,967,295
// Size: 4 bytes per element
console.log("\n7. Uint32Array (4 bytes per element, range: 0 to 2^32-1)");
const uint32 = new Uint32Array([4294967295, 0, 2147483648, 1000000000]);
console.log('Values:', uint32); // Uint32Array(4) [4294967295, 0, 2147483648, 1000000000]
console.log('Max value:', uint32[0]); // 4,294,967,295

// ===== 8. BigInt64Array - Signed 64-bit integers =====
// Range: -2^63 to 2^63-1
// Size: 8 bytes per element
// Uses BigInt values
console.log("\n8. BigInt64Array (8 bytes per element, range: -2^63 to 2^63-1)");
const bigInt64 = new BigInt64Array([9223372036854775807n, -9223372036854775808n, 100n]);
console.log('Values:', bigInt64); // BigInt64Array(3) [9223372036854775807n, -9223372036854775808n, 100n]
console.log('Byte length:', bigInt64.byteLength); // 24 bytes (3 elements * 8 bytes)
console.log('Type of element:', typeof bigInt64[0]); // 'bigint'

// ===== 9. BigUint64Array - Unsigned 64-bit integers =====
// Range: 0 to 2^64-1
// Size: 8 bytes per element
// Uses BigInt values
console.log("\n9. BigUint64Array (8 bytes per element, range: 0 to 2^64-1)");
const bigUint64 = new BigUint64Array([18446744073709551615n, 0n, 9223372036854775808n]);
console.log('Values:', bigUint64); // BigUint64Array(3) [18446744073709551615n, 0n, 9223372036854775808n]
console.log('Max value:', bigUint64[0]); // 18,446,744,073,709,551,615n

// ===== 10. Float32Array - 32-bit floating point =====
// Range: Approximately ±3.4 * 10^38
// Precision: 7 decimal digits
// Size: 4 bytes per element
console.log("\n10. Float32Array (4 bytes per element, 32-bit float)");
const float32 = new Float32Array([3.14159, -123.456, 1e38, -1e38]);
console.log('Values:', float32); // Float32Array(4) [3.14159, -123.456, 1e+38, -1e+38]
console.log('Byte length:', float32.byteLength); // 16 bytes
console.log('Precision example:', float32[0]); // May show precision loss

// ===== 11. Float64Array - 64-bit floating point (same as Number) =====
// Range: Approximately ±1.8 * 10^308
// Precision: 15-17 decimal digits
// Size: 8 bytes per element
console.log("\n11. Float64Array (8 bytes per element, 64-bit float, same as Number)");
const float64 = new Float64Array([3.141592653589793, -123.456789012345, 1e308, -1e308]);
console.log('Values:', float64); // Float64Array(4) [3.141592653589793, -123.456789012345, 1e+308, -1e+308]
console.log('Byte length:', float64.byteLength); // 32 bytes (4 elements * 8 bytes)
console.log('Precision:', float64[0]); // Full precision

console.log("\n=== TypedArray Comparison Table ===");
console.log(`
Type                | Bytes | Range (Signed)              | Range (Unsigned)
--------------------|-------|----------------------------|--------------------------
Int8Array           | 1     | -128 to 127                | -
Uint8Array          | 1     | -                          | 0 to 255
Uint8ClampedArray   | 1     | -                          | 0 to 255 (clamped)
Int16Array          | 2     | -32,768 to 32,767          | -
Uint16Array         | 2     | -                          | 0 to 65,535
Int32Array          | 4     | -2^31 to 2^31-1            | -
Uint32Array         | 4     | -                          | 0 to 2^32-1
BigInt64Array       | 8     | -2^63 to 2^63-1            | -
BigUint64Array      | 8     | -                          | 0 to 2^64-1
Float32Array        | 4     | ±3.4 * 10^38               | -
Float64Array        | 8     | ±1.8 * 10^308              | -
`);

console.log("\n=== Creating TypedArrays ===");

// Method 1: From array-like or iterable
const typed1 = new Int32Array([1, 2, 3, 4, 5]);
console.log('From array:', typed1);

// Method 2: From length (creates zero-filled array)
const typed2 = new Int32Array(5);
console.log('From length (5):', typed2); // [0, 0, 0, 0, 0]

// Method 3: From ArrayBuffer
const buffer2 = new ArrayBuffer(16);
const typed3 = new Int32Array(buffer2);
console.log('From ArrayBuffer (16 bytes = 4 int32s):', typed3);

// Method 4: From ArrayBuffer with byte offset and length
const buffer3 = new ArrayBuffer(32);
const typed4 = new Int32Array(buffer3, 8, 4); // Start at byte 8, length 4 elements
console.log('From ArrayBuffer with offset:', typed4.length); // 4 elements

// Method 5: From another TypedArray (creates copy)
const source = new Int32Array([10, 20, 30]);
const typed5 = new Int32Array(source);
console.log('From another TypedArray:', typed5);
console.log('Are they the same?', typed5 === source); // false (copy)

console.log("\n=== TypedArray Properties ===");

const example = new Int32Array([1, 2, 3, 4, 5]);
console.log('Length:', example.length); // 5 (read-only)
console.log('Byte length:', example.byteLength); // 20 (5 * 4 bytes)
console.log('Byte offset:', example.byteOffset); // 0
console.log('Buffer:', example.buffer); // ArrayBuffer

// Length is read-only!
try {
  example.length = 10; // This will fail silently
  console.log('Length after assignment:', example.length); // Still 5
} catch (e) {
  console.log('Error:', e.message);
}

console.log("\n=== TypedArray Methods ===");

// Most array methods work (but some are different)
const arr = new Int32Array([1, 2, 3, 4, 5]);

console.log('slice():', arr.slice(1, 3)); // Int32Array(2) [2, 3]
console.log('map():', arr.map(x => x * 2)); // Int32Array(5) [2, 4, 6, 8, 10]
console.log('filter():', arr.filter(x => x > 2)); // Int32Array(3) [3, 4, 5]
console.log('find():', arr.find(x => x > 3)); // 4
console.log('includes():', arr.includes(3)); // true

// set() - copy values from another array/typed array
const target = new Int32Array(5);
target.set([10, 20, 30]);
console.log('set([10, 20, 30]):', target); // Int32Array(5) [10, 20, 30, 0, 0]

target.set([100, 200], 2); // Start at index 2
console.log('set([100, 200], 2):', target); // Int32Array(5) [10, 20, 100, 200, 0]

// subarray() - creates view on same buffer (not a copy!)
const original = new Int32Array([1, 2, 3, 4, 5, 6, 7, 8]);
const sub = original.subarray(2, 5);
console.log('subarray(2, 5):', sub); // Int32Array(3) [3, 4, 5]

sub[0] = 999;
console.log('After modifying sub, original:', original); // Modified! Same buffer

// slice() vs subarray()
const sliced = original.slice(2, 5);
sliced[0] = 888;
console.log('After modifying slice, original:', original); // Not modified! Different buffer

console.log("\n=== ArrayBuffer and Multiple Views ===");

// Single ArrayBuffer can have multiple TypedArray views
const sharedBuffer = new ArrayBuffer(16);

const view1 = new Int8Array(sharedBuffer); // 16 elements
const view2 = new Int16Array(sharedBuffer); // 8 elements
const view3 = new Int32Array(sharedBuffer); // 4 elements

view1[0] = 0x12; // Set first byte
view1[1] = 0x34; // Set second byte

console.log('Int8Array view:', view1[0], view1[1]); // 18, 52 (decimal)
console.log('Int16Array view (little-endian):', view1[0] | (view1[1] << 8)); // Combined
console.log('Int32Array view:', view3[0]); // Uses same buffer

console.log("\n=== Endianness (Byte Order) ===");

// JavaScript TypedArrays use platform's native endianness
// To check endianness:
const testBuffer = new ArrayBuffer(2);
const testView = new Uint16Array(testBuffer);
testView[0] = 0x1234;

const uint8View = new Uint8Array(testBuffer);
if (uint8View[0] === 0x34) {
  console.log('Little-endian system (LSB first)');
} else {
  console.log('Big-endian system (MSB first)');
}

// DataView provides explicit endianness control
const dataView = new DataView(testBuffer);
console.log('Little-endian read:', dataView.getUint16(0, true)); // true = little-endian
console.log('Big-endian read:', dataView.getUint16(0, false)); // false = big-endian

console.log("\n=== Practical Use Cases ===");

// 1. Image manipulation (pixel data)
console.log('\n1. Image/RGB data:');
const imageWidth = 100;
const imageHeight = 100;
const pixelData = new Uint8ClampedArray(imageWidth * imageHeight * 4); // RGBA
console.log('Pixel buffer size:', pixelData.length, 'elements');
console.log('Pixel buffer bytes:', pixelData.byteLength, 'bytes');

// 2. Audio processing
console.log('\n2. Audio sample data:');
const sampleRate = 44100;
const duration = 1; // seconds
const audioSamples = new Float32Array(sampleRate * duration);
console.log('Audio samples:', audioSamples.length); // 44,100 samples

// 3. Binary protocol parsing
console.log('\n3. Binary protocol:');
const packetBuffer = new ArrayBuffer(20);
const packetView = new DataView(packetBuffer);
packetView.setUint32(0, 0x12345678, false); // Header (big-endian)
packetView.setUint16(4, 0xABCD, false); // Type
packetView.setFloat32(6, 3.14159, true); // Data (little-endian)

// 4. High-performance numeric computations
console.log('\n4. High-performance computations:');
const largeArray = new Float64Array(1000000);
for (let i = 0; i < largeArray.length; i++) {
  largeArray[i] = Math.random();
}
console.log('Created 1 million Float64 elements');
console.log('Total memory:', largeArray.byteLength, 'bytes');

console.log("\n=== TypedArray vs Regular Array ===");

const regularArray = [1, 2, 3, 4, 5];
const typedArray = new Int32Array([1, 2, 3, 4, 5]);

console.log('Regular array length:', regularArray.length);
console.log('TypedArray length:', typedArray.length);

// Regular array: length is writable
regularArray.length = 10;
console.log('Regular array after length=10:', regularArray.length); // 10

// TypedArray: length is read-only
typedArray.length = 10; // No effect
console.log('TypedArray after length=10:', typedArray.length); // Still 5

// Regular array: can have any types
regularArray.push('string');
regularArray.push({ object: true });
console.log('Regular array with mixed types:', regularArray);

// TypedArray: only specific numeric types
// typedArray.push('string'); // Error: push is not a function
// typedArray[5] = 'string'; // Converts or errors

console.log("\n=== Summary ===");
console.log(`
TypedArrays provide:
1. Fixed-size arrays for binary data
2. Better performance for numeric operations
3. Memory-efficient storage
4. Direct access to ArrayBuffer memory
5. Support for different integer and float sizes
6. Endianness control via DataView

Use cases:
- Image/Video processing
- Audio manipulation
- Binary protocol handling
- WebGL buffers
- High-performance numeric computing
- Cryptography operations
- Network data parsing
`);




