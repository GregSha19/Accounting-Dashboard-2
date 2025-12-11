import { useState } from 'react';
import { ChevronRight, ArrowLeft, Download, DollarSign } from 'lucide-react';
import { MultiSelect } from '../MultiSelect';
import { SupplierDetail } from '../SupplierDetail';

const mockSuppliers = [
  {
    id: 'SUP-001',
    name: 'Superlogic',
    tenants: ['Air Shop', 'Crypto.com', 'Qiibee'],
    currency: 'USD',
    apBalance: 847291.50,
    lastPaymentDate: '2024-10-28',
    lastPaymentAmount: 652000.00,
    nextPayoutDate: '2024-12-05',
    type: 'Hotel',
  },
  {
    id: 'SUP-002',
    name: 'ONE Company',
    tenants: ['BookIt'],
    currency: 'EUR',
    apBalance: 234567.25,
    lastPaymentDate: '2024-11-01',
    lastPaymentAmount: 180000.00,
    nextPayoutDate: '2024-12-08',
    type: 'Hotel',
  },
  {
    id: 'SUP-003',
    name: 'Superlogic',
    tenants: ['Air Shop'],
    currency: 'USD',
    apBalance: 456892.75,
    lastPaymentDate: '2024-10-25',
    lastPaymentAmount: 320000.00,
    nextPayoutDate: '2024-12-10',
    type: 'Ticketing',
  },
  {
    id: 'SUP-004',
    name: 'Superlogic',
    tenants: ['Crypto.com'],
    currency: 'USD',
    apBalance: 308539.50,
    lastPaymentDate: '2024-11-05',
    lastPaymentAmount: 275000.00,
    nextPayoutDate: '2024-12-12',
    type: 'Experience',
  },
];

export function SuppliersTab() {
  const [selectedSupplier, setSelectedSupplier] = useState<typeof mockSuppliers[0] | null>(null);

  const tenantOptions = ['Air Shop', 'Crypto.com', 'Other'];
  const typeOptions = ['Hotel', 'Experience', 'Ticketing'];
  const currencyOptions = ['USD', 'EUR', 'GBP'];

  if (selectedSupplier) {
    return (
      <SupplierDetail
        supplier={selectedSupplier}
        onBack={() => setSelectedSupplier(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Suppliers</h2>
          <p className="text-gray-600 text-sm mt-1">
            Supplier payables, withdrawal logic, and reconciliation
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MultiSelect label="Tenant" options={tenantOptions} />
          <MultiSelect label="Supplier Type" options={typeOptions} />
          <MultiSelect label="Currency" options={currencyOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Supplier Name
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Tenants
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Currency
              </th>
              <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                AP Balance
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Last Payment
              </th>
              <th className="px-4 py-3 text-right text-xs text-gray-600 uppercase tracking-wider">
                Last Amount
              </th>
              <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                Next Payout
              </th>
              <th className="px-4 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockSuppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSupplier(supplier)}
              >
                <td className="px-4 py-4 text-sm text-gray-900">
                  {supplier.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {supplier.type}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {supplier.tenants.map((tenant) => (
                      <span
                        key={tenant}
                        className="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tenant}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {supplier.currency}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">
                  ${supplier.apBalance.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {supplier.lastPaymentDate}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 text-right">
                  ${supplier.lastPaymentAmount.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {supplier.nextPayoutDate}
                </td>
                <td className="px-4 py-4 text-center">
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {mockSuppliers.length} suppliers
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">
                Total AP: ${mockSuppliers.reduce((sum, s) => sum + s.apBalance, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
