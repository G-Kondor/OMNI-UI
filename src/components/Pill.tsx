import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
}

const variantClasses = {
  blue: 'bg-[#e5edff] text-[#2e6bfa]',
  green: 'bg-[#e0f5e8] text-[#219e66]',
  amber: 'bg-[#fff2db] text-[#d9851a]',
  red: 'bg-[#fae8eb] text-[#db3845]',
  gray: 'bg-[#edf0f5] text-[#6b7385]',
};

export default function Pill({ children, variant = 'blue' }: PillProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
