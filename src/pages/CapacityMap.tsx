import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Button from '../components/Button';
import Card from '../components/Card';
import PageHeader from '../components/PageHeader';
import Pill from '../components/Pill';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface DataCenter {
  id: string;
  name: string;
  coordinates: [number, number];
  provider: string;
  location: string;
  price: string;
  p95: string;
  supply: string;
  warmFloor: string;
  landed: string;
  status: 'home' | 'offer' | 'limited' | 'ready' | 'cold' | 'new' | 'slo';
  savings?: string;
}

const dataCenters: DataCenter[] = [
  { id: 'us-east-1', name: 'us-east-1', coordinates: [-77.4, 38.9], provider: 'AWS', location: 'N. Virginia', price: '$2.10/h H100', p95: '92 ms', supply: 'High', warmFloor: '4/4', landed: '$2.18', status: 'slo' },
  { id: 'us-west-2', name: 'us-west-2', coordinates: [-121.2, 45.6], provider: 'AWS', location: 'Oregon', price: '$1.88/h H100', p95: '38 ms*', supply: 'Med', warmFloor: '2/2', landed: '$1.95', status: 'offer', savings: '−$770/mo' },
  { id: 'eu-central-1', name: 'eu-central-1', coordinates: [8.7, 50.1], provider: 'AWS', location: 'Frankfurt', price: '$2.40/h H100', p95: '12 ms home', supply: 'High', warmFloor: '4/4', landed: '$2.12', status: 'home' },
  { id: 'eu-west-1', name: 'eu-west-1', coordinates: [-6.3, 53.3], provider: 'AWS', location: 'Ireland', price: '$1.95/h H100 Spot', p95: '41 ms', supply: 'High', warmFloor: '4/4', landed: '$1.78', status: 'offer', savings: '−$1,940/mo' },
  { id: 'ap-southeast-1', name: 'ap-southeast-1', coordinates: [103.8, 1.35], provider: 'AWS', location: 'Singapore', price: '$2.55/h H100', p95: '118 ms', supply: 'Med', warmFloor: '2/4', landed: '$2.66', status: 'cold' },
  { id: 'ap-northeast-1', name: 'ap-northeast-1', coordinates: [139.7, 35.7], provider: 'GCP', location: 'Tokyo', price: '$2.30/h H100', p95: '105 ms', supply: 'High', warmFloor: '3/3', landed: '$2.41', status: 'ready' },
  { id: 'sa-east-1', name: 'sa-east-1', coordinates: [-46.6, -23.5], provider: 'AWS', location: 'São Paulo', price: '$2.80/h H100', p95: '210 ms', supply: 'Low', warmFloor: '0/1', landed: '$2.95', status: 'limited' },
  { id: 'me-central-1', name: 'me-central-1', coordinates: [55.3, 25.2], provider: 'OCI', location: 'Jeddah', price: '$2.20/h H100', p95: '64 ms', supply: 'Med', warmFloor: '1/2', landed: '$2.28', status: 'new' },
];

const statusConfig = {
  home: { color: '#2B6BF5', label: 'Home', variant: 'blue' as const },
  offer: { color: '#21A066', label: 'Review', variant: 'green' as const },
  limited: { color: '#D9851A', label: 'Limited', variant: 'amber' as const },
  ready: { color: '#21A066', label: 'Ready', variant: 'green' as const },
  cold: { color: '#D9851A', label: 'Cold', variant: 'amber' as const },
  new: { color: '#2B6BF5', label: 'New', variant: 'blue' as const },
  slo: { color: '#D9851A', label: 'SLO', variant: 'amber' as const },
};

interface DCCardProps {
  dc: DataCenter;
  compact?: boolean;
}

function DCCard({ dc, compact = false }: DCCardProps) {
  const config = statusConfig[dc.status];
  
  if (compact) {
    return (
      <div className="bg-white border border-[#E0E5EB] rounded-lg p-2 shadow-lg min-w-[120px] text-[10px]">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-bold text-[#171B26]">{dc.name}</span>
          <Pill variant={config.variant}>{config.label}</Pill>
        </div>
        <span className="text-[#6B7280] text-[9px]">{dc.provider} · {dc.location}</span>
        <div className="mt-1 text-[9px]">
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Price</span>
            <span className="font-semibold text-[#171B26]">{dc.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">p95</span>
            <span className="font-semibold text-[#171B26]">{dc.p95}</span>
          </div>
        </div>
        {dc.savings && <Pill variant="green">{dc.savings}</Pill>}
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-[#E0E5EB] rounded-[10px] p-[10px] shadow-[0px_4px_12px_0px_rgba(13,20,38,0.18)] min-w-[140px] flex flex-col gap-[6px] text-[11px]">
      <div className="flex items-center justify-between gap-[8px]">
        <span className="font-bold text-[#171B26] text-[12px]">{dc.name}</span>
        <Pill variant={config.variant}>{config.label}</Pill>
      </div>
      <span className="text-[#6B7280]">{dc.provider} · {dc.location}</span>
      <div className="flex flex-col gap-[4px]">
        <div className="flex justify-between">
          <span className="text-[#6B7280]">Price</span>
          <span className="font-semibold text-[#171B26]">{dc.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7280]">p95 latency</span>
          <span className="font-semibold text-[#171B26]">{dc.p95}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7280]">GPU supply</span>
          <span className="font-semibold text-[#171B26]">{dc.supply}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7280]">Warm floor</span>
          <span className="font-semibold text-[#171B26]">{dc.warmFloor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B7280]">Landed $/GPU-h</span>
          <span className="font-semibold text-[#171B26]">{dc.landed}</span>
        </div>
      </div>
      {dc.savings && (
        <Pill variant="green">{dc.savings}</Pill>
      )}
    </div>
  );
}

export default function CapacityMap() {
  const [selectedDC, setSelectedDC] = useState<string | null>(null);
  
  return (
    <div className="p-4 sm:px-6 sm:py-5 flex flex-col gap-4 h-full">
      <PageHeader
        title="Capacity map"
        subtitle="Earth view of datacenters with live price, latency, supply, and switch offers"
        actions={
          <>
            <Button>Dismiss all</Button>
            <Button variant="primary">Review 3 offers</Button>
          </>
        }
      />

      <Card className="flex-1 flex flex-col gap-3 overflow-hidden min-h-[400px]">
        <span className="text-[#6B7280] text-[10px] font-medium">WORLD CAPACITY · PIN = DATACENTER</span>
        
        <div className="bg-[#edf2f7] rounded-[8px] flex-1 relative overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [20, 30],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#d1d5db"
                    stroke="#f3f4f6"
                    strokeWidth={0.5}
                    style={{ outline: 'none' }}
                  />
                ))
              }
            </Geographies>
            
            {dataCenters.map((dc) => (
              <Marker 
                key={dc.id} 
                coordinates={dc.coordinates}
                onClick={() => setSelectedDC(selectedDC === dc.id ? null : dc.id)}
              >
                <circle
                  r={8}
                  fill={statusConfig[dc.status].color}
                  stroke="#fff"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                />
              </Marker>
            ))}
          </ComposableMap>
          
          {/* Desktop: Overlay cards positioned absolutely */}
          <div className="hidden xl:block">
            <div className="absolute top-4 left-4">
              <DCCard dc={dataCenters.find(dc => dc.id === 'us-west-2')!} />
            </div>
            <div className="absolute top-16 left-48">
              <DCCard dc={dataCenters.find(dc => dc.id === 'us-east-1')!} />
            </div>
            <div className="absolute top-4 left-[45%]">
              <DCCard dc={dataCenters.find(dc => dc.id === 'eu-west-1')!} />
            </div>
            <div className="absolute top-4 left-[55%]">
              <DCCard dc={dataCenters.find(dc => dc.id === 'eu-central-1')!} />
            </div>
            <div className="absolute top-40 left-[58%]">
              <DCCard dc={dataCenters.find(dc => dc.id === 'me-central-1')!} />
            </div>
            <div className="absolute bottom-20 left-[35%]">
              <DCCard dc={dataCenters.find(dc => dc.id === 'sa-east-1')!} />
            </div>
            <div className="absolute top-56 right-32">
              <DCCard dc={dataCenters.find(dc => dc.id === 'ap-southeast-1')!} />
            </div>
            <div className="absolute top-12 right-4">
              <DCCard dc={dataCenters.find(dc => dc.id === 'ap-northeast-1')!} />
            </div>
          </div>

          {/* Mobile/Tablet: Selected DC card */}
          {selectedDC && (
            <div className="xl:hidden absolute bottom-4 left-4 right-4">
              <DCCard dc={dataCenters.find(dc => dc.id === selectedDC)!} />
            </div>
          )}
        </div>
        
        {/* Mobile: Scrollable DC list */}
        <div className="xl:hidden flex gap-2 overflow-x-auto pb-2">
          {dataCenters.map((dc) => (
            <button 
              key={dc.id}
              onClick={() => setSelectedDC(dc.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
                selectedDC === dc.id 
                  ? 'bg-[#EEF3FF] border-[#2B6BF5] text-[#2B6BF5]'
                  : 'bg-white border-[#E0E5EB] text-[#6B7280] hover:bg-gray-50'
              }`}
            >
              {dc.name}
            </button>
          ))}
        </div>
        
        <span className="text-[#6B7280] text-[10px] sm:text-[11px]">
          Pins sit on real lat/lon. Green = switch offer available · amber = warming/limited · blue = home. Cards show price, p95, GPU supply, warm floor, landed cost.
        </span>
      </Card>
    </div>
  );
}
