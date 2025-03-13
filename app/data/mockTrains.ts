import { Train } from '../types/map';
import { GERMAN_CITIES } from '../types/map';

export const generateMockTrains = (): Train[] => {
  const trainTypes = ['ICE', 'IC', 'RE', 'RB'] as const;
  const cityNames = Object.keys(GERMAN_CITIES);
  
  return cityNames.flatMap(cityName => {
    // Generate 1-3 trains per city
    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, idx) => {
      const id = `${cityName.toLowerCase()}-${idx + 1}`;
      const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
      const trainNumber = `${trainType} ${Math.floor(Math.random() * 1000) + 100}`;
      const isDelayed = Math.random() > 0.7; // 30% chance of delay
      const delayMinutes = isDelayed ? Math.floor(Math.random() * 30) + 5 : 0;
      const platform = `${Math.floor(Math.random() * 20) + 1}`;
      
      // Random destination (different from current city)
      let destinationOptions = cityNames.filter(c => c !== cityName);
      const destination = destinationOptions[Math.floor(Math.random() * destinationOptions.length)];
      
      // Generate random time in the next few hours
      const now = new Date();
      const departureTime = new Date(now.getTime() + Math.random() * 4 * 60 * 60 * 1000);
      const formattedDeparture = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      return {
        id,
        trainNumber,
        type: trainType,
        city: {
          name: cityName,
          coordinates: GERMAN_CITIES[cityName]
        },
        status: {
          isDelayed,
          delayMinutes,
          platform,
          lastUpdated: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        destination,
        scheduledDeparture: formattedDeparture
      };
    });
  });
};

// Initial train data
export const mockTrains = generateMockTrains(); 