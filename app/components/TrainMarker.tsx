'use client';

import L from 'leaflet';

import { Marker, Popup } from 'react-leaflet';
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
      iconSize: [40, 48],
      iconAnchor: [20, 48],
      popupAnchor: [0, -50],
    });
  };

  return (
    <Marker
      position={[train.city.coordinates[1], train.city.coordinates[0]]}
      icon={getMarkerIcon()}
    >
      <Popup>
        <div className="min-w-[300px] p-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-gray-800">{train.trainNumber}</div>
              <div className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                train.status.isDelayed 
                  ? train.status.delayMinutes > 15 
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {train.status.isDelayed ? `+${train.status.delayMinutes}m` : 'On time'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4 text-gray-600">
            <div className="font-medium">{train.city.name}</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="font-medium">{train.destination}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">Departure</div>
              <div className="font-semibold">{train.scheduledDeparture}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-600">Platform</div>
              <div className="font-semibold">{train.status.platform}</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            Last updated: {train.status.lastUpdated}
          </div>
          
          <button 
            onClick={() => onTrainSelect(train)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            {isSelected ? 'Hide Details' : 'View Details & Stations'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
} 