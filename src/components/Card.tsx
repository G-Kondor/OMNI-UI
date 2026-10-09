import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-[#e0e5ed] rounded-[10px] p-[16px] ${className}`}>
      {children}
    </div>
  );
}
