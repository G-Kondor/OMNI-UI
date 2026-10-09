import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AssistChat from './AssistChat';
import { LayoutContext } from './LayoutContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const screenConfig: Record<string, { contextChip: string; suggestedPrompts: { text: string }[] }> = {
  '/': {
    contextChip: 'Capacity',
    suggestedPrompts: [
      { text: 'Spill traffic to eu-west-1 if p95 > 40ms' },
      { text: 'Raise warm floor to 6' },
      { text: 'Show cheapest SLO-safe region' },
      { text: 'Why is us-east-1 in spillover?' },
    ],
  },
  '/endpoints': {
    contextChip: 'Endpoints',
    suggestedPrompts: [
      { text: 'Register Tokyo as InferencePool endpoint' },
      { text: 'Drain us-east-1 replica' },
      { text: 'What-if: +20% traffic' },
      { text: 'Why is sdxl-turbo degraded?' },
    ],
  },
  '/placement': {
    contextChip: 'Routing',
    suggestedPrompts: [
      { text: 'Prefer latency under 50ms' },
      { text: 'Optimize for landed $/GPU-h' },
      { text: 'Preview switch to Ireland Spot' },
      { text: 'Block edges with EU transit' },
    ],
  },
  '/failover': {
    contextChip: 'Drills',
    suggestedPrompts: [
      { text: 'Schedule drill for eu-central-1' },
      { text: 'Export last SLO report' },
      { text: 'Approve failover to Tokyo' },
      { text: 'Preview drill-2026-10-20' },
    ],
  },
  '/capacity-map': {
    contextChip: 'Map',
    suggestedPrompts: [
      { text: 'Review 3 switch offers' },
      { text: 'Move home to Frankfurt' },
      { text: 'Dismiss offers under $500/mo' },
      { text: 'Show pins within 50 ms p95' },
    ],
  },
};

const defaultMessages = [
  {
    id: '1',
    type: 'user' as const,
    text: 'Spill traffic to eu-west-1 if p95 > 40ms',
    timestamp: 'Today · 18:42',
  },
  {
    id: '2',
    type: 'assistant' as const,
    text: 'Queued spillover rule · eu-central-1 → eu-west-1 when p95 > 40 ms for 30s. ETA 90s · approval not required.',
    status: { label: 'Rule active', variant: 'active' as const },
    eta: 'ETA 90s',
    actions: [{ label: 'Undo' }],
  },
  {
    id: '3',
    type: 'user' as const,
    text: 'Raise warm floor to 6',
  },
  {
    id: '4',
    type: 'assistant' as const,
    text: 'Warm floor 4 → 6× H100 on eu-west-1 · +$1.9k/mo. Sent to platform-oncall for approval.',
    status: { label: 'Pending approval', variant: 'pending' as const },
    actions: [{ label: 'View' }],
  },
];

const defaultActionsTaken = [
  { label: 'Spillover rule · eu-west-1', status: 'active' as const },
  { label: 'Warm floor 6 · pending', status: 'pending' as const },
];

export default function Layout() {
  const [isAssistOpen, setAssistOpen] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const currentPath = location.pathname;
  const config = screenConfig[currentPath] || screenConfig['/'];

  return (
    <LayoutContext.Provider value={{ isAssistOpen, setAssistOpen, isSidebarOpen, setSidebarOpen }}>
      <div className="h-full w-full bg-[#f6f7f9] flex flex-col">
        <Topbar />
        <div className="flex flex-1 overflow-hidden relative">
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out
            lg:transform-none
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Assist panel - Desktop: static, Tablet/Mobile: overlay */}
          <div className={`
            hidden xl:block
            ${isAssistOpen ? '' : 'xl:hidden'}
          `}>
            <AssistChat
              contextChip={config.contextChip}
              suggestedPrompts={config.suggestedPrompts}
              messages={defaultMessages}
              actionsTaken={defaultActionsTaken}
              isOpen={isAssistOpen}
              onToggle={() => setAssistOpen(false)}
            />
          </div>

          {/* Mobile/Tablet Assist overlay */}
          {isAssistOpen && (
            <div className="fixed inset-0 z-50 xl:hidden">
              <div 
                className="absolute inset-0 bg-black/30"
                onClick={() => setAssistOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-[340px] max-w-[90vw] bg-white shadow-xl">
                <AssistChat
                  contextChip={config.contextChip}
                  suggestedPrompts={config.suggestedPrompts}
                  messages={defaultMessages}
                  actionsTaken={defaultActionsTaken}
                  isOpen={true}
                  onToggle={() => setAssistOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 overflow-auto bg-[#f6f7f9]">
            <Outlet />
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
