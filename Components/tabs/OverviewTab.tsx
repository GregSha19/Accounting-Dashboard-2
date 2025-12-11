import { DateRangePicker } from '../DateRangePicker';
import { MetricCard } from '../MetricCard';
import { BookingsChart } from '../charts/BookingsChart';
import { RevenueByTierChart } from '../charts/RevenueByTierChart';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Coins,
} from 'lucide-react';

interface OverviewTabProps {
  onNavigate: (tab: string) => void;
}

export function OverviewTab({ onNavigate }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Accounting Overview</h2>
          <p className="text-gray-600 text-sm mt-1">
            High-level financial metrics and performance monitoring
          </p>
        </div>
        <DateRangePicker />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Booking Volume"
          value="$2,847,392"
          subtitle="1,243 bookings"
          change="+12.3%"
          trend="up"
          icon={ShoppingCart}
          onClick={() => onNavigate('transactions')}
        />
        <MetricCard
          title="BookIt Revenue"
          value="$284,739"
          subtitle="10% avg margin"
          change="+8.7%"
          trend="up"
          icon={DollarSign}
          onClick={() => onNavigate('accounting')}
        />
        <MetricCard
          title="Supplier Payables"
          value="$1,847,291"
          subtitle="Outstanding AP"
          change="-3.2%"
          trend="down"
          icon={Users}
          onClick={() => onNavigate('suppliers')}
        />
        <MetricCard
          title="Spree Points"
          value="4.2M SP"
          subtitle="$42,000 USD equiv."
          change="+15.4%"
          trend="up"
          icon={Coins}
          onClick={() => onNavigate('transactions')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900">Bookings by Category</h3>
              <p className="text-gray-600 text-sm mt-1">Last 30 days</p>
            </div>
          </div>
          <BookingsChart />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-gray-900">Revenue by User Tier</h3>
              <p className="text-gray-600 text-sm mt-1">Last 30 days</p>
            </div>
          </div>
          <RevenueByTierChart />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('transactions')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="text-gray-900 mb-1">View All Transactions</div>
            <div className="text-gray-600 text-sm">
              Transaction-level reporting and reconciliation
            </div>
          </button>
          <button
            onClick={() => onNavigate('suppliers')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="text-gray-900 mb-1">Manage Suppliers</div>
            <div className="text-gray-600 text-sm">
              View payables and process payouts
            </div>
          </button>
          <button
            onClick={() => onNavigate('reconciliation')}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="text-gray-900 mb-1">Add Reconciliation</div>
            <div className="text-gray-600 text-sm">
              Manual adjustments and entries
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
