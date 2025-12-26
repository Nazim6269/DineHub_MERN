import foodItemModel from "./models/foodItemModel.js";
import orderModel from "./models/orderModel.js";
import { User } from "./models/userModel.js";

const dummyFoodItems = [
  // Starters
  {
    CategoryName: "Starter",
    name: "Paneer 65",
    img: "https://media.istockphoto.com/photos/paneer-tikka-kabab-in-red-sauce-is-an-indian-dish-made-from-chunks-of-picture-id1257507446?b=1&k=20&m=1257507446&s=170667a&w=0&h=Nd7QsslbvPqOcvwu1bY0rEPZXJqwoKTYCal3nty4X-Y=",
    options: [{ half: "150", full: "260" }],
    description:
      "Made using Indian masalas and Basmati rice. Barbequed pieces of Paneer were added.",
  },
  {
    CategoryName: "Starter",
    name: "Chicken 65",
    img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500",
    options: [{ half: "180", full: "320" }],
    description:
      "Spicy, deep-fried chicken dish originating from South India. Perfectly crispy and flavorful.",
  },
  {
    CategoryName: "Starter",
    name: "Gobi Manchurian",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
    options: [{ half: "140", full: "240" }],
    description:
      "Indo-Chinese appetizer made with cauliflower florets in a spicy, tangy sauce.",
  },
  {
    CategoryName: "Starter",
    name: "Veg Spring Rolls",
    img: "https://images.unsplash.com/photo-1593967858037-f4b747f12bcd?w=500",
    options: [{ half: "120", full: "200" }],
    description:
      "Crispy rolls filled with fresh vegetables and served with sweet chili sauce.",
  },
  {
    CategoryName: "Starter",
    name: "Fish Fingers",
    img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500",
    options: [{ half: "220", full: "380" }],
    description:
      "Tender fish fillets coated in crispy breadcrumbs, served with tartar sauce.",
  },

  // Main Course - Biryani
  {
    CategoryName: "Biryani",
    name: "Chicken Biryani",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    options: [{ regular: "250", large: "400" }],
    description:
      "Aromatic basmati rice cooked with marinated chicken and exotic spices.",
  },
  {
    CategoryName: "Biryani",
    name: "Mutton Biryani",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    options: [{ regular: "320", large: "500" }],
    description:
      "Premium mutton pieces slow-cooked with fragrant rice and traditional spices.",
  },
  {
    CategoryName: "Biryani",
    name: "Veg Biryani",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    options: [{ regular: "180", large: "280" }],
    description:
      "Mixed vegetables cooked with aromatic basmati rice and flavorful spices.",
  },
  {
    CategoryName: "Biryani",
    name: "Egg Biryani",
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
    options: [{ regular: "200", large: "320" }],
    description:
      "Boiled eggs layered with spiced rice and herbs for a delightful meal.",
  },
  {
    CategoryName: "Biryani",
    name: "Prawns Biryani",
    img: "https://images.unsplash.com/photo-1633945274309-c440f8c5d1c0?w=500",
    options: [{ regular: "380", large: "580" }],
    description:
      "Succulent prawns cooked with fragrant rice and coastal spices.",
  },

  // Curries
  {
    CategoryName: "Curry",
    name: "Butter Chicken",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    options: [{ half: "280", full: "450" }],
    description:
      "Tender chicken in a rich, creamy tomato-based gravy with butter and spices.",
  },
  {
    CategoryName: "Curry",
    name: "Paneer Butter Masala",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    options: [{ half: "220", full: "360" }],
    description: "Soft paneer cubes in a creamy tomato and cashew-based gravy.",
  },
  {
    CategoryName: "Curry",
    name: "Dal Makhani",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    options: [{ half: "160", full: "260" }],
    description:
      "Black lentils slow-cooked with butter, cream, and aromatic spices.",
  },
  {
    CategoryName: "Curry",
    name: "Kadai Paneer",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    options: [{ half: "240", full: "380" }],
    description:
      "Paneer cooked with bell peppers, onions, and tomatoes in a spicy gravy.",
  },
  {
    CategoryName: "Curry",
    name: "Fish Curry",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500",
    options: [{ half: "300", full: "480" }],
    description:
      "Fresh fish cooked in a tangy coconut-based curry with traditional spices.",
  },

  // Breads
  {
    CategoryName: "Breads",
    name: "Butter Naan",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    options: [{ regular: "40" }],
    description: "Soft, fluffy Indian bread brushed with butter.",
  },
  {
    CategoryName: "Breads",
    name: "Garlic Naan",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    options: [{ regular: "50" }],
    description: "Naan topped with fresh garlic and herbs.",
  },
  {
    CategoryName: "Breads",
    name: "Tandoori Roti",
    img: "https://images.unsplash.com/photo-1617343267481-5c707f38b5b8?w=500",
    options: [{ regular: "30" }],
    description: "Whole wheat flatbread cooked in a tandoor.",
  },
  {
    CategoryName: "Breads",
    name: "Cheese Naan",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    options: [{ regular: "80" }],
    description: "Naan stuffed with melted cheese and herbs.",
  },

  // Chinese
  {
    CategoryName: "Chinese",
    name: "Veg Fried Rice",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
    options: [{ regular: "160", large: "260" }],
    description: "Stir-fried rice with mixed vegetables and soy sauce.",
  },
  {
    CategoryName: "Chinese",
    name: "Chicken Fried Rice",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
    options: [{ regular: "200", large: "320" }],
    description: "Fried rice tossed with chicken pieces and vegetables.",
  },
  {
    CategoryName: "Chinese",
    name: "Hakka Noodles",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
    options: [{ regular: "180", large: "280" }],
    description: "Stir-fried noodles with vegetables in Indo-Chinese style.",
  },
  {
    CategoryName: "Chinese",
    name: "Chilli Chicken",
    img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500",
    options: [{ half: "220", full: "380" }],
    description:
      "Spicy chicken pieces tossed with bell peppers and onions in chili sauce.",
  },

  // Desserts
  {
    CategoryName: "Dessert",
    name: "Gulab Jamun",
    img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500",
    options: [{ regular: "60" }],
    description:
      "Soft, sweet dumplings soaked in sugar syrup. 2 pieces per serving.",
  },
  {
    CategoryName: "Dessert",
    name: "Rasmalai",
    img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500",
    options: [{ regular: "80" }],
    description:
      "Soft cottage cheese patties in sweet, creamy milk. 2 pieces per serving.",
  },
  {
    CategoryName: "Dessert",
    name: "Ice Cream",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    options: [{ regular: "100" }],
    description: "Choice of vanilla, chocolate, or strawberry. Single scoop.",
  },
  {
    CategoryName: "Dessert",
    name: "Kulfi",
    img: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500",
    options: [{ regular: "70" }],
    description: "Traditional Indian ice cream with cardamom and pistachios.",
  },

  // Beverages
  {
    CategoryName: "Beverage",
    name: "Mango Lassi",
    img: "https://images.unsplash.com/photo-1561570834-45d5f14e0112?w=500",
    options: [{ regular: "80" }],
    description: "Refreshing yogurt-based drink with sweet mango pulp.",
  },
  {
    CategoryName: "Beverage",
    name: "Masala Chai",
    img: "https://images.unsplash.com/photo-1597318493939-b#8b9c2f2f3?w=500",
    options: [{ regular: "30" }],
    description: "Traditional Indian tea with aromatic spices and milk.",
  },
  {
    CategoryName: "Beverage",
    name: "Fresh Lime Soda",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    options: [{ regular: "50" }],
    description: "Fizzy drink with fresh lime juice. Choose sweet or salt.",
  },
  {
    CategoryName: "Beverage",
    name: "Cold Coffee",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500",
    options: [{ regular: "90" }],
    description: "Chilled coffee blended with milk and ice cream.",
  },
];

const dummyUsers = [
  {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543210",
    role: "user",
    address: "123, MG Road, Bangalore, Karnataka",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543211",
    role: "user",
    address: "456, Park Street, Kolkata, West Bengal",
  },
  {
    name: "Amit Patel",
    email: "amit@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543212",
    role: "user",
    address: "789, Linking Road, Mumbai, Maharashtra",
  },
  {
    name: "Sneha Reddy",
    email: "sneha@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543213",
    role: "user",
    address: "321, Jubilee Hills, Hyderabad, Telangana",
  },
  {
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543214",
    role: "user",
    address: "654, Civil Lines, Delhi",
  },
  {
    name: "Admin User",
    email: "admin@dinhub.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9999999999",
    role: "admin",
    address: "DinHub HQ, Bangalore",
  },
  {
    name: "Manager Anil",
    email: "manager@dinhub.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9999999998",
    role: "moderator",
    address: "DinHub Branch, Mumbai",
  },
  {
    name: "Deepak Verma",
    email: "deepak@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543215",
    role: "user",
    address: "987, Anna Nagar, Chennai, Tamil Nadu",
  },
  {
    name: "Kavita Desai",
    email: "kavita@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543216",
    role: "user",
    address: "147, SG Highway, Ahmedabad, Gujarat",
  },
  {
    name: "Rahul Mehta",
    email: "rahul@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYqYq5Q5zIG",
    phone: "+91 9876543217",
    role: "user",
    address: "258, Banjara Hills, Hyderabad, Telangana",
  },
];

const generateOrders = (foodItems, users) => {
  const statuses = [
    "Pending",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];
  const paymentMethods = ["Cash", "Card", "UPI"];
  const orders = [];

  for (let i = 1; i <= 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const numItems = Math.floor(Math.random() * 4) + 1;
    const orderItems = [];
    let orderTotal = 0;

    for (let j = 0; j < numItems; j++) {
      const randomFood =
        foodItems[Math.floor(Math.random() * foodItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;

      // Get size and price
      const option = randomFood.options[0];
      let size, price;

      if (option.half && option.full) {
        size = Math.random() > 0.5 ? "full" : "half";
        price = parseFloat(option[size]);
      } else if (option.regular) {
        if (option.large) {
          size = Math.random() > 0.5 ? "large" : "regular";
        } else {
          size = "regular";
        }
        price = parseFloat(option[size]);
      }

      const itemTotal = price * quantity;

      orderItems.push({
        foodItemId: randomFood._id,
        name: randomFood.name,
        category: randomFood.CategoryName,
        size: size,
        quantity: quantity,
        price: price,
      });

      orderTotal += itemTotal;
    }

    // Create orders from different dates
    const daysAgo = Math.floor(Math.random() * 30);
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);

    orders.push({
      orderId: `#ORD${1000 + i}`,
      customer: user.name,
      customerEmail: user.email,
      phone: user.phone,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      items: orderItems,
      total: Math.round(orderTotal * 100) / 100,
      deliveryAddress: user.address,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      createdAt: orderDate,
    });
  }

  return orders;
};

export const seedDatabase = async () => {
  try {
    const insertedFoodItems = await foodItemModel.insertMany(dummyFoodItems);
    const insertedUsers = await User.insertMany(dummyUsers);
    const orders = generateOrders(insertedFoodItems, insertedUsers);
    const insertedOrders = await orderModel.insertMany(orders);
  } catch (error) {
    console.log(error);
  }
};
