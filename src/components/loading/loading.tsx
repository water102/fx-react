import type { FC } from "react";
import { memo } from "react";
import styles from "./loading.module.css";
import { cn } from "../../utils/cn";

type LoadingProps = {
  message?: string;
  className?: string;
};

export const Loading: FC<LoadingProps> = memo(({
  className = "",
  message = "loading"
}) => {
  return (
    <div className={cn("text-center", className)}>
      <span className={styles.loadingText}>
        {message}
      </span>
    </div>
  );
});

Loading.displayName = "Loading";
