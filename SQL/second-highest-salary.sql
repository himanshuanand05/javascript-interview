/**
 * Problem: Find Second Highest Salary
 * 
 * Issue: When table has records with same salary (e.g., 2 records both with salary 100),
 * the query still returns a value instead of NULL, because there's no distinct second highest salary.
 * 
 * Original Query (has bug):
 * SELECT (SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary
 */

-- ===== Solution 1: Using DISTINCT (Recommended) =====
-- This ensures we only consider unique salary values
SELECT (
    SELECT DISTINCT salary 
    FROM Employee 
    ORDER BY salary DESC 
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;

-- ===== Solution 2: Using DENSE_RANK() Window Function =====
-- More explicit and handles ties better
SELECT (
    SELECT salary
    FROM (
        SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
        FROM Employee
    ) ranked
    WHERE rnk = 2
    LIMIT 1
) AS SecondHighestSalary;

-- ===== Solution 3: Using MAX with subquery condition =====
-- Ensures the second highest is actually different from the highest
SELECT (
    SELECT MAX(salary)
    FROM Employee
    WHERE salary < (SELECT MAX(salary) FROM Employee)
) AS SecondHighestSalary;

-- ===== Solution 4: Using ROW_NUMBER() with DISTINCT =====
SELECT (
    SELECT salary
    FROM (
        SELECT DISTINCT salary,
               ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
        FROM Employee
    ) ranked
    WHERE rn = 2
) AS SecondHighestSalary;

/**
 * Test Cases:
 * 
 * Case 1: Table with distinct salaries
 * Employee table:
 *   id | salary
 *   1  | 300
 *   2  | 200
 *   3  | 100
 * Expected: 200 ✓
 * 
 * Case 2: Table with duplicate salaries (2 records, same salary)
 * Employee table:
 *   id | salary
 *   1  | 300
 *   2  | 300
 * Expected: NULL ✓ (because there's no distinct second highest)
 * 
 * Case 3: Table with multiple duplicates
 * Employee table:
 *   id | salary
 *   1  | 300
 *   2  | 300
 *   3  | 200
 *   4  | 200
 * Expected: 200 ✓ (second distinct highest)
 * 
 * Case 4: Single record
 * Employee table:
 *   id | salary
 *   1  | 300
 * Expected: NULL ✓
 * 
 * Case 5: All records have same salary (multiple)
 * Employee table:
 *   id | salary
 *   1  | 300
 *   2  | 300
 *   3  | 300
 * Expected: NULL ✓
 */

/**
 * Why Solution 1 (DISTINCT) is the best fix for your query:
 * 
 * Your original query:
 *   SELECT (SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary
 * 
 * Problem: If all employees have the same salary, OFFSET 1 still returns that same salary.
 * 
 * Fixed query:
 *   SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary
 * 
 * How it works:
 * - DISTINCT ensures we only consider unique salary values
 * - ORDER BY salary DESC sorts unique salaries in descending order
 * - LIMIT 1 OFFSET 1 skips the first (highest) and gets the second
 * - If there's only one distinct salary, OFFSET 1 returns nothing, and the subquery returns NULL
 * 
 * This is the minimal change to your existing query and solves the problem!
 */




