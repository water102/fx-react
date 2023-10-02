"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withEventEmitter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const event_emitter_1 = require("./event-emitter");
const withEventEmitter = (Component) => (props) => {
    return ((0, jsx_runtime_1.jsx)(event_emitter_1.EmitterProvider, { children: (0, jsx_runtime_1.jsx)(Component, { ...props }) }));
};
exports.withEventEmitter = withEventEmitter;
