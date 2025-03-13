'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GERMAN_CITIES, MAP_CENTER, MAP_ZOOM, Train } from '../types/map';
import TrainMarker from './TrainMarker';
import CityMarker from './CityMarker';
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

export default function Map() {
  const [trains, setTrains] = useState<Train[]>(mockTrains);

  const refreshTrains = () => {
    // Generate new mock train data
    setTrains(generateMockTrains());
  };

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
    <div className="w-full h-[600px] relative">
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={refreshTrains}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>
      
      <MapContainer
        center={MAP_CENTER}
        zoom={MAP_ZOOM}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* City markers */}
        {Object.entries(GERMAN_CITIES).map(([cityName, coordinates]) => (
          <CityMarker 
            key={`city-${cityName}`} 
            name={cityName}
            position={[coordinates[1], coordinates[0]]}
          />
        ))}
        
        {/* Train markers */}
        {trains.map(train => (
          <TrainMarker key={train.id} train={train} />
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md z-[1000] text-black">
        <div className="text-sm font-semibold mb-2">Train Status</div>
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <div className="text-xs">On Time</div>
        </div>
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
          <div className="text-xs">Delayed &lt;15 min</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <div className="text-xs">Delayed &gt;15 min</div>
        </div>
      </div>
    </div>
  );
} 