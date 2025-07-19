import React from 'react';
import { Filter } from 'lucide-react';
import { FilterType, FilterStatus } from '../../types/species';

interface FilterPanelProps {
  selectedType: FilterType;
  selectedStatus: FilterStatus;
  onTypeChange: (type: FilterType) => void;
  onStatusChange: (status: FilterStatus) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedType,
  selectedStatus,
  onTypeChange,
  onStatusChange
}) => {
  const typeOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Types' },
    { value: 'mammal', label: 'Mammals' },
    { value: 'bird', label: 'Birds' },
    { value: 'reptile', label: 'Reptiles' },
    { value: 'amphibian', label: 'Amphibians' },
    { value: 'fish', label: 'Fish' },
    { value: 'plant', label: 'Plants' },
    { value: 'insect', label: 'Insects' }
  ];

  const statusOptions: { value: FilterStatus; label: string; color: string }[] = [
    { value: 'all', label: 'All Status', color: 'bg-gray-500' },
    { value: 'extinct', label: 'Extinct', color: 'bg-black' },
    { value: 'extirpated', label: 'Extirpated', color: 'bg-gray-700' },
    { value: 'endangered', label: 'Endangered', color: 'bg-red-600' },
    { value: 'threatened', label: 'Threatened', color: 'bg-orange-500' },
    { value: 'special_concern', label: 'Special Concern', color: 'bg-yellow-500' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-emerald-200">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-gray-900">Filters</h3>
      </div>

      <div className="space-y-4">
        {/* Species Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Species Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as FilterType)}
            className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 
                     focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conservation Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conservation Status
          </label>
          <div className="space-y-2">
            {statusOptions.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={selectedStatus === option.value}
                  onChange={(e) => onStatusChange(e.target.value as FilterStatus)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                  <span className="text-sm text-gray-700">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;