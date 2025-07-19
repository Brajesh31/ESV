import React from 'react';
import { Species } from '../../types/species';
import { AlertTriangle, TrendingDown, Shield, MapPin } from 'lucide-react';

interface StatsOverviewProps {
  species: Species[];
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ species }) => {
  const stats = {
    total: species.length,
    endangered: species.filter(s => s.conservationStatus === 'endangered').length,
    threatened: species.filter(s => s.conservationStatus === 'threatened').length,
    specialConcern: species.filter(s => s.conservationStatus === 'special_concern').length
  };

  const statCards = [
    {
      title: 'Total Species',
      value: stats.total,
      icon: MapPin,
      color: 'text-emerald-600 bg-emerald-100',
      description: 'Species monitored'
    },
    {
      title: 'Endangered',
      value: stats.endangered,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100',
      description: 'Critical status'
    },
    {
      title: 'Threatened',
      value: stats.threatened,
      icon: TrendingDown,
      color: 'text-orange-600 bg-orange-100',
      description: 'At risk species'
    },
    {
      title: 'Special Concern',
      value: stats.specialConcern,
      icon: Shield,
      color: 'text-yellow-600 bg-yellow-100',
      description: 'Monitoring required'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-white p-4 rounded-lg shadow-md border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;