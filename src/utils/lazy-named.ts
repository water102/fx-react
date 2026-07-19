import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/** `React.lazy` for modules that export a named component. */
export const lazyNamed = <P extends object>(
  factory: () => Promise<Record<string, ComponentType<P>>>,
  exportName: string,
): LazyExoticComponent<ComponentType<P>> =>
  lazy(() =>
    factory().then((mod) => {
      const component = mod[exportName];
      if (!component) {
        throw new Error(`lazyNamed: missing export "${exportName}"`);
      }
      return { default: component };
    }),
  );
