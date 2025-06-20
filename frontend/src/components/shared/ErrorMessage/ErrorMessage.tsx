import { useEffect, useState } from 'react';
import { Wrapper, CloseButton } from './ErrorMessage.style';

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
    <Wrapper role="alert">
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

export default ErrorMessage;
