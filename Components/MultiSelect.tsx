import { ChevronDown } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
}

export function MultiSelect({ label, options }: MultiSelectProps) {
  return (
    <div>
      <label className="text-sm text-gray-700 mb-2 block">{label}</label>
      <div className="relative">
        <select className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">All {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
}
