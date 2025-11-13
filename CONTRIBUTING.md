# Contributing to TypeScript SDK Starter

Thank you for your interest in contributing! This document provides guidelines for developing and customizing this SDK starter template.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

If you're using `nvm` or `fnm`, the `.node-version` file will automatically select the correct Node version.

### Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/typescript-sdk-starter.git
   cd typescript-sdk-starter
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run tests to verify setup:

   ```bash
   pnpm test
   ```

4. Build the project:
   ```bash
   pnpm build
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode (for development)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Building

```bash
# Clean build output
pnpm clean

# Build for production
pnpm build

# Build in watch mode (for development)
pnpm dev
```

### Code Quality

Before committing, ensure your code passes all checks:

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Fix linting issues automatically
pnpm lint:fix

# Format code
pnpm format
```

## Customizing the Template

### 1. Removing Example Code

The template includes example code to demonstrate structure. To remove it:

**Delete example implementations:**

```bash
# Remove the example functions from src/index.ts
# Keep only the structure you need
```

**Update tests:**

```bash
# Remove or update tests/index.test.ts
# Add your own test cases
```

**Update examples:**

```bash
# Remove or update examples/basic.ts
# Add examples relevant to your SDK
```

### 2. Adding New Features

**Create new source files:**

```typescript
// src/feature.ts
export function myFeature() {
  // Implementation
}
```

**Export from index:**

```typescript
// src/index.ts
export { myFeature } from './feature';
```

**Add tests:**

```typescript
// tests/feature.test.ts
import { describe, it, expect } from 'vitest';
import { myFeature } from '../src/feature';

describe('myFeature', () => {
  it('should work correctly', () => {
    expect(myFeature()).toBe(expected);
  });
});
```

### 3. Configuring Build Output

Edit `tsup.config.ts` to customize build options:

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  // Add more options as needed
});
```

### 4. TypeScript Configuration

Adjust `tsconfig.json` for your needs:

```json
{
  "compilerOptions": {
    "target": "es2022", // Adjust target environment
    "strict": true, // Keep strict mode enabled
    "lib": ["es2022", "dom"] // Add/remove libs as needed
    // ... other options
  }
}
```

### 5. Testing Configuration

Customize `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // or 'jsdom' for browser-like environment
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Add coverage thresholds if desired:
      // thresholds: {
      //   lines: 80,
      //   functions: 80,
      //   branches: 80,
      //   statements: 80
      // }
    },
  },
});
```

## Publishing Your SDK

### Pre-publish Checklist

Before publishing, ensure:

- [ ] All tests pass: `pnpm test`
- [ ] Types are correct: `pnpm typecheck`
- [ ] Code is linted: `pnpm lint`
- [ ] Build succeeds: `pnpm build`
- [ ] Version is updated in `package.json`
- [ ] README is updated with current API documentation
- [ ] Examples reflect current functionality

### Publishing Steps

1. **Update version** (follow [Semantic Versioning](https://semver.org/)):

   ```json
   // package.json
   {
     "version": "1.0.0" // Update this
   }
   ```

2. **Clean and build**:

   ```bash
   pnpm clean
   pnpm build
   ```

3. **Test the package locally** (optional):

   ```bash
   # In your SDK directory
   npm pack

   # In a test project
   npm install /path/to/your-sdk-1.0.0.tgz
   ```

4. **Publish to npm**:

   ```bash
   # First time: login to npm
   npm login

   # Publish
   npm publish
   ```

   The `prepublishOnly` script will automatically build before publishing.

### Versioning Guidelines

- **Patch** (1.0.x): Bug fixes, no API changes
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

## Project Structure

```
typescript-sdk-starter/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── src/
│   └── index.ts            # Main entry point and exports
├── tests/
│   └── index.test.ts       # Test files (mirror src structure)
├── examples/
│   └── basic.ts            # Usage examples
├── dist/                   # Build output (gitignored)
├── coverage/               # Test coverage (gitignored)
├── .node-version           # Node.js version pin
├── .npmignore             # npm publish exclusions
├── .prettierrc.json       # Code formatting rules
├── eslint.config.js       # Linting rules
├── package.json           # Package metadata
├── tsconfig.json          # TypeScript configuration
├── tsup.config.ts         # Build configuration
├── vitest.config.ts       # Test configuration
└── README.md              # Documentation
```

## Common Customizations

### Adding Runtime Dependencies

```bash
pnpm add package-name
```

Update your code to use the dependency and ensure it's properly exported if needed.

### Changing Code Style

Edit `.prettierrc.json`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

Then format all code:

```bash
pnpm format
```

### Adding More Examples

Create new files in `examples/` directory:

```typescript
// examples/advanced.ts
import { SDK } from '../src';

const sdk = new SDK('api-key');
// Demonstrate advanced usage
```

Add a note in the README linking to the example.

### Changing Build Targets

Update `tsconfig.json` target and `lib` options:

```json
{
  "compilerOptions": {
    "target": "es2020", // Change this
    "lib": ["es2020"] // And this
  }
}
```

## Best Practices

### Code Style

- Use TypeScript strict mode (already enabled)
- Export all public types and interfaces
- Add JSDoc comments to public APIs
- Keep functions small and focused
- Use descriptive variable names

### Testing

- Write tests for all public APIs
- Test edge cases and error conditions
- Aim for high coverage (80%+)
- Use descriptive test names
- Group related tests with `describe`

### Documentation

- Keep README up to date
- Document all public APIs
- Provide usage examples
- Include troubleshooting section
- Document breaking changes

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/my-feature

# Make changes, commit often
git add .
git commit -m "Add my feature"

# Push and create PR
git push origin feature/my-feature
```

## Need Help?

- Check the [README](README.md) for usage documentation
- Review existing [issues](https://github.com/yourusername/typescript-sdk-starter/issues)
- Open a new issue if you find a bug or have a suggestion

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
