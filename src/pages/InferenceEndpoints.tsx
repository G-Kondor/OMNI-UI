import Button from '../components/Button';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import Pill from '../components/Pill';

const endpoints = [
  { name: 'llama-70b-chat', model: 'meta-llama/Llama-3.3-70B', home: 'eu-central-1 · 6', edges: 'eu-west 4 · us-east 4', routing: 'KV-cache + load', p95: '48 ms', status: 'Serving', statusColor: 'green' as const },
  { name: 'whisper-large-v3', model: 'openai/whisper-large-v3', home: 'eu-central-1 · 2', edges: 'eu-west 2', routing: 'Latency prefer', p95: '61 ms', status: 'Serving', statusColor: 'green' as const },
  { name: 'embed-e5', model: 'intfloat/e5-mistral', home: 'eu-central-1 · 3', edges: '—', routing: 'Home only', p95: '12 ms', status: 'Serving', statusColor: 'green' as const },
  { name: 'sdxl-turbo', model: 'stabilityai/sdxl-turbo', home: 'eu-central-1 · 1', edges: 'us-east 0', routing: 'Warming', p95: '—', status: 'Degraded', statusColor: 'amber' as const },
];

const statusColors = {
  green: 'text-[#219e66]',
  amber: 'text-[#d9851a]',
};

const tabs = [
  { label: 'All endpoints', variant: 'blue' as const, active: true },
  { label: 'Serving', variant: 'green' as const, active: false },
  { label: 'Degraded', variant: 'amber' as const, active: false },
  { label: 'Cold', variant: 'gray' as const, active: false },
];

export default function InferenceEndpoints() {
  return (
    <div className="p-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:gap-5 h-full">
      <PageHeader
        title="Inference endpoints"
        subtitle="Edge replicas registered as Gateway API InferencePool endpoints — traffic routes by KV-cache and load"
        actions={
          <>
            <Button>What-if preview</Button>
            <Button variant="primary">Register endpoint</Button>
          </>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              tab.active 
                ? 'bg-[#e5edff] text-[#2e6bfa]' 
                : 'bg-white border border-[#e0e5ed] text-[#6b7385] hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
        <span className="text-[#6b7385] text-[10px] font-medium">ENDPOINTS</span>
        
        <div className="border border-[#e0e5ed] rounded-[8px] overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#f5f7fa] border-b border-[#e0e5ed] text-[11px] font-medium text-[#6b7385]">
                <th className="text-left px-3 py-2">Endpoint</th>
                <th className="text-left px-3 py-2">Model</th>
                <th className="text-left px-3 py-2">Home</th>
                <th className="text-left px-3 py-2">Edges</th>
                <th className="text-left px-3 py-2">Routing</th>
                <th className="text-left px-3 py-2">p95</th>
                <th className="text-left px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((row, i) => (
                <tr key={i} className="border-b border-[#e0e5ed] last:border-b-0 text-[12px] hover:bg-gray-50 cursor-pointer">
                  <td className="px-3 py-3 text-[#171c29] font-semibold">{row.name}</td>
                  <td className="px-3 py-3 text-[#171c29]">{row.model}</td>
                  <td className="px-3 py-3 text-[#171c29]">{row.home}</td>
                  <td className="px-3 py-3 text-[#171c29]">{row.edges}</td>
                  <td className="px-3 py-3 text-[#171c29]">{row.routing}</td>
                  <td className="px-3 py-3 text-[#171c29]">{row.p95}</td>
                  <td className={`px-3 py-3 font-semibold ${statusColors[row.statusColor]}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected endpoint details */}
        <div className="bg-[#f7fafc] rounded-[8px] p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#6b7385] text-[10px] font-medium">SELECTED · llama-70b-chat</span>
            <span className="text-[#171c29] text-[14px] font-semibold">InferencePool endpoints</span>
            <span className="text-[#6b7385] text-[12px]">Home pods + edge pods registered. Gateway picks by KV-cache utilization, queue depth, then preferred edge order.</span>
            <span className="text-[#171c29] text-[12px]">Direct ingress: eu-west-1, us-east-1 · ap-southeast-1 via main cluster (legacy)</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#6b7385] text-[10px] font-medium">REPLICA MIX</span>
            <span className="text-[#171c29] text-[13px] font-semibold">Home 6 · eu-west 4 · us-east 4 · ap-se 0 (warming)</span>
            <Pill variant="amber">Spillover armed</Pill>
            <span className="text-[#6b7385] text-[12px]">If eu-west p95 &gt; 80 ms for 30s, shift 50% of new requests to us-east.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
