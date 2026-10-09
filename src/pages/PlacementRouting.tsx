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
  green: 'text-[#219e66]',
  amber: 'text-[#d9851a]',
  gray: 'text-[#6b7385]',
  red: 'text-[#db3845]',
};

export default function PlacementRouting() {
  return (
    <div className="p-6 flex flex-col gap-5 h-full">
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

      <div className="flex gap-4">
        <Card className="flex-1 flex flex-col gap-3">
          <span className="text-[#6b7385] text-[10px] font-medium">PLACEMENT WEIGHTS</span>
          <span className="text-[#171c29] text-[13px] font-semibold">Latency 45% · Warm floor 25% · Landed cost 20% · Availability 10%</span>
          <span className="text-[#6b7385] text-xs">Price is no longer the sole input. Egress and data locality feed landed cost.</span>
        </Card>

        <Card className="flex-1 flex flex-col gap-3">
          <span className="text-[#6b7385] text-[10px] font-medium">HARD CONSTRAINTS</span>
          <span className="text-[#171c29] text-[13px] font-semibold">Max p95 80 ms · Min warm floor 50% · No training on edges</span>
          <span className="text-[#6b7385] text-xs">Violations block placement instead of soft-warning.</span>
        </Card>

        <Card className="flex-1 flex flex-col gap-3">
          <span className="text-[#6b7385] text-[10px] font-medium">WHAT-IF PREVIEW</span>
          <span className="text-[#171c29] text-[13px] font-semibold">eu-west H100 stockout → us-east</span>
          <span className="text-[#6b7385] text-xs">Est. p95 52 ms · +$0.04/GPU-h egress · warm floor holds</span>
          <Pill variant="green">Recommended</Pill>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
        <span className="text-[#6b7385] text-[10px] font-medium">LATENCY × LANDED COST MATRIX</span>
        <span className="text-[#171c29] text-sm font-semibold">Candidate edges for llama-70b-chat when home is constrained</span>
        
        <div className="border border-[#e0e5ed] rounded-lg overflow-hidden flex-1">
          <div className="bg-[#f5f7fa] border-b border-[#e0e5ed] flex items-center h-9 px-2 text-[11px] font-medium text-[#6b7385]">
            <span className="w-[140px]">Edge</span>
            <span className="w-[120px]">p95 to users</span>
            <span className="w-[100px]">Warm floor</span>
            <span className="w-[110px]">Compute $/h</span>
            <span className="w-[100px]">Egress $/h</span>
            <span className="w-[120px]">Data locality</span>
            <span className="w-[80px]">Score</span>
            <span className="w-[120px]">Action</span>
          </div>
          {matrixData.map((row, i) => (
            <div key={i} className="border-b border-[#e0e5ed] last:border-b-0 flex items-center h-12 px-2 text-xs">
              <span className="w-[140px] text-[#171c29] font-semibold">{row.edge}</span>
              <span className="w-[120px] text-[#171c29] font-semibold">{row.p95}</span>
              <span className="w-[100px] text-[#171c29] font-semibold">{row.floor}</span>
              <span className="w-[110px] text-[#171c29] font-semibold">{row.compute}</span>
              <span className="w-[100px] text-[#171c29] font-semibold">{row.egress}</span>
              <span className="w-[120px] text-[#171c29] font-semibold">{row.locality}</span>
              <span className="w-[80px] text-[#171c29] font-semibold">{row.score}</span>
              <span className={`w-[120px] font-semibold ${actionColors[row.actionColor]}`}>{row.action}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
