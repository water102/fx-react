import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { ConfirmDialog } from "../components/confirm-dialog";

type ConfirmOptions = {
  title?: string;
  content?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  icon?: ReactNode;
};

type ConfirmDialogState = ConfirmOptions & {
  open: boolean;
  resolve?: (value: boolean) => void;
};

export const useConfirmDialog = () => {
  const [state, setState] = useState<ConfirmDialogState>({
    open: false,
  });

  const confirm = useCallback(
    (options: ConfirmOptions = {}): Promise<boolean> => {
      return new Promise((resolve) => {
        setState({
          ...options,
          open: true,
          resolve,
        });
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setState((prev) => {
      if (prev.resolve) {
        prev.resolve(false);
      }
      return { open: false };
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState((prev) => {
      if (prev.resolve) {
        prev.resolve(true);
      }
      return { open: false };
    });
  }, []);

  const DialogComponent = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      content={state.content}
      confirmText={state.confirmText}
      cancelText={state.cancelText}
      variant={state.variant}
      icon={state.icon}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />
  );

  return {
    confirm,
    DialogComponent,
  };
};

