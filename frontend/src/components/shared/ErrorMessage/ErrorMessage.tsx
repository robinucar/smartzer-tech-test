import { useEffect, useState } from 'react';

type Props = {
  message: string;
  duration?: number;
  onDismiss?: () => void;
};

export const ErrorMessage = ({ message, duration, onDismiss }: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!duration) return;
    const timeout = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="relative mb-4 rounded bg-red-100 text-red-800 border border-red-300 px-4 py-3 text-sm shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
    >
      <span className="flex-1">{message}</span>
      <button
        aria-label="Close"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="self-start text-xl font-bold text-red-800 hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600"
      >
        ×
      </button>
    </div>
  );
};

export default ErrorMessage;
