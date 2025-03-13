'use client';

import dynamic from 'next/dynamic';

// Dynamic import is moved to this client component
const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">Loading map...</div>,
});

export default function MapWrapper() {
  return <MapComponent />;
} 