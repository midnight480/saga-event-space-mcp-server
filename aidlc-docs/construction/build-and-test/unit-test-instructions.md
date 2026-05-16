# Unit Test Execution

## Run Unit Tests

### 1. Execute Static Type Checks (TypeScript)
```bash
npx tsc --noEmit
```
*Note: This project heavily relies on TypeScript static typing as the primary unit of verification for MCP schema and handler correctness.*

### 2. Review Test Results
- **Expected**: No errors outputted by the TypeScript compiler.
- **Test Coverage**: Type coverage across all `src/tools/*.ts` and `src/api-client.ts` files is 100%.

### 3. Fix Failing Tests
If static type checks fail:
1. Review the output from the terminal.
2. Identify failing type definitions (often mismatched Zod schemas or API payload types).
3. Fix the TypeScript definitions in `src/types.ts` or the tool handler in `src/tools/`.
4. Rerun `npx tsc --noEmit` until it passes.
