import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedUsers, clearUsers } from "./seeders/userSeeder.js";
import { seedCategories, seedFoodItems, clearCategories, clearFoodItems } from "./seeders/foodSeeder.js";
import { seedOrders, clearOrders } from "./seeders/orderSeeder.js";

// Load environment variables
dotenv.config();

/**
 * Main seeder function - orchestrates all seeding
 * @param {Object} options - Seeding options
 */
const runSeeder = async (options = {}) => {
  const {
    clearData = false,
    environment = process.env.NODE_ENV || "development",
    seedUsers: shouldSeedUsers = true,
    seedFood: shouldSeedFood = true,
    seedOrders: shouldSeedOrders = true,
    userOptions = {},
    foodOptions = {},
    orderOptions = {}
  } = options;

  try {
    console.log("\n==========================================");
    console.log("🌱 DineHub Database Seeder");
    console.log("==========================================\n");
    console.log(`Environment: ${environment}`);
    console.log(`Clear existing data: ${clearData ? "Yes" : "No"}\n`);

    // Connect to MongoDB
    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✓ Connected to MongoDB\n");

    // Clear existing data if requested
    if (clearData) {
      console.log("🗑️  Clearing existing data...\n");

      if (shouldSeedOrders) {
        await clearOrders();
      }
      if (shouldSeedFood) {
        await clearFoodItems();
        await clearCategories();
      }
      if (shouldSeedUsers) {
        await clearUsers();
      }

      console.log("\n✓ Data cleared successfully\n");
    }

    // Seed data in correct order (respecting foreign key relationships)
    const seededData = {
      users: [],
      categories: [],
      foodItems: [],
      orders: []
    };

    // 1. Seed Users (no dependencies)
    if (shouldSeedUsers) {
      seededData.users = await seedUsers({
        environment,
        ...userOptions
      });
      console.log("");
    }

    // 2. Seed Food Categories (no dependencies)
    if (shouldSeedFood) {
      seededData.categories = await seedCategories({
        environment,
        ...foodOptions
      });
      console.log("");

      // 3. Seed Food Items (depends on categories)
      seededData.foodItems = await seedFoodItems({
        environment,
        ...foodOptions
      });
      console.log("");
    }

    // 4. Seed Orders (depends on users and food items)
    if (shouldSeedOrders && seededData.users.length > 0 && seededData.foodItems.length > 0) {
      seededData.orders = await seedOrders(
        seededData.users,
        seededData.foodItems,
        {
          environment,
          ...orderOptions
        }
      );
      console.log("");
    }

    // Summary
    console.log("==========================================");
    console.log("✓ Seeding completed successfully!");
    console.log("==========================================\n");
    console.log("Summary:");
    console.log(`  Users: ${seededData.users.length}`);
    console.log(`  Categories: ${seededData.categories.length}`);
    console.log(`  Food Items: ${seededData.foodItems.length}`);
    console.log(`  Orders: ${seededData.orders.length}`);
    console.log("\nLogin Credentials:");
    console.log("  Admin:");
    console.log("    Email: admin@dinehub.com");
    console.log("    Password: password123");
    console.log("  All users:");
    console.log("    Password: password123");
    console.log("\n==========================================\n");

  } catch (error) {
    console.error("\n✗ Seeding failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("📡 Database connection closed");
  }
};

/**
 * Quick seed - default configuration for development
 */
const quickSeed = async () => {
  await runSeeder({
    clearData: true,
    environment: "development",
    userOptions: {
      adminCount: 1,
      moderatorCount: 2,
      userCount: 20
    },
    orderOptions: {
      orderCount: 50,
      includeHistorical: true,
      historicalDays: 90
    }
  });
};

/**
 * Production seed - minimal seed for production
 */
const productionSeed = async () => {
  await runSeeder({
    clearData: false, // Never clear data in production
    environment: "production",
    seedUsers: true,
    seedFood: true,
    seedOrders: false, // Don't seed fake orders in production
    userOptions: {
      adminCount: 1,
      moderatorCount: 1,
      userCount: 0 // No fake users in production
    }
  });
};

/**
 * Clear all data
 */
const clearAll = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("✗ Cannot clear data in production!");
    process.exit(1);
  }

  try {
    console.log("\n🗑️  Clearing all data...\n");

    await mongoose.connect(process.env.MONGO_URL);

    await clearOrders();
    await clearFoodItems();
    await clearCategories();
    await clearUsers();

    console.log("\n✓ All data cleared successfully\n");
  } catch (error) {
    console.error("✗ Error clearing data:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

// CLI handling
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "quick":
    quickSeed();
    break;
  case "production":
    productionSeed();
    break;
  case "clear":
    clearAll();
    break;
  case "custom":
    // Parse custom options from command line
    // Example: npm run seed custom --users=50 --orders=100
    const customOptions = {};
    args.slice(1).forEach(arg => {
      const [key, value] = arg.replace("--", "").split("=");
      customOptions[key] = isNaN(value) ? value : parseInt(value);
    });
    runSeeder(customOptions);
    break;
  default:
    // Default: quick seed
    quickSeed();
}

// Export for programmatic use
export { runSeeder, quickSeed, productionSeed, clearAll };
