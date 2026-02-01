import bcrypt from "bcryptjs";

/**
 * User Factory - Generates realistic user data
 */

const firstNames = [
  "John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Lisa",
  "William", "Jennifer", "James", "Mary", "Richard", "Patricia", "Thomas",
  "Linda", "Charles", "Barbara", "Daniel", "Elizabeth", "Ahmed", "Fatima",
  "Mohammed", "Aisha", "Ali", "Zainab", "Hassan", "Mariam"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Khan", "Ahmed", "Ali", "Hassan", "Rahman", "Islam"
];

const emailDomains = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"
];

const profilePictures = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8"
];

/**
 * Generate a random user
 * @param {Object} overrides - Override default values
 * @returns {Object} User object
 */
export const generateUser = async (overrides = {}) => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const email = overrides.email ||
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomains[Math.floor(Math.random() * emailDomains.length)]}`;

  const password = await bcrypt.hash(overrides.password || "password123", 10);

  return {
    name: `${firstName} ${lastName}`,
    email,
    password,
    role: overrides.role || "user",
    isActive: overrides.isActive !== undefined ? overrides.isActive : true,
    picture: overrides.picture || profilePictures[Math.floor(Math.random() * profilePictures.length)],
    tokens: [],
    ...overrides
  };
};

/**
 * Generate multiple users
 * @param {number} count - Number of users to generate
 * @param {Object} overrides - Override default values
 * @returns {Array} Array of user objects
 */
export const generateUsers = async (count, overrides = {}) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(await generateUser(overrides));
  }
  return users;
};

/**
 * Generate admin user
 */
export const generateAdmin = async (overrides = {}) => {
  return generateUser({
    role: "admin",
    email: overrides.email || "admin@dinehub.com",
    name: overrides.name || "Admin User",
    ...overrides
  });
};

/**
 * Generate moderator user
 */
export const generateModerator = async (overrides = {}) => {
  return generateUser({
    role: "moderator",
    email: overrides.email || "moderator@dinehub.com",
    name: overrides.name || "Moderator User",
    ...overrides
  });
};
