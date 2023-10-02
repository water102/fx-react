"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = void 0;
const react_1 = require("react");
const fx_common_1 = require("@water102/fx-common");
function useDebounce(cb, delay, deps) {
    return (0, react_1.useMemo)(() => (0, fx_common_1.debounce)(cb, delay), deps);
}
exports.useDebounce = useDebounce;
