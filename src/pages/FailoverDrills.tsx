import Button from '../components/Button';
import Card from '../components/Card';
import KPICard from '../components/KPICard';
import PageHeader from '../components/PageHeader';

const drillHistory = [
  { drill: 'drill-2026-10-06', triggered: 'Scheduled', scenario: 'Cordón eu-west-1', p95: '52 ms', ttc: '2.1 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-09-22', triggered: 'Manual', scenario: 'Kill us-east ingress', p95: '58 ms', ttc: '2.8 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-09-08', triggered: 'Scheduled', scenario: 'Warm floor 50% stress', p95: '71 ms', ttc: '3.4 min', result: 'Pass', resultColor: 'green' as const, state: 'Completed', stateColor: 'green' as const },
  { drill: 'drill-2026-10-20', triggered: 'Scheduled', scenario: 'Cordón eu-west-1', p95: '—', ttc: '—', result: 'Pending', resultColor: 'amber' as const, state: 'Ready to preview', stateColor: 'blue' as const },
];

const colors = {
  green: 'text-[#21A066]',
  amber: 'text-[#D9851A]',
  blue: 'text-[#2B6BF5]',
};

export default function FailoverDrills() {
  return (
    <div className="p-4 sm:px-6 sm:py-5 flex flex-col gap-4 sm:gap-5 h-full">
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

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="SLO AVAILABILITY" value="99.94%" subtitle="Target 99.9%" valueColor="green" />
        <KPICard label="DRILL SUCCESS" value="4 / 4" subtitle="Last 90 days" valueColor="green" />
        <KPICard label="MEDIAN TTC" value="2.4 min" subtitle="Time-to-capacity" />
        <KPICard label="WORST P95" value="52 ms" subtitle="During us-east spillover" valueColor="amber" />
      </div>

      <Card className="flex-1 flex flex-col gap-3 overflow-hidden">
        <span className="text-[#6B7280] text-[10px] font-medium">DRILL HISTORY</span>
        <span className="text-[#6B7280] text-[13px]">Preview → approve → execute — same pattern as Rebalancer</span>
        
        <div className="border border-[#E0E5EB] rounded-[8px] overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#F5F7FA] border-b border-[#E0E5EB] text-[11px] font-medium text-[#6B7280]">
                <th className="text-left px-3 py-2">Drill</th>
                <th className="text-left px-3 py-2">Triggered</th>
                <th className="text-left px-3 py-2">Scenario</th>
                <th className="text-left px-3 py-2">p95</th>
                <th className="text-left px-3 py-2">TTC</th>
                <th className="text-left px-3 py-2">Result</th>
                <th className="text-left px-3 py-2">State</th>
              </tr>
            </thead>
            <tbody>
              {drillHistory.map((row, i) => (
                <tr key={i} className="border-b border-[#E0E5EB] last:border-b-0 text-[12px]">
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.drill}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.triggered}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.scenario}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.p95}</td>
                  <td className="px-3 py-3 text-[#171B26] font-semibold">{row.ttc}</td>
                  <td className={`px-3 py-3 font-semibold ${colors[row.resultColor]}`}>{row.result}</td>
                  <td className={`px-3 py-3 font-semibold ${colors[row.stateColor]}`}>{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action banner */}
        <div className="bg-[#EEF3FF] rounded-[8px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[#171B26] text-[12px] sm:text-[13px] font-medium">
            Ready to preview: drill-2026-10-20 — cordon eu-west-1 for 10 min. Expected spillover to us-east. Warm floor stays ≥ 4 GPUs.
          </span>
          <div className="flex gap-2 shrink-0">
            <Button>Discard</Button>
            <Button variant="primary">Execute drill</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
