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
  { label: 'All endpoints', variant: 'blue' as const },
  { label: 'Serving', variant: 'green' as const },
  { label: 'Degraded', variant: 'amber' as const },
  { label: 'Cold', variant: 'gray' as const },
];

export default function InferenceEndpoints() {
  return (
    <div className="px-[24px] py-[20px] flex flex-col gap-[20px] h-full">
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

      <div className="flex gap-[8px]">
        {tabs.map((tab, i) => (
          <Pill key={i} variant={tab.variant}>{tab.label}</Pill>
        ))}
      </div>

      <Card className="flex-1 flex flex-col gap-[12px] overflow-hidden">
        <span className="text-[#6b7385] text-[10px] font-medium">ENDPOINTS</span>
        
        <div className="border border-[#e0e5ed] rounded-[8px] overflow-hidden">
          <div className="bg-[#f5f7fa] border-b border-[#e0e5ed] flex items-center h-[36px] px-[12px] text-[11px] font-medium text-[#6b7385]">
            <span className="w-[180px]">Endpoint</span>
            <span className="w-[220px]">Model</span>
            <span className="w-[140px]">Home</span>
            <span className="w-[180px]">Edges</span>
            <span className="w-[140px]">Routing</span>
            <span className="w-[80px]">p95</span>
            <span className="w-[100px]">Status</span>
          </div>
          {endpoints.map((row, i) => (
            <div key={i} className="border-b border-[#e0e5ed] last:border-b-0 flex items-center h-[48px] px-[12px] text-[12px] hover:bg-gray-50 cursor-pointer">
              <span className="w-[180px] text-[#171c29] font-semibold">{row.name}</span>
              <span className="w-[220px] text-[#171c29]">{row.model}</span>
              <span className="w-[140px] text-[#171c29]">{row.home}</span>
              <span className="w-[180px] text-[#171c29]">{row.edges}</span>
              <span className="w-[140px] text-[#171c29]">{row.routing}</span>
              <span className="w-[80px] text-[#171c29]">{row.p95}</span>
              <span className={`w-[100px] font-semibold ${statusColors[row.statusColor]}`}>{row.status}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#f7fafc] rounded-[8px] p-[16px] flex gap-[16px]">
          <div className="flex-1 flex flex-col gap-[8px]">
            <span className="text-[#6b7385] text-[10px] font-medium">SELECTED · llama-70b-chat</span>
            <span className="text-[#171c29] text-[14px] font-semibold">InferencePool endpoints</span>
            <span className="text-[#6b7385] text-[12px]">Home pods + edge pods registered. Gateway picks by KV-cache utilization, queue depth, then preferred edge order.</span>
            <span className="text-[#171c29] text-[12px]">Direct ingress: eu-west-1, us-east-1 · ap-southeast-1 via main cluster (legacy)</span>
          </div>
          <div className="flex-1 flex flex-col gap-[8px]">
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
