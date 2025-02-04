# TypeScript SDK Starter

A modern, lightweight TypeScript SDK starter template with all the best practices.

## Features

- 📦 [tsup](https://github.com/egoist/tsup) for bundling
- ⚡️ [Vitest](https://vitest.dev/) for testing
- 📝 TypeScript strict mode
- 🔨 ESLint + Prettier
- 📋 Example usage
- 🚀 GitHub Actions CI
- 📦 pnpm for fast, efficient package management

## Quick Start

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Development mode
pnpm dev
```

## Usage

```typescript
import { greet, SDK } from 'typescript-sdk-starter';

// Basic greeting
console.log(greet({ name: 'World' }));
// => "Hello, World"

// SDK usage
const sdk = new SDK('my-api-key');
console.log(sdk.getApiKey());
// => "my-api-key"
```

## Scripts

- `pnpm build` - Build for production
- `pnpm dev` - Build in watch mode
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm typecheck` - Check types
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Fix lint issues
- `pnpm format` - Format code

## License

MIT
