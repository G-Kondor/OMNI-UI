import Button from '../components/Button';
import Card from '../components/Card';
import KPICard from '../components/KPICard';
import PageHeader from '../components/PageHeader';
import Pill from '../components/Pill';

const latencyData = [
  { edge: 'edge-eu-west', region: 'eu-west-1', p95: '41 ms', weight: '7.2 / 8 GB', floor: '4 / 4', status: 'Healthy', statusColor: 'green' as const },
  { edge: 'edge-us-east', region: 'us-east-1', p95: '92 ms', weight: '7.8 / 8 GB', floor: '4 / 4', status: 'Spillover', statusColor: 'amber' as const },
  { edge: 'edge-ap-se', region: 'ap-southeast-1', p95: '118 ms', weight: '3.1 / 8 GB', floor: '2 / 4', status: 'Warming', statusColor: 'blue' as const },
  { edge: 'edge-us-west', region: 'us-west-2', p95: '—', weight: '0 / 8 GB', floor: '0 / 2', status: 'Cold', statusColor: 'gray' as const },
];

const statusColors = {
  green: 'text-[#219e66]',
  amber: 'text-[#d9851a]',
  blue: 'text-[#2e6bfa]',
  gray: 'text-[#6b7385]',
};

export default function InferenceCapacity() {
  return (
    <div className="p-6 flex flex-col gap-5 h-full">
      <PageHeader
        title="Inference capacity"
        subtitle="Keep customer-facing inference inside SLO when home-region GPUs run out"
        actions={
          <>
            <Button>Run failover drill</Button>
            <Button variant="primary">New endpoint</Button>
          </>
        }
      />

      <div className="flex gap-3">
        <KPICard label="P95 LATENCY" value="48 ms" subtitle="SLO 80 ms · healthy" valueColor="green" />
        <KPICard label="WARM GPU FLOOR" value="12 / 12" subtitle="Edges ready with weights" valueColor="green" />
        <KPICard label="TIME-TO-READY" value="2.4 min" subtitle="Median across edges" />
        <KPICard label="ACTIVE SPILLOVER" value="1 edge" subtitle="eu-west → us-east" valueColor="amber" />
        <KPICard label="LAST DRILL" value="3d ago" subtitle="Passed · p95 52 ms" valueColor="green" />
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
          <span className="text-[#6b7385] text-[10px] font-medium">REQUEST PATH · LATENCY MATRIX</span>
          <span className="text-[#171c29] text-[13px] font-semibold">Home: eu-central-1 → Preferred edges by p95</span>
          
          <div className="border border-[#e0e5ed] rounded-lg overflow-hidden flex-1">
            <div className="bg-[#f5f7fa] border-b border-[#e0e5ed] flex items-center h-9 px-3 text-[11px] font-medium text-[#6b7385]">
              <span className="w-[140px]">Edge</span>
              <span className="w-[130px]">Region</span>
              <span className="w-[90px]">p95</span>
              <span className="w-[120px]">Weight ready</span>
              <span className="w-[100px]">Warm floor</span>
              <span className="w-[90px]">Status</span>
            </div>
            {latencyData.map((row, i) => (
              <div key={i} className="border-b border-[#e0e5ed] last:border-b-0 flex items-center h-12 px-3 text-xs">
                <span className="w-[140px] text-[#171c29]">{row.edge}</span>
                <span className="w-[130px] text-[#171c29]">{row.region}</span>
                <span className="w-[90px] text-[#171c29]">{row.p95}</span>
                <span className="w-[120px] text-[#171c29]">{row.weight}</span>
                <span className="w-[100px] text-[#171c29]">{row.floor}</span>
                <span className={`w-[90px] font-semibold ${statusColors[row.statusColor]}`}>{row.status}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="w-[420px] flex flex-col gap-3 shrink-0">
          <span className="text-[#6b7385] text-[10px] font-medium">SERVICE LEVEL</span>
          <span className="text-[#171c29] text-sm font-semibold">Inference SLO</span>
          <span className="text-[#6b7385] text-xs">p95 &lt; 80 ms · availability 99.9% (target)</span>
          
          <div className="bg-[#e5ebf2] rounded-full h-2.5 w-full">
            <div className="bg-[#219e66] h-2.5 rounded-full" style={{ width: '85%' }} />
          </div>
          
          <span className="text-[#6b7385] text-xs">Current window: 99.94% · 6 breaches in 24h (all during spillover)</span>
          
          <span className="text-[#6b7385] text-[10px] font-medium mt-2">ROUTING POLICY</span>
          <span className="text-[#171c29] text-xs">Preferred: eu-west-1 → us-east-1 → ap-southeast-1</span>
          <span className="text-[#6b7385] text-xs">Spillover when preferred p95 &gt; 80 ms or warm floor &lt; 50%</span>
          <span className="text-[#171c29] text-xs">Direct ingress: enabled on eu-west-1, us-east-1</span>
          
          <Button>Edit routing policy</Button>
        </Card>
      </div>

      <div className="flex gap-4">
        <Card className="flex-1 flex flex-col gap-3">
          <span className="text-[#6b7385] text-[10px] font-medium">ENDPOINTS</span>
          <span className="text-[#171c29] text-sm font-semibold">llama-70b-chat · Gateway API InferencePool</span>
          <span className="text-[#6b7385] text-xs">Replicas: home 6 · eu-west 4 · us-east 4 · KV-cache aware routing on</span>
          <Pill variant="green">Serving</Pill>
        </Card>

        <Card className="flex-1 flex flex-col gap-3">
          <span className="text-[#6b7385] text-[10px] font-medium">WARM GPU FLOORS</span>
          <span className="text-[#171c29] text-sm font-semibold">policy-inference-prod</span>
          <span className="text-[#6b7385] text-xs">Keep 4× H100 in eu-west-1 and us-east-1 with llama-70b weights on NVMe. Evictor will not drain below floor.</span>
          <Pill variant="blue">Enforced</Pill>
        </Card>
      </div>
    </div>
  );
}
