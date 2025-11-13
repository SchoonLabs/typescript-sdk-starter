# TypeScript SDK Starter

[![CI](https://github.com/yourusername/typescript-sdk-starter/workflows/CI/badge.svg)](https://github.com/yourusername/typescript-sdk-starter/actions)
[![npm version](https://badge.fury.io/js/typescript-sdk-starter.svg)](https://www.npmjs.com/package/typescript-sdk-starter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, lightweight TypeScript SDK starter template with all the best practices. Use this as a foundation for building your own TypeScript SDKs and libraries.

## Features

- 📦 [tsup](https://github.com/egoist/tsup) for fast, zero-config bundling
- ⚡️ [Vitest](https://vitest.dev/) for blazing fast testing with coverage support
- 📝 TypeScript strict mode enabled
- 🔨 ESLint + Prettier for code quality and formatting
- 📋 Example usage included
- 🚀 GitHub Actions CI with multi-Node version testing
- 📦 pnpm for fast, efficient package management
- 🎯 Dual package support (ESM + CommonJS)
- 🌳 Tree-shakeable with proper `sideEffects` configuration
- ✅ Build verification to ensure all outputs are generated

## Using This Template

1. **Click "Use this template"** button on GitHub or clone this repo
2. **Find and replace** `typescript-sdk-starter` with your package name
3. **Update** `package.json`:
   - Change `name`, `description`, `author`, `repository`, `bugs`, and `homepage`
   - Update `keywords` to match your SDK's purpose
4. **Replace** the example code in `src/index.ts` with your SDK implementation
5. **Update** this README with your SDK's documentation
6. **Remove** or update the example in `examples/basic.ts`
7. **Write tests** in `tests/` directory

## Quick Start

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build
pnpm build

# Development mode (watch)
pnpm dev

# Type check
pnpm typecheck

# Lint
pnpm lint

# Format code
pnpm format
```

## Installation

Once published, users can install your SDK:

```bash
# npm
npm install typescript-sdk-starter

# pnpm
pnpm add typescript-sdk-starter

# yarn
yarn add typescript-sdk-starter
```

## Usage

### Basic Usage

```typescript
import { SDK } from 'typescript-sdk-starter';

// Initialize with configuration
const sdk = new SDK({
  apiKey: 'your-api-key',
  baseURL: 'https://api.example.com', // optional
  timeout: 5000, // optional, in milliseconds
});

// Fetch a user
const user = await sdk.getUser(1);
console.log(user);

// List all users
const users = await sdk.listUsers();

// Create a new user
const newUser = await sdk.createUser({
  name: 'Jane Doe',
  email: 'jane@example.com',
});

// Update a user
await sdk.updateUser(1, { name: 'Updated Name' });

// Delete a user
await sdk.deleteUser(1);
```

### Error Handling

```typescript
import { SDK, SDKError } from 'typescript-sdk-starter';

try {
  const user = await sdk.getUser(999);
} catch (error) {
  if (error instanceof SDKError) {
    console.error('SDK Error:', error.code, error.message);
    if (error.statusCode) {
      console.error('HTTP Status:', error.statusCode);
    }
  }
}
```

### ESM and CommonJS

```javascript
// ESM
import { SDK } from 'typescript-sdk-starter';

// CommonJS
const { SDK } = require('typescript-sdk-starter');
```

### Running Examples

```bash
# Basic example
pnpm tsx examples/basic.ts

# Advanced example with error handling
pnpm tsx examples/advanced.ts
```

## API Documentation

### `SDK`

Main SDK class for managing API interactions.

#### Constructor

```typescript
new SDK(config: SDKConfig)
```

**Parameters:**
- `config.apiKey` (string, required): Your API key for authentication
- `config.baseURL` (string, optional): Base URL for API requests
- `config.timeout` (number, optional): Request timeout in milliseconds (default: 5000)
- `config.headers` (object, optional): Custom headers to include in all requests

#### Methods

##### `getConfig(): SDKConfig`

Returns the current SDK configuration.

##### `getUser(id: number): Promise<User>`

Fetches a user by ID.

##### `listUsers(): Promise<User[]>`

Fetches all users.

##### `createUser(user: Omit<User, 'id'>): Promise<User>`

Creates a new user.

##### `updateUser(id: number, user: Partial<User>): Promise<User>`

Updates an existing user.

##### `deleteUser(id: number): Promise<void>`

Deletes a user by ID.

### `SDKError`

Custom error class for SDK-related errors.

**Properties:**
- `message` (string): Error message
- `code` (string): Error code (e.g., 'API_ERROR', 'TIMEOUT', 'NETWORK_ERROR')
- `statusCode` (number, optional): HTTP status code when applicable

### Types

#### `User`

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
}
```

#### `APIResponse<T>`

```typescript
interface APIResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}
```

## Development

### Project Structure

```
typescript-sdk-starter/
├── src/              # Source code
│   └── index.ts      # Main entry point
├── tests/            # Test files (mirrors src/ structure)
│   └── index.test.ts
├── examples/         # Usage examples
│   ├── basic.ts      # Simple usage
│   └── advanced.ts   # Error handling & config
├── dist/             # Build output (auto-generated)
└── coverage/         # Coverage reports (auto-generated)
```

### Scripts

- `pnpm build` - Build for production (CJS + ESM + type definitions)
- `pnpm dev` - Build in watch mode
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm typecheck` - Check TypeScript types
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Fix lint issues automatically
- `pnpm format` - Format code with Prettier
- `pnpm clean` - Remove build output

### Adding Dependencies

```bash
# Runtime dependencies
pnpm add package-name

# Development dependencies
pnpm add -D package-name
```

## Publishing Your SDK

1. **Update version** in `package.json` (follow [semver](https://semver.org/))
2. **Build and test**:
   ```bash
   pnpm clean
   pnpm build
   pnpm test
   pnpm typecheck
   pnpm lint
   ```
3. **Publish to npm**:
   ```bash
   npm publish
   ```

> **Note:** The `prepublishOnly` script automatically runs the build before publishing.

### Publishing Checklist

- [ ] All tests passing
- [ ] Types are correct (`pnpm typecheck`)
- [ ] Code is linted and formatted
- [ ] Version bumped appropriately
- [ ] CHANGELOG updated (if you're maintaining one)
- [ ] README documentation is up to date
- [ ] Examples work with the new version

## Configuration Files

- `.prettierrc.json` - Prettier formatting rules
- `tsconfig.json` - TypeScript compiler options
- `tsup.config.ts` - Build configuration
- `vitest.config.ts` - Test configuration
- `eslint.config.js` - Linting rules
- `.npmignore` - Files to exclude from npm package

## Troubleshooting

### Build Issues

**Problem:** Build fails with module errors

```bash
# Clear cache and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

**Problem:** Types not being generated

- Check `tsconfig.json` has `"declaration": true`
- Check `tsup.config.ts` has `dts: true`

### Test Issues

**Problem:** Tests fail to import modules

- Ensure Vitest configuration matches your TypeScript setup
- Check that test files have `.test.ts` extension

### Import Issues for Consumers

**Problem:** "Cannot find module" errors

- Verify `exports` field in `package.json` is correct
- Ensure both `dist/index.js` (ESM) and `dist/index.cjs` exist after build
- Check that `types` field points to correct `.d.ts` file

## Requirements

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## License

MIT © [Dan Schoonmaker](mailto:dan@schoonlabs.com)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Related

- [tsup](https://github.com/egoist/tsup) - Bundle TypeScript libraries
- [Vitest](https://vitest.dev/) - Fast unit testing
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
