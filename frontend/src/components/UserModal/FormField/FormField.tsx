import { FC, ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'date' | 'textarea' | 'checkbox';
  value?: string | boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  optional?: boolean;
  className?: string;
  children?: ReactNode;
}

export const FormField: FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  optional = false,
  className = '',
  children,
}) => {
  const isCheckbox = type === 'checkbox';
  const isTextarea = type === 'textarea';
  const inputId = `${id}`;
  const errorId = `${id}-error`;

  const inputProps = {
    id: inputId,
    name: id,
    onChange,
    className: `${isCheckbox ? '' : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2'} ${className}`,
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
  };

  return (
    <div className={isCheckbox ? 'mt-6' : ''}>
      {!isCheckbox ? (
        <>
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {optional && (
              <span className="ml-1 text-gray-400 text-sm">(optional)</span>
            )}
          </label>
          {isTextarea ? (
            <textarea
              {...(inputProps as any)}
              rows={4}
              value={(value as string) || ''}
            />
          ) : (
            <input
              {...(inputProps as any)}
              type={type}
              value={(value as string) || ''}
            />
          )}
        </>
      ) : (
        <label
          htmlFor={inputId}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer"
        >
          <input
            {...(inputProps as any)}
            type="checkbox"
            checked={(value as boolean) || false}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span>{label}</span>
        </label>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      {children}
    </div>
  );
};
