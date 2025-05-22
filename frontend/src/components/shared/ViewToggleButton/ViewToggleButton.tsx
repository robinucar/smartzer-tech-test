import React from 'react';
import clsx from 'clsx';

interface ViewToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({
  selected = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...props}
      className={clsx(
        'px-4 py-2 mx-1 border font-bold cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black',
        selected
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-black hover:bg-gray-100',
        className,
      )}
    >
      {children}
    </button>
  );
};
