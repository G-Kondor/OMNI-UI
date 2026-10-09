import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  indent?: boolean;
}

function NavItem({ to, label, indent = false }: NavItemProps) {
  return (
    <NavLink
      to={to}
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

export default function Sidebar() {
  return (
    <div className="bg-[#121724] w-[220px] shrink-0 flex flex-col gap-[4px] px-[12px] py-[16px] overflow-y-auto">
      <span className="text-[#8c94a6] text-[10px] font-medium px-[12px]">ORGANIZATION</span>
      <NavItem to="/overview" label="Overview" />
      <NavItem to="/clusters" label="Clusters" />
      
      <span className="text-[#8c94a6] text-[10px] font-medium px-[12px] mt-[4px]">CLUSTER</span>
      <NavItem to="/dashboard" label="Dashboard" />
      <NavItem to="/autoscaler" label="Autoscaler" />
      <NavItem to="/edge-locations" label="Edge locations" />
      <NavItem to="/" label="Inference" />
      <NavItem to="/endpoints" label="Endpoints" indent />
      <NavItem to="/placement" label="Placement & routing" indent />
      <NavItem to="/failover" label="Failover & SLO" indent />
      <NavItem to="/capacity-map" label="Capacity map" indent />
      <NavItem to="/workloads" label="Workloads" />
      <NavItem to="/nodes" label="Nodes" />
      <NavItem to="/rebalancer" label="Rebalancer" />
    </div>
  );
}
