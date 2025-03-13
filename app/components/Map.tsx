'use client';

import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import TrainMarker from './TrainMarker';
import StationList from './StationList';
import { useMap } from 'react-leaflet/hooks';
import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MAP_CENTER, MAP_ZOOM, Train } from '../types/map';
import { mockTrains, generateMockTrains } from '../data/mockTrains';

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map interactions
function MapController({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  
  return null;
}

export default function Map() {
  const [trains, setTrains] = useState<Train[]>(mockTrains);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const refreshTrains = () => {
    // Generate new mock train data
    setTrains(generateMockTrains());
    // Clear selected train when refreshing
    setSelectedTrain(null);
  };

  const handleTrainSelect = useCallback((train: Train) => {
    setSelectedTrain(prev => {
      const isDeselecting = prev?.id === train.id;
      
      // If selecting a train, zoom to it
      if (!isDeselecting && mapRef.current) {
        mapRef.current.flyTo(
          [train.city.coordinates[1], train.city.coordinates[0]],
          12, // Zoom level when focusing on a train
          {
            duration: 1.5 // Animation duration in seconds
          }
        );
      } else if (isDeselecting && mapRef.current) {
        // When deselecting, zoom back out to default zoom
        mapRef.current.flyTo(MAP_CENTER, MAP_ZOOM, {
          duration: 1.5
        });
      }
      
      return isDeselecting ? null : train;
    });
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSelectedTrain(null);
    // Zoom back out when closing the sidebar
    if (mapRef.current) {
      mapRef.current.flyTo(MAP_CENTER, MAP_ZOOM, {
        duration: 1.5
      });
    }
  }, []);

  const handleMapReady = useCallback((map: L.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    // This is needed for the map to render properly in Next.js
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon-2x.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="w-full h-[80vh] relative flex font-sans">
      {/* Station list sidebar */}
      {selectedTrain && (
        <div className="absolute top-4 left-4 h-[calc(100%-2rem)] z-[1001]">
          <StationList train={selectedTrain} onClose={handleCloseSidebar} />
        </div>
      )}
      
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={refreshTrains}
          className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-800 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center border border-white/20 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="font-medium cursor-pointer">Refresh Data</span>
        </button>
      </div>
      
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        className="w-full h-full rounded-2xl shadow-2xl overflow-hidden"
      >
        <MapController onMapReady={handleMapReady} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Train markers */}
        {trains.map(train => (
          <TrainMarker 
            key={train.id} 
            train={train} 
            onTrainSelect={handleTrainSelect}
            isSelected={selectedTrain?.id === train.id}
          />
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg z-[1000] text-gray-800 border border-white/20">
        <div className="text-sm font-semibold mb-3 text-gray-900">Train Status</div>
        <div className="flex flex-col space-y-2.5">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
            <div className="text-xs font-medium">On Time</div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></div>
            <div className="text-xs font-medium">Delayed &lt;15 min</div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div>
            <div className="text-xs font-medium">Delayed &gt;15 min</div>
          </div>
        </div>
      </div>
    </div>
  );
} 