import { Overlay, Dialog, Actions } from './ConfirmDialog.style';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Overlay>
      <Dialog>
        <p>{message}</p>
        <Actions>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </Actions>
      </Dialog>
    </Overlay>
  );
};
