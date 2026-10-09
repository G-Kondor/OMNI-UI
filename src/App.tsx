import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CapacityMap from './pages/CapacityMap';
import FailoverDrills from './pages/FailoverDrills';
import InferenceCapacity from './pages/InferenceCapacity';
import InferenceEndpoints from './pages/InferenceEndpoints';
import PlacementRouting from './pages/PlacementRouting';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6 flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#171c29] mb-2">{title}</h1>
        <p className="text-[#6b7385]">This page is not part of the N1 Inference UI scope.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InferenceCapacity />} />
          <Route path="endpoints" element={<InferenceEndpoints />} />
          <Route path="placement" element={<PlacementRouting />} />
          <Route path="failover" element={<FailoverDrills />} />
          <Route path="capacity-map" element={<CapacityMap />} />
          
          {/* Placeholder routes for sidebar nav */}
          <Route path="overview" element={<PlaceholderPage title="Overview" />} />
          <Route path="clusters" element={<PlaceholderPage title="Clusters" />} />
          <Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="autoscaler" element={<PlaceholderPage title="Autoscaler" />} />
          <Route path="edge-locations" element={<PlaceholderPage title="Edge Locations" />} />
          <Route path="workloads" element={<PlaceholderPage title="Workloads" />} />
          <Route path="nodes" element={<PlaceholderPage title="Nodes" />} />
          <Route path="rebalancer" element={<PlaceholderPage title="Rebalancer" />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
