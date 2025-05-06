import styled from 'styled-components';

export const Overlay = styled.div.attrs({
  role: 'dialog',
  'aria-modal': 'true',
})<React.HTMLAttributes<HTMLDivElement>>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  position: relative; /* ✅ Needed for CloseIcon positioning */
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Field = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  margin-bottom: 1rem;
`;

export const Label = styled.label<React.LabelHTMLAttributes<HTMLLabelElement>>`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

export const Input = styled.input<React.InputHTMLAttributes<HTMLInputElement>>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const DateInput = styled(Input)`
  width: 200px;
`;

export const TextArea = styled.textarea<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>`
  width: 100%;
  height: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonGroup = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const Button = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  padding: 0.5rem 1rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

export const FlexRow = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  > div {
    flex: 1;
  }

  label {
    margin-bottom: 0.25rem;
    display: block;
  }
`;

export const CheckboxContainer = styled.label<
  React.LabelHTMLAttributes<HTMLLabelElement>
>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: bold;

  input[type='checkbox'] {
    width: 18px;
    height: 15px;
    accent-color: #000;
  }
`;

export const ErrorText = styled.span<React.HTMLAttributes<HTMLSpanElement>>`
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
`;

export const CloseIcon = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  color: #333;
  cursor: pointer;
`;

export const SuccessText = styled.p<React.HTMLAttributes<HTMLParagraphElement>>`
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
`;
export const ImageWrapper = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-left: 2rem;
  flex-shrink: 0;
`;

export const ImagePreview = styled.img.attrs({
  role: 'img',
  alt: 'User image preview',
})<React.ImgHTMLAttributes<HTMLImageElement>>`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border || '#ccc'};
`;
export const Spinner = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const FormFieldsWrapper = styled.div<
  React.HTMLAttributes<HTMLDivElement>
>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
