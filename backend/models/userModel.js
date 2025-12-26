import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  picture: {
    type: String,
  },
  tokens: [{ token: String }],
});

const User = mongoose.model("User", userSchema);

export { User };
