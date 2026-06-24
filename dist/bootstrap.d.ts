import { DefaultFcProps } from './default-fc-props';
/**
 * Bootstraps a React application by waiting for DOM to be ready,
 * then loading the app component and rendering it to the specified root element.
 * @param rootId - The ID of the root element to render the app into
 * @param requireApp - Promise that resolves to the root App component
 * @example
 * bootstrap('root', import('./App'));
 */
export declare const bootstrap: (rootId: string, requireApp: Promise<React.FC<DefaultFcProps>>) => Promise<void>;
