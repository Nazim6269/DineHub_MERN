import express from "express";
import {
  foodController,
  forgetPassController,
  googleLoginController,
  loginPostController,
  logoutController,
  resetPassController,
  signupGetController,
  signupPostController,
  addReviewController,
} from "../controllers/userController.js";

import { adminDashboardController } from "../controllers/adminController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { authorize, protect } from "../middlewares/auth.js";
import { loginValidator, signupValidator } from "../validators/condition.js";
import { runValidation } from "../validators/validation.js";

const userRouter = express.Router();

//all routes are here
userRouter.get("/signup", signupGetController);

// Authentication routes with stricter rate limiting
userRouter.post(
  "/signup",
  authLimiter,
  signupValidator,
  runValidation,
  signupPostController
);

userRouter.post(
  "/login",
  authLimiter,
  loginValidator,
  runValidation,
  loginPostController
);

userRouter.post(
  "/google-login",
  authLimiter,
  googleLoginController
);

userRouter.post("/logout", logoutController);
userRouter.get("/food", foodController);
userRouter.post("/food/:id/review", protect, addReviewController);
userRouter.post("/forget-password", authLimiter, forgetPassController);
userRouter.post("/reset-password", resetPassController);
userRouter.get(
  "/admin/dashboard",
  protect,
  authorize("admin"),
  adminDashboardController
);
export { userRouter };
