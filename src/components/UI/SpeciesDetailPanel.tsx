import React from 'react';
import { X, ExternalLink, MapPin, Clock, AlertTriangle, Users, Heart } from 'lucide-react';
import { Species } from '../../types/species';
import DonationButton from './DonationButton';

interface SpeciesDetailPanelProps {
  species: Species[];
  onClose: () => void;
  onDonate?: (species: Species) => void;
}

const SpeciesDetailPanel: React.FC<SpeciesDetailPanelProps> = ({ species, onClose, onDonate }) => {
  const getStatusColor = (status: Species['conservationStatus']) => {
    const colors = {
      extinct: 'text-black bg-black',
      extirpated: 'text-gray-700 bg-gray-700',
      endangered: 'text-red-600 bg-red-600',
      threatened: 'text-orange-500 bg-orange-500',
      special_concern: 'text-yellow-600 bg-yellow-600'
    };
    return colors[status];
  };

  const formatStatus = (status: Species['conservationStatus']) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-emerald-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            Species Information ({species.length} species)
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {species.map((speciesItem) => (
            <div key={speciesItem.id} className="border border-emerald-200 rounded-lg p-6 bg-emerald-50">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Species Image */}
                <div className="lg:w-1/3">
                  <img
                    src={speciesItem.image}
                    alt={speciesItem.commonName}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Species Info */}
                <div className="lg:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {speciesItem.commonName}
                    </h3>
                    <p className="text-lg italic text-gray-600 mb-3">
                      {speciesItem.scientificName}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium capitalize">
                        {speciesItem.type}
                      </span>
                      <span className={`px-3 py-1 text-white rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(speciesItem.conservationStatus).split(' ')[1]}`}>
                        <div className={`w-2 h-2 rounded-full bg-white`}></div>
                        {formatStatus(speciesItem.conservationStatus)}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Population</h4>
                        <p className="text-gray-600">{speciesItem.estimatedPopulation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Range</h4>
                        <p className="text-gray-600">{speciesItem.geographicRange}</p>
                      </div>
                    </div>

                    {speciesItem.timelineToExtinction && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Timeline</h4>
                          <p className="text-gray-600">{speciesItem.timelineToExtinction}</p>
                        </div>
                      </div>
                    )}

                    {speciesItem.lastSeen && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Last Recorded</h4>
                          <p className="text-gray-600">{new Date(speciesItem.lastSeen).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Threats */}
                  {speciesItem.reasonForEndangerment.length > 0 && (
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Primary Threats</h4>
                        <div className="flex flex-wrap gap-2">
                          {speciesItem.reasonForEndangerment.map((threat, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                              {threat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-emerald-200">
                    {onDonate && (
                      <DonationButton
                        onClick={() => onDonate(speciesItem)}
                        className="flex-1"
                      />
                    )}
                    {speciesItem.learnMoreUrl && (
                      <a
                        href={speciesItem.learnMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 
                                 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Learn More
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetailPanel;