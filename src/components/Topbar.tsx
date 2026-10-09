import { useLayoutContext } from './LayoutContext';

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AIAssistIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" rx="5" fill="url(#paint_assist)"/>
    <path d="M10 5L11.3435 8.6565L15 10L11.3435 11.3435L10 15L8.6565 11.3435L5 10L8.6565 8.6565L10 5Z" fill="white"/>
    <defs>
      <linearGradient id="paint_assist" x1="0" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B6BF5"/>
        <stop offset="1" stopColor="#7C4DFF"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Topbar() {
  const { isAssistOpen, setAssistOpen, setSidebarOpen } = useLayoutContext();

  return (
    <div className="bg-white border-b border-[#E0E5EB] flex items-center h-[56px] px-[20px] gap-[12px] shrink-0">
      {/* Hamburger for mobile */}
      <button 
        className="lg:hidden text-[#6B7280] hover:text-[#171B26] p-1"
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </button>
      
      <span className="font-bold text-[#171B26] text-[16px]">cast</span>
      <div className="flex-1" />
      
      {/* Assist toggle button */}
      <button 
        onClick={() => setAssistOpen(!isAssistOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
          isAssistOpen 
            ? 'bg-[#EEF3FF] text-[#2B6BF5]' 
            : 'bg-[#F5F7FA] text-[#6B7280] hover:bg-[#EEF3FF] hover:text-[#2B6BF5]'
        }`}
        title={isAssistOpen ? 'Close OMNI Assist' : 'Open OMNI Assist'}
      >
        <AIAssistIcon />
        <span className="hidden sm:inline">OMNI Assist</span>
      </button>

      <span className="text-[#6B7280] text-[12px] font-medium hidden sm:block">prod-eks-gpu-eu</span>
      <div className="bg-[#EEF3FF] px-[8px] py-[4px] rounded-full">
        <span className="text-[#2B6BF5] text-[11px] font-medium">OMNI Early Access</span>
      </div>
    </div>
  );
}
