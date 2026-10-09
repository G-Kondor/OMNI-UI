import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({ children, variant = 'secondary', onClick }: ButtonProps) {
  const baseClasses = 'px-[12px] py-[6px] rounded-[8px] text-[13px] font-medium cursor-pointer transition-colors';
  const variantClasses = variant === 'primary'
    ? 'bg-[#2B6BF5] text-white hover:bg-[#2459D4]'
    : 'bg-white border border-[#E0E5EB] text-[#171B26] hover:bg-gray-50';

  return (
    <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
      {children}
    </button>
  );
}
