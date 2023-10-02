export const Loading: React.FC<{ className?: string, text?: string }> = ({ className, text = 'Loading, please wait a moment...' }) => (
  <div className={className}>{text}</div>
)
