import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const primaryStyles = 'bg-indigo-700 hover:bg-indigo-800 text-white focus:ring-indigo-500';
  const secondaryStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400';

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button className={`${baseStyles} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;