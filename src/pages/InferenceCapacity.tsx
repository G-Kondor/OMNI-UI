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
  green: 'text-[#21A066]',
  amber: 'text-[#D9851A]',
  blue: 'text-[#2B6BF5]',
  gray: 'text-[#6B7280]',
};

export default function InferenceCapacity() {
  return (
    <div className="p-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:gap-5 h-full">
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

      {/* KPI Cards - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard label="P95 LATENCY" value="48 ms" subtitle="SLO 80 ms · healthy" valueColor="green" />
        <KPICard label="WARM GPU FLOOR" value="12 / 12" subtitle="Edges ready with weights" valueColor="green" />
        <KPICard label="TIME-TO-READY" value="2.4 min" subtitle="Median across edges" />
        <KPICard label="ACTIVE SPILLOVER" value="1 edge" subtitle="eu-west → us-east" valueColor="amber" />
        <KPICard label="LAST DRILL" value="3d ago" subtitle="Passed · p95 52 ms" valueColor="green" />
      </div>

      {/* Main content - responsive layout */}
      <div className="flex flex-col xl:flex-row gap-4 flex-1 min-h-0">
        <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
          <span className="text-[#6B7280] text-[10px] font-medium">REQUEST PATH · LATENCY MATRIX</span>
          <span className="text-[#171B26] text-[13px] font-semibold">Home: eu-central-1 → Preferred edges by p95</span>
          
          <div className="border border-[#E0E5EB] rounded-[8px] overflow-x-auto flex-1">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-[#F5F7FA] border-b border-[#E0E5EB] text-[11px] font-medium text-[#6B7280]">
                  <th className="text-left px-3 py-2 w-[140px]">Edge</th>
                  <th className="text-left px-3 py-2 w-[130px]">Region</th>
                  <th className="text-left px-3 py-2 w-[90px]">p95</th>
                  <th className="text-left px-3 py-2 w-[120px]">Weight ready</th>
                  <th className="text-left px-3 py-2 w-[100px]">Warm floor</th>
                  <th className="text-left px-3 py-2 w-[90px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {latencyData.map((row, i) => (
                  <tr key={i} className="border-b border-[#E0E5EB] last:border-b-0 text-[12px]">
                    <td className="px-3 py-3 text-[#171B26]">{row.edge}</td>
                    <td className="px-3 py-3 text-[#171B26]">{row.region}</td>
                    <td className="px-3 py-3 text-[#171B26]">{row.p95}</td>
                    <td className="px-3 py-3 text-[#171B26]">{row.weight}</td>
                    <td className="px-3 py-3 text-[#171B26]">{row.floor}</td>
                    <td className={`px-3 py-3 font-semibold ${statusColors[row.statusColor]}`}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="xl:w-[380px] flex flex-col gap-3 shrink-0">
          <span className="text-[#6B7280] text-[10px] font-medium">SERVICE LEVEL</span>
          <span className="text-[#171B26] text-[14px] font-semibold">Inference SLO</span>
          <span className="text-[#6B7280] text-[12px]">p95 &lt; 80 ms · availability 99.9% (target)</span>
          
          <div className="bg-[#E5EBF2] rounded-full h-[10px] w-full">
            <div className="bg-[#21A066] h-[10px] rounded-full" style={{ width: '85%' }} />
          </div>
          
          <span className="text-[#6B7280] text-[12px]">Current window: 99.94% · 6 breaches in 24h (all during spillover)</span>
          
          <span className="text-[#6B7280] text-[10px] font-medium mt-3">ROUTING POLICY</span>
          <span className="text-[#171B26] text-[12px]">Preferred: eu-west-1 → us-east-1 → ap-southeast-1</span>
          <span className="text-[#6B7280] text-[12px]">Spillover when preferred p95 &gt; 80 ms or warm floor &lt; 50%</span>
          <span className="text-[#171B26] text-[12px]">Direct ingress: enabled on eu-west-1, us-east-1</span>
          
          <Button>Edit routing policy</Button>
        </Card>
      </div>

      {/* Bottom cards - responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="flex flex-col gap-3">
          <span className="text-[#6B7280] text-[10px] font-medium">ENDPOINTS</span>
          <span className="text-[#171B26] text-[14px] font-semibold">llama-70b-chat · Gateway API InferencePool</span>
          <span className="text-[#6B7280] text-[12px]">Replicas: home 6 · eu-west 4 · us-east 4 · KV-cache aware routing on</span>
          <Pill variant="green">Serving</Pill>
        </Card>

        <Card className="flex flex-col gap-3">
          <span className="text-[#6B7280] text-[10px] font-medium">WARM GPU FLOORS</span>
          <span className="text-[#171B26] text-[14px] font-semibold">policy-inference-prod</span>
          <span className="text-[#6B7280] text-[12px]">Keep 4× H100 in eu-west-1 and us-east-1 with llama-70b weights on NVMe. Evictor will not drain below floor.</span>
          <Pill variant="blue">Enforced</Pill>
        </Card>
      </div>
    </div>
  );
}
