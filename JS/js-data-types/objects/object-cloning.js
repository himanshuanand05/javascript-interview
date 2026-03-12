/**
 * Object cloning in JavaScript
 *
 * Key idea:
 * - "Shallow copy" copies only the top-level properties (nested objects/arrays are still shared references).
 * - "Deep clone" recursively copies nested structures so changes don't leak across copies.
 *
 * Quick differences:
 * - Spread/Object.assign: shallow copy; functions kept by reference; cycles OK; specials (Date/Map/Set) kept by reference.
 * - structuredClone: deep (supports Date/Map/Set/RegExp, etc.); throws on functions; handles cycles.
 * - JSON parse/stringify: deep-ish but lossy; drops functions/undefined/symbols; Date->string; Map/Set/RegExp->{}; throws on cycles.
 */

// ===== 1) Shallow clone with object spread =====
const original1 = {
  name: 'Alice',
  address: { city: 'Paris' },
  tags: ['js', 'interview'],
};

const shallowSpread = { ...original1 };
shallowSpread.name = 'Alicia'; // only changes the clone
shallowSpread.address.city = 'London'; // changes BOTH (shared nested object)
shallowSpread.tags.push('shallow'); // changes BOTH (shared nested array)

console.log('\n=== Shallow clone (spread) ===');
console.log('original1.name:', original1.name); // 'Alice'
console.log('shallowSpread.name:', shallowSpread.name); // 'Alicia'
console.log('original1.address.city:', original1.address.city); // 'London' (changed!)
console.log('shallowSpread.address.city:', shallowSpread.address.city); // 'London'
console.log('original1.tags:', original1.tags); // ['js','interview','shallow'] (changed!)
console.log('shallowSpread.tags:', shallowSpread.tags);

// ===== 2) Shallow clone with Object.assign =====
const original2 = { a: 1, nested: { b: 2 } };
const shallowAssign = Object.assign({}, original2);
shallowAssign.nested.b = 999; // changes BOTH

console.log('\n=== Shallow clone (Object.assign) ===');
console.log('original2.nested.b:', original2.nested.b); // 999
console.log('shallowAssign.nested.b:', shallowAssign.nested.b); // 999

// ===== 3) Deep clone with structuredClone (recommended when available) =====
// structuredClone supports many built-in types (Object, Array, Map, Set, Date, RegExp, etc.).
// It does NOT clone functions (it will throw).
const original3 = {
  score: 10,
  meta: { active: true },
  createdAt: new Date('2020-01-01T00:00:00Z'),
};

const deepStructured = structuredClone(original3);
deepStructured.meta.active = false;

console.log('\n=== Deep clone (structuredClone) ===');
console.log('original3.meta.active:', original3.meta.active); // true
console.log('deepStructured.meta.active:', deepStructured.meta.active); // false
console.log('original3.createdAt instanceof Date:', original3.createdAt instanceof Date); // true
console.log('deepStructured.createdAt instanceof Date:', deepStructured.createdAt instanceof Date); // true

// ===== 4) Deep clone via JSON (simple, but lossy) =====
// Pros: quick for plain data (POJOs) with numbers/strings/booleans/arrays/objects.
// Cons: drops undefined, functions, symbols; converts Date to string; fails on circular refs; loses Map/Set.
const original4 = {
  x: 1,
  y: undefined,
  createdAt: new Date('2020-01-01T00:00:00Z'),
  fn() {
    return 123;
  },
};

const jsonClone = JSON.parse(JSON.stringify(original4));

console.log('\n=== Deep-ish clone (JSON) — lossy ===');
console.log('original4.y:', original4.y); // undefined
console.log('jsonClone.y:', jsonClone.y); // undefined is DROPPED (property missing)
console.log('typeof original4.fn:', typeof original4.fn); // 'function'
console.log('typeof jsonClone.fn:', typeof jsonClone.fn); // 'undefined' (dropped)
console.log('original4.createdAt instanceof Date:', original4.createdAt instanceof Date); // true
console.log('jsonClone.createdAt:', jsonClone.createdAt); // string

// ===== 5) Objects with functions (spread & Object.assign) =====
// Functions are copied by reference - the cloned object gets a reference to the same function.
const originalWithFn = {
  name: 'Bob',
  greet() {
    return `Hello, I'm ${this.name}`;
  },
  calculate: function(x, y) {
    return x + y;
  },
  arrowFn: () => 'arrow function',
};

const spreadWithFn = { ...originalWithFn };
const assignWithFn = Object.assign({}, originalWithFn);

console.log('\n=== Objects with functions (spread & Object.assign) ===');
console.log('Functions are copied by reference (not cloned):');
console.log('originalWithFn.greet === spreadWithFn.greet:', originalWithFn.greet === spreadWithFn.greet); // true (same reference)
console.log('originalWithFn.calculate === assignWithFn.calculate:', originalWithFn.calculate === assignWithFn.calculate); // true

// Calling the function uses the cloned object's context
spreadWithFn.name = 'Bobby';
console.log('spreadWithFn.greet():', spreadWithFn.greet()); // "Hello, I'm Bobby" (uses spreadWithFn's name)
console.log('originalWithFn.greet():', originalWithFn.greet()); // "Hello, I'm Bob" (uses originalWithFn's name)

// Arrow functions don't have 'this' binding, so behavior is the same
console.log('Arrow function works:', spreadWithFn.arrowFn()); // 'arrow function'

// ===== 6) Objects with cyclic references (spread & Object.assign) =====
// Both spread and Object.assign can handle cyclic references, but they create shallow copies.
// The cloned object will have a NEW reference to the SAME nested object that contains the cycle.
const createCyclicObject = () => {
  const obj = { name: 'Parent' };
  obj.self = obj; // Circular reference: obj references itself
  obj.child = { name: 'Child', parent: obj }; // Child references parent, creating a cycle
  return obj;
};

const originalCyclic = createCyclicObject();
const spreadCyclic = { ...originalCyclic };
const assignCyclic = Object.assign({}, originalCyclic);

console.log('\n=== Objects with cyclic references (spread & Object.assign) ===');
console.log('Spread and Object.assign CAN handle cyclic references (unlike JSON.stringify):');
console.log('originalCyclic.self === originalCyclic:', originalCyclic.self === originalCyclic); // true
console.log('spreadCyclic.self === spreadCyclic:', spreadCyclic.self === spreadCyclic); // true (spreadCyclic.self points to spreadCyclic, not originalCyclic)
console.log('assignCyclic.self === assignCyclic:', assignCyclic.self === assignCyclic); // true

// Important: The nested objects are still shared references!
console.log('\n⚠️  Shallow copy behavior with cycles:');
console.log('originalCyclic.child === spreadCyclic.child:', originalCyclic.child === spreadCyclic.child); // true (SAME reference!)
console.log('originalCyclic.child === assignCyclic.child:', originalCyclic.child === assignCyclic.child); // true

// This means modifying nested properties affects both:
originalCyclic.child.name = 'Modified Child';
console.log('After modifying originalCyclic.child.name:');
console.log('originalCyclic.child.name:', originalCyclic.child.name); // 'Modified Child'
console.log('spreadCyclic.child.name:', spreadCyclic.child.name); // 'Modified Child' (changed!)
console.log('assignCyclic.child.name:', assignCyclic.child.name); // 'Modified Child' (changed!)

// But modifying top-level properties doesn't:
spreadCyclic.name = 'Spread Parent';
console.log('\nAfter modifying spreadCyclic.name:');
console.log('originalCyclic.name:', originalCyclic.name); // 'Parent' (unchanged)
console.log('spreadCyclic.name:', spreadCyclic.name); // 'Spread Parent'

// ===== 7) Demonstrating the cycle in cloned objects =====
console.log('\n=== Cycle behavior in clones ===');
console.log('Original cycle depth check:');
let current = originalCyclic;
let depth = 0;
while (depth < 5 && current.self) {
  console.log(`  Level ${depth}: ${current.name}`);
  current = current.self;
  depth++;
}

console.log('Spread clone cycle depth check:');
current = spreadCyclic;
depth = 0;
while (depth < 5 && current.self) {
  console.log(`  Level ${depth}: ${current.name}`);
  current = current.self;
  depth++;
}

// ===== 8) JSON.parse(JSON.stringify()) with functions =====
console.log('\n=== JSON.parse(JSON.stringify()) with functions ===');
const objWithFunctions = {
  name: 'Charlie',
  regularFn: function() { return 'regular'; },
  methodFn() { return 'method'; },
  arrowFn: () => 'arrow',
  asyncFn: async () => 'async',
  generatorFn: function*() { yield 1; },
};

console.log('Original object has functions:');
console.log('  regularFn:', typeof objWithFunctions.regularFn); // 'function'
console.log('  methodFn:', typeof objWithFunctions.methodFn); // 'function'
console.log('  arrowFn:', typeof objWithFunctions.arrowFn); // 'function'

try {
  const jsonCloneWithFn = JSON.parse(JSON.stringify(objWithFunctions));
  console.log('\nAfter JSON.parse(JSON.stringify()):');
  console.log('  name:', jsonCloneWithFn.name); // 'Charlie' (preserved)
  console.log('  regularFn:', typeof jsonCloneWithFn.regularFn); // 'undefined' (DROPPED)
  console.log('  methodFn:', typeof jsonCloneWithFn.methodFn); // 'undefined' (DROPPED)
  console.log('  arrowFn:', typeof jsonCloneWithFn.arrowFn); // 'undefined' (DROPPED)
  console.log('  Has regularFn property?', 'regularFn' in jsonCloneWithFn); // false (property doesn't exist)
  console.log('\n✅ JSON methods work with functions (they are silently dropped)');
} catch (error) {
  console.log('❌ Error:', error.message);
}

// ===== 9) JSON.parse(JSON.stringify()) with cyclic references =====
console.log('\n=== JSON.parse(JSON.stringify()) with cyclic references ===');
console.log('Attempting to clone cyclic object with JSON methods:');

const cyclicObj1 = { name: 'Self Reference' };
cyclicObj1.self = cyclicObj1; // Direct self-reference

const cyclicObj2 = { parent: { child: null } };
cyclicObj2.parent.child = cyclicObj2.parent; // Parent-child cycle

const cyclicObj3 = { a: { b: { c: null } } };
cyclicObj3.a.b.c = cyclicObj3.a; // Nested cycle

const cyclicObjs = [
  { name: 'Direct self-reference', obj: cyclicObj1 },
  { name: 'Parent-child cycle', obj: cyclicObj2 },
  { name: 'Nested cycle', obj: cyclicObj3 },
];

cyclicObjs.forEach(({ name, obj }) => {
  try {
    const cloned = JSON.parse(JSON.stringify(obj));
    console.log(`✅ ${name}: Success (unexpected!)`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    // Expected: "Converting circular structure to JSON"
  }
});

console.log('\n⚠️  JSON.parse(JSON.stringify()) CANNOT handle ANY cyclic references - it throws!');

// ===== 10) Comparison: Spread/Object.assign vs JSON with functions and cycles =====
console.log('\n=== Comparison: Spread/Object.assign vs JSON ===');
console.log('\nFunctions:');
console.log('  Spread/Object.assign: ✅ Preserved (copied by reference)');
console.log('  JSON.parse(JSON.stringify()): ❌ Dropped (property removed)');

console.log('\nCyclic references:');
console.log('  Spread/Object.assign: ✅ Works (shallow copy, cycle preserved)');
console.log('  JSON.parse(JSON.stringify()): ❌ Throws error');

console.log('\nUndefined values:');
const objWithUndefined = { a: 1, b: undefined, c: null };
const spreadUndef = { ...objWithUndefined };
const jsonUndef = JSON.parse(JSON.stringify(objWithUndefined));

console.log('  Spread: b:', spreadUndef.b); // undefined (preserved)
console.log('  JSON: b:', jsonUndef.b); // undefined (property missing)
console.log('  JSON: "b" in jsonUndef:', 'b' in jsonUndef); // false (property dropped)

console.log('\nSymbols:');
const sym = Symbol('test');
const objWithSymbol = { a: 1, [sym]: 'symbol value' };
const spreadSym = { ...objWithSymbol };
const jsonSym = JSON.parse(JSON.stringify(objWithSymbol));

console.log('  Spread: Symbol preserved?', sym in spreadSym); // true (property exists)
console.log('  JSON: Symbol preserved?', sym in jsonSym); // false (property dropped)

console.log('\nSpecial objects (Date, Map, Set):');
const objWithSpecial = {
  date: new Date('2020-01-01'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  regex: /test/gi,
};

const spreadSpecial = { ...objWithSpecial };
const jsonSpecial = JSON.parse(JSON.stringify(objWithSpecial));

console.log('  Spread date instanceof Date:', spreadSpecial.date instanceof Date); // true
console.log('  JSON date instanceof Date:', jsonSpecial.date instanceof Date); // false
console.log('  JSON date:', typeof jsonSpecial.date); // 'string'
console.log('  Spread map instanceof Map:', spreadSpecial.map instanceof Map); // true
console.log('  JSON map:', typeof jsonSpecial.map); // 'object' (empty {} - Map converts to empty object)
console.log('  JSON set:', typeof jsonSpecial.set); // 'object' (empty {} - Set converts to empty object)
console.log('  JSON regex:', typeof jsonSpecial.regex); // 'object' (empty {} - RegExp converts to empty object)

// ===== 11) Safe way to detect cycles before JSON.stringify =====
console.log('\n=== Detecting cycles before JSON.stringify ===');
function hasCycle(obj, seen = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }
  
  if (seen.has(obj)) {
    return true; // Found a cycle!
  }
  
  seen.add(obj);
  
  for (const key in obj) {
    if (hasCycle(obj[key], seen)) {
      return true;
    }
  }
  
  return false;
}

const safeObj = { a: 1, b: { c: 2 } };
const unsafeObj = createCyclicObject();

console.log('Safe object has cycle?', hasCycle(safeObj)); // false
console.log('Unsafe object has cycle?', hasCycle(unsafeObj)); // true


