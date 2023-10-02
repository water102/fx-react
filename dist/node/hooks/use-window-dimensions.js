"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowDimensions = void 0;
const react_1 = require("react");
const use_event_1 = require("./use-event");
const fx_web_1 = require("@water102/fx-web");
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = (0, react_1.useState)({
        width: 0,
        height: 0
    });
    (0, use_event_1.useEvent)(window, 'resize', () => {
        setWindowDimensions((0, fx_web_1.getWindowDimensions)());
    }, []);
    return windowDimensions;
};
exports.useWindowDimensions = useWindowDimensions;
