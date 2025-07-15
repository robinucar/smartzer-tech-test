import { useEffect, useState } from 'react';

type Props = {
  message: string;
  duration?: number;
  onDismiss?: () => void;
};

export const SuccessMessage = ({
  message,
  duration = 3000,
  onDismiss,
}: Props) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="relative mb-4 rounded bg-green-100 text-green-800 border border-green-300 px-4 py-3 text-sm shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
    >
      <span className="flex-1">{message}</span>
      <button
        aria-label="Close"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="self-start text-xl font-bold text-green-800 hover:text-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-600"
      >
        ×
      </button>
    </div>
  );
};
