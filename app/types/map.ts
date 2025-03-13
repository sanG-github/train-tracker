export interface Train {
  id: string;
  trainNumber: string;
  type: 'ICE' | 'IC' | 'RE' | 'RB';
  city: {
    name: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  status: {
    isDelayed: boolean;
    delayMinutes: number;
    platform: string;
    lastUpdated: string;
  };
  destination: string;
  scheduledDeparture: string;
}

export const GERMAN_CITIES: Record<string, [number, number]> = {
  Berlin: [13.404954, 52.520008],
  Frankfurt: [8.682127, 50.110924],
  Hamburg: [9.993682, 53.551086],
  Hannover: [9.732010, 52.375892],
  Karlsruhe: [8.403653, 49.006890],
  Erfurt: [11.029880, 50.978650]
};

export const MAP_CENTER: [number, number] = [51.1657, 10.4515]; // Center of Germany
export const MAP_ZOOM = 6; 