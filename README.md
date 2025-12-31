# @water102/fx-react

React components, hooks, and utilities for fx projects.

## Features

- ✅ **React Components**: Pre-built UI components (Button, ConfirmDialog, Loading, SpriteAnimator, etc.)
- ✅ **Custom Hooks**: Useful React hooks (useStateTimeout, useDebounce, useThrottle, useCountdown, etc.)
- ✅ **Higher-Order Components**: HOCs for common patterns (withSuspense, withStyles, withBrowserRouter, etc.)
- ✅ **Type-safe**: Full TypeScript support with proper generics
- ✅ **Well-documented**: Comprehensive API documentation
- ✅ **Tested**: High test coverage with React Testing Library

## Installation

```bash
npm install @water102/fx-react
# or
pnpm install @water102/fx-react
# or
yarn add @water102/fx-react
```

**Note**: This package requires several peer dependencies (see below).

## Usage

```tsx
import { 
  Button, 
  ConfirmDialog, 
  useConfirmDialog,
  useStateTimeout,
  withSuspense 
} from '@water102/fx-react';
```

## Tailwind CSS Configuration

To use components with Tailwind CSS, you need to configure Tailwind to scan the components in this package.

**Option 1: Using @source directive (Recommended)**

Add this to your main `tailwind.css` file **after** `@import "tailwindcss"`:

For node_modules:

```css
@import "tailwindcss";

/* Scan fx-react components from node_modules */
@source "../../node_modules/@water102/fx-react/src/**/*.ts";
@source "../../node_modules/@water102/fx-react/src/**/*.tsx";
```

Or in a monorepo:

```css
@import "tailwindcss";

/* Scan fx-react components from monorepo */
@source "../../../packages/fx-react/src/**/*.ts";
@source "../../../packages/fx-react/src/**/*.tsx";
```

**Note**: Tailwind CSS v4 `@source` directive does not support alias, so you need to use relative paths. Also, extensions must be separated into different `@source` lines (`.ts` and `.tsx` separately).

**Option 2: Import tailwind.css from fx-react**

Import the tailwind.css file from this package **after** your main `@import "tailwindcss"`:

```css
@import "tailwindcss";
@import "@water102/fx-react/src/tailwind.css";
```

**Note**: The fx-react tailwind.css file only contains `@source` directives and does NOT include `@import "tailwindcss"` to avoid duplicate base styles.

## API Documentation

### Components

#### `Button`

A customizable button component with multiple variants and sizes.

```tsx
import { Button } from '@water102/fx-react';

<Button variant="primary" size="default">Click me</Button>
<Button variant="destructive" size="sm">Delete</Button>
```

**Props:**
- `variant`: `"primary" | "secondary" | "soft" | "outline" | "outline-primary" | "outline-secondary" | "outline-destructive" | "outline-success" | "outline-warning" | "ghost" | "link" | "destructive"` (default: `"primary"`)
- `size`: `"sm" | "default" | "lg" | "icon"` (default: `"default"`)
- All standard HTML button attributes

#### `ConfirmDialog`

A modal dialog for confirmation actions.

```tsx
import { ConfirmDialog } from '@water102/fx-react';

<ConfirmDialog
  open={isOpen}
  title="Delete Item"
  content="Are you sure you want to delete this item?"
  confirmText="Delete"
  cancelText="Cancel"
  variant="destructive"
  onClose={() => setIsOpen(false)}
  onConfirm={() => {
    // Handle confirmation
    setIsOpen(false);
  }}
/>
```

**Props:**
- `open`: `boolean` - Whether the dialog is open
- `title`: `string` (optional) - Dialog title (default: `"Confirm"`)
- `content`: `string | ReactNode` (optional) - Dialog content (default: `"Are you sure you want to perform this action?"`)
- `confirmText`: `string` (optional) - Confirm button text (default: `"Confirm"`)
- `cancelText`: `string` (optional) - Cancel button text (default: `"Cancel"`)
- `variant`: `"default" | "destructive"` (optional) - Dialog variant (default: `"default"`)
- `icon`: `ReactNode` (optional) - Custom icon
- `onClose`: `() => void` - Callback when dialog is closed
- `onConfirm`: `() => void` - Callback when confirm is clicked

#### `useConfirmDialog`

Hook that provides a promise-based confirmation dialog.

```tsx
import { useConfirmDialog } from '@water102/fx-react';

function MyComponent() {
  const { confirm, DialogComponent } = useConfirmDialog();

  const handleDelete = async () => {
    const result = await confirm({
      title: 'Delete Item',
      content: 'Are you sure?',
      variant: 'destructive'
    });
    
    if (result) {
      // User confirmed
      console.log('Deleted');
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      {DialogComponent}
    </>
  );
}
```

**Returns:**
- `confirm`: `(options?: ConfirmOptions) => Promise<boolean>` - Function to show confirmation dialog
- `DialogComponent`: `ReactNode` - The dialog component to render

#### `CopyToClipboardButton`

A button component that copies text to clipboard.

```tsx
import { CopyToClipboardButton } from '@water102/fx-react';

<CopyToClipboardButton 
  value="Text to copy"
  onCopy={(text) => console.log('Copied:', text)}
>
  Copy Text
</CopyToClipboardButton>
```

**Props:**
- `value`: `string` - Text to copy
- `onCopy`: `(text: string) => void` (optional) - Callback when copy succeeds
- `className`: `string` (optional) - Additional CSS classes
- `children`: `ReactNode` - Button content

#### `Loading`

A loading indicator component.

```tsx
import { Loading } from '@water102/fx-react';

<Loading message="Loading..." />
```

**Props:**
- `message`: `string` (optional) - Loading message (default: `"loading"`)
- `className`: `string` (optional) - Additional CSS classes

#### `ErrorBoundary`

A component that catches JavaScript errors in child components.

```tsx
import { ErrorBoundary } from '@water102/fx-react';

<ErrorBoundary 
  fallback={<div>Something went wrong</div>}
  onError={(error, errorInfo) => console.error(error, errorInfo)}
>
  <MyComponent />
</ErrorBoundary>
```

**Props:**
- `fallback`: `ReactNode | ((error: Error, errorInfo: React.ErrorInfo) => ReactNode)` (optional) - Custom fallback UI
- `onError`: `(error: Error, errorInfo: React.ErrorInfo) => void` (optional) - Error handler callback
- `children`: `ReactNode` - Child components

#### `SpriteAnimator`

A component for animating sprite sheets.

```tsx
import { SpriteAnimator } from '@water102/fx-react';

<SpriteAnimator
  id="my-sprite"
  source={{
    src: '/sprites/character.png',
    width: 64,
    height: 64,
    totalFrames: 16,
    cols: 4,
    rows: 4
  }}
  animations={[
    {
      name: 'idle',
      range: [0, 3],
      duration: 1000,
      iterationCount: 'infinite'
    }
  ]}
  play="idle"
  trigger="hover"
/>
```

**Props:**
- `id`: `string` - Unique identifier
- `source`: `SourceConfig` - Sprite sheet configuration
- `animations`: `readonly AnimationConfig[]` - Animation configurations
- `play`: `string` (optional) - Animation name to play
- `className`: `string` (optional) - Additional CSS classes
- `trigger`: `"manual" | "hover" | "click"` (optional) - Animation trigger (default: `"manual"`)
- `flipX`: `boolean` (optional) - Flip horizontally
- `flipY`: `boolean` (optional) - Flip vertically
- `scale`: `number` (optional) - Scale factor (default: `1`)
- `debug`: `boolean` (optional) - Enable debug mode
- `onEnd`: `(animName: string) => void` (optional) - Callback when animation ends
- `onError`: `(error: Error) => void` (optional) - Callback when image load fails

---

### Hooks

#### `useStateTimeout`

Hook that provides state with timeout functionality. Sets a new value immediately, then reverts to the previous value after the specified timeout.

```tsx
import { useStateTimeout } from '@water102/fx-react';

const [message, setMessageTimeout, setMessage] = useStateTimeout('', 3000);

// Set message that will revert after 3 seconds
setMessageTimeout('Hello');
// Or set permanent message
setMessage('Permanent');
```

**Parameters:**
- `value`: `T` - Initial state value
- `timeout`: `number` - Timeout in milliseconds

**Returns:**
- `[state, setStateTimeout, setState]` - Tuple of current state, timeout setter, and permanent setter

#### `useDebounce`

Hook that debounces a function call.

```tsx
import { useDebounce } from '@water102/fx-react';

const debouncedSearch = useDebounce((query: string) => {
  console.log('Searching:', query);
}, 500, []);
```

**Parameters:**
- `cb`: `(...args: Args) => void` - Function to debounce
- `delay`: `number` - Debounce delay in milliseconds
- `deps`: `DependencyList` - Dependency array

**Returns:** Debounced function

#### `useThrottle`

Hook that throttles a function call.

```tsx
import { useThrottle } from '@water102/fx-react';

const throttledScroll = useThrottle((event: Event) => {
  console.log('Scrolling');
}, 100, []);
```

**Parameters:**
- `cb`: `(...args: Args) => void` - Function to throttle
- `cooldown`: `number` - Throttle cooldown in milliseconds
- `deps`: `DependencyList` - Dependency array

**Returns:** Throttled function

#### `useCountdown`

Hook that provides a countdown timer.

```tsx
import { useCountdown } from '@water102/fx-react';

const [count, setConfig] = useCountdown({
  startNumber: 10,
  diffNumber: 1,
  waitingTime: 1000,
  endNumber: 0
});
```

**Parameters:**
- `config`: `CountdownConfig` - Countdown configuration
  - `startNumber`: `number` - Starting number
  - `diffNumber`: `number` - Number to subtract each interval
  - `waitingTime`: `number` - Interval in milliseconds
  - `endNumber`: `number` - Ending number

**Returns:**
- `[currentValue, setConfig]` - Tuple of current countdown value and config setter

#### `useInterval`

Hook that runs a function at specified intervals.

```tsx
import { useInterval } from '@water102/fx-react';

useInterval(() => {
  console.log('Tick');
}, 1000);
```

**Parameters:**
- `func`: `AnyFunction` - Function to run
- `interval`: `number` - Interval in milliseconds
- `...deps`: `any[]` - Additional dependencies

#### `useEvent`

Hook that adds an event listener and cleans it up on unmount.

```tsx
import { useEvent } from '@water102/fx-react';

useEvent(window, 'resize', () => {
  console.log('Window resized');
}, []);
```

**Parameters:**
- `owner`: `Window | HTMLElement` - Element or window to attach event to
- `eventName`: `string` - Event name
- `listener`: `(event: Event) => void` - Event listener function
- `deps`: `DependencyList` (optional) - Dependency array

**Returns:** Cleanup function

#### `useWindowDimensions`

Hook that tracks window dimensions and updates on resize.

```tsx
import { useWindowDimensions } from '@water102/fx-react';

const { width, height } = useWindowDimensions();
```

**Returns:**
- `{ width: number, height: number }` - Current window dimensions

#### `useScrollToTop`

Hook that scrolls to top on mount.

```tsx
import { useScrollToTop } from '@water102/fx-react';

function MyComponent() {
  useScrollToTop();
  return <div>Content</div>;
}
```

#### `useQuery`

Hook that provides URL query parameters.

```tsx
import { useQuery } from '@water102/fx-react';

const query = useQuery();
const userId = query.get('userId');
```

**Returns:** `URLSearchParams` object

#### `useBlockedContextmenu`

Hook that blocks right-click context menu.

```tsx
import { useBlockedContextmenu } from '@water102/fx-react';

useBlockedContextmenu();
```

#### `useBlockedF12`

Hook that blocks F12 and Ctrl+Shift+I (developer tools).

```tsx
import { useBlockedF12 } from '@water102/fx-react';

useBlockedF12();
```

---

### Higher-Order Components

#### `withSuspense`

HOC that wraps a component with React.Suspense.

```tsx
import { withSuspense } from '@water102/fx-react';

const SuspenseComponent = withSuspense(MyComponent);
```

#### `withStyles`

HOC that injects styles into a component.

```tsx
import { withStyles } from '@water102/fx-react';

const StyledComponent = withStyles(
  { container: 'my-class' },
  MyComponent
);
```

**Parameters:**
- `styles`: `Styles` - Styles object
- `Component`: `React.FC<P & HasStyles>` - Component to wrap

#### `withClasses`

HOC that injects classes into a component.

```tsx
import { withClasses } from '@water102/fx-react';

const ClassedComponent = withClasses(
  { container: 'my-class' },
  MyComponent
);
```

**Parameters:**
- `classes`: `Classes` - Classes object
- `Component`: `React.FC<P & HasClasses>` - Component to wrap

#### `withBrowserRouter`

HOC that wraps a component with BrowserRouter.

```tsx
import { withBrowserRouter } from '@water102/fx-react';

const RoutedComponent = withBrowserRouter(MyComponent);
```

#### `withHashRouter`

HOC that wraps a component with HashRouter.

```tsx
import { withHashRouter } from '@water102/fx-react';

const RoutedComponent = withHashRouter(MyComponent);
```

#### `withReactQuery`

HOC that wraps a component with QueryClientProvider.

```tsx
import { withReactQuery } from '@water102/fx-react';
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();
const QueryComponent = withReactQuery(queryClient)(MyComponent);
```

**Parameters:**
- `queryClient`: `QueryClient` - React Query client

#### `withProvider`

HOC that wraps a component with Redux Provider.

```tsx
import { withProvider } from '@water102/fx-react';
import { store } from './store';

const ReduxComponent = withProvider(store)(MyComponent);
```

**Parameters:**
- `store`: `Store` - Redux store

#### `withEventEmitter`

HOC that wraps a component with EmitterProvider.

```tsx
import { withEventEmitter } from '@water102/fx-react';

const EmitterComponent = withEventEmitter(MyComponent);
```

---

### Utilities

#### `bootstrap`

Bootstraps a React application by waiting for DOM to be ready, then loading the app component and rendering it.

```tsx
import { bootstrap } from '@water102/fx-react';

bootstrap('root', import('./App'));
```

**Parameters:**
- `rootId`: `string` - The ID of the root element
- `requireApp`: `Promise<React.FC<DefaultFcProps>>` - Promise that resolves to the root App component

#### `lazyLoadThenCreateElement`

Lazy loads a module and creates a React element from a named export.

```tsx
import { lazyLoadThenCreateElement } from '@water102/fx-react';

const MyComponent = lazyLoadThenCreateElement(
  () => import('./MyComponent'),
  'MyComponent'
);
```

**Parameters:**
- `lazyLoad`: `() => Promise<Record<string, T>>` - Function that returns a Promise resolving to the module
- `componentName`: `string` (optional) - Name of the component to extract (default: `'default'`)

**Returns:** React element

#### `renderRoute`

Renders routes from route data configuration.

```tsx
import { renderRoute } from '@water102/fx-react';

const routes = renderRoute([
  { path: '/', element: <Home /> },
  { path: '/admin', element: <Admin />, canAccess: (loggedIn) => loggedIn }
], true);
```

**Parameters:**
- `items`: `RouteData[]` - Array of route data configurations
- `loggedIn`: `boolean` (optional) - Whether the user is logged in
- `userData`: `UserData` (optional) - User data for access control

**Returns:** Array of Route components

#### `cn`

Utility function for merging class names (using `clsx` and `tailwind-merge`).

```tsx
import { cn } from '@water102/fx-react';

const className = cn('foo', 'bar', condition && 'baz');
```

**Parameters:**
- `...inputs`: `ClassValue[]` - Class values to merge

**Returns:** Merged class name string

---

### Event Emitter

#### `EmitterProvider`

Provider component for event emitter context.

```tsx
import { EmitterProvider } from '@water102/fx-react';

<EmitterProvider>
  <App />
</EmitterProvider>
```

#### `useEmit`

Hook that returns the emit function.

```tsx
import { useEmit } from '@water102/fx-react';

const emit = useEmit();
emit('event-name', data);
```

**Returns:** `(eventName: string, ...args: unknown[]) => void`

#### `useSubscriber`

Hook that subscribes to events.

```tsx
import { useSubscriber } from '@water102/fx-react';

useSubscriber((eventName, data) => {
  console.log('Event:', eventName, data);
}, []);
```

**Parameters:**
- `fn`: `AnyFunction` - Event handler function
- `listenTo`: `DependencyList` (optional) - Dependency array

---

### i18n

#### `initI18n`

Initializes i18next with React integration.

```tsx
import { initI18n } from '@water102/fx-react';

await initI18n({
  loadPath: '/locales/{{lng}}.json',
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  storageKey: 'language'
});
```

**Parameters:**
- `config`: `I18nConfig` (optional) - i18n configuration
  - `loadPath`: `string` (optional) - Path to translation files (default: `'/locales/{{lng}}.json'`)
  - `defaultLanguage`: `string` (optional) - Default language (default: `'vi'`)
  - `fallbackLanguage`: `string` (optional) - Fallback language (default: `'vi'`)
  - `storageKey`: `string` (optional) - localStorage key for language (default: `'language'`)

---

## Development

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Format

```bash
npm run prettier-format
```

## Peer Dependencies

This package requires the following peer dependencies:

- `react` ^19.2.3
- `react-dom` ^19.2.3
- `@reduxjs/toolkit` ^2.11.2
- `@tanstack/react-query` ^5.90.12
- `@water102/fx-common` ^4.0.7
- `@water102/fx-web` ^4.0.7
- `class-variance-authority` ^0.7.0
- `clsx` ^2.0.0
- `i18next` ^25.7.3
- `i18next-http-backend` ^3.0.2
- `react-hot-toast` ^2.4.0
- `react-i18next` ^16.5.0
- `react-router` ^7.11.0
- `react-redux` ^9.2.0
- `react-use` ^17.6.0
- `redux` ^5.0.1
- `tailwind-merge` ^2.0.0

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

See LICENSE file for details.
