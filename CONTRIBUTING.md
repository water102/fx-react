# Contributing to @water102/fx-react

Thank you for your interest in contributing to fx-react! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development

### Building

```bash
npm run build
```

### Testing

Run all tests:
```bash
npm test
```

Run tests for a specific module:
```bash
npm test -- hooks
```

**Test Coverage**: The library includes test coverage with React Testing Library. Aim for high coverage when adding new features.

### Code Style

- Follow the existing code style
- Use functional programming style when supported
- All comments must be in English
- Run `npm run prettier-format` before committing

## Adding New Features

1. **Add the implementation** in the appropriate directory under `src/`
2. **Export the function/component** from the relevant `index.ts` file
3. **Add JSDoc comments** describing the function/component, parameters, return value, and examples
4. **Write tests** - Create a `.test.ts` or `.test.tsx` file with comprehensive test cases using React Testing Library
5. **Update README.md** - Add documentation for the new feature
6. **Update CHANGELOG.md** - Document the new feature

## Writing Tests

- Place test files next to the source files (e.g., `src/hooks/use-state-timeout.test.ts`)
- Use React Testing Library for component tests
- Use `renderHook` from `@testing-library/react` for hook tests
- Use descriptive test names
- Cover edge cases and error scenarios
- Aim for high test coverage
- Mock external dependencies (e.g., `react-hot-toast`, `navigator.clipboard`)

Example test structure for components:
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  test('Renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

Example test structure for hooks:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from './use-my-hook';

describe('useMyHook', () => {
  test('Returns expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBe(expected);
  });
});
```

## Type Safety

- Prefer TypeScript generics over `any` types
- Use proper type guards
- Add JSDoc type annotations when helpful
- For React components, use proper prop types
- For HOCs, use generics to preserve component prop types

## React Best Practices

- Use functional components
- Prefer hooks over class components
- Use `React.memo` for performance optimization when appropriate
- Follow React hooks rules
- Use proper dependency arrays in hooks

## Pull Request Process

1. Ensure all tests pass: `npm test`
2. Ensure the build succeeds: `npm run build`
3. Update CHANGELOG.md with your changes
4. Create a pull request with a clear description
5. Reference any related issues

## Code Review

- All PRs require review before merging
- Address review comments promptly
- Keep PRs focused and reasonably sized

## Questions?

Feel free to open an issue for questions or discussions.

Thank you for contributing! 🎉

