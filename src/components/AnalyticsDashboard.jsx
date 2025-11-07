import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaChartLine } from 'react-icons/fa';

const AnalyticsDashboard = () => {
  const salesData = [
    { month: 'Jan', sales: 4000, profit: 2400, orders: 240 },
    { month: 'Feb', sales: 3000, profit: 1398, orders: 210 },
    { month: 'Mar', sales: 2000, profit: 9800, orders: 290 },
    { month: 'Apr', sales: 2780, profit: 3908, orders: 200 },
    { month: 'May', sales: 1890, profit: 4800, orders: 181 },
    { month: 'Jun', sales: 2390, profit: 3800, orders: 250 },
  ];

  const productData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Food', value: 300 },
    { name: 'Home', value: 200 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <FaChartLine className="text-3xl text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold gradient-text">
          Analytics Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Total Sales', value: '$23,450', change: '+12%' },
          { title: 'Total Orders', value: '1,371', change: '+5%' },
          { title: 'Average Order', value: '$82.50', change: '+3%' },
        ].map((item, index) => (
          <div key={index} className="glass p-6 rounded-lg">
            <h3 className="text-gray-400">{item.title}</h3>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{item.value}</p>
              <p
                className={
                  item.change.startsWith('+')
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Trend */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Orders Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Categories */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3b82f6"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Profit */}
        <div className="glass p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Profit</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
