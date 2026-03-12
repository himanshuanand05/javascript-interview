/**
 * Minimum iterations to make array median equal to k.
 * - One operation = increase or decrease one element by 1.
 * - For even length, median = higher of the two middle values (index n/2 when sorted).
 *
 * @param {number[]} arr - Array of positive integers
 * @param {number} k - Target median value
 * @returns {number} Minimum number of operations (iterations)
 */
function iterationsToMedianK(arr, k) {
  if (arr.length === 0) return 0;

  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const mid = Math.floor(n / 2); // median index (upper median for even n)

  let operations = 0;

  // 1. Make the element at median position equal to k
  operations += Math.abs(sorted[mid] - k);

  // 2. All elements before median (indices 0..mid-1) must be <= k
  //    Otherwise the median wouldn't be k when sorted
  for (let i = 0; i < mid; i++) {
    if (sorted[i] > k) {
      operations += sorted[i] - k;
    }
  }

  // 3. All elements after median (indices mid+1..n-1) must be >= k
  for (let i = mid + 1; i < n; i++) {
    if (sorted[i] < k) {
      operations += k - sorted[i];
    }
  }

  return operations;
}

// ---------------------------------------------------------------------------
// Examples / tests
// ---------------------------------------------------------------------------

console.log(iterationsToMedianK([1, 2, 3, 4, 5], 3)); // 0 (median already 3)
console.log(iterationsToMedianK([1, 2, 4, 5], 3));    // 1 (change 4→3)
console.log(iterationsToMedianK([1, 2, 2, 4], 3));    // 1 (change one 2→3)
console.log(iterationsToMedianK([5, 5, 5, 5], 3));   // 6 (one 5→3, two 5→3 for left half)
console.log(iterationsToMedianK([1, 1, 1, 10], 5));  // 4 (median 1→5; left/right already valid)
console.log(iterationsToMedianK([2, 4, 6, 8], 5));   // median index 2, value 6→5 cost 1; left 2,4 <=5 ok; right 8>=5 ok. Total 1.
