import { FC, ReactNode } from 'react';
type ConfirmDialogProps = {
    open: boolean;
    title?: string;
    content?: string | ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    icon?: ReactNode;
    onClose: () => void;
    onConfirm: () => void;
};
export declare const ConfirmDialog: FC<ConfirmDialogProps>;
export {};
