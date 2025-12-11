import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Hotels', airShop: 145000, cryptoCom: 89000, other: 32000 },
  { category: 'Experiences', airShop: 98000, cryptoCom: 67000, other: 28000 },
  { category: 'Tickets', airShop: 67000, cryptoCom: 45000, other: 19000 },
  { category: 'Tours', airShop: 54000, cryptoCom: 38000, other: 15000 },
  { category: 'Flights', airShop: 189000, cryptoCom: 112000, other: 45000 },
];

export function BookingsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="category" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar dataKey="airShop" name="Air Shop" fill="#3b82f6" />
        <Bar dataKey="cryptoCom" name="Crypto.com" fill="#8b5cf6" />
        <Bar dataKey="other" name="Other" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
