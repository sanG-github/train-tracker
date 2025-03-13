'use client';

import { Train, Station } from '../types/map';

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
    <div className="bg-white p-4 rounded-lg shadow-md max-h-[80vh] overflow-y-auto w-[350px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Train {train.trainNumber} Stations</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="border-b pb-2 mb-4">
        <div className="text-sm font-medium text-gray-600">From <span className="font-bold text-gray-800">{firstStation.name}</span> to <span className="font-bold text-gray-800">{lastStation.name}</span></div>
      </div>
      
      <ul className="space-y-6">
        {stations.map((station, index) => {
          const isNextStation = index === nextStationIndex;
          
          return (
            <li 
              key={station.id} 
              className={`relative pl-8 ${station.isPassed ? 'opacity-75' : ''} ${isNextStation ? 'bg-blue-50 -mx-4 px-4 py-3 rounded-lg shadow-sm' : ''}`}
            >
              {/* Timeline dot and line */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : index === stations.length - 1 ? 'bg-red-500' : 'bg-blue-500'} border-2 border-white shadow-sm`}></div>
                {index < stations.length - 1 && (
                  <div className="w-0.5 bg-gray-300 h-full mt-1"></div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-800">{station.name}</div>
                  <div className="text-sm">
                    {station.isPassed ? (
                      <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">Passed</span>
                    ) : isNextStation ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">Next Stop</span>
                    ) : null}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 text-sm mt-2">
                  <div className="text-gray-600 font-medium">Arrival:</div>
                  <div className="text-gray-900 font-medium">{station.arrivalTime}</div>
                  
                  <div className="text-gray-600 font-medium">Departure:</div>
                  <div className="text-gray-900 font-medium">{station.departureTime}</div>
                  
                  <div className="text-gray-600 font-medium">Platform:</div>
                  <div className="text-gray-900 font-medium">{station.platform}</div>
                </div>
                
                {/* Delay indicator for current station */}
                {!station.isPassed && index !== stations.length - 1 && train.status.isDelayed && (
                  <div className="mt-2 py-1 px-2 bg-red-50 rounded text-sm text-red-600 font-medium inline-block">
                    Expected delay: {train.status.delayMinutes} min
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 