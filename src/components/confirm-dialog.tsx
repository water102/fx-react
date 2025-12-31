import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Button } from "./button";

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

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title = "Confirm",
  content = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  icon,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  // Handle ESC key to close dialog
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const defaultIcon = variant === "destructive" ? (
    <svg
      className="size-6 text-red-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ) : null;

  const displayIcon = icon ?? defaultIcon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleCancel}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Dialog */}
      <div
        className="relative bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-4">
            {displayIcon && <div className="flex-shrink-0 mt-0.5">{displayIcon}</div>}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <div className="text-sm text-gray-600 dark:text-neutral-400">
                {typeof content === "string" ? <p>{content}</p> : content}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              variant={variant === "destructive" ? "destructive" : "primary"}
              size="default"
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

