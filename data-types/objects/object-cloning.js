/**
 * Object cloning in JavaScript
 *
 * Key idea:
 * - "Shallow copy" copies only the top-level properties (nested objects/arrays are still shared references).
 * - "Deep clone" recursively copies nested structures so changes don't leak across copies.
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


