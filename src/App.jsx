import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  FaBox,
  FaUsers,
  FaUserTie,
  FaShoppingCart,
  FaChartLine,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import './App.css';
import AnimatedBackground from './components/AnimatedBackground';
import InventorySystem from './components/InventorySystem';
import CustomerTracking from './components/CustomerTracking';
import EmployeeManagement from './components/EmployeeManagement';
import OrderProcessing from './components/OrderProcessing';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { BusinessProvider } from './context/BusinessContext';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/inventory', name: 'T-Inventory', icon: <FaBox /> },
    { path: '/customers', name: 'Customer Tracking', icon: <FaUsers /> },
    { path: '/employees', name: 'Employee Management', icon: <FaUserTie /> },
    { path: '/orders', name: 'Order Processing', icon: <FaShoppingCart /> },
    { path: '/analytics', name: 'Analytics', icon: <FaChartLine /> },
  ];

  return (
    <Router>
      <BusinessProvider>
        <div className="min-h-screen bg-black text-white flex">
          <AnimatedBackground />

          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition duration-200 ease-in-out z-30`}
          >
            <div className="h-full glass w-64 p-4">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold gradient-text">
                  Business Suite
                </h1>
                <button
                  className="md:hidden"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg glass hover:scale-105 transition-transform"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="fixed top-4 left-4 z-40 md:hidden glass p-3 rounded-lg"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>

          {/* Main content */}
          <div
            className="flex-1 md:ml-64 p-4 sm:p-6"
            style={{ overflow: 'auto', minHeight: '100vh' }}
          >
            <Routes>
              <Route path="/inventory" element={<InventorySystem />} />
              <Route path="/customers" element={<CustomerTracking />} />
              <Route path="/employees" element={<EmployeeManagement />} />
              <Route path="/orders" element={<OrderProcessing />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route
                path="/"
                element={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h1 className="text-4xl md:text-6xl font-bold glow-text mb-6">
                        Welcome to Business Suite
                      </h1>
                      <p className="text-xl gradient-text mb-8">
                        Select a module from the sidebar to get started
                      </p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </BusinessProvider>
    </Router>
  );
}

export default App;
