"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Loading = ({ className, text = 'Loading, please wait a moment...' }) => ((0, jsx_runtime_1.jsx)("div", { className: className, children: text }));
exports.Loading = Loading;
