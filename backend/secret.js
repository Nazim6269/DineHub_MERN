import dotenv from "dotenv";
dotenv.config(); // must be called **before** using mongoURL

const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || "development";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
const mongoURL = process.env.MONGO_URL;
const jwtAccessKey = process.env.ACCESS_KEY;
const fbId = process.env.FB_ID;
const fbSecret = process.env.FB_SECRET;
const jwtSecretKey = process.env.SECRET_KEY; // Deprecated - use jwtAccessKey instead
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export {
  fbId,
  fbSecret,
  frontendURL,
  jwtAccessKey,
  jwtSecretKey,
  mongoURL,
  nodeEnv,
  port,
  smtpPassword,
  smtpUsername,
  stripeSecretKey,
};
