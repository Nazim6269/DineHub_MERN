/**
 * Order Factory - Generates realistic order data
 */

const orderStatuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

const paymentMethods = ["Cash", "Card", "UPI", "Stripe"];
const paymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];

const addresses = [
  {
    street: "123 Main Street",
    city: "Dhaka",
    state: "Dhaka Division",
    zipCode: "1000",
    country: "Bangladesh",
    fullAddress: "123 Main Street, Dhaka 1000, Bangladesh"
  },
  {
    street: "456 Park Avenue",
    city: "Chittagong",
    state: "Chittagong Division",
    zipCode: "4000",
    country: "Bangladesh",
    fullAddress: "456 Park Avenue, Chittagong 4000, Bangladesh"
  },
  {
    street: "789 Lake Road",
    city: "Sylhet",
    state: "Sylhet Division",
    zipCode: "3100",
    country: "Bangladesh",
    fullAddress: "789 Lake Road, Sylhet 3100, Bangladesh"
  },
  {
    street: "321 Garden Street",
    city: "Rajshahi",
    state: "Rajshahi Division",
    zipCode: "6000",
    country: "Bangladesh",
    fullAddress: "321 Garden Street, Rajshahi 6000, Bangladesh"
  },
  {
    street: "654 Ocean Drive",
    city: "Cox's Bazar",
    state: "Chittagong Division",
    zipCode: "4700",
    country: "Bangladesh",
    fullAddress: "654 Ocean Drive, Cox's Bazar 4700, Bangladesh"
  }
];

const phoneNumbers = [
  "+880 1712-345678",
  "+880 1823-456789",
  "+880 1934-567890",
  "+880 1645-678901",
  "+880 1756-789012"
];

/**
 * Generate a random order ID
 * @returns {string} Order ID
 */
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

/**
 * Calculate order totals
 * @param {Array} items - Order items
 * @returns {Object} Totals (subtotal, tax, shipping, total)
 */
const calculateTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping over 500
  const total = subtotal + tax + shippingCost;

  return { subtotal, tax, shippingCost, total };
};

/**
 * Generate order items from food items
 * @param {Array} foodItems - Available food items
 * @param {number} itemCount - Number of items in order (1-5)
 * @returns {Array} Order items
 */
const generateOrderItems = (foodItems, itemCount = null) => {
  const count = itemCount || Math.floor(Math.random() * 5) + 1; // 1-5 items
  const items = [];

  for (let i = 0; i < count; i++) {
    const foodItem = foodItems[Math.floor(Math.random() * foodItems.length)];
    const options = foodItem.options[0];
    const sizes = Object.keys(options);
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const price = parseInt(options[size]);
    const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity

    items.push({
      foodItemId: foodItem._id,
      name: foodItem.name,
      category: foodItem.CategoryName,
      size: size,
      quantity: quantity,
      price: price,
      img: foodItem.img
    });
  }

  return items;
};

/**
 * Generate random date in the past
 * @param {number} daysBack - Number of days to go back
 * @returns {Date}
 */
const randomPastDate = (daysBack = 30) => {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return past;
};

/**
 * Generate an order
 * @param {Object} user - User who placed the order
 * @param {Array} foodItems - Available food items
 * @param {Object} overrides - Override default values
 * @returns {Object} Order object
 */
export const generateOrder = (user, foodItems, overrides = {}) => {
  const items = overrides.items || generateOrderItems(foodItems);
  const totals = calculateTotals(items);
  const status = overrides.status || orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
  const address = addresses[Math.floor(Math.random() * addresses.length)];
  const phone = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
  const paymentMethod = overrides.paymentMethod || paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
  const createdAt = overrides.createdAt || randomPastDate(30);

  const order = {
    orderId: generateOrderId(),
    user: user._id,
    customer: user.name,
    customerEmail: user.email,
    phone: phone,
    status: status,
    items: items,
    subtotal: totals.subtotal,
    shippingCost: totals.shippingCost,
    tax: totals.tax,
    total: totals.total,
    deliveryAddress: address,
    paymentMethod: paymentMethod,
    paymentStatus: paymentMethod === "Cash" ? "Pending" : "Paid",
    paymentDetails: paymentMethod === "Stripe" ? {
      stripeSessionId: `cs_test_${Math.random().toString(36).substring(2, 15)}`,
      transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
      paidAt: status !== "Cancelled" ? createdAt : undefined
    } : {},
    notes: overrides.notes || "",
    statusHistory: [
      {
        status: "Pending",
        timestamp: createdAt,
        note: "Order placed"
      }
    ],
    createdAt: createdAt,
    updatedAt: createdAt,
    ...overrides
  };

  // Add status history based on current status
  const statusFlow = ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery", "Delivered"];
  const currentStatusIndex = statusFlow.indexOf(status);

  if (currentStatusIndex > 0) {
    for (let i = 1; i <= currentStatusIndex; i++) {
      const statusDate = new Date(createdAt.getTime() + i * 30 * 60 * 1000); // 30 min intervals
      order.statusHistory.push({
        status: statusFlow[i],
        timestamp: statusDate,
        note: `Order ${statusFlow[i].toLowerCase()}`
      });
      order.updatedAt = statusDate;
    }
  }

  if (status === "Cancelled") {
    order.cancelledAt = createdAt;
    order.cancelReason = "Customer requested cancellation";
    order.paymentStatus = "Refunded";
  }

  if (status === "Delivered") {
    order.actualDeliveryTime = order.updatedAt;
  }

  return order;
};

/**
 * Generate multiple orders
 * @param {Array} users - Users to assign orders to
 * @param {Array} foodItems - Available food items
 * @param {number} count - Number of orders to generate
 * @returns {Array} Array of order objects
 */
export const generateOrders = (users, foodItems, count = 10) => {
  const orders = [];

  for (let i = 0; i < count; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    orders.push(generateOrder(user, foodItems));
  }

  return orders;
};

/**
 * Generate orders with specific status distribution
 * @param {Array} users - Users to assign orders to
 * @param {Array} foodItems - Available food items
 * @param {Object} distribution - Status distribution {Pending: 5, Delivered: 10, etc.}
 * @returns {Array} Array of order objects
 */
export const generateOrdersWithDistribution = (users, foodItems, distribution) => {
  const orders = [];

  Object.entries(distribution).forEach(([status, count]) => {
    for (let i = 0; i < count; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      orders.push(generateOrder(user, foodItems, { status }));
    }
  });

  return orders;
};

/**
 * Generate historical orders for analytics
 * @param {Array} users - Users to assign orders to
 * @param {Array} foodItems - Available food items
 * @param {number} days - Number of days of historical data
 * @returns {Array} Array of order objects
 */
export const generateHistoricalOrders = (users, foodItems, days = 90) => {
  const orders = [];
  const ordersPerDay = Math.floor(Math.random() * 10) + 5; // 5-15 orders per day

  for (let day = 0; day < days; day++) {
    const dayOrders = Math.floor(Math.random() * ordersPerDay) + 3;

    for (let i = 0; i < dayOrders; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const createdAt = new Date(Date.now() - (days - day) * 24 * 60 * 60 * 1000);

      // Most orders should be delivered in historical data
      const statuses = ["Delivered", "Delivered", "Delivered", "Delivered", "Cancelled"];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      orders.push(generateOrder(user, foodItems, { status, createdAt }));
    }
  }

  return orders;
};
