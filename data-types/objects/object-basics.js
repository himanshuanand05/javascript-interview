/**
 * Object basics in JavaScript.
 * - Two common creation styles: object literal and Object constructor.
 * - Property access: dot notation and bracket notation.
 */

// Object literal: concise and preferred.
const userLiteral = {
  name: 'Alice',
  age: 28,
};

// Object constructor: uses new Object(); less common but sometimes seen.
const userConstructor = new Object();
userConstructor.name = 'Bob';
userConstructor.age = 32;

// Property value shorthand: when variable names match property names.
const firstName = 'Carol';
const city = 'Paris';
const shorthandUser = { firstName, city }; // same as { firstName: firstName, city: city }

// Property access with dot notation (simple, identifier-safe keys).
const literalName = userLiteral.name; // 'Alice'
const constructorAge = userConstructor.age; // 32

// Property access with bracket notation (works with dynamic or non-identifier keys).
const key = 'age';
const literalAge = userLiteral[key]; // 28

// Avoid special symbols or spaces in property names when possible to keep dot notation usable.
// If a key must include special characters, bracket notation is required:
const oddKeyObject = { 'favorite-color': 'green' };
const favoriteColor = oddKeyObject['favorite-color']; // 'green'

// Property existence test: "in" operator vs undefined check.
const settings = { theme: 'dark', notifications: undefined };

// "in" checks whether the property exists on the object (own or inherited), even if its value is undefined.
const hasThemeProp = 'theme' in settings; // true
const hasNotificationsProp = 'notifications' in settings; // true
const hasLanguageProp = 'language' in settings; // false

// Direct comparison to undefined only looks at the value, not whether the key exists.
const isNotificationsUndefined = settings.notifications === undefined; // true (but the key exists)
const isLanguageUndefined = settings.language === undefined; // true (but the key does NOT exist)

// Property order: integer-like keys are sorted ascending; other keys keep insertion order.
const orderingDemo = {
  b: 'second',
  10: 'ten',
  a: 'first',
  2: 'two',
  '1a': 'non-integer key',
};
const orderedKeys = Object.keys(orderingDemo); // ['2', '10', 'b', 'a', '1a']

// Negative example: dot notation breaks when the key has a dash (interpreted as subtraction).
// This will evaluate as oddKeyObject.favorite minus color (undefined), resulting in NaN.
// Avoid this pattern; prefer bracket notation for such keys.
// const badAccess = oddKeyObject.favorite-color;

// Computed property name: build key from an expression.
const prefix = 'user';
const computedKey = `${prefix}Id`;
const withComputed = {
  [computedKey]: 1234, // same as withComputed['userId']
  [`${prefix}-role`]: 'admin', // requires bracket notation to access
};
const userId = withComputed.userId; // 1234
const userRole = withComputed['user-role']; // 'admin'

console.log({
  literalName,
  constructorAge,
  literalAge,
  favoriteColor,
  userId,
  userRole,
  shorthandUser,
  hasThemeProp,
  hasNotificationsProp,
  hasLanguageProp,
  isNotificationsUndefined,
  isLanguageUndefined,
  orderedKeys,
});

