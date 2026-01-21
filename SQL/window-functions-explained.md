# Window Functions in SQL (practical guide)

Window functions compute values over a set of rows **related to the current row** (the “window”) without collapsing rows like `GROUP BY` does.

---

## Core syntax
```sql
<function>() OVER (
  [PARTITION BY <columns>]
  [ORDER BY <columns>]
  [frame_clause]
)
```
- `PARTITION BY` defines the window groups.
- `ORDER BY` defines ordering inside each partition (required for ranking/windowed aggregates that depend on order).
- `frame_clause` (e.g., `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`) controls which rows are included; many functions have sensible defaults.

---

## Example dataset
Assume `sales`:

| id | salesperson | region | month | amount |
|---:|-------------|--------|-------|-------:|
| 1  | Ana         | East   | Jan   | 12000  |
| 2  | Ben         | East   | Jan   | 15000  |
| 3  | Ana         | East   | Feb   | 18000  |
| 4  | Cal         | West   | Jan   | 20000  |
| 5  | Cal         | West   | Feb   | 22000  |
| 6  | Dee         | East   | Feb   | 17000  |

---

## Ranking functions
- `ROW_NUMBER()` — strict sequence; no ties.
- `RANK()` — ties share the same rank; gaps after ties.
- `DENSE_RANK()` — ties share rank; no gaps.

Example: rank sales within each region by amount:
```sql
SELECT
  salesperson,
  region,
  month,
  amount,
  RANK()       OVER (PARTITION BY region ORDER BY amount DESC) AS rnk,
  DENSE_RANK() OVER (PARTITION BY region ORDER BY amount DESC) AS dense_rnk,
  ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS row_num
FROM sales;
```

Use case: pick top-1 per region:
```sql
SELECT *
FROM (
  SELECT
    s.*,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS rn
  FROM sales s
) x
WHERE rn = 1;
```

---

## Running totals / moving averages
Running total by region ordered by month:
```sql
SELECT
  region,
  month,
  amount,
  SUM(amount) OVER (
    PARTITION BY region
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM sales;
```

Moving 2-row average by region:
```sql
SELECT
  region,
  month,
  amount,
  AVG(amount) OVER (
    PARTITION BY region
    ORDER BY month
    ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
  ) AS moving_avg_2
FROM sales;
```

---

## Percentiles and distribution
Common functions: `PERCENT_RANK()`, `CUME_DIST()`, `NTILE(n)`.

Quartiles by amount within region:
```sql
SELECT
  salesperson,
  region,
  amount,
  NTILE(4) OVER (PARTITION BY region ORDER BY amount) AS quartile
FROM sales;
```

---

## LAG/LEAD for “previous/next” row values
Difference from previous month within each region:
```sql
SELECT
  region,
  month,
  amount,
  LAG(amount) OVER (PARTITION BY region ORDER BY month) AS prev_amount,
  amount - LAG(amount) OVER (PARTITION BY region ORDER BY month) AS delta_vs_prev
FROM sales;
```

`LEAD()` is the same idea but looks forward.

---

## Windowed aggregates vs `GROUP BY`
- `GROUP BY` collapses rows.
- Windowed aggregates keep each row and add aggregate info.

Example: show each sale plus total per region:
```sql
SELECT
  salesperson,
  region,
  month,
  amount,
  SUM(amount) OVER (PARTITION BY region) AS region_total
FROM sales;
```

---

## Default frames (why they matter)
For ordered windowed aggregates, many databases default to:
- `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`

That can behave differently than `ROWS` when there are ties. If you need row-precise control, specify `ROWS BETWEEN ...`.

---

## Performance hints
- Index the columns in `PARTITION BY` / `ORDER BY` when possible.
- Narrow the row set first (`WHERE`) before windowing.
- Avoid overly wide `SELECT *` in subqueries feeding window functions.

---

## Dialect notes
- Most modern RDBMS support these: PostgreSQL, SQL Server, Oracle, MySQL 8+, MariaDB 10.2+, SQLite 3.25+.
- Older MySQL (<8) and some older SQLite builds lack window functions.


