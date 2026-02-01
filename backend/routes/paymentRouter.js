
import express from "express";
import { processPayment } from "../controllers/paymentController.js";
import { protect } from "../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", protect, processPayment);

export { paymentRouter };
