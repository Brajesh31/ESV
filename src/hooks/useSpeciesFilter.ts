import { useState, useMemo } from 'react';
import { Species, FilterType, FilterStatus } from '../types/species';

export const useSpeciesFilter = (allSpecies: Species[]) => {
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all');
  const [searchResults, setSearchResults] = useState<Species[]>(allSpecies);

  const filteredSpecies = useMemo(() => {
    let filtered = searchResults;

    if (selectedType !== 'all') {
      filtered = filtered.filter(species => species.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(species => species.conservationStatus === selectedStatus);
    }

    return filtered;
  }, [searchResults, selectedType, selectedStatus]);

  return {
    filteredSpecies,
    selectedType,
    selectedStatus,
    setSelectedType,
    setSelectedStatus,
    setSearchResults
  };
};