"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvent = void 0;
const react_1 = require("react");
const fx_web_1 = require("@water102/fx-web");
const useEvent = (owner, eventName, listener, deps) => {
    const eventHandlerRef = (0, react_1.useRef)();
    (0, react_1.useLayoutEffect)(() => {
        const clear = (0, fx_web_1.listenEvent)(owner, eventName, listener);
        eventHandlerRef.current = clear;
        return clear;
    }, [
        eventName,
        listener,
        ...(deps ?? [])
    ]);
    return eventHandlerRef.current;
};
exports.useEvent = useEvent;
