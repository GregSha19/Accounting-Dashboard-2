import { ArrowLeft, Download, Plus, TrendingUp } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Supplier {
  id: string;
  name: string;
  tenants: string[];
  currency: string;
  apBalance: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
  nextPayoutDate: string;
  type: string;
}

interface SupplierDetailProps {
  supplier: Supplier;
  onBack: () => void;
}

const apBalanceHistory = [
  { month: 'Jul', balance: 520000 },
  { month: 'Aug', balance: 680000 },
  { month: 'Sep', balance: 590000 },
  { month: 'Oct', balance: 720000 },
  { month: 'Nov', balance: 847291 },
];

const transactions = [
  {
    id: 'TXN-2024-001234',
    date: '2024-11-15',
    tenant: 'Air Shop',
    amount: 2205.00,
    status: 'Refundable',
    refundableUntil: '2024-12-15',
  },
  {
    id: 'TXN-2024-001198',
    date: '2024-11-14',
    tenant: 'Crypto.com',
    amount: 3890.50,
    status: 'Refundable',
    refundableUntil: '2024-12-14',
  },
  {
    id: 'TXN-2024-001167',
    date: '2024-11-12',
    tenant: 'Air Shop',
    amount: 1567.25,
    status: 'Non-refundable',
    refundableUntil: '-',
  },
];

export function SupplierDetail({ supplier, onBack }: SupplierDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="text-gray-900">{supplier.name}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Supplier ID: {supplier.id} • {supplier.type}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400">
            <Download className="w-4 h-4" />
            Generate Payout File
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Current AP Balance</div>
          <div className="text-gray-900 text-2xl">${supplier.apBalance.toLocaleString()}</div>
          <div className="text-gray-600 text-sm mt-1">{supplier.currency}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Last Payment</div>
          <div className="text-gray-900 text-2xl">${supplier.lastPaymentAmount.toLocaleString()}</div>
          <div className="text-gray-600 text-sm mt-1">{supplier.lastPaymentDate}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Next Payout</div>
          <div className="text-gray-900 text-2xl">{supplier.nextPayoutDate}</div>
          <div className="text-gray-600 text-sm mt-1">Scheduled</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-gray-600 text-sm mb-1">Active Tenants</div>
          <div className="text-gray-900 text-2xl">{supplier.tenants.length}</div>
          <div className="text-gray-600 text-sm mt-1">{supplier.tenants.join(', ')}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-gray-900">AP Balance Over Time</h3>
              <p className="text-gray-600 text-sm mt-1">Last 5 months</p>
            </div>
          </div>
          <DateRangePicker />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={apBalanceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent Transactions</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Refundable Until
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {transaction.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {transaction.tenant}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'Refundable'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {transaction.refundableUntil}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
