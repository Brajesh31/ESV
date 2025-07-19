import React from 'react';
import { Heart, Users, DollarSign, Calendar } from 'lucide-react';

const RecentDonations: React.FC = () => {
  // Mock data for demonstration
  const mockDonations = [
    {
      id: '1',
      amount: 2500,
      currency: 'usd',
      donor_name: 'Sarah Johnson',
      species_id: '1',
      message: 'Every creature deserves protection!',
      anonymous: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      amount: 5000,
      currency: 'usd',
      donor_name: null,
      species_id: '3',
      message: null,
      anonymous: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      amount: 1000,
      currency: 'usd',
      donor_name: 'Mike Chen',
      species_id: null,
      message: 'Supporting all conservation efforts',
      anonymous: false,
      created_at: new Date(Date.now() - 172800000).toISOString(),
    }
  ];

  const totalRaised = mockDonations.reduce((sum, donation) => sum + donation.amount, 0) / 100;
  const donorCount = mockDonations.length;

  const getSpeciesName = (speciesId: string | null) => {
    if (!speciesId) return 'General Conservation';
    const speciesNames: { [key: string]: string } = {
      '1': 'Woodland Caribou',
      '2': 'Lake Sturgeon',
      '3': 'Blanding\'s Turtle',
      '4': 'Eastern Loggerhead Shrike',
      '5': 'American Chestnut',
      '6': 'Monarch Butterfly',
      '7': 'Jefferson Salamander',
      '8': 'Polar Bear'
    };
    return speciesNames[speciesId] || 'Unknown Species';
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-emerald-200">
      {/* Header with Stats */}
      <div className="p-6 border-b border-emerald-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Conservation Impact</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Total Raised</span>
            </div>
            <p className="text-2xl font-bold text-emerald-900">
              ${totalRaised.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Donors</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{donorCount}</p>
          </div>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Donations</h4>
        
        <div className="space-y-3">
          {mockDonations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {donation.anonymous ? 'Anonymous Donor' : donation.donor_name || 'Anonymous'}
                  </span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">
                    {getSpeciesName(donation.species_id)}
                  </span>
                </div>
                
                {donation.message && !donation.anonymous && (
                  <p className="text-sm text-gray-600 italic">"{donation.message}"</p>
                )}
                
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatDate(donation.created_at)}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="font-bold text-emerald-600">
                  {formatAmount(donation.amount, donation.currency)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentDonations;