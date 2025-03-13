'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Train } from '../types/map';

interface TrainMarkerProps {
  train: Train;
}

export default function TrainMarker({ train }: TrainMarkerProps) {
  // Create a custom icon with color based on delay status
  const getMarkerIcon = () => {
    // Get the CSS class based on delay status
    const getColorClass = () => {
      if (!train.status.isDelayed) return 'bg-green-500';
      return train.status.delayMinutes > 15 ? 'bg-red-500' : 'bg-orange-500';
    };
    
    const colorClass = getColorClass();
    
    return L.divIcon({
      className: 'custom-train-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div class="${colorClass}" style="width: 28px; height: 28px; border-radius: 9999px; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
            ${train.type.charAt(0)}
          </div>
          <div style="font-size: 0.75rem; font-weight: 600; background: white; padding: 0 4px; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">${train.trainNumber.split(' ')[1]}</div>
        </div>
      `,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
    });
  };

  return (
    <Marker
      position={[train.city.coordinates[1], train.city.coordinates[0]]}
      icon={getMarkerIcon()}
    >
      <Popup>
        <div className="min-w-[200px]">
          <div className="text-lg font-bold">{train.trainNumber}</div>
          <div className="text-sm mb-2">
            <span className="font-semibold">{train.city.name}</span> → {train.destination}
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
            <div className="font-medium">Departure:</div>
            <div>{train.scheduledDeparture}</div>
            
            <div className="font-medium">Platform:</div>
            <div>{train.status.platform}</div>
            
            <div className="font-medium">Status:</div>
            <div className={`${train.status.isDelayed ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
              {train.status.isDelayed ? `Delayed by ${train.status.delayMinutes} min` : 'On time'}
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Last updated: {train.status.lastUpdated}
          </div>
        </div>
      </Popup>
    </Marker>
  );
} 