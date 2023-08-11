import { createElement, lazy } from 'react';

export const lazyLoadThenCreateElement = (lazyLoad: () => Promise<any>, componentName = 'default') =>
  createElement(lazy(() => lazyLoad().then((module) => ({ default: module[componentName] }))));
