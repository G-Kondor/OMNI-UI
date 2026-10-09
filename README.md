# Cast AI OMNI N1 — Inference UI

A React + Vite + TypeScript implementation of the Cast AI OMNI N1 Inference UI console screens.

## Overview

This application implements five screens for the Cast AI OMNI N1 guaranteed inference with latency-aware routing:

1. **Inference Capacity** (`/`) — Home dashboard with KPIs, latency matrix, SLO/spillover cards, and endpoint status
2. **Inference Endpoints** (`/endpoints`) — Gateway API InferencePool endpoints with traffic routing by KV-cache and load
3. **Placement & Routing** (`/placement`) — Autoscaler placement by latency + landed cost with what-if preview
4. **Failover Drills & SLO** (`/failover`) — Scheduled drills, p95/time-to-capacity reports, and approval workflow
5. **Capacity Map** (`/capacity-map`) — Interactive Earth map with datacenter pins and cost switch offers

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **React Router v7** for client-side routing
- **react-simple-maps** for the capacity map visualization

## Design System

- **Primary**: Blue `#2B6BF5`
- **Shell**: Dark sidebar `#121724`, light main area `#f6f7f9`
- **Typography**: Inter font family
- **Cards**: White with `#e0e5ed` borders, 10px radius
- **Layout**: 1440×900 shell with 220px sidebar

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Layout.tsx      # Main layout with sidebar + topbar
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Topbar.tsx      # Top navigation bar
│   ├── Card.tsx        # Card container
│   ├── KPICard.tsx     # KPI metric card
│   ├── Button.tsx      # Action buttons
│   ├── Pill.tsx        # Status pills/badges
│   └── PageHeader.tsx  # Page title + actions
├── pages/          # Route pages
│   ├── InferenceCapacity.tsx
│   ├── InferenceEndpoints.tsx
│   ├── PlacementRouting.tsx
│   ├── FailoverDrills.tsx
│   └── CapacityMap.tsx
├── App.tsx         # Router configuration
├── main.tsx        # Entry point
└── index.css       # Global styles + Tailwind
```

## Features

- **Dark sidebar navigation** with cluster hierarchy
- **Responsive KPI cards** with color-coded status
- **Data tables** with sortable columns and status indicators
- **Interactive map** using react-simple-maps with datacenter pins
- **Status pills** for endpoint health, offers, and drill results
- **Mock data** for all screens (no API required)

## Map Regions

The capacity map displays 8 datacenter regions:

| Region | Coordinates | Provider |
|--------|-------------|----------|
| us-east-1 | (38.9°N, 77.4°W) | AWS |
| us-west-2 | (45.6°N, 121.2°W) | AWS |
| eu-central-1 | (50.1°N, 8.7°E) | AWS |
| eu-west-1 | (53.3°N, 6.3°W) | AWS |
| ap-southeast-1 | (1.35°N, 103.8°E) | AWS |
| ap-northeast-1 | (35.7°N, 139.7°E) | GCP |
| sa-east-1 | (23.5°S, 46.6°W) | AWS |
| me-central-1 | (25.2°N, 55.3°E) | OCI |

## License

Proprietary — Cast AI
