import { FC, ReactNode } from 'react';
type CopyToClipboardButtonProps = {
    value: string;
    children: ReactNode;
    className?: string;
    onCopy?: (text: string) => void;
};
export declare const CopyToClipboardButton: FC<CopyToClipboardButtonProps>;
export {};
