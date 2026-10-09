import Button from '../components/Button';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import Pill from '../components/Pill';

const matrixData = [
  { edge: 'eu-west-1', p95: '41 ms', floor: '4/4', compute: '2.10', egress: '0.02', locality: 'EU OK', score: '92', action: 'Prefer', actionColor: 'green' as const },
  { edge: 'us-east-1', p95: '92 ms', floor: '4/4', compute: '1.85', egress: '0.08', locality: 'EU transit', score: '71', action: 'Spillover', actionColor: 'amber' as const },
  { edge: 'ap-southeast-1', p95: '118 ms', floor: '2/4', compute: '1.70', egress: '0.11', locality: 'EU transit', score: '54', action: 'Hold', actionColor: 'gray' as const },
  { edge: 'us-west-2', p95: '—', floor: '0/2', compute: '1.60', egress: '0.09', locality: 'Cold start', score: '31', action: 'Block', actionColor: 'red' as const },
];

const actionColors = {
  green: 'text-[#21A066]',
  amber: 'text-[#D9851A]',
  gray: 'text-[#6B7280]',
  red: 'text-[#DB3845]',
};

export default function PlacementRouting() {
  return (
    <div className="p-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:gap-5 h-full">
      <PageHeader
        title="Placement & routing"
        subtitle="Autoscaler places by latency and landed cost — not price alone. Preview before you enforce."
        actions={
          <>
            <Button>Run what-if</Button>
            <Button variant="primary">Save policy</Button>
          </>
        }
      />

      {/* Top cards - responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col gap-3">
          <span className="text-[#6B7280] text-[10px] font-medium">PLACEMENT WEIGHTS</span>
          <span className="text-[#171B26] text-[13px] font-semibold">Latency 45% · Warm floor 25% · Landed cost 20% · Availability 10%</span>
          <span className="text-[#6B7280] text-[12px]">Price is no longer the sole input. Egress and data locality feed landed cost.</span>
        </Card>

        <Card className="flex flex-col gap-3">
          <span className="text-[#6B7280] text-[10px] font-medium">HARD CONSTRAINTS</span>
          <span className="text-[#171B26] text-[13px] font-semibold">Max p95 80 ms · Min warm floor 50% · No training on edges</span>
          <span className="text-[#6B7280] text-[12px]">Violations block placement instead of soft-warning.</span>
        </Card>

        <Card className="flex flex-col gap-3">
          <span className="text-[#6B7280] text-[10px] font-medium">WHAT-IF PREVIEW</span>
          <span className="text-[#171B26] text-[13px] font-semibold">eu-west H100 stockout → us-east</span>
          <span className="text-[#6B7280] text-[12px]">Est. p95 52 ms · +$0.04/GPU-h egress · warm floor holds</span>
          <Pill variant="green">Recommended</Pill>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
        <span className="text-[#6B7280] text-[10px] font-medium">LATENCY × LANDED COST MATRIX</span>
        <span className="text-[#171B26] text-[14px] font-semibold">Candidate edges for llama-70b-chat when home is constrained</span>
        
        <div className="border border-[#E0E5EB] rounded-[8px] overflow-x-auto flex-1">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#F5F7FA] border-b border-[#E0E5EB] text-[11px] font-medium text-[#6B7280]">
                <th className="text-left px-3 py-2">Edge</th>
                <th className="text-left px-3 py-2">p95 to users</th>
                <th className="text-left px-3 py-2">Warm floor</th>
                <th className="text-left px-3 py-2">Compute $/h</th>
                <th className="text-left px-3 py-2">Egress $/h</th>
                <th className="text-left px-3 py-2">Data locality</th>
                <th className="text-left px-3 py-2">Score</th>
                <th className="text-left px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row, i) => (
                <tr key={i} className="border-b border-[#E0E5EB] last:border-b-0 text-[12px]">
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.edge}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.p95}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.floor}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.compute}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.egress}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.locality}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.score}</td>
                  <td className={`px-3 py-3 font-semibold ${actionColors[row.actionColor]}`}>{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
