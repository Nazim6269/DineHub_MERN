import { User } from "../../models/userModel.js";
import { generateAdmin, generateModerator, generateUsers } from "../factories/userFactory.js";

/**
 * Seed users into database
 * Idempotent - checks if users exist before creating
 * @param {Object} options - Seeding options
 * @returns {Array} Created users
 */
export const seedUsers = async (options = {}) => {
  const {
    adminCount = 1,
    moderatorCount = 2,
    userCount = 20,
    environment = process.env.NODE_ENV || "development"
  } = options;

  console.log(`🌱 Seeding users for ${environment} environment...`);

  try {
    // Check if users already exist (idempotent)
    const existingUserCount = await User.countDocuments();

    if (existingUserCount > 0 && environment === "production") {
      console.log(`⚠️  Users already exist in production (${existingUserCount}). Skipping seed.`);
      return [];
    }

    const createdUsers = [];

    // Create Admin users
    console.log(`  Creating ${adminCount} admin user(s)...`);
    for (let i = 0; i < adminCount; i++) {
      const adminData = await generateAdmin({
        email: i === 0 ? "admin@dinehub.com" : `admin${i + 1}@dinehub.com`,
        name: i === 0 ? "Super Admin" : `Admin ${i + 1}`
      });

      // Check if admin already exists
      const existingAdmin = await User.findOne({ email: adminData.email });
      if (!existingAdmin) {
        const admin = await User.create(adminData);
        createdUsers.push(admin);
        console.log(`    ✓ Created admin: ${admin.email}`);
      } else {
        console.log(`    ⊘ Admin already exists: ${adminData.email}`);
        createdUsers.push(existingAdmin);
      }
    }

    // Create Moderator users
    console.log(`  Creating ${moderatorCount} moderator user(s)...`);
    for (let i = 0; i < moderatorCount; i++) {
      const moderatorData = await generateModerator({
        email: `moderator${i + 1}@dinehub.com`,
        name: `Moderator ${i + 1}`
      });

      const existingModerator = await User.findOne({ email: moderatorData.email });
      if (!existingModerator) {
        const moderator = await User.create(moderatorData);
        createdUsers.push(moderator);
        console.log(`    ✓ Created moderator: ${moderator.email}`);
      } else {
        console.log(`    ⊘ Moderator already exists: ${moderatorData.email}`);
        createdUsers.push(existingModerator);
      }
    }

    // Create regular users
    console.log(`  Creating ${userCount} regular user(s)...`);
    const userData = await generateUsers(userCount);

    for (const data of userData) {
      const existingUser = await User.findOne({ email: data.email });
      if (!existingUser) {
        const user = await User.create(data);
        createdUsers.push(user);
      } else {
        createdUsers.push(existingUser);
      }
    }
    console.log(`    ✓ Created ${userCount} regular users`);

    console.log(`✓ User seeding completed! Total users: ${createdUsers.length}`);
    console.log(`  - Admins: ${adminCount}`);
    console.log(`  - Moderators: ${moderatorCount}`);
    console.log(`  - Regular users: ${userCount}`);
    console.log(`  Default password for all users: password123`);

    return createdUsers;

  } catch (error) {
    console.error("✗ Error seeding users:", error.message);
    throw error;
  }
};

/**
 * Clear all users from database
 * WARNING: Use with caution!
 */
export const clearUsers = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("✗ Cannot clear users in production!");
    return;
  }

  console.log("🗑️  Clearing all users...");
  const result = await User.deleteMany({});
  console.log(`✓ Deleted ${result.deletedCount} users`);
  return result;
};
