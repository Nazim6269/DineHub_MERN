# DineHub Database Seeding System

A robust, idempotent, and environment-aware database seeding system for the DineHub application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Factories](#factories)
- [Seeders](#seeders)
- [Commands](#commands)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

The seeding system generates realistic test data for the DineHub application, including users, food categories, food items, and orders. It's designed to be:

- **Idempotent**: Can run multiple times safely without creating duplicates
- **Environment-aware**: Different behavior for dev/staging/production
- **Factory-based**: Uses factories to generate realistic fake data
- **Relationship-compliant**: Respects foreign key relationships

---

## Features

### ✅ Idempotent Seeding
- Checks if data exists before creating
- Safe to run multiple times
- Prevents duplicate data

### ✅ Environment-Aware
- Development: Full seed with historical data
- Staging: Moderate seed for testing
- Production: Minimal seed, no fake users/orders

### ✅ Factory-Based Data
- Realistic user names and emails
- Diverse food items across categories
- Authentic order data with proper statuses
- Historical data for analytics testing

### ✅ Relationship Management
- Proper foreign key relationships
- Seeding order respects dependencies
- Validates data integrity

### ✅ Flexible Configuration
- Customizable seed counts
- Status distribution for orders
- Historical data generation
- Dietary tags and availability

---

## Installation

The seeding system is already installed with your backend dependencies. No additional installation required.

### Directory Structure

```
backend/seeds/
├── factories/              # Data generation factories
│   ├── userFactory.js      # User data generator
│   ├── foodFactory.js      # Food & category generator
│   └── orderFactory.js     # Order data generator
│
├── seeders/                # Seeding logic
│   ├── userSeeder.js       # User seeding
│   ├── foodSeeder.js       # Food & category seeding
│   └── orderSeeder.js      # Order seeding
│
├── index.js                # Main seeder orchestrator
└── README.md               # This file
```

---

## Usage

### Quick Start

Run the default seed (development environment):

```bash
npm run seed
# or
npm run seed:quick
```

This will:
- Clear existing data
- Create 1 admin, 2 moderators, 20 regular users
- Create all food categories and items
- Generate 50 recent orders + 90 days of historical orders

### Production Seed

```bash
npm run seed:production
```

This will:
- NOT clear existing data
- Create 1 admin, 1 moderator only
- Create food categories and items
- Skip order generation

### Clear All Data

```bash
npm run seed:clear
```

⚠️ **WARNING**: This will delete ALL data from the database. Only works in development.

### Custom Seed

```bash
npm run seed custom -- --users=50 --orders=100
```

---

## Factories

Factories generate realistic fake data for seeding.

### User Factory

**Location**: `factories/userFactory.js`

#### Functions

```javascript
// Generate a single user
const user = await generateUser({
  role: "user",
  email: "custom@email.com",
  name: "Custom Name"
});

// Generate multiple users
const users = await generateUsers(10, { role: "user" });

// Generate specific roles
const admin = await generateAdmin();
const moderator = await generateModerator();
```

#### Generated User Data

```javascript
{
  name: "John Smith",
  email: "john.smith@gmail.com",
  password: "hashed_password_123",
  role: "user", // or "admin", "moderator"
  isActive: true,
  picture: "https://i.pravatar.cc/150?img=1",
  tokens: []
}
```

#### Default Password
All seeded users have password: `password123`

---

### Food Factory

**Location**: `factories/foodFactory.js`

#### Functions

```javascript
// Generate all categories
const categories = generateCategories();

// Generate food items for a category
const pizzas = generateFoodItems("Pizza", 5);

// Generate all food items
const allItems = generateAllFoodItems();

// Generate a single item
const item = generateFoodItem("Burger", {
  isAvailable: false
});
```

#### Supported Categories

- Pizza
- Burger
- Biryani
- Pasta
- Starter
- Chinese
- Dessert
- Beverages
- Salad
- Sandwich
- Soup
- BBQ
- Seafood
- Breakfast

#### Generated Food Item Data

```javascript
{
  CategoryName: "Pizza",
  name: "Margherita Pizza",
  description: "Classic Italian pizza with fresh mozzarella...",
  img: "https://images.unsplash.com/...",
  options: [{ regular: "200", medium: "350", large: "500" }],
  dietaryTags: ["vegetarian"],
  isAvailable: true
}
```

#### Dietary Tags

- `vegetarian`
- `vegan`
- `vegan-option`
- `non-vegetarian`
- `halal`
- `spicy`
- `gluten-free`

---

### Order Factory

**Location**: `factories/orderFactory.js`

#### Functions

```javascript
// Generate a single order
const order = generateOrder(user, foodItems, {
  status: "Delivered"
});

// Generate multiple orders
const orders = generateOrders(users, foodItems, 10);

// Generate with status distribution
const orders = generateOrdersWithDistribution(users, foodItems, {
  "Pending": 5,
  "Delivered": 10,
  "Cancelled": 2
});

// Generate historical orders for analytics
const historicalOrders = generateHistoricalOrders(users, foodItems, 90);
```

#### Order Statuses

- `Pending` - Order placed, awaiting confirmation
- `Confirmed` - Restaurant confirmed the order
- `Preparing` - Food is being prepared
- `Ready` - Order ready for pickup/delivery
- `Out for Delivery` - Delivery in progress
- `Delivered` - Successfully delivered
- `Cancelled` - Order cancelled

#### Payment Methods

- `Cash` - Cash on delivery
- `Card` - Card payment
- `UPI` - UPI payment
- `Stripe` - Stripe payment gateway

#### Generated Order Data

```javascript
{
  orderId: "ORD-L7X8K9-A2B3",
  user: ObjectId("..."),
  customer: "John Smith",
  customerEmail: "john@example.com",
  phone: "+880 1712-345678",
  status: "Delivered",
  items: [
    {
      foodItemId: ObjectId("..."),
      name: "Margherita Pizza",
      category: "Pizza",
      size: "medium",
      quantity: 2,
      price: 350,
      img: "https://..."
    }
  ],
  subtotal: 700,
  shippingCost: 0,
  tax: 35,
  total: 735,
  deliveryAddress: {
    street: "123 Main Street",
    city: "Dhaka",
    state: "Dhaka Division",
    zipCode: "1000",
    country: "Bangladesh"
  },
  paymentMethod: "Stripe",
  paymentStatus: "Paid",
  statusHistory: [...],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Seeders

Seeders handle the actual database insertion logic.

### User Seeder

**Location**: `seeders/userSeeder.js`

#### Functions

```javascript
// Seed users with options
const users = await seedUsers({
  adminCount: 1,
  moderatorCount: 2,
  userCount: 20,
  environment: "development"
});

// Clear all users (dev only)
await clearUsers();
```

#### Options

- `adminCount` - Number of admin users (default: 1)
- `moderatorCount` - Number of moderator users (default: 2)
- `userCount` - Number of regular users (default: 20)
- `environment` - Environment mode (default: from NODE_ENV)

#### Default Accounts

```
Admin:
  Email: admin@dinehub.com
  Password: password123

Moderators:
  Email: moderator1@dinehub.com, moderator2@dinehub.com
  Password: password123
```

---

### Food Seeder

**Location**: `seeders/foodSeeder.js`

#### Functions

```javascript
// Seed categories
const categories = await seedCategories({
  environment: "development"
});

// Seed food items
const foodItems = await seedFoodItems({
  environment: "development"
});

// Clear data (dev only)
await clearCategories();
await clearFoodItems();
```

#### Idempotency

- Checks if categories exist before creating
- Checks if food items exist before creating
- Returns existing data if found

---

### Order Seeder

**Location**: `seeders/orderSeeder.js`

#### Functions

```javascript
// Seed orders
const orders = await seedOrders(users, foodItems, {
  orderCount: 50,
  includeHistorical: true,
  historicalDays: 90,
  environment: "development"
});

// Clear orders (dev only)
await clearOrders();
```

#### Options

- `orderCount` - Number of recent orders (default: 50)
- `includeHistorical` - Include historical data (default: true)
- `historicalDays` - Days of historical data (default: 90)
- `environment` - Environment mode

#### Status Distribution (Recent Orders)

- Pending: 15%
- Confirmed: 10%
- Preparing: 10%
- Ready: 5%
- Out for Delivery: 10%
- Delivered: 45%
- Cancelled: 5%

#### Statistics

After seeding, displays:
- Total Revenue
- Average Order Value
- Completed Orders
- Pending Orders

---

## Commands

### Development Commands

```bash
# Default seed (quick)
npm run seed

# Quick seed with clear
npm run seed:quick

# Clear all data
npm run seed:clear
```

### Production Command

```bash
# Production seed (safe)
npm run seed:production
```

### Custom Commands

```bash
# Custom seed with parameters
node seeds/index.js custom --users=100 --orders=200

# Programmatic usage
import { runSeeder } from './seeds/index.js';

await runSeeder({
  clearData: true,
  environment: "staging",
  userOptions: { userCount: 50 },
  orderOptions: { orderCount: 100 }
});
```

---

## Best Practices

### 1. Environment Safety

✅ **DO**:
- Use `seed:quick` in development
- Use `seed:production` in production
- Test seeds in staging first

❌ **DON'T**:
- Run `seed:clear` in production
- Seed fake users in production
- Clear data without backup

### 2. Idempotency

✅ **DO**:
- Run seeds multiple times safely
- Check for existing data
- Use unique identifiers

❌ **DON'T**:
- Assume database is empty
- Create duplicates
- Ignore existing data

### 3. Data Relationships

✅ **DO**:
- Seed users before orders
- Seed food before orders
- Maintain foreign key integrity

❌ **DON'T**:
- Seed in wrong order
- Create orphaned records
- Ignore dependencies

### 4. Realistic Data

✅ **DO**:
- Use factory-generated data
- Include variety in statuses
- Add historical data for testing

❌ **DON'T**:
- Use hardcoded test data
- Create unrealistic scenarios
- Skip edge cases

---

## Troubleshooting

### Issue: "Cannot clear data in production"

**Cause**: Trying to clear data in production environment

**Solution**: Only clear data in development
```bash
NODE_ENV=development npm run seed:clear
```

---

### Issue: "Data already exists"

**Cause**: Idempotent check found existing data

**Solution**: This is expected behavior. Either:
1. Use `seed:clear` to remove data first
2. Let it skip (safe)

---

### Issue: "MongoDB connection failed"

**Cause**: Database connection issue

**Solution**:
1. Check `.env` file has correct `MONGO_URL`
2. Verify MongoDB is running
3. Check network connectivity
4. Verify database credentials

---

### Issue: "Foreign key error"

**Cause**: Seeding in wrong order

**Solution**: Seeders run in correct order automatically:
1. Users (no dependencies)
2. Categories (no dependencies)
3. Food Items (depends on categories)
4. Orders (depends on users & food items)

---

### Issue: "Out of memory"

**Cause**: Seeding too much data at once

**Solution**: Reduce seed counts
```bash
node seeds/index.js custom --users=10 --orders=20
```

---

## Examples

### Example 1: Quick Development Seed

```bash
# Clear and seed fresh data
npm run seed:quick
```

Output:
```
==========================================
🌱 DineHub Database Seeder
==========================================

Environment: development
Clear existing data: Yes

🗑️  Clearing existing data...

✓ Data cleared successfully

🌱 Seeding users for development environment...
  Creating 1 admin user(s)...
    ✓ Created admin: admin@dinehub.com
  Creating 2 moderator user(s)...
    ✓ Created moderator: moderator1@dinehub.com
    ✓ Created moderator: moderator2@dinehub.com
  Creating 20 regular user(s)...
    ✓ Created 20 regular users

✓ User seeding completed! Total users: 23

🌱 Seeding food categories for development environment...
✓ Category seeding completed! Total categories: 14

🌱 Seeding food items for development environment...
✓ Food item seeding completed! Total items: 42

🌱 Seeding orders for development environment...
  Creating 50 recent orders with status distribution...
    ✓ Created 50 recent orders
  Creating historical orders for 90 days...
    ✓ Created 450 historical orders

✓ Order seeding completed! Total orders: 500

==========================================
✓ Seeding completed successfully!
==========================================

Summary:
  Users: 23
  Categories: 14
  Food Items: 42
  Orders: 500

Login Credentials:
  Admin:
    Email: admin@dinehub.com
    Password: password123
```

---

### Example 2: Custom Seed

```bash
# Custom seed with specific counts
node seeds/index.js custom --users=50 --orders=100
```

---

### Example 3: Production Seed

```bash
# Safe production seed
npm run seed:production
```

Only creates:
- 1 admin
- 1 moderator
- Food categories and items
- No fake users or orders

---

### Example 4: Programmatic Usage

```javascript
import { runSeeder } from './seeds/index.js';
import mongoose from 'mongoose';

// Connect to database
await mongoose.connect(process.env.MONGO_URL);

// Custom seed
await runSeeder({
  clearData: false,
  environment: "staging",
  seedUsers: true,
  seedFood: true,
  seedOrders: true,
  userOptions: {
    adminCount: 1,
    moderatorCount: 1,
    userCount: 50
  },
  orderOptions: {
    orderCount: 100,
    includeHistorical: true,
    historicalDays: 60
  }
});

// Close connection
await mongoose.connection.close();
```

---

## Statistics & Analytics

The seeding system generates data suitable for testing analytics:

### Order Statistics

- Total Revenue
- Average Order Value
- Order Status Distribution
- Payment Method Distribution
- Historical Trends

### User Statistics

- User Role Distribution
- Active vs Inactive Users
- Registration Patterns

### Food Statistics

- Items per Category
- Popular Items
- Availability Status

---

## Data Integrity

The seeding system ensures:

✅ **Foreign Key Relationships**
- Orders reference valid users
- Order items reference valid food items
- All references are validated

✅ **Data Consistency**
- Status history tracks order progress
- Payment status matches order status
- Totals are calculated correctly

✅ **Realistic Scenarios**
- Orders have proper timestamps
- Delivered orders are in the past
- Pending orders are recent

---

## Contributing

When adding new seed data:

1. Create factory in `factories/`
2. Create seeder in `seeders/`
3. Add to main orchestrator in `index.js`
4. Update this documentation
5. Test idempotency
6. Test in all environments

---

## Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review error messages carefully
- Check MongoDB connection
- Verify environment variables

---

**Last Updated**: 2026-01-25
**Version**: 1.0.0
