"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyLoadThenCreateElement = void 0;
const react_1 = require("react");
const lazyLoadThenCreateElement = (lazyLoad, componentName = 'default') => (0, react_1.createElement)((0, react_1.lazy)(() => lazyLoad().then((module) => ({ default: module[componentName] }))));
exports.lazyLoadThenCreateElement = lazyLoadThenCreateElement;
