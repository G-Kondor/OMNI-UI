import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
}

const variantClasses = {
  blue: 'bg-[#EEF3FF] text-[#2B6BF5]',
  green: 'bg-[#E0F5E8] text-[#21A066]',
  amber: 'bg-[#FFF2DB] text-[#D9851A]',
  red: 'bg-[#FAE8EB] text-[#DB3845]',
  gray: 'bg-[#EDF0F5] text-[#6B7280]',
};

export default function Pill({ children, variant = 'blue' }: PillProps) {
  return (
    <span className={`px-[8px] py-[4px] rounded-full text-[11px] font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
