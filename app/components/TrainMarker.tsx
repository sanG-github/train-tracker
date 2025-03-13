'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Train } from '../types/map';

interface TrainMarkerProps {
  train: Train;
  onTrainSelect: (train: Train) => void;
  isSelected?: boolean;
}

export default function TrainMarker({ train, onTrainSelect, isSelected = false }: TrainMarkerProps) {
  // Create a custom icon with color based on delay status
  const getMarkerIcon = () => {
    // Get the CSS class based on delay status
    const getColorClass = () => {
      if (!train.status.isDelayed) return 'bg-green-500';
      return train.status.delayMinutes > 15 ? 'bg-red-500' : 'bg-orange-500';
    };
    
    const colorClass = getColorClass();
    const delayText = train.status.isDelayed ? `+${train.status.delayMinutes}m` : '';
    const borderStyle = isSelected ? '3px solid #3b82f6' : '2px solid white';
    
    return L.divIcon({
      className: 'custom-train-marker',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div class="${colorClass}" style="width: 30px; height: 30px; border-radius: 9999px; border: ${borderStyle}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 1px 3px rgba(0,0,0,0.2);">
          ${train.trainNumber.split(' ')[1]}
          </div>
          <div style="font-size: 0.65rem; color: #4B5563; background: white; padding: 0 4px; border-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); margin-top: 1px; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center;">
            ${train.city.name}
          </div>
        </div>
      `,
      iconSize: [40, 75],
      iconAnchor: [20, 75],
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
          
          <button 
            onClick={() => onTrainSelect(train)}
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm transition-colors"
          >
            {isSelected ? 'Hide Station List' : 'View Details & Stations'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
} 