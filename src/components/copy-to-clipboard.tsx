import { useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import toast from 'react-hot-toast';

type CopyToClipboardButtonProps = {
  value: string;
  children: ReactNode;
  className?: string;
  onCopy?: (text: string) => void;
};

export const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = ({
  value,
  children,
  className = "flex flex-row items-center gap-3",
  onCopy,
}) => {
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (onCopy) {
        onCopy(text);
      } else {
        toast.dismiss();
        toast.success('Copied');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to copy to clipboard';
      toast.error(errorMessage);
      if (onCopy) {
        onCopy('');
      }
    }
  }, [onCopy]);

  return (
    <button 
      type="button" 
      className={className}
      onClick={() => copyToClipboard(value)}
    >
      <svg 
        className="size-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
      {children}
    </button>
  );
};

