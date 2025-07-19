import React, { useState } from 'react';
import { Leaf, Info, Heart } from 'lucide-react';
import MapContainer from './components/Map/MapContainer';
import SearchBar from './components/UI/SearchBar';
import FilterPanel from './components/UI/FilterPanel';
import MonthSelector from './components/UI/MonthSelector';
import SpeciesDetailPanel from './components/UI/SpeciesDetailPanel';
import StatsOverview from './components/UI/StatsOverview';
import DonationModal from './components/UI/DonationModal';
import DonationButton from './components/UI/DonationButton';
import RecentDonations from './components/UI/RecentDonations';
import { mockSpecies, generateHeatmapPoints } from './data/speciesData';
import { useSpeciesFilter } from './hooks/useSpeciesFilter';
import { Species } from './types/species';

function App() {
  const [selectedSpecies, setSelectedSpecies] = useState<Species[] | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationSpecies, setDonationSpecies] = useState<Species | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const {
    filteredSpecies,
    selectedType,
    selectedStatus,
    setSelectedType,
    setSelectedStatus,
    setSearchResults
  } = useSpeciesFilter(mockSpecies);

  const heatmapPoints = generateHeatmapPoints(selectedMonth, selectedYear);

  const handlePointClick = (species: Species[]) => {
    setSelectedSpecies(species);
  };

  const handleMonthChange = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleDonateClick = (species?: Species) => {
    setDonationSpecies(species);
    setShowDonationModal(true);
  };

  const handleDonateFromSpeciesDetail = (species: Species) => {
    setSelectedSpecies(null); // Close species detail
    handleDonateClick(species);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Ontario Endangered Species
                </h1>
                <p className="text-sm text-gray-600">Conservation Monitoring System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DonationButton 
                onClick={() => handleDonateClick()}
                size="sm"
              />
              <button
                onClick={() => setShowInfo(true)}
                className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 
                         rounded-lg transition-colors"
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="mb-6">
          <StatsOverview species={filteredSpecies} />
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              species={mockSpecies}
              onSearchResults={setSearchResults}
              placeholder="Search by species name..."
            />
          </div>
          <div className="text-sm text-gray-600 bg-white px-4 py-3 rounded-lg border border-emerald-200">
            <strong>Viewing:</strong> {new Date(selectedYear, selectedMonth - 1).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })} data
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1 space-y-4">
            <FilterPanel
              selectedType={selectedType}
              selectedStatus={selectedStatus}
              onTypeChange={setSelectedType}
              onStatusChange={setSelectedStatus}
            />
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onMonthChange={handleMonthChange}
            />
          </div>

          {/* Center - Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-emerald-200">
              <div className="h-[600px]">
                <MapContainer
                  heatmapPoints={heatmapPoints}
                  onPointClick={handlePointClick}
                />
              </div>
              <div className="p-4 bg-emerald-50 border-t border-emerald-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <strong>How to use:</strong> Select a month/year to view species activity data. 
                    Zoom in to see individual species markers. Click on markers to view detailed species information.
                  </p>
                  <DonationButton 
                    onClick={() => handleDonateClick()}
                    variant="secondary"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Donations */}
          <div className="lg:col-span-2">
            <RecentDonations />
          </div>
        </div>
      </main>

      {/* Species Detail Modal */}
      {selectedSpecies && (
        <SpeciesDetailPanel
          species={selectedSpecies}
          onClose={() => setSelectedSpecies(null)}
          onDonate={handleDonateFromSpeciesDetail}
        />
      )}

      {/* Donation Modal */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => {
          setShowDonationModal(false);
          setDonationSpecies(undefined);
        }}
        species={donationSpecies}
      />

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">About This System</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-gray-600">
              <p>
                This interactive heatmap displays endangered species across Ontario, 
                helping visualize conservation priorities and species distribution patterns over time.
              </p>
              <h3 className="font-semibold text-gray-900">Features:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Monthly species activity tracking and visualization</li>
                <li>Interactive heatmap showing species concentration by time period</li>
                <li>Detailed species profiles with conservation status</li>
                <li>Advanced filtering by species type, conservation status, and time</li>
                <li>Real-time search functionality</li>
                <li>Secure donation system to support conservation efforts</li>
                <li>Links to official conservation resources</li>
              </ul>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-semibold text-emerald-900">Support Conservation</h4>
                </div>
                <p className="text-emerald-800 text-sm">
                  Your donations directly fund habitat protection, species research, and recovery programs. 
                  Every contribution makes a real difference in protecting Ontario's endangered wildlife.
                </p>
              </div>
              <p className="text-sm text-gray-500 pt-2 border-t">
                Data is for demonstration purposes. For official conservation information, 
                please visit Ontario.ca or contact the Ministry of Environment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;