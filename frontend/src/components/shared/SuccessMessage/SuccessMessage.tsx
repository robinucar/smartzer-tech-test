import { useEffect, useState } from 'react';
import { Wrapper, CloseButton } from './SuccessMessage.style';

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
    <Wrapper role="status">
      {message}
      <CloseButton
        aria-label="Close"
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
      >
        ×
      </CloseButton>
    </Wrapper>
  );
};
