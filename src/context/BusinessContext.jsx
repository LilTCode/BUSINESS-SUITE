import { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const useBusinessContext = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  // Businesses (each business has id, name, meta)
  const [businesses, setBusinesses] = useState([
    { id: 1, name: 'Default Store', address: '', currency: '$' },
  ]);
  const [currentBusinessId, setCurrentBusinessId] = useState(1);

  // Inventory State (products belong to businesses via businessId)
  const [inventory, setInventory] = useState([
    {
      id: 1,
      businessId: 1,
      name: 'Laptop',
      quantity: 50,
      price: 999.99,
      category: 'Electronics',
      totalSold: 23,
    },
    {
      id: 2,
      businessId: 1,
      name: 'Desk Chair',
      quantity: 30,
      price: 199.99,
      category: 'Furniture',
      totalSold: 15,
    },
    {
      id: 3,
      businessId: 1,
      name: 'Coffee Maker',
      quantity: 25,
      price: 79.99,
      category: 'Appliances',
      totalSold: 42,
    },
  ]);

  // Orders State (store orders across businesses)
  const [orders, setOrders] = useState([
    {
      id: 1,
      businessId: 1,
      customerId: 1,
      items: [
        { productId: 1, quantity: 2, price: 999.99 },
        { productId: 3, quantity: 1, price: 79.99 },
      ],
      status: 'Completed',
      date: '2025-11-01',
      employeeId: 1,
    },
  ]);

  // Customers
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      totalPurchases: 2999.97,
      purchaseHistory: [{ date: '2025-11-01', productId: 1, quantity: 2 }],
    },
  ]);

  // Employees
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      position: 'Sales Manager',
      department: 'Sales',
      email: 'jane@example.com',
      status: 'Active',
      salesCount: 15,
      totalSales: 12500.0,
    },
  ]);

  // Analytics Data (computed per-current business)
  const [analyticsData, setAnalyticsData] = useState({});

  // Helper: get products for business
  const getProductsForBusiness = (businessId) =>
    inventory.filter((p) => p.businessId === businessId);

  // Create business
  const createBusiness = ({ name, address = '', currency = '$' }) => {
    const id = businesses.length + 1;
    const b = { id, name, address, currency };
    setBusinesses([...businesses, b]);
    setCurrentBusinessId(id);
    return b;
  };

  // Add product (to current business)
  const addProduct = ({ name, quantity, price, category }) => {
    const id = inventory.length + 1;
    const product = {
      id,
      businessId: currentBusinessId,
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      category,
      totalSold: 0,
    };
    setInventory([...inventory, product]);
    return product;
  };

  // Record a sale for the current business
  const recordSale = ({
    customerInfo,
    items,
    employeeId = null,
    date = null,
  }) => {
    // customerInfo: { id } or { name, email }
    let customerId = customerInfo?.id || null;
    if (!customerId && customerInfo?.name) {
      // create new customer
      customerId = customers.length + 1;
      const newCustomer = {
        id: customerId,
        name: customerInfo.name,
        email: customerInfo.email || '',
        totalPurchases: 0,
        purchaseHistory: [],
      };
      setCustomers([...customers, newCustomer]);
    }

    const orderDate = date || new Date().toISOString().slice(0, 10);

    // Update inventory and product totals
    const updatedInventory = inventory.map((p) => ({ ...p }));
    let orderTotal = 0;
    items.forEach((it) => {
      const prod = updatedInventory.find((p) => p.id === it.productId);
      if (prod) {
        prod.quantity = Math.max(0, prod.quantity - it.quantity);
        prod.totalSold = (prod.totalSold || 0) + it.quantity;
        orderTotal += it.quantity * it.price;
      }
    });
    setInventory(updatedInventory);

    // Update customer totals
    if (customerId) {
      const custIndex = customers.findIndex((c) => c.id === customerId);
      if (custIndex !== -1) {
        const updatedCustomers = [...customers];
        updatedCustomers[custIndex].totalPurchases += orderTotal;
        updatedCustomers[custIndex].purchaseHistory.push(
          ...items.map((it) => ({
            date: orderDate,
            productId: it.productId,
            quantity: it.quantity,
          }))
        );
        setCustomers(updatedCustomers);
      }
    }

    // Update employee stats
    if (employeeId) {
      const empIndex = employees.findIndex((e) => e.id === employeeId);
      if (empIndex !== -1) {
        const updatedEmployees = [...employees];
        updatedEmployees[empIndex].salesCount += 1;
        updatedEmployees[empIndex].totalSales += orderTotal;
        setEmployees(updatedEmployees);
      }
    }

    // Add order record
    const order = {
      id: orders.length + 1,
      businessId: currentBusinessId,
      customerId,
      items,
      status: 'Completed',
      date: orderDate,
      employeeId,
      total: orderTotal,
    };
    setOrders([...orders, order]);

    return order;
  };

  // Compute analytics for current business
  useEffect(() => {
    const bizId = currentBusinessId;
    const products = inventory.filter((p) => p.businessId === bizId);
    const bizOrders = orders.filter((o) => o.businessId === bizId);

    const salesByCategory = products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + (p.totalSold || 0) * p.price;
      return acc;
    }, {});

    const employeePerformance = employees.map((e) => ({
      name: e.name,
      sales: e.salesCount,
      revenue: e.totalSales,
    }));

    const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      const revenue = bizOrders
        .filter((o) => new Date(o.date).getMonth() === date.getMonth())
        .reduce((s, o) => s + (o.total || 0), 0);
      return { month, revenue };
    }).reverse();

    const inventoryMetrics = {
      totalValue: products.reduce((acc, p) => acc + p.quantity * p.price, 0),
      lowStock: products.filter((p) => p.quantity < 20),
      categoryDistribution: products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
    };

    const customerMetrics = {
      totalCustomers: customers.length,
      averagePurchaseValue: customers.length
        ? customers.reduce((acc, c) => acc + c.totalPurchases, 0) /
          customers.length
        : 0,
      topProducts: products
        .slice()
        .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
        .slice(0, 5),
    };

    setAnalyticsData({
      salesByCategory,
      employeePerformance,
      monthlyRevenue,
      inventoryMetrics,
      customerMetrics,
    });
  }, [inventory, orders, employees, customers, currentBusinessId]);

  const contextValue = {
    businesses,
    currentBusinessId,
    setCurrentBusinessId,
    createBusiness,
    inventory,
    setInventory,
    getProductsForBusiness,
    addProduct,
    orders,
    setOrders,
    recordSale,
    customers,
    setCustomers,
    employees,
    setEmployees,
    analyticsData,
  };

  return (
    <BusinessContext.Provider value={contextValue}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;
