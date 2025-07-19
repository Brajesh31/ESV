import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number, year: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      onMonthChange(12, selectedYear - 1);
    } else {
      onMonthChange(selectedMonth - 1, selectedYear);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      onMonthChange(1, selectedYear + 1);
    } else {
      onMonthChange(selectedMonth + 1, selectedYear);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-emerald-200">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-gray-900">Time Period</h3>
      </div>

      <div className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-3">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-emerald-100 rounded transition-colors"
            disabled={selectedYear === years[years.length - 1] && selectedMonth === 1}
          >
            <ChevronLeft className="w-5 h-5 text-emerald-600" />
          </button>
          
          <div className="text-center">
            <div className="font-semibold text-gray-900">
              {months[selectedMonth - 1]}
            </div>
            <div className="text-sm text-gray-600">
              {selectedYear}
            </div>
          </div>
          
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-emerald-100 rounded transition-colors"
            disabled={selectedYear === currentYear && selectedMonth === new Date().getMonth() + 1}
          >
            <ChevronRight className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* Month Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(parseInt(e.target.value), selectedYear)}
            className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 
                     focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
          >
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onMonthChange(selectedMonth, parseInt(e.target.value))}
            className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 
                     focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Filters */}
        <div className="pt-2 border-t border-emerald-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Select
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onMonthChange(new Date().getMonth() + 1, currentYear)}
              className="px-3 py-2 text-sm bg-emerald-100 text-emerald-700 rounded-md 
                       hover:bg-emerald-200 transition-colors"
            >
              Current Month
            </button>
            <button
              onClick={() => {
                const lastMonth = new Date().getMonth();
                const year = lastMonth === 0 ? currentYear - 1 : currentYear;
                const month = lastMonth === 0 ? 12 : lastMonth;
                onMonthChange(month, year);
              }}
              className="px-3 py-2 text-sm bg-emerald-100 text-emerald-700 rounded-md 
                       hover:bg-emerald-200 transition-colors"
            >
              Last Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;