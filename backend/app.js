//external import
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import createError from "http-errors";
import morgan from "morgan";

const app = express();

//internal import
import { errorResponse } from "./helpers/responseHandler.js";
import { limiter } from "./middlewares/rateLimiter.js";
import { userRouter } from "./routes/userRouter.js";
import { paymentRouter } from "./routes/paymentRouter.js";
import { contactRouter } from "./routes/contactRouter.js";

//security and middleware configuration
const isProduction = process.env.NODE_ENV === "production";

//middleware array
const middleware = [
  // Security headers (helmet)
  helmet({
    contentSecurityPolicy: false, // Disable CSP for now (configure based on your needs)
    crossOriginEmbedderPolicy: false, // Allow embedding
  }),

  // Cookie parser
  cookieParser(),

  // Request logging (dev mode only)
  ...(isProduction ? [] : [morgan("dev")]),

  // CORS configuration
  cors({
    origin: isProduction
      ? process.env.FRONTEND_URL || 'https://project02-dine-hub-mern-aqcz.vercel.app'
      : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),

  // Global rate limiting
  limiter,

  // Body parsers
  express.urlencoded({ extended: true, limit: "10mb" }),
  express.json({ limit: "10mb" }),
];

//use middleware
app.use(middleware);

// Data sanitization for body and params only (Express 5 compatible)
// Note: We manually sanitize only body and params because Express 5 makes req.query read-only
app.use((req, res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    req.params = mongoSanitize.sanitize(req.params);
  }
  next();
});

// Routes
app.use("/", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/contact", contactRouter);

//client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

//server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

export default app;
