import { Species, HeatmapPoint, MonthlyData } from '../types/species';

// Generate monthly data for species
const generateMonthlyData = (baseCoordinates: [number, number], speciesId: string): MonthlyData[] => {
  const currentYear = new Date().getFullYear();
  const data: MonthlyData[] = [];
  
  for (let year = currentYear - 2; year <= currentYear; year++) {
    for (let month = 1; month <= 12; month++) {
      // Skip future months
      if (year === currentYear && month > new Date().getMonth() + 1) continue;
      
      // Generate realistic seasonal patterns
      let sightings = 0;
      let populationMultiplier = 1;
      
      // Different patterns for different species types
      if (['bird'].includes(speciesId)) {
        // Birds: higher in spring/fall migration
        sightings = month >= 3 && month <= 5 || month >= 9 && month <= 11 
          ? Math.floor(Math.random() * 15) + 5 
          : Math.floor(Math.random() * 8) + 1;
      } else if (['mammal'].includes(speciesId)) {
        // Mammals: more consistent, slightly higher in summer
        sightings = month >= 5 && month <= 9 
          ? Math.floor(Math.random() * 12) + 3 
          : Math.floor(Math.random() * 8) + 2;
      } else if (['reptile', 'amphibian'].includes(speciesId)) {
        // Reptiles/Amphibians: much higher in warm months
        sightings = month >= 4 && month <= 10 
          ? Math.floor(Math.random() * 10) + 2 
          : Math.floor(Math.random() * 3);
      } else if (['insect'].includes(speciesId)) {
        // Insects: peak in summer
        sightings = month >= 6 && month <= 8 
          ? Math.floor(Math.random() * 20) + 10 
          : month >= 4 && month <= 10 
            ? Math.floor(Math.random() * 8) + 2 
            : 0;
      } else {
        // Plants and fish: more consistent
        sightings = Math.floor(Math.random() * 8) + 2;
      }
      
      // Generate coordinates around the base location
      const coordinates: [number, number][] = [];
      for (let i = 0; i < sightings; i++) {
        const offsetLng = (Math.random() - 0.5) * 0.5; // ±0.25 degrees
        const offsetLat = (Math.random() - 0.5) * 0.5;
        coordinates.push([
          baseCoordinates[0] + offsetLng,
          baseCoordinates[1] + offsetLat
        ]);
      }
      
      data.push({
        month,
        year,
        sightings,
        coordinates,
        populationEstimate: Math.floor(sightings * populationMultiplier)
      });
    }
  }
  
  return data;
};

export const mockSpecies: Species[] = [
  {
    id: '1',
    commonName: 'Woodland Caribou',
    scientificName: 'Rangifer tarandus caribou',
    image: 'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'mammal',
    conservationStatus: 'threatened',
    estimatedPopulation: '5,000-6,000 individuals',
    geographicRange: 'Northern Ontario boreal forests',
    timelineToExtinction: 'Stable with conservation efforts',
    reasonForEndangerment: ['Habitat fragmentation', 'Climate change', 'Human development'],
    learnMoreUrl: 'https://www.ontario.ca/page/woodland-caribou',
    coordinates: [-84.5, 49.7],
    lastSeen: '2024-01-15',
    monthlyData: generateMonthlyData([-84.5, 49.7], 'mammal')
  },
  {
    id: '2',
    commonName: 'Lake Sturgeon',
    scientificName: 'Acipenser fulvescens',
    image: 'https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'fish',
    conservationStatus: 'threatened',
    estimatedPopulation: '50,000-75,000 individuals',
    geographicRange: 'Great Lakes and connecting waterways',
    timelineToExtinction: 'Recovery expected by 2040 with current efforts',
    reasonForEndangerment: ['Overfishing', 'Dam construction', 'Water pollution'],
    learnMoreUrl: 'https://www.ontario.ca/page/lake-sturgeon',
    coordinates: [-79.4, 44.3],
    lastSeen: '2024-02-20',
    monthlyData: generateMonthlyData([-79.4, 44.3], 'fish')
  },
  {
    id: '3',
    commonName: 'Blanding\'s Turtle',
    scientificName: 'Emydoidea blandingii',
    image: 'https://images.pexels.com/photos/5277678/pexels-photo-5277678.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'reptile',
    conservationStatus: 'threatened',
    estimatedPopulation: '8,000-12,000 individuals',
    geographicRange: 'Southern Ontario wetlands',
    timelineToExtinction: 'Critical - declining 3% annually',
    reasonForEndangerment: ['Wetland loss', 'Road mortality', 'Urban development'],
    learnMoreUrl: 'https://www.ontario.ca/page/blandings-turtle',
    coordinates: [-79.2, 44.1],
    lastSeen: '2024-03-05',
    monthlyData: generateMonthlyData([-79.2, 44.1], 'reptile')
  },
  {
    id: '4',
    commonName: 'Eastern Loggerhead Shrike',
    scientificName: 'Lanius ludovicianus migrans',
    image: 'https://images.pexels.com/photos/158471/ibis-bird-red-animals-158471.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'bird',
    conservationStatus: 'endangered',
    estimatedPopulation: '20-30 breeding pairs',
    geographicRange: 'Extreme southwestern Ontario',
    timelineToExtinction: 'Critically endangered - immediate action required',
    reasonForEndangerment: ['Habitat loss', 'Pesticide use', 'Agricultural intensification'],
    learnMoreUrl: 'https://www.ontario.ca/page/eastern-loggerhead-shrike',
    coordinates: [-82.1, 42.3],
    lastSeen: '2024-01-28',
    monthlyData: generateMonthlyData([-82.1, 42.3], 'bird')
  },
  {
    id: '5',
    commonName: 'American Chestnut',
    scientificName: 'Castanea dentata',
    image: 'https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'plant',
    conservationStatus: 'endangered',
    estimatedPopulation: 'Less than 200 mature trees',
    geographicRange: 'Scattered locations in southern Ontario',
    timelineToExtinction: 'Research ongoing for blight-resistant varieties',
    reasonForEndangerment: ['Chestnut blight fungus', 'Habitat fragmentation'],
    learnMoreUrl: 'https://www.ontario.ca/page/american-chestnut',
    coordinates: [-80.5, 43.5],
    lastSeen: '2024-02-10',
    monthlyData: generateMonthlyData([-80.5, 43.5], 'plant')
  },
  {
    id: '6',
    commonName: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    image: 'https://images.pexels.com/photos/36378/monarch-butterfly-insect-macro-nature.jpg?auto=compress&cs=tinysrgb&w=500',
    type: 'insect',
    conservationStatus: 'special_concern',
    estimatedPopulation: '1-2 million (declining)',
    geographicRange: 'Throughout Ontario during migration',
    timelineToExtinction: 'Population declining 80% over 20 years',
    reasonForEndangerment: ['Habitat loss', 'Pesticide use', 'Climate change'],
    learnMoreUrl: 'https://www.ontario.ca/page/monarch-butterfly',
    coordinates: [-79.6, 43.7],
    lastSeen: '2024-03-12',
    monthlyData: generateMonthlyData([-79.6, 43.7], 'insect')
  },
  {
    id: '7',
    commonName: 'Jefferson Salamander',
    scientificName: 'Ambystoma jeffersonianum',
    image: 'https://images.pexels.com/photos/8828503/pexels-photo-8828503.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'amphibian',
    conservationStatus: 'special_concern',
    estimatedPopulation: 'Unknown - limited surveys',
    geographicRange: 'Deciduous forests of southern Ontario',
    reasonForEndangerment: ['Forest fragmentation', 'Road mortality', 'Disease'],
    learnMoreUrl: 'https://www.ontario.ca/page/jefferson-salamander',
    coordinates: [-79.8, 43.2],
    lastSeen: '2024-02-25',
    monthlyData: generateMonthlyData([-79.8, 43.2], 'amphibian')
  },
  {
    id: '8',
    commonName: 'Polar Bear',
    scientificName: 'Ursus maritimus',
    image: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=500',
    type: 'mammal',
    conservationStatus: 'threatened',
    estimatedPopulation: '900-1,000 individuals',
    geographicRange: 'Hudson Bay and James Bay coasts',
    timelineToExtinction: 'Vulnerable to rapid climate change',
    reasonForEndangerment: ['Sea ice loss', 'Climate change', 'Human disturbance'],
    learnMoreUrl: 'https://www.ontario.ca/page/polar-bear',
    coordinates: [-82.0, 51.5],
    lastSeen: '2024-01-08',
    monthlyData: generateMonthlyData([-82.0, 51.5], 'mammal')
  }
];

export const generateHeatmapPoints = (selectedMonth?: number, selectedYear?: number): HeatmapPoint[] => {
  const currentMonth = selectedMonth || new Date().getMonth() + 1;
  const currentYear = selectedYear || new Date().getFullYear();
  
  const hotspots: HeatmapPoint[] = [];
  
  // Generate hotspots based on monthly data
  mockSpecies.forEach(species => {
    const monthlyData = species.monthlyData?.find(
      data => data.month === currentMonth && data.year === currentYear
    );
    
    if (monthlyData && monthlyData.sightings > 0) {
      // Create multiple hotspots based on sighting coordinates
      const coordinateGroups = groupCoordinatesByProximity(monthlyData.coordinates);
      
      coordinateGroups.forEach(group => {
        const centerCoord = calculateCenterCoordinate(group);
        const weight = Math.min(group.length / 20, 1); // Normalize weight
        
        hotspots.push({
          coordinates: centerCoord,
          weight,
          species: [species],
          month: currentMonth
        });
      });
    }
  });
  
  // Merge nearby hotspots
  return mergeNearbyHotspots(hotspots);
};

// Helper function to group coordinates by proximity
function groupCoordinatesByProximity(coordinates: [number, number][]): [number, number][][] {
  const groups: [number, number][][] = [];
  const processed = new Set<number>();
  
  coordinates.forEach((coord, index) => {
    if (processed.has(index)) return;
    
    const group = [coord];
    processed.add(index);
    
    // Find nearby coordinates (within ~5km)
    coordinates.forEach((otherCoord, otherIndex) => {
      if (processed.has(otherIndex)) return;
      
      const distance = calculateDistance(coord, otherCoord);
      if (distance < 0.05) { // ~5km threshold
        group.push(otherCoord);
        processed.add(otherIndex);
      }
    });
    
    groups.push(group);
  });
  
  return groups;
}

// Helper function to calculate center coordinate
function calculateCenterCoordinate(coordinates: [number, number][]): [number, number] {
  const avgLng = coordinates.reduce((sum, coord) => sum + coord[0], 0) / coordinates.length;
  const avgLat = coordinates.reduce((sum, coord) => sum + coord[1], 0) / coordinates.length;
  return [avgLng, avgLat];
}

// Helper function to calculate distance between coordinates
function calculateDistance(coord1: [number, number], coord2: [number, number]): number {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  return Math.sqrt(Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2));
}

// Helper function to merge nearby hotspots
function mergeNearbyHotspots(hotspots: HeatmapPoint[]): HeatmapPoint[] {
  const merged: HeatmapPoint[] = [];
  const processed = new Set<number>();
  
  hotspots.forEach((hotspot, index) => {
    if (processed.has(index)) return;
    
    let mergedHotspot = { ...hotspot };
    processed.add(index);
    
    // Find nearby hotspots to merge
    hotspots.forEach((otherHotspot, otherIndex) => {
      if (processed.has(otherIndex)) return;
      
      const distance = calculateDistance(hotspot.coordinates, otherHotspot.coordinates);
      if (distance < 0.1) { // ~10km threshold for merging
        // Merge the hotspots
        mergedHotspot.weight = Math.min(mergedHotspot.weight + otherHotspot.weight, 1);
        mergedHotspot.species = [...mergedHotspot.species, ...otherHotspot.species];
        processed.add(otherIndex);
      }
    });
    
    merged.push(mergedHotspot);
  });
  
  return merged;
}