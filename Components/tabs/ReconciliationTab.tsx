import { useState } from 'react';
import { Plus, Download, Edit2, Trash2, X } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { MultiSelect } from '../MultiSelect';

interface ReconciliationEntry {
  id: string;
  date: string;
  tenant: string;
  supplier: string;
  bookingMonth: string;
  eventMonth: string;
  paymentRail: string;
  accountType: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  currency: string;
  debitCredit: 'Debit' | 'Credit';
  memo: string;
  createdBy: string;
  createdAt: string;
}

const mockEntries: ReconciliationEntry[] = [
  {
    id: 'REC-001',
    date: '2024-11-30',
    tenant: 'Air Shop',
    supplier: 'Superlogic',
    bookingMonth: '2024-11',
    eventMonth: '2024-12',
    paymentRail: 'Card',
    accountType: 'Revenue',
    accountNumber: '4100',
    accountName: 'Merchant Revenue (Gold)',
    amount: 1250.00,
    currency: 'USD',
    debitCredit: 'Credit',
    memo: 'Manual adjustment for Nov promotional bookings per finance team',
    createdBy: 'Sarah Chen',
    createdAt: '2024-11-30 14:23',
  },
  {
    id: 'REC-002',
    date: '2024-11-28',
    tenant: 'Crypto.com',
    supplier: 'ONE',
    bookingMonth: '2024-10',
    eventMonth: '2024-11',
    paymentRail: 'Crypto',
    accountType: 'AP',
    accountNumber: '2100',
    accountName: 'AP - ONE',
    amount: 3450.75,
    currency: 'USDC',
    debitCredit: 'Debit',
    memo: 'Supplier credit memo applied - ref QB invoice #4521',
    createdBy: 'Sarah Chen',
    createdAt: '2024-11-28 10:15',
  },
];

export function ReconciliationTab() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [entries, setEntries] = useState<ReconciliationEntry[]>(mockEntries);

  const tenantOptions = ['Air Shop', 'Crypto.com', 'Other'];
  const supplierOptions = ['Superlogic', 'ONE', 'BookIt'];
  const railOptions = ['Card', 'Crypto'];
  const accountTypeOptions = ['Revenue', 'COGS', 'AP', 'Deferred Revenue', 'Cash'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Reconciliation</h2>
          <p className="text-gray-600 text-sm mt-1">
            Manual reconciliation entries for accountants
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Reconciliation Entry
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          Use this section to record manual adjustments and reconciliation entries. All entries are tracked with timestamps and user attribution.
          Reference external systems like bank statements, client GL, or QuickBooks in the memo field.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-700 mb-2 block">Date Range</label>
            <DateRangePicker />
          </div>
          <MultiSelect label="Tenant" options={tenantOptions} />
          <MultiSelect label="Supplier" options={supplierOptions} />
          <MultiSelect label="Payment Rail" options={railOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Entry ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Tenant
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Account
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  DR/CR
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Payment Rail
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Memo
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Created By
                </th>
                <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.date}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.tenant}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.supplier}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {entry.accountNumber} - {entry.accountName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {entry.accountType}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right whitespace-nowrap">
                    ${entry.amount.toFixed(2)} {entry.currency}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        entry.debitCredit === 'Debit'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {entry.debitCredit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {entry.paymentRail}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {entry.memo}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    <div>{entry.createdBy}</div>
                    <div className="text-xs text-gray-500">{entry.createdAt}</div>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {entries.length} reconciliation entries
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddReconciliationModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}

function AddReconciliationModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h3 className="text-gray-900">Add Reconciliation Entry</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Tenant / Brand</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Select tenant</option>
                  <option>Air Shop</option>
                  <option>Crypto.com</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Supplier</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Select supplier</option>
                  <option>Marriott Hotels</option>
                  <option>GetYourGuide</option>
                  <option>Ticketmaster</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Booking Month</label>
                <input type="month" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Event Month</label>
                <input type="month" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Payment Rail</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Select payment rail</option>
                  <option>Card</option>
                  <option>Crypto</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Ledger Account Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Select account type</option>
                  <option>Revenue</option>
                  <option>COGS</option>
                  <option>Supplier AP</option>
                  <option>Deferred Revenue</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Account Number</label>
                <input
                  type="text"
                  placeholder="e.g., 4100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Account Name</label>
                <input
                  type="text"
                  placeholder="e.g., Merchant Revenue (Gold)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Currency</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>USD</option>
                  <option>USDC</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Date</label>
                <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-2 block">Debit / Credit</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Debit</option>
                  <option>Credit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-2 block">Memo / Notes</label>
              <textarea
                rows={4}
                placeholder="Enter references to bank statements, client GL, QuickBooks, or other supporting documentation..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
