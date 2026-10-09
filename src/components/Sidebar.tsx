import { NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  indent?: boolean;
  onClick?: () => void;
}

function NavItem({ to, label, indent = false, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-[12px] py-[8px] rounded-[8px] text-[13px] w-full ${
          isActive
            ? 'bg-[#242b3d] text-white font-semibold'
            : 'text-[#8c94a6] hover:bg-[#1e2433]'
        } ${indent ? 'pl-[24px]' : ''}`
      }
    >
      {label}
    </NavLink>
  );
}

interface SidebarProps {
  onClose?: () => void;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const isInferenceSection = ['/', '/endpoints', '/placement', '/failover', '/capacity-map'].includes(location.pathname);

  return (
    <div className="bg-[#121724] w-[220px] h-full shrink-0 flex flex-col gap-[4px] px-[12px] py-[16px] overflow-y-auto">
      {/* Close button for mobile */}
      {onClose && (
        <button 
          onClick={onClose}
          className="lg:hidden self-end text-[#8c94a6] hover:text-white p-1 mb-2"
        >
          <CloseIcon />
        </button>
      )}

      <span className="text-[#8c94a6] text-[10px] font-medium px-[12px]">ORGANIZATION</span>
      <NavItem to="/overview" label="Overview" onClick={onClose} />
      <NavItem to="/clusters" label="Clusters" onClick={onClose} />
      
      <span className="text-[#8c94a6] text-[10px] font-medium px-[12px] mt-[4px]">CLUSTER</span>
      <NavItem to="/dashboard" label="Dashboard" onClick={onClose} />
      <NavItem to="/autoscaler" label="Autoscaler" onClick={onClose} />
      <NavItem to="/edge-locations" label="Edge locations" onClick={onClose} />
      
      {/* Inference section with expandable sub-items */}
      <NavLink
        to="/"
        onClick={onClose}
        className={`flex items-center px-[12px] py-[8px] rounded-[8px] text-[13px] w-full ${
          isInferenceSection
            ? 'bg-[#242b3d] text-white font-semibold'
            : 'text-[#8c94a6] hover:bg-[#1e2433]'
        }`}
      >
        Inference
      </NavLink>
      <NavItem to="/endpoints" label="Endpoints" indent onClick={onClose} />
      <NavItem to="/placement" label="Placement & routing" indent onClick={onClose} />
      <NavItem to="/failover" label="Failover & SLO" indent onClick={onClose} />
      <NavItem to="/capacity-map" label="Capacity map" indent onClick={onClose} />
      
      <NavItem to="/workloads" label="Workloads" onClick={onClose} />
      <NavItem to="/nodes" label="Nodes" onClick={onClose} />
      <NavItem to="/rebalancer" label="Rebalancer" onClick={onClose} />
    </div>
  );
}
