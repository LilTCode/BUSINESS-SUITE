import { useState } from 'react';
import { FaBox, FaSearch, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { useBusinessContext } from '../context/BusinessContext';

const InventorySystem = () => {
  const {
    businesses,
    currentBusinessId,
    setCurrentBusinessId,
    createBusiness,
    inventory,
    addProduct,
    recordSale,
    analyticsData,
  } = useBusinessContext();

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    price: '',
    category: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [creatingBusiness, setCreatingBusiness] = useState(false);
  const [newBusinessName, setNewBusinessName] = useState('');

  // Sale form state
  const [saleProductId, setSaleProductId] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState(1);
  const [saleCustomerName, setSaleCustomerName] = useState('');
  const [saleCustomerEmail, setSaleCustomerEmail] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity && newItem.price && newItem.category) {
      addProduct(newItem);
      setNewItem({ name: '', quantity: '', price: '', category: '' });
    }
  };

  const handleCreateBusiness = (e) => {
    e.preventDefault();
    if (!newBusinessName) return;
    createBusiness({ name: newBusinessName });
    setNewBusinessName('');
    setCreatingBusiness(false);
  };

  const productsForCurrent = inventory.filter(
    (p) => p.businessId === currentBusinessId
  );
  const filteredItems = productsForCurrent.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecordSale = (e) => {
    e.preventDefault();
    const product = inventory.find((p) => p.id === Number(saleProductId));
    if (!product || !saleQuantity) return;
    const items = [
      {
        productId: product.id,
        quantity: Number(saleQuantity),
        price: product.price,
      },
    ];
    const customerInfo = saleCustomerName
      ? { name: saleCustomerName, email: saleCustomerEmail }
      : {};
    recordSale({ customerInfo, items });
    // reset sale form
    setSaleProductId(null);
    setSaleQuantity(1);
    setSaleCustomerName('');
    setSaleCustomerEmail('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center">
          <FaBox className="text-3xl text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold gradient-text">
            T-Inventory System
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={currentBusinessId}
            onChange={(e) => setCurrentBusinessId(Number(e.target.value))}
            className="glass px-3 py-2 rounded-lg"
          >
            {businesses.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <button
            className="glass px-3 py-2 rounded-lg"
            onClick={() => setCreatingBusiness(!creatingBusiness)}
          >
            {creatingBusiness ? 'Cancel' : 'New Business'}
          </button>
        </div>
      </div>

      {creatingBusiness && (
        <form
          onSubmit={handleCreateBusiness}
          className="glass p-4 rounded-lg mb-6"
        >
          <label className="block mb-2">Business Name</label>
          <input
            value={newBusinessName}
            onChange={(e) => setNewBusinessName(e.target.value)}
            className="w-full p-2 rounded-lg mb-2"
          />
          <div className="flex gap-2">
            <button type="submit" className="glass px-4 py-2 rounded-lg">
              Create
            </button>
          </div>
        </form>
      )}

      {/* Inventory Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Value</h3>
          <p className="text-2xl gradient-text">
            ${analyticsData.inventoryMetrics?.totalValue?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
          <p className="text-2xl text-yellow-500">
            {analyticsData.inventoryMetrics?.lowStock?.length || 0} items
          </p>
        </div>
        <div className="glass p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <p className="text-2xl gradient-text">
            {
              Object.keys(
                analyticsData.inventoryMetrics?.categoryDistribution || {}
              ).length
            }
          </p>
        </div>
      </div>

      {/* Low Stock Warnings */}
      {analyticsData.inventoryMetrics?.lowStock?.length > 0 && (
        <div className="mb-8 glass p-4 rounded-lg border border-yellow-500">
          <h3 className="flex items-center text-yellow-500 font-semibold mb-2">
            <FaExclamationTriangle className="mr-2" />
            Low Stock Alert
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.inventoryMetrics.lowStock.map((item) => (
              <div key={item.id} className="glass p-3 rounded-lg">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-yellow-500">
                  Only {item.quantity} left
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Add Item Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full pl-10 pr-4 py-2 glass rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <form
          onSubmit={handleAddItem}
          className="flex flex-col md:flex-row gap-2"
        >
          <input
            type="text"
            placeholder="Item name"
            className="glass px-4 py-2 rounded-lg"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="glass px-4 py-2 rounded-lg"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="glass px-4 py-2 rounded-lg"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="glass px-4 py-2 rounded-lg"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 glass px-6 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            <FaPlus /> Add Item
          </button>
        </form>
      </div>

      {/* Record Sale */}
      <div className="glass p-4 rounded-lg mb-8">
        <h3 className="text-lg font-semibold mb-2">Record a Sale</h3>
        <form
          onSubmit={handleRecordSale}
          className="flex flex-col md:flex-row gap-2 items-center"
        >
          <select
            value={saleProductId || ''}
            onChange={(e) => setSaleProductId(e.target.value)}
            className="glass px-4 py-2 rounded-lg"
          >
            <option value="">Select product</option>
            {productsForCurrent.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.quantity} in stock
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={saleQuantity}
            onChange={(e) => setSaleQuantity(e.target.value)}
            className="glass px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            placeholder="Customer name (optional)"
            value={saleCustomerName}
            onChange={(e) => setSaleCustomerName(e.target.value)}
            className="glass px-4 py-2 rounded-lg"
          />
          <input
            type="email"
            placeholder="Customer email (optional)"
            value={saleCustomerEmail}
            onChange={(e) => setSaleCustomerEmail(e.target.value)}
            className="glass px-4 py-2 rounded-lg"
          />
          <button type="submit" className="glass px-6 py-2 rounded-lg">
            Record Sale
          </button>
        </form>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="glass">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total Sold</th>
              <th className="px-4 py-3 text-left">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="glass border-t border-gray-700">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.category}</td>
                <td
                  className={`px-4 py-3 ${item.quantity < 20 ? 'text-yellow-500' : ''}`}
                >
                  {item.quantity}
                </td>
                <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3">{item.totalSold || 0}</td>
                <td className="px-4 py-3">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySystem;
