"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollToTop = void 0;
const react_1 = require("react");
const useScrollToTop = () => {
    (0, react_1.useLayoutEffect)(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }, []);
};
exports.useScrollToTop = useScrollToTop;
