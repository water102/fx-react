import { jsx as _jsx } from "react/jsx-runtime";
import { EmitterProvider } from "./event-emitter";
export const withEventEmitter = (Component) => (props) => {
    return (_jsx(EmitterProvider, { children: _jsx(Component, { ...props }) }));
};
