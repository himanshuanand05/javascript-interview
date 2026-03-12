/**
 * Container With Most Water (Max Area of Water)
 * 
 * Problem Statement:
 * You are given an integer array height of length n. There are n vertical lines 
 * drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * 
 * Find two lines that together with the x-axis form a container, such that the 
 * container contains the most water.
 * 
 * Return the maximum amount of water a container can store.
 * 
 * Notice that you may not slant the container.
 * 
 * Example:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * 
 * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. 
 * In this case, the max area of water (blue section) the container can contain is 49.
 * 
 * Visual representation:
 * 
 *        |
 *        |     |           |
 *        |     |     |     |
 *    |   |     |     |  |  |
 *    |   |  |  |  |  |  |  |
 *    |   |  |  |  |  |  |  |
 *    1   8  6  2  5  4  8  3  7
 * 
 * The maximum area is between indices 1 (height 8) and 8 (height 7):
 * width = 8 - 1 = 7
 * height = min(8, 7) = 7
 * area = 7 * 7 = 49
 */

// ===== Problem Statement =====
console.log("=== Container With Most Water ===");
console.log("\nInput: height = [1,8,6,2,5,4,8,3,7]");
console.log("Expected Output: 49");

const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];

// ===== Brute Force Solution: O(n²) =====
console.log("\n=== Brute Force Solution: O(n²) ===");

function maxAreaBruteForce(height) {
  let maxArea = 0;
  const n = height.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Calculate area between lines i and j
      const width = j - i;
      const containerHeight = Math.min(height[i], height[j]);
      const area = width * containerHeight;
      maxArea = Math.max(maxArea, area);
    }
  }
  
  return maxArea;
}

const bruteForceResult = maxAreaBruteForce(height);
console.log("Result:", bruteForceResult);
console.log("Time Complexity: O(n²)");
console.log("Space Complexity: O(1)");

// ===== Optimized Solution: Two Pointers O(n) =====
console.log("\n=== Optimized Solution: Two Pointers O(n) ===");

function maxArea(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;
  
  while (left < right) {
    // Calculate current area
    const width = right - left;
    const containerHeight = Math.min(height[left], height[right]);
    const area = width * containerHeight;
    maxArea = Math.max(maxArea, area);
    
    // Move the pointer with the smaller height
    // This is because if we move the pointer with larger height,
    // the area can only decrease (width decreases, height stays same or decreases)
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}

const optimizedResult = maxArea(height);
console.log("Result:", optimizedResult);
console.log("Time Complexity: O(n)");
console.log("Space Complexity: O(1)");

// ===== Detailed Step-by-Step Explanation =====
console.log("\n=== Step-by-Step Execution ===");

function maxAreaWithSteps(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;
  let step = 1;
  
  console.log(`Initial: left=${left} (height=${height[left]}), right=${right} (height=${height[right]})`);
  
  while (left < right) {
    const width = right - left;
    const containerHeight = Math.min(height[left], height[right]);
    const area = width * containerHeight;
    
    console.log(`\nStep ${step}:`);
    console.log(`  Left: index ${left}, height ${height[left]}`);
    console.log(`  Right: index ${right}, height ${height[right]}`);
    console.log(`  Width: ${right} - ${left} = ${width}`);
    console.log(`  Container Height: min(${height[left]}, ${height[right]}) = ${containerHeight}`);
    console.log(`  Area: ${width} × ${containerHeight} = ${area}`);
    console.log(`  Max Area so far: ${Math.max(maxArea, area)}`);
    
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      console.log(`  Move left pointer (${height[left]} < ${height[right]})`);
      left++;
    } else {
      console.log(`  Move right pointer (${height[left]} >= ${height[right]})`);
      right--;
    }
    
    step++;
  }
  
  return maxArea;
}

console.log("\nDetailed execution for [1,8,6,2,5,4,8,3,7]:");
maxAreaWithSteps([...height]);  // Use copy to avoid modifying original

// ===== Why Two Pointers Works =====
console.log("\n=== Why Two Pointers Algorithm Works ===");
console.log(`
Key Insight:
When we have two pointers at left and right positions:
- Current area = (right - left) × min(height[left], height[right])

If height[left] < height[right]:
- If we move right pointer left: width decreases, height ≤ min(left, right)
  → Area can only decrease
- If we move left pointer right: width decreases, but height might increase
  → Area might increase

Therefore, we should always move the pointer with the smaller height,
because moving the larger height pointer can never lead to a better solution.
`);

// ===== Visual Representation =====
console.log("=== Visual Representation ===");
console.log(`
Input: [1, 8, 6, 2, 5, 4, 8, 3, 7]

Visual:
        |
        |     |           |
        |     |     |     |
    |   |     |     |  |  |
    |   |  |  |  |  |  |  |
    |   |  |  |  |  |  |  |
    0   1  2  3  4  5  6  7  8  (indices)
    1   8  6  2  5  4  8  3  7  (heights)

Maximum area: between indices 1 (height 8) and 8 (height 7)
Width = 8 - 1 = 7
Height = min(8, 7) = 7
Area = 7 × 7 = 49
`);

// ===== Edge Cases =====
console.log("=== Edge Cases ===");

// Edge case 1: Two elements
const edgeCase1 = [1, 1];
console.log(`\nEdge case 1: [1, 1]`);
console.log(`Result: ${maxArea(edgeCase1)}`);  // 1

// Edge case 2: All same height
const edgeCase2 = [5, 5, 5, 5];
console.log(`\nEdge case 2: [5, 5, 5, 5] (all same)`);
console.log(`Result: ${maxArea(edgeCase2)}`);  // 15 (width 3 × height 5)

// Edge case 3: Ascending heights
const edgeCase3 = [1, 2, 3, 4, 5];
console.log(`\nEdge case 3: [1, 2, 3, 4, 5] (ascending)`);
console.log(`Result: ${maxArea(edgeCase3)}`);  // 6 (indices 0 and 4)

// Edge case 4: Descending heights
const edgeCase4 = [5, 4, 3, 2, 1];
console.log(`\nEdge case 4: [5, 4, 3, 2, 1] (descending)`);
console.log(`Result: ${maxArea(edgeCase4)}`);  // 6 (indices 0 and 4)

// Edge case 5: Single peak in middle
const edgeCase5 = [1, 2, 1];
console.log(`\nEdge case 5: [1, 2, 1] (peak in middle)`);
console.log(`Result: ${maxArea(edgeCase5)}`);  // 2

// ===== Test Cases =====
console.log("\n=== Test Cases ===");

const testCases = [
  { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
  { input: [1, 1], expected: 1 },
  { input: [1, 2, 1], expected: 2 },
  { input: [4, 3, 2, 1, 4], expected: 16 },
  { input: [1, 2, 4, 3], expected: 4 },
];

testCases.forEach((testCase, index) => {
  const result = maxArea(testCase.input);
  const passed = result === testCase.expected;
  console.log(`\nTest ${index + 1}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Input: [${testCase.input.join(',')}]`);
  console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
});

// ===== Performance Comparison =====
console.log("\n=== Performance Comparison ===");

// Generate a larger array for performance testing
const largeArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100));

console.log("Testing with array of length 10000:");

// Brute force (commented out for large arrays - too slow)
// console.time("Brute Force");
// const bfResult = maxAreaBruteForce(largeArray);
// console.timeEnd("Brute Force");
// console.log("Result:", bfResult);

console.time("Two Pointers O(n)");
const optResult = maxArea(largeArray);
console.timeEnd("Two Pointers O(n)");
console.log("Result:", optResult);

// ===== Alternative Approaches =====
console.log("\n=== Alternative Approaches ===");

// Approach 2: Using for loop with two pointers (same complexity)
function maxAreaAlternative(height) {
  let maxArea = 0;
  
  for (let i = 0, j = height.length - 1; i < j;) {
    const area = (j - i) * Math.min(height[i], height[j]);
    maxArea = Math.max(maxArea, area);
    height[i] < height[j] ? i++ : j--;
  }
  
  return maxArea;
}

console.log("Alternative implementation (for loop):");
console.log("Result:", maxAreaAlternative([...height]));

// ===== Key Takeaways =====
console.log("\n=== Key Takeaways ===");
console.log(`
1. Problem Type: Two Pointer / Greedy Algorithm
2. Time Complexity: 
   - Brute Force: O(n²)
   - Optimized: O(n)
3. Space Complexity: O(1) for both approaches
4. Key Insight: Always move the pointer with smaller height
5. Why it works: Moving the larger height pointer can never increase the area
6. Common Interview Question: Frequently asked in technical interviews
`);

// ===== Final Result =====
console.log("\n=== Final Result ===");
console.log(`Input: [${height.join(',')}]`);
console.log(`Output: ${maxArea(height)}`);
console.log("\n✅ Maximum water that can be contained: " + maxArea(height));

