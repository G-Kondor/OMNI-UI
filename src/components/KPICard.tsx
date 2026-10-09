interface KPICardProps {
  label: string;
  value: string;
  subtitle: string;
  valueColor?: 'green' | 'amber' | 'default';
}

const colorMap = {
  green: 'text-[#219e66]',
  amber: 'text-[#d9851a]',
  default: 'text-[#171c29]',
};

export default function KPICard({ label, value, subtitle, valueColor = 'default' }: KPICardProps) {
  return (
    <div className="bg-white border border-[#e0e5ed] rounded-[10px] px-3 py-3 sm:px-[17px] sm:py-[17px] flex-1 min-w-0 flex flex-col">
      <span className="text-[#6b7385] text-[9px] sm:text-[10px] font-medium uppercase">{label}</span>
      <span className={`text-[20px] sm:text-[28px] font-bold leading-tight sm:leading-[34px] mt-2 sm:mt-[12px] ${colorMap[valueColor]}`}>{value}</span>
      <span className="text-[#6b7385] text-[10px] sm:text-[12px] mt-2 sm:mt-[12px]">{subtitle}</span>
    </div>
  );
}
