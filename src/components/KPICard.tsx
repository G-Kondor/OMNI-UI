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
    <div className="bg-white border border-[#e0e5ed] rounded-[10px] p-4 flex-1 min-w-0 flex flex-col gap-3">
      <span className="text-[#6b7385] text-[10px] font-medium uppercase">{label}</span>
      <span className={`text-[28px] font-bold ${colorMap[valueColor]}`}>{value}</span>
      <span className="text-[#6b7385] text-xs">{subtitle}</span>
    </div>
  );
}
