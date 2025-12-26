import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: { type: String },
  status: {
    type: String,
    enum: [
      "Pending",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ],
    default: "Pending",
  },
  items: [
    {
      foodItemId: mongoose.Schema.Types.ObjectId,
      name: String,
      category: String,
      size: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: { type: Number, required: true },
  deliveryAddress: { type: String },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "UPI"],
    default: "Cash",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.orders ?? mongoose.model("Orders", orderSchema);
