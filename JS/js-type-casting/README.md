# JS type casting (conversion & coercion)

This folder contains **one file per JavaScript data type**, with examples showing how values behave under common casting / coercion paths:

- `String(value)` / `value + ""`
- `Number(value)` / unary `+value`
- `Boolean(value)` / `!!value`
- `BigInt(value)` (where applicable)
- Common gotchas with `==` vs `===`

Files are meant to be **readable notes** with **runnable snippets** (use Node or browser console).

## Core coercion rules (high level)

- **ToBoolean (truthiness):** only these are falsy → `false`, `0`, `-0`, `0n`, `NaN`, `""`, `null`, `undefined`. Everything else is truthy.
- **ToNumber (Number(x) / +x):**
  - `null → 0`, `true → 1`, `false → 0`
  - `""` and whitespace-only strings → `0`
  - Non‑numeric strings → `NaN`
  - Objects/arrays → first `ToPrimitive` (usually `valueOf`/`toString`), then the result is converted to number.
- **ToString (String(x) / x + "" / template literals):**
  - `null → "null"`, `undefined → "undefined"`, booleans and numbers get their textual form.
  - Objects/arrays → usually call `.toString()` (e.g. `[1,2] → "1,2"`).
- **Abstract equality `==` (very simplified):**
  - If types are **same** → behave like `===` (no coercion).
  - If one side is **boolean** → convert it to number, then compare.
  - If one is **string** and the other is **number** → convert the string to number.
  - `null` only loosely-equals `undefined` (and nothing else).
  - Prefer `===` in real code to avoid surprises; use these rules to understand interview puzzles.

