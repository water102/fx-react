"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubscriber = exports.useEmit = exports.useEmitterContext = exports.EmitterProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const createSubscription = () => {
    const subscribers = new Set();
    const subscribe = (fn) => subscribers.add(fn);
    const unsubscribe = (fn) => subscribers.delete(fn);
    const emit = (...args) => subscribers.forEach((c) => c(...args));
    return {
        subscribe,
        unsubscribe,
        emit,
    };
};
const EmitterContext = react_1.default.createContext(undefined);
const EmitterProvider = ({ children }) => {
    const subscriptionRef = (0, react_1.useRef)(createSubscription());
    return ((0, jsx_runtime_1.jsx)(EmitterContext.Provider, { value: subscriptionRef.current, children: children }));
};
exports.EmitterProvider = EmitterProvider;
const useEmitterContext = () => {
    const context = (0, react_1.useContext)(EmitterContext);
    if (context === undefined) {
        throw new Error('useEmitterContext must be used within a EmitterContext');
    }
    return context;
};
exports.useEmitterContext = useEmitterContext;
const useEmit = () => {
    const { emit } = (0, exports.useEmitterContext)();
    return emit;
};
exports.useEmit = useEmit;
const useSubscriber = (fn, listenTo) => {
    const { subscribe, unsubscribe } = (0, exports.useEmitterContext)();
    (0, react_1.useEffect)(() => {
        subscribe(fn);
        return () => unsubscribe(fn);
    }, listenTo);
};
exports.useSubscriber = useSubscriber;
