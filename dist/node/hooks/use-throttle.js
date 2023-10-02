"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottle = void 0;
const react_1 = require("react");
const fx_common_1 = require("@water102/fx-common");
function useThrottle(cb, cooldown, deps) {
    return (0, react_1.useMemo)(() => (0, fx_common_1.throttle)(cb, cooldown), deps);
}
exports.useThrottle = useThrottle;
