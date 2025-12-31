# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.7] - 2024-XX-XX

### Fixed
- Fixed typo: `sprite-snimator.tsx` → `sprite-animator.tsx`
- Fixed typo: `demo-sprite-snimator.tsx` → `demo-sprite-animator.tsx`
- Fixed bug in `useStateTimeout` (race condition with setTimeout)
- Fixed TypeScript errors in `use-event.tsx` and `lazy-load-then-create-element.ts`

### Changed
- Replaced `any` types with proper generics in `default-fc-props.ts` (`Record<string, unknown>`)
- Replaced `any` types with proper generics in `bootstrap.tsx` (`DefaultFcProps`)
- Replaced `any` types with proper generics in all HOCs (with-suspense, with-styles, with-browser-router, with-hash-router, with-classes)
- Replaced `any` types with proper generics in `use-state-timeout.ts`
- Replaced `any` types with proper event types in `event-emitter.tsx`
- Replaced `any` types with proper types in `render-route.tsx` (`UserData` type)
- Replaced `any` types with proper generics in `lazy-load-then-create-element.ts`
- Improved error handling in `copy-to-clipboard.tsx` (replaced console.error with toast.error)
- Improved error handling in `sprite-animator.tsx` (added onError callback)
- Improved error handling in `bootstrap.tsx` (added try-catch for app loading)

### Added
- Added JSDoc comments to all functions, components, and hooks
- Added Jest config with React Testing Library setup
- Added test coverage for `useStateTimeout`, `cn`, and `CopyToClipboardButton`
- Added comprehensive README.md with API documentation
- Added CHANGELOG.md for version tracking
- Added CONTRIBUTING.md with contribution guidelines

## [4.0.6] - Previous version

Initial release with React components and utilities for:
- React components (Button, ConfirmDialog, CopyToClipboard, Loading, SpriteAnimator)
- Custom hooks (useStateTimeout, useDebounce, useThrottle, useCountdown, etc.)
- Higher-order components (withSuspense, withStyles, withBrowserRouter, etc.)
- Event emitter utilities
- Redux and React Query providers
- i18n configuration
- And more...

