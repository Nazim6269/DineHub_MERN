import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  CategoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: [
    {
      half: String,
      full: String,
      regular: String,
      medium: String,
      large: String,
    },
  ],
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.foodItems ??
  mongoose.model("FoodItems", foodItemSchema);
