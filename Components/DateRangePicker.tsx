import { Calendar } from 'lucide-react';
import { useState } from 'react';

export function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState('last30');

  const ranges = [
    { value: 'last7', label: 'Last 7 days' },
    { value: 'last30', label: 'Last 30 days' },
    { value: 'last90', label: 'Last 90 days' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'custom', label: 'Custom range' },
  ];

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer">
        <Calendar className="w-4 h-4 text-gray-600" />
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-transparent border-none outline-none cursor-pointer text-sm text-gray-700"
        >
          {ranges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
