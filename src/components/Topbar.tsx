export default function Topbar() {
  return (
    <div className="bg-white border-b border-[#e0e5ed] flex items-center h-14 px-5 gap-3 shrink-0">
      <span className="font-bold text-[#171c29] text-base">cast</span>
      <div className="flex-1" />
      <span className="text-[#6b7385] text-xs font-medium">prod-eks-gpu-eu</span>
      <div className="bg-[#e5edff] px-2 py-1 rounded-full">
        <span className="text-[#2e6bfa] text-[11px] font-medium">OMNI Early Access</span>
      </div>
    </div>
  );
}
