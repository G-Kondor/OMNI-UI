import Button from '../components/Button';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';

const drillHistory = [
  { drill: 'drill-2026-10-06', triggered: 'Scheduled', scenario: 'Cordón eu-west-1', p95: '52 ms', ttc: '2.1 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-09-22', triggered: 'Manual', scenario: 'Kill us-east ingress', p95: '58 ms', ttc: '2.8 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-09-08', triggered: 'Scheduled', scenario: 'Warm floor 50% stress', p95: '71 ms', ttc: '3.4 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-10-20', triggered: 'Scheduled', scenario: 'Cordón eu-west-1', p95: '—', ttc: '—', result: 'Pending', resultColor: 'amber' as const, state: 'Ready to preview', stateColor: 'blue' as const },
];

const colors = {
  green: 'text-[#219e66]',
  amber: 'text-[#d9851a]',
  blue: 'text-[#2e6bfa]',
};

export default function FailoverDrills() {
  return (
    <div className="px-[24px] py-[20px] flex flex-col gap-[20px] h-full">
      <PageHeader
        title="Failover drills & SLO"
        subtitle="Prove the guarantee: scheduled drills, p95 and time-to-capacity reports, approval before execute"
        actions={
          <>
            <Button>Export report</Button>
            <Button variant="primary">Schedule drill</Button>
          </>
        }
      />

      <div className="flex gap-[12px]">
        <div className="bg-white border border-[#e0e5ed] rounded-[10px] px-[17px] py-[17px] flex-1 min-w-0 flex flex-col">
          <span className="text-[#6b7385] text-[10px] font-medium">SLO AVAILABILITY</span>
          <span className="text-[28px] font-bold text-[#219e66] leading-[34px] mt-[12px]">99.94%</span>
          <span className="text-[#6b7385] text-[12px] mt-[12px]">Target 99.9%</span>
        </div>
        <div className="bg-white border border-[#e0e5ed] rounded-[10px] px-[17px] py-[17px] flex-1 min-w-0 flex flex-col">
          <span className="text-[#6b7385] text-[10px] font-medium">DRILL SUCCESS</span>
          <span className="text-[28px] font-bold text-[#219e66] leading-[34px] mt-[12px]">4 / 4</span>
          <span className="text-[#6b7385] text-[12px] mt-[12px]">Last 90 days</span>
        </div>
        <div className="bg-white border border-[#e0e5ed] rounded-[10px] px-[17px] py-[17px] flex-1 min-w-0 flex flex-col">
          <span className="text-[#6b7385] text-[10px] font-medium">MEDIAN TTC</span>
          <span className="text-[28px] font-bold text-[#171c29] leading-[34px] mt-[12px]">2.4 min</span>
          <span className="text-[#6b7385] text-[12px] mt-[12px]">Time-to-capacity</span>
        </div>
        <div className="bg-white border border-[#e0e5ed] rounded-[10px] px-[17px] py-[17px] flex-1 min-w-0 flex flex-col">
          <span className="text-[#6b7385] text-[10px] font-medium">WORST P95</span>
          <span className="text-[28px] font-bold text-[#d9851a] leading-[34px] mt-[12px]">52 ms</span>
          <span className="text-[#6b7385] text-[12px] mt-[12px]">During us-east spillover</span>
        </div>
      </div>

      <Card className="flex-1 flex flex-col gap-[12px] overflow-hidden">
        <span className="text-[#6b7385] text-[10px] font-medium">DRILL HISTORY</span>
        <span className="text-[#6b7385] text-[13px]">Preview → approve → execute — same pattern as Rebalancer</span>
        
        <div className="border border-[#e0e5ed] rounded-[8px] overflow-hidden">
          <div className="bg-[#f5f7fa] border-b border-[#e0e5ed] flex items-center h-[36px] px-[10px] text-[11px] font-medium text-[#6b7385]">
            <span className="w-[180px]">Drill</span>
            <span className="w-[110px]">Triggered</span>
            <span className="w-[200px]">Scenario</span>
            <span className="w-[80px]">p95</span>
            <span className="w-[90px]">TTC</span>
            <span className="w-[100px]">Result</span>
            <span className="w-[160px]">State</span>
          </div>
          {drillHistory.map((row, i) => (
            <div key={i} className="border-b border-[#e0e5ed] last:border-b-0 flex items-center h-[48px] px-[10px] text-[12px]">
              <span className="w-[180px] text-[#171c29] font-semibold">{row.drill}</span>
              <span className="w-[110px] text-[#171c29] font-semibold">{row.triggered}</span>
              <span className="w-[200px] text-[#171c29] font-semibold">{row.scenario}</span>
              <span className="w-[80px] text-[#171c29] font-semibold">{row.p95}</span>
              <span className="w-[90px] text-[#171c29] font-semibold">{row.ttc}</span>
              <span className={`w-[100px] font-semibold ${colors[row.resultColor]}`}>{row.result}</span>
              <span className={`w-[160px] font-semibold ${colors[row.stateColor]}`}>{row.state}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#e5edff] rounded-[8px] h-[72px] flex items-center justify-between px-[16px]">
          <span className="text-[#171c29] text-[13px] font-medium">
            Ready to preview: drill-2026-10-20 — cordon eu-west-1 for 10 min. Expected spillover to us-east. Warm floor stays ≥ 4 GPUs.
          </span>
          <div className="flex gap-[8px]">
            <Button>Discard</Button>
            <Button variant="primary">Execute drill</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
