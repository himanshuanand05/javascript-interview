/**
 * Understanding the "this" keyword in JavaScript
 * 
 * The value of "this" depends on how a function is called, not where it's defined.
 * It's determined at runtime based on the call context.
 */

// ===== 1. Global Context =====
// In the global scope (outside any function), "this" refers to the global object.
// In browsers: window, in Node.js: global
console.log('=== Global Context ===');
console.log('this in global scope:', this); // In browser: Window object, in Node: {}

// ===== 2. Function Context (Non-Strict Mode) =====
// In non-strict mode, regular functions have "this" pointing to the global object
function regularFunction() {
  return this;
}
console.log('\n=== Function Context (Non-Strict) ===');
console.log('Regular function this:', regularFunction()); // global object

// ===== 3. Function Context (Strict Mode) =====
// In strict mode, "this" is undefined for regular functions
'use strict';
function strictFunction() {
  return this;
}
console.log('\n=== Function Context (Strict Mode) ===');
console.log('Strict function this:', strictFunction()); // undefined

// ===== 4. Method Context =====
// When a function is called as a method of an object, "this" refers to that object
const person = {
  name: 'Alice',
  age: 30,
  greet: function() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
  },
  // Shorthand method syntax (ES6)
  introduce() {
    return `My name is ${this.name}`;
  }
};

console.log('\n=== Method Context ===');
console.log(person.greet()); // "Hello, I'm Alice and I'm 30 years old"
console.log(person.introduce()); // "My name is Alice"

// Important: "this" is determined by how the function is called, not where it's defined
const greetFunction = person.greet;
// When called without object context, "this" loses its binding
console.log('Lost context:', greetFunction()); // "Hello, I'm undefined and I'm undefined years old"

// ===== 5. Arrow Functions (Lexical "this") =====
// Arrow functions don't have their own "this". They inherit "this" from the enclosing scope
const arrowPerson = {
  name: 'Bob',
  regularMethod: function() {
    console.log('Regular method this:', this.name); // 'Bob'
    
    // Regular function inside method - loses "this"
    setTimeout(function() {
      console.log('Regular function in setTimeout:', this.name); // undefined (or error)
    }, 100);
    
    // Arrow function inside method - preserves "this"
    setTimeout(() => {
      console.log('Arrow function in setTimeout:', this.name); // 'Bob'
    }, 200);
  }
};

console.log('\n=== Arrow Functions ===');
arrowPerson.regularMethod();

// Arrow functions cannot be used as constructors
// const ArrowConstructor = () => {};
// new ArrowConstructor(); // TypeError: ArrowConstructor is not a constructor

// ===== 6. Constructor Functions =====
// When a function is called with "new", "this" refers to the newly created instance
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Hi, I'm ${this.name}`;
  };
}

const person1 = new Person('Charlie', 25);
const person2 = new Person('Diana', 28);

console.log('\n=== Constructor Functions ===');
console.log(person1.greet()); // "Hi, I'm Charlie"
console.log(person2.greet()); // "Hi, I'm Diana"

// ===== 7. call(), apply(), and bind() =====
// These methods allow you to explicitly set the value of "this"

function introduce(location, hobby) {
  return `${this.name} is from ${location} and likes ${hobby}`;
}

const personA = { name: 'Eve' };
const personB = { name: 'Frank' };

// call() - calls function with specified "this" and arguments passed individually
console.log('\n=== call() Method ===');
console.log(introduce.call(personA, 'New York', 'reading'));
// "Eve is from New York and likes reading"

// apply() - similar to call(), but arguments are passed as an array
console.log('\n=== apply() Method ===');
console.log(introduce.apply(personB, ['London', 'cooking']));
// "Frank is from London and likes cooking"

// bind() - creates a new function with "this" permanently bound to a value
const introduceEve = introduce.bind(personA);
console.log('\n=== bind() Method ===');
console.log(introduceEve('Paris', 'dancing'));
// "Eve is from Paris and likes dancing"

// bind() is useful for fixing "this" context
const boundGreet = person.greet.bind(person);
console.log('Bound function:', boundGreet()); // Works correctly even when called standalone

// ===== 8. Class Methods =====
// In ES6 classes, methods automatically bind "this" to the instance
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  // Arrow function as class property - always bound to instance
  arrowSpeak = () => {
    return `${this.name} makes a sound (arrow)`;
  }
}

const dog = new Animal('Rex');
console.log('\n=== Class Methods ===');
console.log(dog.speak()); // "Rex makes a sound"
console.log(dog.arrowSpeak()); // "Rex makes a sound (arrow)"

// Method extraction still loses context for regular methods
const speakFunction = dog.speak;
// console.log(speakFunction()); // Error: Cannot read property 'name' of undefined

// But arrow class properties maintain context
const arrowSpeakFunction = dog.arrowSpeak;
console.log('Extracted arrow method:', arrowSpeakFunction()); // Works!

// ===== 9. Event Handlers =====
// In DOM event handlers, "this" refers to the element that received the event
// Note: This example is commented out as it requires a browser environment
/*
const button = document.querySelector('button');
button.addEventListener('click', function() {
  console.log(this); // The button element
});

// Arrow function in event handler - "this" is from enclosing scope, not the element
button.addEventListener('click', () => {
  console.log(this); // window (or undefined in strict mode)
});
*/

// ===== 10. Common Pitfalls and Solutions =====
console.log('\n=== Common Pitfalls ===');

const calculator = {
  value: 10,
  add: function(num) {
    return this.value + num;
  },
  // Solution 1: Use arrow function
  addArrow: (num) => {
    // This won't work! Arrow functions don't have their own "this"
    // return this.value + num; // undefined
  },
  // Solution 2: Store "this" in a variable
  addWithSelf: function(num) {
    const self = this;
    return function(anotherNum) {
      return self.value + num + anotherNum;
    };
  },
  // Solution 3: Use bind()
  addWithBind: function(num) {
    return function(anotherNum) {
      return this.value + num + anotherNum;
    }.bind(this);
  },
  // Solution 4: Use arrow function in nested function
  addWithArrow: function(num) {
    return (anotherNum) => {
      return this.value + num + anotherNum;
    };
  }
};

const addFunc = calculator.add;
// console.log(addFunc(5)); // NaN (this.value is undefined)

const nestedAdd = calculator.addWithArrow(5);
console.log('Nested arrow function:', nestedAdd(3)); // 18 (10 + 5 + 3)

// ===== 11. Method Assignment and Reassignment =====
// When you assign an object method to a variable, you're copying the function reference
// If you later change the object method, the variable still holds the OLD function reference
console.log('\n=== Method Assignment and Reassignment ===');

const myObject = {
  value: 100,
  getValue: function() {
    return this.value;
  },
  multiply: function(num) {
    return this.value * num;
  }
};

// Assign method to variable
const getValueFunc = myObject.getValue;
const multiplyFunc = myObject.multiply;

console.log('Original method call:', myObject.getValue()); // 100
console.log('Variable call (lost context):', getValueFunc()); // undefined (this is lost)

// Now change the object method
myObject.getValue = function() {
  return this.value * 2; // Changed behavior
};

myObject.multiply = function(num) {
  return this.value * num * 10; // Changed behavior
};

console.log('\nAfter changing object methods:');
console.log('Object method (new):', myObject.getValue()); // 200 (100 * 2)
console.log('Variable (old function):', getValueFunc()); // Still undefined (old function, lost context)

// The variable still references the OLD function, not the new one
console.log('Object multiply (new):', myObject.multiply(5)); // 5000 (100 * 5 * 10)
console.log('Variable multiply (old):', multiplyFunc.call(myObject, 5)); // 500 (100 * 5) - old function

// To verify they're different functions:
console.log('\nFunction comparison:');
console.log('Are they the same?', myObject.getValue === getValueFunc); // false - different functions!
console.log('Are they the same?', myObject.multiply === multiplyFunc); // false - different functions!

// Key takeaway: Assigning a method to a variable creates a COPY of the reference
// Changing the object property later doesn't affect the variable

