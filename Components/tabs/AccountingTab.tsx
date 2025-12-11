import { useState } from 'react';
import { Filter, Download, ChevronDown, X } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { MultiSelect } from '../MultiSelect';

const savedViews = [
  { id: 'all', label: 'All Entries' },
  { id: 'crypto-revenue', label: 'Month-End Crypto Revenue' },
  { id: 'refunds-before', label: 'Refunds (Before Non-Refundable)' },
  { id: 'refunds-after-pre', label: 'Refunds (After Non-Refundable, Pre-Payout)' },
  { id: 'refunds-after-post', label: 'Refunds (After Supplier Payout)' },
];

const ledgerData = [
  {
    date: '2024-11-15',
    tenant: 'Air Shop',
    supplier: 'Superlogic',
    accountNumber: '1010',
    accountName: 'Merchant Cash (Card)',
    debit: 2450.00,
    credit: 0,
    currency: 'USD',
    transactionId: 'TXN-2024-001234',
    memo: 'Hotel booking payment',
  },
  {
    date: '2024-11-15',
    tenant: 'Air Shop',
    supplier: 'Superlogic',
    accountNumber: '4100',
    accountName: 'MOCA Revshare Account',
    debit: 0,
    credit: 2450.00,
    currency: 'USD',
    transactionId: 'TXN-2024-001234',
    memo: 'Moca Revenue Share October 2025',
  },
  {
    date: '2024-11-15',
    tenant: 'BookIt',
    supplier: 'ONE Company',
    accountNumber: '5100',
    accountName: 'Supplier COGS (Gold)',
    debit: 2205.00,
    credit: 0,
    currency: 'USD',
    transactionId: 'TXN-2024-001234',
    memo: 'Supplier COGS October 2025',
  },
  {
    date: '2024-11-15',
    tenant: 'Air Shop',
    supplier: 'Superlogic',
    accountNumber: '2100',
    accountName: 'AP - Superlogic',
    debit: 0,
    credit: 2205.00,
    currency: 'USD',
    transactionId: 'TXN-2024-001234',
    memo: 'Accounts payable accrual',
  },
  {
    date: '2024-11-16',
    tenant: 'Crypto.com',
    supplier: 'Superlogic',
    accountNumber: '1020',
    accountName: 'Merchant Cash (Crypto)',
    debit: 189.00,
    credit: 0,
    currency: 'USDC',
    transactionId: 'TXN-2024-001235',
    memo: 'City tour payment (crypto)',
  },
  {
    date: '2024-11-16',
    tenant: 'Crypto.com',
    supplier: 'Superlogic',
    accountNumber: '2300',
    accountName: 'Deferred Revenue (Crypto)',
    debit: 0,
    credit: 189.00,
    currency: 'USDC',
    transactionId: 'TXN-2024-001235',
    memo: 'Deferred revenue (refundable period)',
  },
];

export function AccountingTab() {
  const [activeView, setActiveView] = useState('all');
  const [showFilters, setShowFilters] = useState(true);

  const tenantOptions = ['Air Shop', 'Crypto.com', 'Other'];
  const supplierOptions = ['Marriott Hotels', 'GetYourGuide', 'Ticketmaster'];
  const accountOptions = ['1010 - Merchant Cash (Card)', '4100 - Revenue', '5100 - COGS'];
  const railOptions = ['Card', 'Crypto'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Accounting Ledger</h2>
          <p className="text-gray-600 text-sm mt-1">
            Double-entry journal entries and month-end views
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

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {savedViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 text-sm whitespace-nowrap rounded-lg transition-colors ${
                  activeView === view.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {showFilters && (
          <div className="border-b border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Date Range</label>
                <DateRangePicker />
              </div>
              <MultiSelect label="Tenant" options={tenantOptions} />
              <MultiSelect label="Supplier" options={supplierOptions} />
              <MultiSelect label="Account" options={accountOptions} />
              <MultiSelect label="Payment Rail" options={railOptions} />
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Tenant
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Account #
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Account Name
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Debit
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Credit
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Currency
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Memo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {ledgerData.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.transactionId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.tenant}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.supplier}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.accountNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.accountName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.currency}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {entry.memo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {ledgerData.length} entries
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Total Debits: ${ledgerData.reduce((sum, e) => sum + e.debit, 0).toFixed(2)}
            </div>
            <div className="text-sm text-gray-700">
              Total Credits: ${ledgerData.reduce((sum, e) => sum + e.credit, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-blue-900 mb-2">About Saved Views</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <span>Month-End Crypto Revenue:</span> Shows revenue recognition entries when crypto bookings become non-refundable</li>
          <li>• <span>Refund Scenarios:</span> Filter entries by refund timing (before non-refundable, after non-refundable pre-payout, after payout)</li>
        </ul>
      </div>
    </div>
  );
}
