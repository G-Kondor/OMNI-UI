interface KPICardProps {
  label: string;
  value: string;
  subtitle: string;
  valueColor?: 'green' | 'amber' | 'default';
}

const colorMap = {
  green: 'text-[#21A066]',
  amber: 'text-[#D9851A]',
  default: 'text-[#171B26]',
};

export default function KPICard({ label, value, subtitle, valueColor = 'default' }: KPICardProps) {
  return (
    <div className="bg-white border border-[#E0E5EB] rounded-[10px] px-3 py-3 sm:px-[17px] sm:py-[17px] flex-1 min-w-0 flex flex-col">
      <span className="text-[#6B7280] text-[9px] sm:text-[10px] font-medium uppercase">{label}</span>
      <span className={`text-[20px] sm:text-[28px] font-bold leading-tight sm:leading-[34px] mt-2 sm:mt-[12px] ${colorMap[valueColor]}`}>{value}</span>
      <span className="text-[#6B7280] text-[10px] sm:text-[12px] mt-2 sm:mt-[12px]">{subtitle}</span>
    </div>
  );
}
