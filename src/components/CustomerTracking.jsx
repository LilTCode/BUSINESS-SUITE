import { useState } from 'react';
import { FaUsers, FaChartBar } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomerTracking = () => {
  const [customerData] = useState([
    {
      id: 1,
      name: 'John Doe',
      purchases: [
        { product: 'Product A', quantity: 5 },
        { product: 'Product B', quantity: 3 },
      ],
      totalSpent: 299.95,
    },
    {
      id: 2,
      name: 'Jane Smith',
      purchases: [
        { product: 'Product C', quantity: 2 },
        { product: 'Product A', quantity: 1 },
      ],
      totalSpent: 159.96,
    },
    {
      id: 3,
      name: 'Testimony Ola',
      purchases: [
        { product: 'Product D', quantity: 2 },
        { product: 'Product C', quantity: 4 },
      ],
      totalSpent: 300.96,
    },
    // Add more mock data as needed
  ]);

  const popularProducts = [
    { name: 'Product A', purchases: 15 },
    { name: 'Product B', purchases: 12 },
    { name: 'Product C', purchases: 13 },
    { name: 'Product D', purchases: 6 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <FaUsers className="text-3xl text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold gradient-text">Customer Insights</h1>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaChartBar /> Popular Products
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularProducts}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="purchases" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Recent Customer Activity
          </h2>
          <div className="space-y-4">
            {customerData.map((customer) => (
              <div key={customer.id} className="glass p-4 rounded-lg">
                <h3 className="font-semibold">{customer.name}</h3>
                <p className="text-sm text-gray-300">
                  Total Spent: ${customer.totalSpent.toFixed(2)}
                </p>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold">Recent Purchases:</h4>
                  <ul className="text-sm text-gray-300">
                    {customer.purchases.map((purchase, index) => (
                      <li key={index}>
                        {purchase.product} x{purchase.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTracking;
