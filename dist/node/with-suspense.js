"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSuspense = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const components_1 = require("./components");
const withSuspense = (Component) => (props) => {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Suspense, { fallback: (0, jsx_runtime_1.jsx)(components_1.Loading, {}), children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }));
};
exports.withSuspense = withSuspense;
