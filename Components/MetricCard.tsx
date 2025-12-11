import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  trend,
  icon: Icon,
  onClick,
}: MetricCardProps) {
  const isPositive = trend === 'up';

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-500 hover:shadow-md transition-all text-left w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="text-gray-600 text-sm mb-1">{title}</div>
          <div className="text-gray-900 text-2xl">{value}</div>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-gray-600 text-sm">{subtitle}</div>
        <div
          className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isPositive ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
          <span>{change}</span>
        </div>
      </div>
    </button>
  );
}
