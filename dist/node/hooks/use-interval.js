"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = void 0;
const react_1 = require("react");
const useInterval = (func, interval, ...deps) => {
    (0, react_1.useEffect)(() => {
        const handler = setInterval(func, interval);
        return () => clearInterval(handler);
    }, [func, interval, ...deps]);
};
exports.useInterval = useInterval;
