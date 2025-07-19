export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
  type: 'bird' | 'mammal' | 'reptile' | 'amphibian' | 'fish' | 'plant' | 'insect';
  conservationStatus: 'extinct' | 'extirpated' | 'endangered' | 'threatened' | 'special_concern';
  estimatedPopulation: string;
  geographicRange: string;
  timelineToExtinction?: string;
  reasonForEndangerment: string[];
  learnMoreUrl?: string;
  coordinates: [number, number]; // [longitude, latitude]
  lastSeen?: string;
  monthlyData?: MonthlyData[]; // New field for monthly tracking
}

export interface MonthlyData {
  month: number; // 1-12
  year: number;
  sightings: number;
  coordinates: [number, number][];
  populationEstimate?: number;
}

export interface HeatmapPoint {
  coordinates: [number, number];
  weight: number;
  species: Species[];
  month?: number; // New field for month filtering
}

export type FilterType = 'all' | Species['type'];
export type FilterStatus = 'all' | Species['conservationStatus'];

export interface MonthFilter {
  month: number;
  year: number;
}