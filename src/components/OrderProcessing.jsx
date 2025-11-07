import { useState } from 'react';
import { FaShoppingCart, FaCheck, FaTimes } from 'react-icons/fa';

const OrderProcessing = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: 'Alice Johnson',
      items: [
        { name: 'Product A', quantity: 2, price: 29.99 },
        { name: 'Product B', quantity: 1, price: 19.99 },
      ],
      status: 'Pending',
      date: '2025-11-07',
    },
    // Add more mock data
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <FaShoppingCart className="text-3xl text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold gradient-text">Order Processing</h1>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="glass p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-300">{order.customer}</p>
                <p className="text-sm text-gray-400">{order.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    order.status === 'Completed'
                      ? 'bg-green-500'
                      : 'glass hover:bg-green-500'
                  }`}
                  onClick={() => updateOrderStatus(order.id, 'Completed')}
                >
                  <FaCheck />
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    order.status === 'Cancelled'
                      ? 'bg-red-500'
                      : 'glass hover:bg-red-500'
                  }`}
                  onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center glass p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p>${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
              <div>
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-sm text-gray-400">Status: {order.status}</p>
              </div>
              <p className="text-lg font-semibold">
                ${calculateTotal(order.items).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProcessing;
