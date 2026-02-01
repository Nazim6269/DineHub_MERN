import { Order } from "../../models/orderModel.js";
import {
  generateOrders,
  generateOrdersWithDistribution,
  generateHistoricalOrders
} from "../factories/orderFactory.js";

/**
 * Seed orders into database
 * Idempotent - checks if orders exist before creating
 * @param {Array} users - Users to assign orders to
 * @param {Array} foodItems - Available food items
 * @param {Object} options - Seeding options
 * @returns {Array} Created orders
 */
export const seedOrders = async (users, foodItems, options = {}) => {
  const {
    orderCount = 50,
    includeHistorical = true,
    historicalDays = 90,
    environment = process.env.NODE_ENV || "development"
  } = options;

  console.log(`🌱 Seeding orders for ${environment} environment...`);

  try {
    // Check if orders already exist (idempotent)
    const existingOrderCount = await Order.countDocuments();

    if (existingOrderCount > 0 && environment === "production") {
      console.log(`⚠️  Orders already exist in production (${existingOrderCount}). Skipping seed.`);
      return [];
    }

    if (existingOrderCount > 0) {
      console.log(`⚠️  Orders already exist (${existingOrderCount}). Skipping seed.`);
      const orders = await Order.find({});
      return orders;
    }

    const createdOrders = [];

    // Create orders with status distribution for realistic testing
    console.log(`  Creating ${orderCount} recent orders with status distribution...`);
    const statusDistribution = {
      "Pending": Math.floor(orderCount * 0.15),      // 15%
      "Confirmed": Math.floor(orderCount * 0.10),     // 10%
      "Preparing": Math.floor(orderCount * 0.10),     // 10%
      "Ready": Math.floor(orderCount * 0.05),         // 5%
      "Out for Delivery": Math.floor(orderCount * 0.10), // 10%
      "Delivered": Math.floor(orderCount * 0.45),     // 45%
      "Cancelled": Math.floor(orderCount * 0.05)      // 5%
    };

    const recentOrders = generateOrdersWithDistribution(users, foodItems, statusDistribution);

    for (const orderData of recentOrders) {
      const order = await Order.create(orderData);
      createdOrders.push(order);
    }

    console.log(`    ✓ Created ${recentOrders.length} recent orders`);
    console.log(`      Status breakdown:`);
    Object.entries(statusDistribution).forEach(([status, count]) => {
      console.log(`        - ${status}: ${count}`);
    });

    // Create historical orders for analytics
    if (includeHistorical) {
      console.log(`  Creating historical orders for ${historicalDays} days...`);
      const historicalOrders = generateHistoricalOrders(users, foodItems, historicalDays);

      for (const orderData of historicalOrders) {
        const order = await Order.create(orderData);
        createdOrders.push(order);
      }

      console.log(`    ✓ Created ${historicalOrders.length} historical orders`);
    }

    console.log(`✓ Order seeding completed! Total orders: ${createdOrders.length}`);

    // Calculate statistics
    const stats = await calculateOrderStats();
    console.log(`  Order Statistics:`);
    console.log(`    - Total Revenue: ৳${stats.totalRevenue.toFixed(2)}`);
    console.log(`    - Average Order Value: ৳${stats.avgOrderValue.toFixed(2)}`);
    console.log(`    - Completed Orders: ${stats.completedOrders}`);
    console.log(`    - Pending Orders: ${stats.pendingOrders}`);

    return createdOrders;

  } catch (error) {
    console.error("✗ Error seeding orders:", error.message);
    throw error;
  }
};

/**
 * Calculate order statistics
 * @returns {Object} Order statistics
 */
const calculateOrderStats = async () => {
  const orders = await Order.find({});

  const totalRevenue = orders
    .filter(o => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.total, 0);

  const avgOrderValue = totalRevenue / orders.length || 0;

  const completedOrders = orders.filter(o => o.status === "Delivered").length;
  const pendingOrders = orders.filter(o =>
    ["Pending", "Confirmed", "Preparing", "Ready", "Out for Delivery"].includes(o.status)
  ).length;

  return {
    totalRevenue,
    avgOrderValue,
    completedOrders,
    pendingOrders
  };
};

/**
 * Clear all orders from database
 * WARNING: Use with caution!
 */
export const clearOrders = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("✗ Cannot clear orders in production!");
    return;
  }

  console.log("🗑️  Clearing all orders...");
  const result = await Order.deleteMany({});
  console.log(`✓ Deleted ${result.deletedCount} orders`);
  return result;
};
