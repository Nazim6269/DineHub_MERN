/**
 * Food Item & Category Factory - Generates realistic food data
 */

export const categories = [
  "Pizza",
  "Burger",
  "Biryani",
  "Pasta",
  "Starter",
  "Chinese",
  "Dessert",
  "Beverages",
  "Salad",
  "Sandwich",
  "Soup",
  "BBQ",
  "Seafood",
  "Breakfast"
];

const foodItems = {
  Pizza: [
    {
      name: "Margherita Pizza",
      description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce",
      img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      options: [{ regular: "200", medium: "350", large: "500" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Pepperoni Pizza",
      description: "Loaded with pepperoni, mozzarella cheese, and Italian herbs",
      img: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      options: [{ regular: "250", medium: "400", large: "600" }],
      dietaryTags: ["non-vegetarian"]
    },
    {
      name: "BBQ Chicken Pizza",
      description: "Grilled chicken with BBQ sauce, onions, and cheese",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      options: [{ regular: "280", medium: "450", large: "650" }],
      dietaryTags: ["non-vegetarian"]
    },
    {
      name: "Veggie Supreme",
      description: "Bell peppers, mushrooms, olives, onions, and fresh vegetables",
      img: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49",
      options: [{ regular: "220", medium: "380", large: "550" }],
      dietaryTags: ["vegetarian", "vegan-option"]
    }
  ],
  Burger: [
    {
      name: "Classic Beef Burger",
      description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      options: [{ single: "150", double: "250" }],
      dietaryTags: ["non-vegetarian"]
    },
    {
      name: "Chicken Burger",
      description: "Crispy chicken fillet with mayo, lettuce, and cheese",
      img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
      options: [{ single: "130", double: "220" }],
      dietaryTags: ["non-vegetarian"]
    },
    {
      name: "Veggie Burger",
      description: "Plant-based patty with fresh veggies and vegan mayo",
      img: "https://images.unsplash.com/photo-1520072959219-c595dc870360",
      options: [{ single: "120", double: "200" }],
      dietaryTags: ["vegetarian", "vegan"]
    },
    {
      name: "Cheese Burst Burger",
      description: "Double cheese with beef patty and caramelized onions",
      img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5",
      options: [{ single: "180", double: "300" }],
      dietaryTags: ["non-vegetarian"]
    }
  ],
  Biryani: [
    {
      name: "Chicken Biryani",
      description: "Fragrant basmati rice with tender chicken and aromatic spices",
      img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      options: [{ half: "180", full: "320" }],
      dietaryTags: ["non-vegetarian", "halal"]
    },
    {
      name: "Mutton Biryani",
      description: "Succulent mutton pieces cooked with premium basmati rice",
      img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      options: [{ half: "220", full: "400" }],
      dietaryTags: ["non-vegetarian", "halal"]
    },
    {
      name: "Veg Biryani",
      description: "Mixed vegetables with basmati rice and authentic spices",
      img: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
      options: [{ half: "150", full: "280" }],
      dietaryTags: ["vegetarian", "vegan-option"]
    },
    {
      name: "Hyderabadi Dum Biryani",
      description: "Authentic Hyderabadi style slow-cooked biryani",
      img: "https://images.unsplash.com/photo-1642821373181-696a54913e93",
      options: [{ half: "200", full: "360" }],
      dietaryTags: ["non-vegetarian", "halal", "spicy"]
    }
  ],
  Starter: [
    {
      name: "Chicken Wings",
      description: "Crispy fried wings with choice of sauce",
      img: "https://images.unsplash.com/photo-1608039755401-742074f0548d",
      options: [{ half: "140", full: "250" }],
      dietaryTags: ["non-vegetarian"]
    },
    {
      name: "Paneer Tikka",
      description: "Grilled cottage cheese marinated in Indian spices",
      img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",
      options: [{ half: "160", full: "280" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Spring Rolls",
      description: "Crispy vegetable spring rolls with sweet chili sauce",
      img: "https://images.unsplash.com/photo-1619895092538-128341789043",
      options: [{ half: "100", full: "180" }],
      dietaryTags: ["vegetarian", "vegan"]
    },
    {
      name: "Mozzarella Sticks",
      description: "Deep-fried breaded mozzarella with marinara sauce",
      img: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7",
      options: [{ half: "120", full: "200" }],
      dietaryTags: ["vegetarian"]
    }
  ],
  Pasta: [
    {
      name: "Alfredo Pasta",
      description: "Creamy white sauce pasta with parmesan cheese",
      img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
      options: [{ regular: "180", large: "280" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Arrabiata Pasta",
      description: "Spicy tomato-based pasta with garlic and chili",
      img: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9",
      options: [{ regular: "170", large: "270" }],
      dietaryTags: ["vegetarian", "vegan-option", "spicy"]
    },
    {
      name: "Chicken Pesto Pasta",
      description: "Grilled chicken with basil pesto and cherry tomatoes",
      img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
      options: [{ regular: "200", large: "320" }],
      dietaryTags: ["non-vegetarian"]
    }
  ],
  Dessert: [
    {
      name: "Chocolate Brownie",
      description: "Warm chocolate brownie with vanilla ice cream",
      img: "https://images.unsplash.com/photo-1607920591413-4ec007e70023",
      options: [{ single: "100", double: "180" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Cheesecake",
      description: "Classic New York style cheesecake with berry compote",
      img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866",
      options: [{ single: "120", double: "200" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Tiramisu",
      description: "Italian coffee-flavored dessert with mascarpone",
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
      options: [{ single: "130" }],
      dietaryTags: ["vegetarian"]
    }
  ],
  Beverages: [
    {
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda with mint",
      img: "https://images.unsplash.com/photo-1546173159-315724a31696",
      options: [{ regular: "50", large: "80" }],
      dietaryTags: ["vegetarian", "vegan"]
    },
    {
      name: "Mango Smoothie",
      description: "Fresh mango blended with yogurt and honey",
      img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      options: [{ regular: "80", large: "120" }],
      dietaryTags: ["vegetarian"]
    },
    {
      name: "Cold Coffee",
      description: "Chilled coffee with ice cream and chocolate",
      img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
      options: [{ regular: "90", large: "140" }],
      dietaryTags: ["vegetarian"]
    }
  ]
};

/**
 * Generate a category
 * @param {string} categoryName - Category name
 * @returns {Object} Category object
 */
export const generateCategory = (categoryName) => {
  return {
    CategoryName: categoryName
  };
};

/**
 * Generate all categories
 * @returns {Array} Array of category objects
 */
export const generateCategories = () => {
  return categories.map(cat => generateCategory(cat));
};

/**
 * Generate a food item
 * @param {string} category - Category name
 * @param {Object} overrides - Override default values
 * @returns {Object} Food item object
 */
export const generateFoodItem = (category, overrides = {}) => {
  const categoryItems = foodItems[category] || [];
  const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];

  if (!randomItem) {
    // Fallback if category not found
    return {
      CategoryName: category,
      name: `${category} Special`,
      description: `Delicious ${category.toLowerCase()} item`,
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      options: [{ regular: "150", large: "250" }],
      dietaryTags: ["vegetarian"],
      isAvailable: true,
      ...overrides
    };
  }

  return {
    CategoryName: category,
    name: randomItem.name,
    description: randomItem.description,
    img: randomItem.img,
    options: randomItem.options,
    dietaryTags: randomItem.dietaryTags || [],
    isAvailable: overrides.isAvailable !== undefined ? overrides.isAvailable : true,
    ...overrides
  };
};

/**
 * Generate multiple food items for a category
 * @param {string} category - Category name
 * @param {number} count - Number of items to generate
 * @returns {Array} Array of food item objects
 */
export const generateFoodItems = (category, count = 3) => {
  const categoryItems = foodItems[category] || [];
  return categoryItems.slice(0, count).map(item => ({
    CategoryName: category,
    name: item.name,
    description: item.description,
    img: item.img,
    options: item.options,
    dietaryTags: item.dietaryTags || [],
    isAvailable: true
  }));
};

/**
 * Generate all food items for all categories
 * @returns {Array} Array of all food item objects
 */
export const generateAllFoodItems = () => {
  const allItems = [];
  categories.forEach(category => {
    const items = generateFoodItems(category, 10); // Max 10 items per category
    allItems.push(...items);
  });
  return allItems;
};
