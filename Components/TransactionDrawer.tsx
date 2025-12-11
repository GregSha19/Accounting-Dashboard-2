import { X } from 'lucide-react';

interface Transaction {
  id: string;
  orderId: string;
  tenant: string;
  supplier: string;
  category: string;
  userTier: string;
  productType: string;
  bookingDate: string;
  eventDate: string;
  paymentRail: string;
  currency: string;
  grossAmount: number;
  cogs: number;
  margin: number;
  superlogicFee: number;
  ccFee: number;
  spEarned: number;
  spRedeemed: number;
  spUsdValue: number;
  refundStatus: string;
  refundedAmount: number;
  status: string;
}

interface TransactionDrawerProps {
  transaction: Transaction;
  onClose: () => void;
}

const ledgerEntries = [
  { account: '1010 - Merchant Cash (Card)', debit: 2450.00, credit: 0 },
  { account: '4100 - Merchant Revenue (Gold)', debit: 0, credit: 2450.00 },
  { account: '5100 - Supplier COGS (Gold)', debit: 2205.00, credit: 0 },
  { account: '2100 - AP - Marriott Hotels', debit: 0, credit: 2205.00 },
  { account: '4200 - Superlogic Fee Revenue', debit: 0, credit: 98.00 },
  { account: '5200 - Credit Card Processing Fee', debit: 73.50, credit: 0 },
];

export function TransactionDrawer({ transaction, onClose }: TransactionDrawerProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-900">Transaction Details</h3>
            <p className="text-gray-600 text-sm mt-1">{transaction.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-gray-900 mb-4">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Order ID</div>
                <div className="text-gray-900 mt-1">{transaction.orderId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Tenant</div>
                <div className="text-gray-900 mt-1">{transaction.tenant}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Supplier</div>
                <div className="text-gray-900 mt-1">{transaction.supplier}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Category</div>
                <div className="text-gray-900 mt-1">{transaction.category}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Product Type</div>
                <div className="text-gray-900 mt-1">{transaction.productType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">User Tier</div>
                <div className="text-gray-900 mt-1">{transaction.userTier}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Booking Date</div>
                <div className="text-gray-900 mt-1">{transaction.bookingDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Event Date</div>
                <div className="text-gray-900 mt-1">{transaction.eventDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Transaction Status</div>
                <div className="mt-1">
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
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-gray-900 mb-4">Financial Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Payment Rail</div>
                <div className="text-gray-900 mt-1">{transaction.paymentRail}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Currency</div>
                <div className="text-gray-900 mt-1">{transaction.currency}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Gross Amount</div>
                <div className="text-gray-900 mt-1">${transaction.grossAmount.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Supplier COGS</div>
                <div className="text-gray-900 mt-1">${transaction.cogs.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Net Margin</div>
                <div className="text-gray-900 mt-1">${transaction.margin.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Superlogic Fee</div>
                <div className="text-gray-900 mt-1">${transaction.superlogicFee.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">CC Processing Fee</div>
                <div className="text-gray-900 mt-1">${transaction.ccFee.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Refund Status</div>
                <div className="text-gray-900 mt-1">{transaction.refundStatus}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-gray-900 mb-4">Points Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">SP Earned</div>
                <div className="text-gray-900 mt-1">{transaction.spEarned.toLocaleString()} SP</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">SP Redeemed</div>
                <div className="text-gray-900 mt-1">{transaction.spRedeemed.toLocaleString()} SP</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">USD Equivalent</div>
                <div className="text-gray-900 mt-1">${transaction.spUsdValue.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-gray-900 mb-4">Double-Entry Ledger</h4>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                      Debit
                    </th>
                    <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                      Credit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ledgerEntries.map((entry, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {entry.account}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Total
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      ${ledgerEntries.reduce((sum, e) => sum + e.debit, 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      ${ledgerEntries.reduce((sum, e) => sum + e.credit, 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-gray-900 mb-4">Supplier Payout Impact</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-900">
                This transaction added <span>${transaction.cogs.toFixed(2)}</span> to Accounts Payable for <span>{transaction.supplier}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}