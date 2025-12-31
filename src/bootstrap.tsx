import { createRoot } from 'react-dom/client';
import { waitForTime } from '@water102/fx-common';
import { bootstrap as bs } from '@water102/fx-web';
import type { DefaultFcProps } from './default-fc-props';

/**
 * Bootstraps a React application by waiting for DOM to be ready,
 * then loading the app component and rendering it to the specified root element.
 * @param rootId - The ID of the root element to render the app into
 * @param requireApp - Promise that resolves to the root App component
 * @example
 * bootstrap('root', import('./App'));
 */
export const bootstrap = async (
  rootId: string,
  requireApp: Promise<React.FC<DefaultFcProps>>
): Promise<void> => {
  try {
    const container = document.getElementById(rootId);
    if (!container) {
      console.error(`Element with id "${rootId}" not found`);
      return;
    }
    const [App] = await Promise.all([
      requireApp,
      bs(window, document),
      waitForTime(1_500),
    ]);
    createRoot(container).render(<App />);
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
  }
}
