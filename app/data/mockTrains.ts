import { Train, Station } from '../types/map';
import { GERMAN_CITIES } from '../types/map';

// Helper function to generate a random time string
const getRandomTimeString = (baseTime: Date, offsetMinutes: number): string => {
  const time = new Date(baseTime.getTime() + offsetMinutes * 60 * 1000);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper function to generate stations for a train
const generateStations = (fromCity: string, toCity: string, departureTime: Date): Station[] => {
  // Create station for departure city
  const stations: Station[] = [
    {
      id: `${fromCity.toLowerCase()}-station`,
      name: fromCity,
      coordinates: GERMAN_CITIES[fromCity],
      arrivalTime: '-',
      departureTime: departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: `${Math.floor(Math.random() * 20) + 1}`,
      isPassed: true
    }
  ];
  
  // Add 2-4 intermediate stations
  const cityNames = Object.keys(GERMAN_CITIES).filter(c => c !== fromCity && c !== toCity);
  const intermediateCount = Math.floor(Math.random() * 3) + 2;
  const selectedIntermediates = cityNames.sort(() => 0.5 - Math.random()).slice(0, intermediateCount);
  
  let currentTime = departureTime.getTime();
  
  selectedIntermediates.forEach((city, index) => {
    // Add random minutes for travel time (20-40 minutes)
    currentTime += (Math.floor(Math.random() * 20) + 20) * 60 * 1000;
    const stationTime = new Date(currentTime);
    const arrivalTime = stationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add 2-5 minutes for stopping time
    currentTime += (Math.floor(Math.random() * 3) + 2) * 60 * 1000;
    const departureTime = new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    stations.push({
      id: `${city.toLowerCase()}-station`,
      name: city,
      coordinates: GERMAN_CITIES[city],
      arrivalTime,
      departureTime,
      platform: `${Math.floor(Math.random() * 20) + 1}`,
      isPassed: index === 0 // only first intermediate station is passed
    });
  });
  
  // Add destination station
  currentTime += (Math.floor(Math.random() * 30) + 30) * 60 * 1000;
  const arrivalTime = new Date(currentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  stations.push({
    id: `${toCity.toLowerCase()}-station`,
    name: toCity,
    coordinates: GERMAN_CITIES[toCity],
    arrivalTime,
    departureTime: '-',
    platform: `${Math.floor(Math.random() * 20) + 1}`,
    isPassed: false
  });
  
  return stations;
};

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
      
      // Generate stations
      const stations = generateStations(cityName, destination, departureTime);
      
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
        scheduledDeparture: formattedDeparture,
        stations
      };
    });
  });
};

// Initial train data
export const mockTrains = generateMockTrains(); 