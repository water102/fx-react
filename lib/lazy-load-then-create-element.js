import { createElement, lazy } from 'react';
export const lazyLoadThenCreateElement = (lazyLoad, componentName = 'default') => createElement(lazy(() => lazyLoad().then((module) => ({ default: module[componentName] }))));
