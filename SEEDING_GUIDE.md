# Database Seeding Quick Start Guide

## ✨ What Was Created

A complete database seeding system with:

### 📁 Structure
```
backend/seeds/
├── factories/              # Data generators
│   ├── userFactory.js      # Generates realistic users
│   ├── foodFactory.js      # Generates food items & categories
│   └── orderFactory.js     # Generates orders with status history
│
├── seeders/                # Database insertion logic
│   ├── userSeeder.js       # Seeds users (Admin, Moderator, Customers)
│   ├── foodSeeder.js       # Seeds categories & food items
│   └── orderSeeder.js      # Seeds orders with analytics data
│
├── index.js                # Main orchestrator
└── README.md               # Full documentation
```

## 🚀 Quick Commands

### Development Environment

```bash
# Quick seed (recommended for development)
npm run seed

# Same as above
npm run seed:quick

# Clear all data
npm run seed:clear
```

### Production Environment

```bash
# Safe production seed (no fake data)
npm run seed:production
```

## 📊 What Gets Seeded

### Default Seed (Development)

**Users:**
- 1 Admin (`admin@dinehub.com`)
- 2 Moderators (`moderator1@dinehub.com`, `moderator2@dinehub.com`)
- 20 Regular users
- Password for all: `password123`

**Food:**
- 14 Categories (Pizza, Burger, Biryani, Pasta, Starter, etc.)
- 25+ Food Items with realistic data
- Dietary tags (vegetarian, vegan, halal, etc.)
- Multiple size/price options

**Orders:**
- 50 Recent orders with various statuses
- 450+ Historical orders (90 days)
- Realistic status distribution:
  - Delivered: 45%
  - Pending: 15%
  - In Progress: 30%
  - Cancelled: 5%
  - Others: 5%

### Production Seed

**Users:**
- 1 Admin only
- 1 Moderator
- No fake customers

**Food:**
- All categories and items

**Orders:**
- None (no fake orders in production)

## ✅ Features

### 1. Idempotent ♻️
```bash
# Safe to run multiple times
npm run seed
npm run seed  # Won't create duplicates!
```

### 2. Environment-Aware 🌍
- **Development**: Full data + historical orders
- **Staging**: Moderate data for testing
- **Production**: Minimal safe data only

### 3. Realistic Data 🎯
- Real-looking names and emails
- Diverse food items across cuisines
- Proper order status progression
- Historical data for analytics

### 4. Relationship Integrity 🔗
- Orders reference real users
- Order items reference real food
- Proper foreign key relationships
- Validated data consistency

## 📖 Usage Examples

### Example 1: Fresh Development Setup

```bash
# Clear and seed fresh data
npm run seed:clear
npm run seed
```

**Result:**
```
✓ 23 Users created
✓ 14 Categories created
✓ 25 Food items created
✓ 500 Orders created
```

### Example 2: Test Existing Seeds

```bash
# Run seed again (idempotent)
npm run seed
```

**Result:**
```
⚠️  Users already exist (23). Skipping seed.
⚠️  Categories already exist (14). Skipping seed.
⚠️  Food items already exist (25). Skipping seed.
⚠️  Orders already exist (500). Skipping seed.
```

### Example 3: Production Deployment

```bash
# Safe production seed
NODE_ENV=production npm run seed:production
```

**Result:**
```
✓ 1 Admin created
✓ 1 Moderator created
✓ 14 Categories created
✓ 25 Food items created
✗ Skipped order seeding in production
```

## 🔐 Login Credentials

After seeding, use these credentials:

```
Admin:
  Email: admin@dinehub.com
  Password: password123

Moderator:
  Email: moderator1@dinehub.com
  Password: password123

Test Users:
  Any seeded user email
  Password: password123
```

## 📈 Analytics Data

The seeding system generates historical data perfect for testing:

- **90 days** of order history
- **5-15 orders per day** with variation
- **Revenue trends** over time
- **Order status distribution**
- **Payment method variety**

Perfect for testing:
- Dashboard charts
- Sales reports
- Trend analysis
- Revenue calculations

## ⚙️ Customization

### Custom User Count

Edit `backend/seeds/index.js`:

```javascript
userOptions: {
  adminCount: 1,
  moderatorCount: 2,
  userCount: 50  // Change this
}
```

### Custom Order Count

```javascript
orderOptions: {
  orderCount: 100,        // Recent orders
  includeHistorical: true,
  historicalDays: 30      // Days of history
}
```

### Skip Specific Seeds

```javascript
await runSeeder({
  seedUsers: true,
  seedFood: true,
  seedOrders: false  // Skip orders
});
```

## 🛡️ Safety Features

### Production Protection

```bash
# This will FAIL in production
npm run seed:clear

# Output:
✗ Cannot clear data in production!
```

### Idempotent Checks

- Checks if data exists before creating
- Won't duplicate users, categories, or food
- Safe to run multiple times

### Environment Awareness

- Different behavior per environment
- Production mode limits fake data
- Staging mode for realistic testing

## 🐛 Troubleshooting

### Issue: "MongoDB connection failed"

**Solution:**
```bash
# Check .env file has correct MONGO_URL
cat backend/.env | grep MONGO_URL

# Test connection
mongosh "your_mongo_url"
```

### Issue: "Data already exists"

**Solution:** This is normal (idempotent). Either:
```bash
# Clear first
npm run seed:clear

# Then seed
npm run seed
```

### Issue: "Cannot clear in production"

**Solution:** This is a safety feature. Only clear in development:
```bash
NODE_ENV=development npm run seed:clear
```

## 📝 Seeding Order

The system seeds in this order to respect relationships:

1. **Users** (no dependencies)
2. **Categories** (no dependencies)
3. **Food Items** (needs categories)
4. **Orders** (needs users + food items)

## 🎯 Use Cases

### 1. Development
```bash
npm run seed  # Full seed with historical data
```

### 2. Testing
```bash
npm run seed:clear  # Fresh data
npm run seed        # Seed
# Run tests
```

### 3. Demo/Staging
```bash
npm run seed  # Realistic data for demos
```

### 4. Production Initial Setup
```bash
npm run seed:production  # Safe minimal seed
```

## 📚 Full Documentation

For detailed documentation, see:
- `backend/seeds/README.md` - Complete guide
- `backend/seeds/factories/` - Factory code
- `backend/seeds/seeders/` - Seeder code

## 💡 Pro Tips

1. **Always backup** before clearing data
2. **Test seeds in staging** before production
3. **Use idempotency** - safe to re-run
4. **Check environment** before clearing
5. **Review logs** for any issues

## ✨ Summary

The seeding system is:
- ✅ Ready to use
- ✅ Safe and idempotent
- ✅ Environment-aware
- ✅ Generates realistic data
- ✅ Maintains data integrity
- ✅ Perfect for testing & development

---

**Quick Start:**
```bash
npm run seed
```

**Login:**
- Email: `admin@dinehub.com`
- Password: `password123`

**Done!** 🎉
