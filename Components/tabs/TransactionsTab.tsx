import { useState } from 'react';
import { Filter, Download, X, ChevronRight } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { MultiSelect } from '../MultiSelect';
import { TransactionDrawer } from '../TransactionDrawer';

const mockTransactions = [
  {
    id: 'TXN-2024-001234',
    orderId: 'ORD-789456',
    tenant: 'Air Shop',
    supplier: 'ONE Company',
    category: 'Hotels',
    clientOperator: 'Air Shop Inc.',
    userTier: 'Gold',
    productType: 'Hotel Booking',
    bookingDate: '2024-11-15',
    eventDate: '2024-12-23',
    paymentRail: 'Card',
    currency: 'USD',
    fxRate: 1.0,
    grossAmount: 2450.00,
    cogs: 2205.00,
    margin: 245.00,
    superlogicFee: 98.00,
    ccFee: 73.50,
    taxIncluded: true,
    spEarned: 2450,
    spRedeemed: 0,
    spUsdValue: 24.50,
    refundStatus: 'None',
    refundedAmount: 0,
    isRefundable: true,
    status: 'COMPLETED',
  },
  {
    id: 'TXN-2024-001235',
    orderId: 'ORD-789457',
    tenant: 'Crypto.com',
    supplier: 'Superlogic',
    category: 'Experiences',
    clientOperator: 'Crypto.com',
    userTier: 'Premium',
    productType: 'City Tour',
    bookingDate: '2024-11-16',
    eventDate: '2024-12-01',
    paymentRail: 'Crypto',
    currency: 'USDC',
    fxRate: 1.0,
    grossAmount: 189.00,
    cogs: 160.65,
    margin: 28.35,
    superlogicFee: 9.45,
    ccFee: 0,
    taxIncluded: true,
    spEarned: 378,
    spRedeemed: 100,
    spUsdValue: 3.78,
    refundStatus: 'None',
    refundedAmount: 0,
    isRefundable: true,
    status: 'PENDING',
  },
  {
    id: 'TXN-2024-001236',
    orderId: 'ORD-789458',
    tenant: 'Air Shop',
    supplier: 'Superlogic',
    category: 'Tickets',
    clientOperator: 'Air Shop Inc.',
    userTier: 'Basic',
    productType: 'Concert Tickets',
    bookingDate: '2024-11-17',
    eventDate: '2025-01-08',
    paymentRail: 'Card',
    currency: 'USD',
    fxRate: 1.0,
    grossAmount: 450.00,
    cogs: 405.00,
    margin: 45.00,
    superlogicFee: 18.00,
    ccFee: 13.50,
    taxIncluded: true,
    spEarned: 450,
    spRedeemed: 0,
    spUsdValue: 4.50,
    refundStatus: 'Refunded',
    refundedAmount: 450.00,
    isRefundable: false,
    status: 'REFUNDED',
  },
];

export function TransactionsTab() {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null);
  const [includeTestTransactions, setIncludeTestTransactions] = useState(false);

  const tenantOptions = ['Air Shop', 'Crypto.com', 'Other'];
  const supplierOptions = ['Superlogic', 'ONE Company', 'BookIt'];
  const tierOptions = ['Basic', 'Gold', 'Premium'];
  const categoryOptions = ['Hotels', 'Experiences', 'Tickets', 'Tours', 'Flights'];
  const paymentOptions = ['Card', 'Crypto'];
  const statusOptions = ['Completed', 'Refundable', 'Refunded', 'Cancelled', 'Pending'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Transactions</h2>
          <p className="text-gray-600 text-sm mt-1">
            Transaction-level reporting and reconciliation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Date Range</label>
              <DateRangePicker />
            </div>
            <MultiSelect label="Tenant" options={tenantOptions} />
            <MultiSelect label="Supplier" options={supplierOptions} />
            <MultiSelect label="User Tier" options={tierOptions} />
            <MultiSelect label="Category" options={categoryOptions} />
            <MultiSelect label="Payment Method" options={paymentOptions} />
            <MultiSelect label="Status" options={statusOptions} />
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTestTransactions}
                  onChange={(e) => setIncludeTestTransactions(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Include test transactions</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Tenant
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  User Tier
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Booking Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Event Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Payment Rail
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Gross Amount
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  COGS
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Margin
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Points Earned
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.orderId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.tenant}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.supplier}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        transaction.userTier === 'Premium'
                          ? 'bg-purple-100 text-purple-700'
                          : transaction.userTier === 'Gold'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {transaction.userTier}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.bookingDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {transaction.eventDate}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        transaction.paymentRail === 'Crypto'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {transaction.paymentRail}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    ${transaction.grossAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    ${transaction.cogs.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    ${transaction.margin.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    {transaction.spEarned.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-700'
                          : transaction.status === 'REFUNDED'
                          ? 'bg-red-100 text-red-700'
                          : transaction.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span>1</span> to <span>{mockTransactions.length}</span> of{' '}
            <span>{mockTransactions.length}</span> results
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <TransactionDrawer
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}