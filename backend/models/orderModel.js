import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    customer: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Ready",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
      index: true,
    },
    items: [
      {
        foodItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FoodItems",
        },
        name: {
          type: String,
          required: true,
        },
        category: String,
        size: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        img: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: "Bangladesh" },
      fullAddress: String,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Stripe"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentDetails: {
      stripeSessionId: String,
      stripePaymentIntentId: String,
      transactionId: String,
      paidAt: Date,
    },
    notes: String,
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    cancelledAt: Date,
    cancelReason: String,
    statusHistory: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        note: String,
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Indexes for better query performance
orderSchema.index({ createdAt: -1 });
orderSchema.index({ customerEmail: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ "paymentDetails.stripeSessionId": 1 });

// Pre-save middleware to add status history
orderSchema.pre("save", function () {
  // Only add to status history if status is modified and not on initial creation
  if (this.isModified("status") && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }
});

// Virtual for order age
orderSchema.virtual("orderAge").get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60)); // in hours
});

// Method to calculate totals
orderSchema.methods.calculateTotals = function () {
  this.subtotal = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  this.total = this.subtotal + this.shippingCost + this.tax;
  return this.total;
};

// Static method to generate unique order ID
orderSchema.statics.generateOrderId = async function () {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

export const Order =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
export default Order;
