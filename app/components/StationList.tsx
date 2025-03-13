'use client';

import { Train } from '../types/map';

interface StationListProps {
  train: Train;
  onClose: () => void;
}

export default function StationList({ train, onClose }: StationListProps) {
  if (!train.stations || train.stations.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Stations</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="text-center text-gray-500">No station information available</div>
      </div>
    );
  }

  // Now we know stations exist and has at least one element
  const stations = train.stations;
  const firstStation = stations[0];
  const lastStation = stations[stations.length - 1];
  
  // Find the next station (first non-passed station)
  const nextStationIndex = stations.findIndex(station => !station.isPassed);

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg max-h-[80vh] w-[380px] flex flex-col border border-white/20">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-gray-100 rounded-t-xl z-10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Train {train.trainNumber}</h3>
            <div className="text-sm font-medium text-gray-600 mt-1">
              <span className="font-medium text-gray-500">From</span> <span className="font-semibold text-gray-800">{firstStation.name}</span> 
              <span className="mx-2">→</span>
              <span className="font-medium text-gray-500">to</span> <span className="font-semibold text-gray-800">{lastStation.name}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="space-y-6">
          {stations.map((station, index) => {
            const isNextStation = index === nextStationIndex;
            
            return (
              <li 
                key={station.id} 
                className={`relative pl-8 ${station.isPassed ? 'opacity-75' : ''} 
                  ${isNextStation ? 'bg-blue-50/80 backdrop-blur-sm -mx-5 px-5 py-4 border-y border-blue-100/50' : ''}`}
              >
                {/* Timeline dot and line */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full 
                    ${index === 0 ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 
                      index === stations.length - 1 ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : 
                      'bg-blue-500 shadow-sm shadow-blue-500/50'} 
                    border-2 border-white`}>
                  </div>
                  {index < stations.length - 1 && (
                    <div className="w-0.5 bg-gray-200 h-full mt-1"></div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <div className="text-base font-semibold text-gray-900">{station.name}</div>
                    <div className="text-sm">
                      {station.isPassed ? (
                        <span className="bg-gray-100/80 backdrop-blur-sm text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium">Passed</span>
                      ) : isNextStation ? (
                        <span className="bg-blue-100/80 backdrop-blur-sm text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">Next Stop</span>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex flex-col space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Arrival</span>
                      <span className="font-medium text-gray-900">{station.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Departure</span>
                      <span className="font-medium text-gray-900">{station.departureTime}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Platform</span>
                      <span className="font-medium text-gray-900">{station.platform}</span>
                    </div>
                  </div>
                  
                  {/* Delay indicator for current station */}
                  {!station.isPassed && index !== stations.length - 1 && train.status.isDelayed && (
                    <div className="mt-2 flex justify-between items-center py-1.5 px-3 bg-rose-50/80 backdrop-blur-sm rounded-lg text-sm">
                      <span className="text-rose-600 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Delay
                      </span>
                      <span className="font-medium text-rose-700">{train.status.delayMinutes} min</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
} 