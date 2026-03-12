/**
 * Node.js Event Loop - Execution Order
 * 
 * IMPORTANT: Run this file with Node.js: node nodejs-event-loop.js
 * Some examples use fs module which is only available in Node.js environment.
 * 
 * The Event Loop is Node.js's mechanism for handling asynchronous operations.
 * It allows Node.js to perform non-blocking I/O operations despite JavaScript
 * being single-threaded.
 * 
 * Event Loop Phases (in order):
 * 
 * 1. Timer Phase: Executes callbacks scheduled by setTimeout() and setInterval()
 * 2. Pending Callbacks: Executes I/O callbacks deferred to the next loop iteration
 * 3. Idle, Prepare: Internal use only
 * 4. Poll Phase: 
 *    - Fetches new I/O events
 *    - Executes I/O related callbacks (almost all callbacks except timers, setImmediate, close)
 * 5. Check Phase: Executes setImmediate() callbacks
 * 6. Close Callbacks: Executes close callbacks (e.g., socket.on('close'))
 * 
 * Between each phase, microtasks are processed:
 * - process.nextTick() (highest priority)
 * - Promise callbacks (.then, .catch, .finally)
 * 
 * IMPORTANT: process.nextTick() has higher priority than Promises
 */

// ===== Basic Execution Order: Synchronous Code First =====
console.log("=== Example 1: Synchronous Code Executes First ===\n");

console.log("1. Synchronous - Start");

setTimeout(() => {
  console.log("3. setTimeout - This runs later");
}, 0);

Promise.resolve().then(() => {
  console.log("2. Promise - Microtask runs before setTimeout");
});

console.log("1. Synchronous - End");

/* Expected Output:
 * 1. Synchronous - Start
 * 1. Synchronous - End
 * 2. Promise - Microtask runs before setTimeout
 * 3. setTimeout - This runs later
 */

// ===== process.nextTick vs Promise =====
console.log("\n=== Example 2: process.nextTick vs Promise ===\n");

console.log("1. Synchronous");

Promise.resolve().then(() => {
  console.log("3. Promise");
});

process.nextTick(() => {
  console.log("2. process.nextTick - HIGHEST PRIORITY");
});

console.log("1. Synchronous");

/* Expected Output:
 * 1. Synchronous
 * 1. Synchronous
 * 2. process.nextTick - HIGHEST PRIORITY
 * 3. Promise
 * 
 * Explanation: process.nextTick has higher priority than Promise callbacks
 */

// ===== Multiple process.nextTick Calls =====
console.log("\n=== Example 3: Multiple process.nextTick Calls ===\n");

console.log("1. Start");

process.nextTick(() => {
  console.log("2. nextTick 1");
  process.nextTick(() => {
    console.log("3. nextTick 2 (nested)");
  });
});

process.nextTick(() => {
  console.log("2. nextTick 3");
});

Promise.resolve().then(() => {
  console.log("4. Promise");
});

console.log("1. End");

/* Expected Output:
 * 1. Start
 * 1. End
 * 2. nextTick 1
 * 2. nextTick 3
 * 3. nextTick 2 (nested)
 * 4. Promise
 * 
 * Explanation: All process.nextTick callbacks are executed before Promise callbacks
 */

// ===== setTimeout vs setImmediate =====
console.log("\n=== Example 4: setTimeout vs setImmediate ===\n");

console.log("1. Synchronous");

setTimeout(() => {
  console.log("3. setTimeout (0ms)");
}, 0);

setImmediate(() => {
  console.log("3. setImmediate");
});

Promise.resolve().then(() => {
  console.log("2. Promise");
});

console.log("1. Synchronous End");

/* Expected Output:
 * 1. Synchronous
 * 1. Synchronous End
 * 2. Promise
 * 3. setTimeout (0ms)  OR  3. setImmediate
 * 3. setImmediate          OR  3. setTimeout (0ms)
 * 
 * Note: setTimeout and setImmediate order can be non-deterministic in this case
 * because both are scheduled for the next event loop iteration.
 * In I/O contexts, setImmediate always runs before setTimeout.
 */

// ===== setImmediate vs setTimeout in I/O Context =====
console.log("\n=== Example 5: setImmediate vs setTimeout in I/O Context ===\n");

const fs = require('fs');

console.log("1. Synchronous - Before I/O");

fs.readFile(__filename, () => {
  console.log("3. I/O Callback - Poll Phase");
  
  setTimeout(() => {
    console.log("5. setTimeout - Timer Phase (next iteration)");
  }, 0);
  
  setImmediate(() => {
    console.log("4. setImmediate - Check Phase (same iteration)");
  });
  
  process.nextTick(() => {
    console.log("3. process.nextTick - After I/O callback");
  });
  
  Promise.resolve().then(() => {
    console.log("3. Promise - After I/O callback");
  });
});

console.log("1. Synchronous - After I/O");

/* Expected Output:
 * 1. Synchronous - Before I/O
 * 1. Synchronous - After I/O
 * 3. I/O Callback - Poll Phase
 * 3. process.nextTick - After I/O callback
 * 3. Promise - After I/O callback
 * 4. setImmediate - Check Phase (same iteration)
 * 5. setTimeout - Timer Phase (next iteration)
 * 
 * Key: In I/O context, setImmediate runs before setTimeout
 */

// ===== Complete Event Loop Phase Demonstration =====
console.log("\n=== Example 6: Complete Event Loop Phases ===\n");

console.log("1. [SYNC] Synchronous code");

setTimeout(() => {
  console.log("4. [TIMER] setTimeout callback");
}, 0);

setImmediate(() => {
  console.log("5. [CHECK] setImmediate callback");
  
  // These run in the NEXT iteration
  setTimeout(() => {
    console.log("7. [TIMER] setTimeout (nested, next iteration)");
  }, 0);
  
  setImmediate(() => {
    console.log("6. [CHECK] setImmediate (nested, same iteration ends, next starts)");
  });
});

process.nextTick(() => {
  console.log("2. [NEXTTICK] process.nextTick");
  
  process.nextTick(() => {
    console.log("2. [NEXTTICK] nested nextTick");
  });
});

Promise.resolve().then(() => {
  console.log("3. [PROMISE] Promise then");
  
  Promise.resolve().then(() => {
    console.log("3. [PROMISE] nested Promise");
  });
});

console.log("1. [SYNC] Synchronous code end");

/* Expected Output:
 * 1. [SYNC] Synchronous code
 * 1. [SYNC] Synchronous code end
 * 2. [NEXTTICK] process.nextTick
 * 2. [NEXTTICK] nested nextTick
 * 3. [PROMISE] Promise then
 * 3. [PROMISE] nested Promise
 * 4. [TIMER] setTimeout callback
 * 5. [CHECK] setImmediate callback
 * 6. [CHECK] setImmediate (nested)
 * 7. [TIMER] setTimeout (nested, next iteration)
 */

// ===== I/O Operations and Event Loop =====
console.log("\n=== Example 7: I/O Operations ===\n");

console.log("1. Start");

// File I/O (if available)
if (typeof require !== 'undefined') {
  const fs = require('fs');
  
  fs.readFile(__filename, 'utf8', () => {
    console.log("4. I/O Callback - File read complete");
    
    setImmediate(() => {
      console.log("5. setImmediate - After I/O");
    });
  });
}

// Timer
setTimeout(() => {
  console.log("3. setTimeout - Timer phase");
}, 0);

// Microtasks
process.nextTick(() => {
  console.log("2. process.nextTick");
});

Promise.resolve().then(() => {
  console.log("2. Promise");
});

console.log("1. End");

/* Expected Output (approximate):
 * 1. Start
 * 1. End
 * 2. process.nextTick
 * 2. Promise
 * 3. setTimeout - Timer phase
 * 4. I/O Callback - File read complete (when file is ready)
 * 5. setImmediate - After I/O
 */

// ===== Nested Async Operations =====
console.log("\n=== Example 8: Nested Async Operations ===\n");

console.log("1. Outer synchronous");

setTimeout(() => {
  console.log("3. Outer setTimeout");
  
  setTimeout(() => {
    console.log("5. Inner setTimeout");
  }, 0);
  
  setImmediate(() => {
    console.log("4. Inner setImmediate");
  });
  
  process.nextTick(() => {
    console.log("3. process.nextTick (inside setTimeout)");
  });
  
  Promise.resolve().then(() => {
    console.log("3. Promise (inside setTimeout)");
  });
}, 0);

process.nextTick(() => {
  console.log("2. Outer process.nextTick");
});

Promise.resolve().then(() => {
  console.log("2. Outer Promise");
});

console.log("1. Outer synchronous end");

/* Expected Output:
 * 1. Outer synchronous
 * 1. Outer synchronous end
 * 2. Outer process.nextTick
 * 2. Outer Promise
 * 3. Outer setTimeout
 * 3. process.nextTick (inside setTimeout)
 * 3. Promise (inside setTimeout)
 * 4. Inner setImmediate
 * 5. Inner setTimeout
 */

// ===== Priority Order Summary =====
console.log("\n=== Example 9: Complete Priority Order ===\n");

console.log("=== EXECUTION ORDER ===");

// Level 1: Synchronous code
console.log("[1] Synchronous code");

// Level 2: process.nextTick (microtask queue)
process.nextTick(() => {
  console.log("[2] process.nextTick");
});

// Level 3: Promise callbacks (microtask queue)
Promise.resolve().then(() => {
  console.log("[3] Promise .then");
});

// Level 4: Async operations (macrotask queue)
setTimeout(() => {
  console.log("[4] setTimeout");
}, 0);

setImmediate(() => {
  console.log("[4] setImmediate");
});

// I/O callbacks would also be at level 4

console.log("=== END OF SYNCHRONOUS CODE ===\n");

/* Expected Output:
 * === EXECUTION ORDER ===
 * [1] Synchronous code
 * === END OF SYNCHRONOUS CODE ===
 * 
 * [2] process.nextTick
 * [3] Promise .then
 * [4] setTimeout OR [4] setImmediate (order may vary)
 * [4] setImmediate OR [4] setTimeout
 */

// ===== Understanding the Queue System =====
console.log("\n=== Example 10: Queue System ===\n");

console.log("Understanding Node.js Queues:\n");

console.log("1. Call Stack (Synchronous)");
console.log("   - Executes immediately");
console.log("   - Blocking operations");

console.log("\n2. Microtask Queues (processed after each phase):");
console.log("   a) process.nextTick Queue (HIGHEST PRIORITY)");
console.log("   b) Promise Queue (.then, .catch, .finally)");

console.log("\n3. Macrotask Queues (processed in phases):");
console.log("   a) Timer Queue (setTimeout, setInterval)");
console.log("   b) I/O Queue (file operations, network)");
console.log("   c) Check Queue (setImmediate)");
console.log("   d) Close Queue (close callbacks)");

console.log("\nExecution Flow:");
console.log("1. Execute all synchronous code (Call Stack)");
console.log("2. Execute ALL microtasks (nextTick, then Promises)");
console.log("3. Execute ONE macrotask from each phase");
console.log("4. Execute ALL microtasks again");
console.log("5. Repeat from step 3");

// ===== Common Interview Question Pattern =====
console.log("\n=== Example 11: Common Interview Question ===\n");

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise 1");
  process.nextTick(() => {
    console.log("nextTick inside Promise 1");
  });
});

process.nextTick(() => {
  console.log("nextTick 1");
  Promise.resolve().then(() => {
    console.log("Promise inside nextTick 1");
  });
});

setTimeout(() => {
  console.log("setTimeout 1");
  process.nextTick(() => {
    console.log("nextTick inside setTimeout");
  });
  Promise.resolve().then(() => {
    console.log("Promise inside setTimeout");
  });
}, 0);

setImmediate(() => {
  console.log("setImmediate 1");
});

Promise.resolve().then(() => {
  console.log("Promise 2");
});

process.nextTick(() => {
  console.log("nextTick 2");
});

console.log("End");

/* Expected Output:
 * Start
 * End
 * nextTick 1
 * nextTick 2
 * Promise 1
 * Promise inside nextTick 1
 * Promise 2
 * nextTick inside Promise 1
 * setTimeout 1
 * setImmediate 1
 * nextTick inside setTimeout
 * Promise inside setTimeout
 * 
 * Key Points:
 * - All nextTick callbacks run before any Promise callbacks
 * - But nested callbacks are added to their respective queues
 * - Macrotasks (setTimeout, setImmediate) run after microtasks
 */

// ===== setImmediate vs setTimeout(0) Timing =====
console.log("\n=== Example 12: setImmediate vs setTimeout(0) ===\n");

console.log("Outside I/O context:");

setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));

/* In this context, order is NON-DETERMINISTIC
 * It depends on how long the event loop takes to start
 */

console.log("\nIn I/O context (using readFile):");
if (typeof require !== 'undefined') {
  const fs = require('fs');
  fs.readFile(__filename, () => {
    setTimeout(() => console.log("setTimeout in I/O"), 0);
    setImmediate(() => console.log("setImmediate in I/O"));
    // setImmediate ALWAYS runs first in I/O context
  });
}

// ===== Event Loop Visualization =====
console.log("\n=== Event Loop Phase Diagram ===");
console.log(`
┌─────────────────────────────────────────┐
│          EVENT LOOP PHASES              │
├─────────────────────────────────────────┤
│                                         │
│  1. ──────── Timer Phase ─────────────  │
│     setTimeout, setInterval callbacks   │
│                                         │
│  2. ─── Pending Callbacks Phase ──────  │
│     Deferred I/O callbacks              │
│                                         │
│  3. ──────── Idle, Prepare ───────────  │
│     (Internal use)                      │
│                                         │
│  4. ───────── Poll Phase ─────────────  │
│     • Fetch new I/O events              │
│     • Execute I/O callbacks             │
│                                         │
│  5. ──────── Check Phase ─────────────  │
│     setImmediate callbacks              │
│                                         │
│  6. ─── Close Callbacks Phase ────────  │
│     close event callbacks               │
│                                         │
└─────────────────────────────────────────┘

After EACH phase, process microtasks:
  1. process.nextTick queue (ALL)
  2. Promise queue (ALL)

Then proceed to next phase.
`);

// ===== Key Takeaways =====
console.log("\n=== Key Takeaways ===");
console.log(`
1. EXECUTION ORDER (highest to lowest priority):
   a) Synchronous code
   b) process.nextTick() callbacks
   c) Promise callbacks (.then, .catch, .finally)
   d) Timer callbacks (setTimeout, setInterval)
   e) I/O callbacks
   f) setImmediate() callbacks
   g) Close callbacks

2. process.nextTick vs Promise:
   - process.nextTick has HIGHER priority
   - Both are microtasks (run before macrotasks)
   - process.nextTick can starve the event loop if used excessively

3. setTimeout vs setImmediate:
   - Outside I/O: Order is non-deterministic
   - Inside I/O: setImmediate ALWAYS runs first
   - setTimeout goes to Timer phase
   - setImmediate goes to Check phase

4. Microtasks vs Macrotasks:
   - Microtasks: process.nextTick, Promises
   - Macrotasks: setTimeout, setImmediate, I/O
   - ALL microtasks run before ANY macrotask

5. Important Rules:
   - Microtasks are processed after EACH phase
   - Macrotasks are processed ONE per phase per iteration
   - Nested callbacks follow the same priority rules
`);

// ===== Final Example: Complete Flow =====
console.log("\n=== Final Example: Complete Flow ===\n");

console.log("┌─ SYNCHRONOUS CODE ─────────────────┐");
console.log("│ [1] Start                         │");

setTimeout(() => {
  console.log("│ [TIMER] setTimeout                │");
}, 0);

setImmediate(() => {
  console.log("│ [CHECK] setImmediate              │");
});

process.nextTick(() => {
  console.log("│ [NEXTTICK] process.nextTick       │");
});

Promise.resolve().then(() => {
  console.log("│ [PROMISE] Promise.resolve         │");
});

console.log("│ [1] End                           │");
console.log("└────────────────────────────────────┘");
console.log("\n┌─ MICROTASKS (After sync) ──────────┐");
console.log("└────────────────────────────────────┘");
console.log("\n┌─ MACROTASKS (Event loop phases) ───┐");
console.log("└────────────────────────────────────┘");

