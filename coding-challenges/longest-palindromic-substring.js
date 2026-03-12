/**
 * Longest Palindromic Substring
 * 
 * Problem: Given a string s, return the longest palindromic substring in s.
 * 
 * A palindrome is a string that reads the same forwards and backwards.
 * Examples: "aba", "racecar", "aa", "a"
 * 
 * Example 1:
 * Input: s = "babad"
 * Output: "bab" or "aba" (both are valid)
 * 
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 * 
 * Example 3:
 * Input: s = "a"
 * Output: "a"
 */

// ===== Approach 1: Expand Around Centers (O(n²)) - RECOMMENDED =====
// For each position, expand outward to find the longest palindrome
// Handle both odd-length (center at char) and even-length (center between chars) palindromes
function longestPalindrome(s) {
  if (!s || s.length === 0) return '';
  if (s.length === 1) return s;

  let start = 0;
  let maxLen = 1;

  // Helper function to expand around a center
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // Return the length of the palindrome found
    // Note: left and right are now outside the palindrome, so length is (right - left - 1)
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // Check for odd-length palindromes (center at i)
    const len1 = expandAroundCenter(i, i);
    
    // Check for even-length palindromes (center between i and i+1)
    const len2 = expandAroundCenter(i, i + 1);
    
    // Get the maximum length palindrome centered at i
    const len = Math.max(len1, len2);
    
    // Update the longest palindrome if we found a longer one
    if (len > maxLen) {
      maxLen = len;
      // Calculate the start position
      // For odd: start = i - (len - 1) / 2
      // For even: start = i - (len / 2 - 1)
      // Simplified: start = i - Math.floor((len - 1) / 2)
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLen);
}

// ===== Approach 2: Dynamic Programming (O(n²) time, O(n²) space) =====
// dp[i][j] = true if substring s[i...j] is a palindrome
function longestPalindromeDP(s) {
  if (!s || s.length === 0) return '';
  if (s.length === 1) return s;

  const n = s.length;
  const dp = Array(n).fill(null).map(() => Array(n).fill(false));
  
  let start = 0;
  let maxLen = 1;

  // Every single character is a palindrome
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Check for palindromes of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }

  // Check for palindromes of length 3 and more
  // len is the length of substring we're checking
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1; // ending index
      
      // s[i...j] is palindrome if:
      // 1. s[i] === s[j] (first and last chars match)
      // 2. s[i+1...j-1] is palindrome (inner substring is palindrome)
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        start = i;
        maxLen = len;
      }
    }
  }

  return s.substring(start, start + maxLen);
}

// ===== Approach 3: Manacher's Algorithm (O(n)) - Most Efficient =====
// Advanced algorithm using symmetry properties
// More complex but optimal time complexity
function longestPalindromeManacher(s) {
  if (!s || s.length === 0) return '';
  if (s.length === 1) return s;

  // Transform string: "abc" -> "^#a#b#c#$"
  // This handles both odd and even length palindromes uniformly
  const transformed = '^#' + s.split('').join('#') + '#$';
  const n = transformed.length;
  const P = Array(n).fill(0); // P[i] = length of palindrome centered at i
  
  let center = 0;
  let right = 0;
  let maxLen = 0;
  let centerIndex = 0;

  for (let i = 1; i < n - 1; i++) {
    // Use symmetry if we're within the current right boundary
    if (i < right) {
      const mirror = 2 * center - i;
      P[i] = Math.min(right - i, P[mirror]);
    }

    // Try to expand palindrome centered at i
    while (transformed[i + (1 + P[i])] === transformed[i - (1 + P[i])]) {
      P[i]++;
    }

    // Update center and right if we've extended beyond right
    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }

    // Update maximum palindrome
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }

  // Extract the palindrome from original string
  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

// ===== Test Cases =====
console.log('=== Longest Palindromic Substring ===\n');

const testCases = [
  'babad',
  'cbbd',
  'a',
  'racecar',
  'noon',
  'abcdef',
  'aabbaa',
  'abacaba',
  '',
];

console.log('--- Approach 1: Expand Around Centers (O(n²)) - RECOMMENDED ---');
testCases.forEach(s => {
  if (s === '') {
    console.log(`Input: ""`);
    console.log(`Output: "${longestPalindrome(s)}"`);
  } else {
    console.log(`Input: "${s}"`);
    console.log(`Output: "${longestPalindrome(s)}"`);
  }
  console.log('');
});

console.log('\n--- Approach 2: Dynamic Programming (O(n²) time, O(n²) space) ---');
testCases.forEach(s => {
  if (s === '') {
    console.log(`Input: ""`);
    console.log(`Output: "${longestPalindromeDP(s)}"`);
  } else {
    console.log(`Input: "${s}"`);
    console.log(`Output: "${longestPalindromeDP(s)}"`);
  }
  console.log('');
});

console.log('\n--- Approach 3: Manacher\'s Algorithm (O(n)) - Most Efficient ---');
testCases.forEach(s => {
  if (s === '') {
    console.log(`Input: ""`);
    console.log(`Output: "${longestPalindromeManacher(s)}"`);
  } else {
    console.log(`Input: "${s}"`);
    console.log(`Output: "${longestPalindromeManacher(s)}"`);
  }
  console.log('');
});

// ===== Performance Comparison =====
console.log('\n=== Performance Comparison ===');
console.log('For interview purposes, Approach 1 (Expand Around Centers) is recommended:');
console.log('- Time: O(n²)');
console.log('- Space: O(1)');
console.log('- Easy to understand and implement');
console.log('- Good balance between complexity and efficiency\n');

console.log('For production with very long strings, consider Manacher\'s Algorithm:');
console.log('- Time: O(n)');
console.log('- Space: O(n)');
console.log('- More complex but optimal\n');

// Export the recommended function
module.exports = longestPalindrome;

