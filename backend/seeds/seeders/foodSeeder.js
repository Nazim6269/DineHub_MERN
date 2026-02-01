import mongoose from "mongoose";
import { generateCategories, generateAllFoodItems } from "../factories/foodFactory.js";

/**
 * Seed food categories into database
 * Idempotent - checks if categories exist before creating
 * @param {Object} options - Seeding options
 * @returns {Array} Created categories
 */
export const seedCategories = async (options = {}) => {
  const {
    environment = process.env.NODE_ENV || "development"
  } = options;

  console.log(`🌱 Seeding food categories for ${environment} environment...`);

  try {
    const db = mongoose.connection.db;
    const categoryCollection = db.collection("Food_Category");

    // Check if categories already exist (idempotent)
    const existingCount = await categoryCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Categories already exist (${existingCount}). Skipping seed.`);
      const categories = await categoryCollection.find({}).toArray();
      return categories;
    }

    // Generate and insert categories
    const categories = generateCategories();
    const result = await categoryCollection.insertMany(categories);

    console.log(`✓ Category seeding completed! Total categories: ${result.insertedCount}`);
    categories.forEach(cat => console.log(`    - ${cat.CategoryName}`));

    return Object.values(result.insertedIds).map((id, index) => ({
      _id: id,
      ...categories[index]
    }));

  } catch (error) {
    console.error("✗ Error seeding categories:", error.message);
    throw error;
  }
};

/**
 * Seed food items into database
 * Idempotent - checks if food items exist before creating
 * @param {Object} options - Seeding options
 * @returns {Array} Created food items
 */
export const seedFoodItems = async (options = {}) => {
  const {
    environment = process.env.NODE_ENV || "development"
  } = options;

  console.log(`🌱 Seeding food items for ${environment} environment...`);

  try {
    const db = mongoose.connection.db;
    const foodCollection = db.collection("Food_items");

    // Check if food items already exist (idempotent)
    const existingCount = await foodCollection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Food items already exist (${existingCount}). Skipping seed.`);
      const foodItems = await foodCollection.find({}).toArray();
      return foodItems;
    }

    // Generate and insert food items
    const foodItems = generateAllFoodItems();
    const result = await foodCollection.insertMany(foodItems);

    console.log(`✓ Food item seeding completed! Total items: ${result.insertedCount}`);

    // Group by category for display
    const itemsByCategory = {};
    foodItems.forEach(item => {
      if (!itemsByCategory[item.CategoryName]) {
        itemsByCategory[item.CategoryName] = 0;
      }
      itemsByCategory[item.CategoryName]++;
    });

    Object.entries(itemsByCategory).forEach(([category, count]) => {
      console.log(`    - ${category}: ${count} items`);
    });

    return Object.values(result.insertedIds).map((id, index) => ({
      _id: id,
      ...foodItems[index]
    }));

  } catch (error) {
    console.error("✗ Error seeding food items:", error.message);
    throw error;
  }
};

/**
 * Clear all food categories from database
 * WARNING: Use with caution!
 */
export const clearCategories = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("✗ Cannot clear categories in production!");
    return;
  }

  console.log("🗑️  Clearing all categories...");
  const db = mongoose.connection.db;
  const categoryCollection = db.collection("Food_Category");
  const result = await categoryCollection.deleteMany({});
  console.log(`✓ Deleted ${result.deletedCount} categories`);
  return result;
};

/**
 * Clear all food items from database
 * WARNING: Use with caution!
 */
export const clearFoodItems = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("✗ Cannot clear food items in production!");
    return;
  }

  console.log("🗑️  Clearing all food items...");
  const db = mongoose.connection.db;
  const foodCollection = db.collection("Food_items");
  const result = await foodCollection.deleteMany({});
  console.log(`✓ Deleted ${result.deletedCount} food items`);
  return result;
};
