import { ReactNode } from 'react';
type ConfirmOptions = {
    title?: string;
    content?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    icon?: ReactNode;
};
export declare const useConfirmDialog: () => {
    confirm: (options?: ConfirmOptions) => Promise<boolean>;
    DialogComponent: import("react").JSX.Element;
};
export {};
