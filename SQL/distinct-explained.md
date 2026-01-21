# `DISTINCT` in SQL (with examples)

## What `DISTINCT` does
`DISTINCT` removes duplicate **rows** from the result set, based on the columns you select.

- If you select **one** column, it returns unique values of that column.
- If you select **multiple** columns, it returns unique **combinations** of those columns.

---

## Example dataset
Assume a table `employees` like:

| id | name | department | title    | salary |
|---:|------|------------|----------|-------:|
| 1  | Ana  | Sales      | Rep      |  70000 |
| 2  | Ben  | Sales      | Rep      |  70000 |
| 3  | Cal  | Sales      | Manager  | 120000 |
| 4  | Dee  | Eng        | Dev      | 130000 |
| 5  | Eli  | Eng        | Dev      | 130000 |
| 6  | Fox  | Eng        | Manager  | 150000 |
| 7  | Gia  | HR         | NULL     |  80000 |
| 8  | Hal  | HR         | NULL     |  90000 |

---

## 1) `DISTINCT` on a single column
Unique departments:

```sql
SELECT DISTINCT department
FROM employees;
```

Result:

| department |
|------------|
| Sales      |
| Eng        |
| HR         |

---

## 2) `DISTINCT` on multiple columns (unique combinations)
Unique (department, title) pairs:

```sql
SELECT DISTINCT department, title
FROM employees;
```

Result:

| department | title   |
|------------|---------|
| Sales      | Rep     |
| Sales      | Manager |
| Eng        | Dev     |
| Eng        | Manager |
| HR         | NULL    |

**Key idea:** duplicates are removed based on the *whole selected row*, not each column independently.

---

## 3) The common gotcha: adding columns can “re-introduce duplicates”
This might surprise people:

```sql
-- Unique departments
SELECT DISTINCT department
FROM employees;
```

But:

```sql
-- Not "unique departments" anymore; now it's unique (department, name)
SELECT DISTINCT department, name
FROM employees;
```

You’ll get multiple rows per department because the `(department, name)` combinations are unique.

---

## 4) `COUNT(DISTINCT ...)` (count unique values)
How many distinct departments exist?

```sql
SELECT COUNT(DISTINCT department) AS dept_count
FROM employees;
```

Result:

| dept_count |
|-----------:|
| 3          |

### Multi-column distinct counts (dialect differences)
- **PostgreSQL**:

```sql
SELECT COUNT(DISTINCT (department, title)) AS dept_title_pairs
FROM employees;
```

- **MySQL**:

```sql
SELECT COUNT(DISTINCT department, title) AS dept_title_pairs
FROM employees;
```

- **SQL Server**: usually done via a subquery:

```sql
SELECT COUNT(*) AS dept_title_pairs
FROM (
  SELECT DISTINCT department, title
  FROM employees
) x;
```

---

## 5) `DISTINCT` and `NULL`
Most SQL engines treat `NULL` values as equal **for distinctness**.

So:

```sql
SELECT DISTINCT title
FROM employees
WHERE department = 'HR';
```

Result includes only one `NULL` even if many rows have `NULL` for `title`.

---

## 6) `DISTINCT` vs `GROUP BY`
These are often equivalent:

```sql
SELECT DISTINCT department
FROM employees;
```

```sql
SELECT department
FROM employees
GROUP BY department;
```

Use:
- `DISTINCT` when you just want de-duplicated rows.
- `GROUP BY` when you also need aggregates (`COUNT`, `MAX`, etc.).

---

## 7) Where it fits in query order (mental model)
Conceptually, SQL runs like:

1. `FROM` / `JOIN`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT` (compute expressions)
6. `DISTINCT` (remove duplicate selected rows)
7. `ORDER BY`
8. `LIMIT` / `OFFSET`

---

## 8) Practical tip: de-dupe one column but still show other columns
If you need “one row per department” but also want extra columns, `DISTINCT` alone won’t pick which row you want.

### Option A: pick a rule with `GROUP BY` + aggregates

```sql
SELECT
  department,
  MAX(salary) AS max_salary_in_dept
FROM employees
GROUP BY department;
```

### Option B: pick a specific row with a window function
(Example: highest-paid employee per department)

```sql
SELECT department, name, salary
FROM (
  SELECT
    e.*,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees e
) x
WHERE rn = 1;
```


