# DineHub - Food Ordering & Delivery Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for online food ordering and delivery management.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security Features](#security-features)
- [Frontend Details](#frontend-details)
- [Backend Details](#backend-details)
- [Payment Integration](#payment-integration)
- [Email Service](#email-service)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

DineHub is a modern food ordering platform that allows users to browse food items, add them to cart, place orders, and make payments. It includes an admin dashboard for managing products, orders, users, and categories.

### Live Demo
- Frontend: `https://project02-dine-hub-mern-aqcz.vercel.app`
- Backend API: `http://localhost:3333` (when running locally)

---

## Features

### User Features
- **Authentication & Authorization**
  - Email/Password registration and login
  - Google OAuth integration
  - JWT-based authentication
  - Password reset via email
  - Persistent sessions with secure cookies

- **Food Browsing**
  - Browse food items by categories (Pizza, Biryani, Starters, etc.)
  - View detailed food item information
  - Filter by price range
  - Search functionality

- **Shopping Cart**
  - Add/remove items
  - Adjust quantities
  - Real-time price calculation
  - Persistent cart (saved in Redux state)

- **Order Management**
  - Place orders
  - Track order status
  - View order history
  - Order confirmation emails

- **Payment Processing**
  - Stripe integration for card payments
  - Cash on delivery option
  - Payment success/failure handling
  - Secure payment processing

- **User Profile**
  - View and edit profile information
  - Change password
  - View order history
  - Manage settings

### Admin Features
- **Dashboard**
  - Overview statistics (total orders, revenue, users)
  - Sales charts and analytics
  - Recent orders overview

- **Order Management**
  - View all orders
  - Update order status (Pending, Confirmed, Preparing, Ready, Out for Delivery, Delivered, Cancelled)
  - Track order history
  - Filter and search orders

- **Product Management**
  - Add/edit/delete food items
  - Manage product categories
  - Set pricing and availability
  - Upload product images

- **User Management**
  - View all users
  - Manage user roles (user, admin, moderator)
  - Activate/deactivate accounts

- **Category Management**
  - Create/edit/delete food categories
  - Organize products by category

---

## Tech Stack

### Frontend
- **React** 19.2.3 - UI library
- **Vite** 7.3.0 - Build tool
- **React Router DOM** 7.11.0 - Client-side routing
- **Redux** 5.0.1 + React Redux 9.2.0 - State management
- **TanStack Query** 5.90.12 - Server state management
- **Tailwind CSS** 4.1.18 - Styling
- **Stripe.js** 8.6.4 - Payment processing
- **React OAuth Google** 0.13.4 - Google authentication
- **React Toastify** 11.0.5 - Notifications
- **Recharts** 3.6.0 - Charts and analytics
- **Lucide React** 0.562.0 - Icons
- **JWT Decode** 4.0.0 - Token decoding

### Backend
- **Node.js** with Express 5.2.1 - Server framework
- **MongoDB** with Mongoose 9.0.2 - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** 20.2.0 - Payment gateway
- **Nodemailer** 7.0.12 - Email service
- **Express Rate Limit** 8.2.1 - Rate limiting
- **Helmet** 8.1.0 - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Express Mongo Sanitize** 2.2.0 - NoSQL injection prevention
- **Cookie Parser** - Cookie handling
- **Dotenv** - Environment variables

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Components │  │  Redux Store │  │  React Query │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│           │                 │                 │               │
│           └─────────────────┴─────────────────┘               │
│                            │                                  │
│                      API Requests                             │
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Express API   │
                    │                 │
                    │  ┌───────────┐  │
                    │  │Middlewares│  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │Controllers│  │
                    │  └───────────┘  │
                    │  ┌───────────┐  │
                    │  │  Routes   │  │
                    │  └───────────┘  │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
      ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼─────┐
      │  MongoDB  │   │   Stripe  │   │   SMTP    │
      │ Database  │   │  Payment  │   │  Server   │
      └───────────┘   └───────────┘   └───────────┘
```

### Request Flow

1. **User Action** → Frontend component dispatches action
2. **Redux/React Query** → Manages state and makes API call
3. **API Request** → Sent to Express backend
4. **Middleware** → Authentication, rate limiting, sanitization
5. **Route Handler** → Directs to appropriate controller
6. **Controller** → Business logic execution
7. **Database** → MongoDB query/update
8. **Response** → JSON sent back to frontend
9. **State Update** → Redux/React Query updates state
10. **UI Update** → Component re-renders with new data

---

## Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Stripe Account** (for payment processing)
- **Google OAuth Credentials** (for Google login)
- **SMTP Email Account** (Gmail recommended)

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/DineHub_MERN.git
cd DineHub_MERN
```

### Step 2: Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 3: Environment Configuration

Create `.env` files based on the example files provided.

#### Backend Environment (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```env
# Server Configuration
PORT=3333
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dinehub

# JWT Secrets (generate strong random strings)
ACCESS_KEY=your_strong_access_key_here
SECRET_KEY=your_strong_secret_key_here

# OAuth Credentials
FB_ID=your_facebook_app_id
FB_SECRET=your_facebook_app_secret

# Email Configuration (SMTP)
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

# Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

#### Frontend Environment (.env)
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
VITE_FB_ID=your_facebook_app_id

# Backend API URL
VITE_SERVER_URL=http://localhost:3333

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

### Step 4: Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string and add to `MONGO_URL` in `.env`

#### Option B: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

Update `MONGO_URL` in `.env`:
```env
MONGO_URL=mongodb://localhost:27017/dinehub
```

### Step 5: Seed Database (Recommended)

The application includes a robust seeding system that populates the database with realistic test data.

#### Quick Seed (Recommended for Development)

```bash
cd backend
npm run seed
```

This will create:
- 1 Admin user (`admin@dinehub.com`)
- 2 Moderators
- 20 Test users
- 14 Food categories
- 25+ Food items
- 500 Orders with 90 days of historical data

**Login Credentials:**
- Email: `admin@dinehub.com`
- Password: `password123`

#### Other Seed Options

```bash
# Production seed (safe, no fake data)
npm run seed:production

# Clear all data (development only)
npm run seed:clear
```

For complete seeding documentation, see: [SEEDING_GUIDE.md](SEEDING_GUIDE.md)

### Step 6: Run Application

#### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3333
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Client runs on http://localhost:5173
```

#### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## Environment Configuration

### Obtaining Credentials

#### 1. MongoDB Atlas
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster → Database Access → Add user
- Network Access → Add IP (0.0.0.0/0 for all IPs)
- Connect → Get connection string

#### 2. Google OAuth
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create new project
- Enable Google+ API
- Create OAuth 2.0 credentials
- Add authorized redirect URIs:
  - `http://localhost:5173`
  - Your production URL
- Copy Client ID and Client Secret

#### 3. Stripe
- Sign up at [Stripe](https://stripe.com/)
- Get test API keys from Dashboard
- Use `pk_test_...` for frontend
- Use `sk_test_...` for backend

#### 4. Gmail SMTP (for password reset emails)
- Enable 2-Factor Authentication on Gmail
- Generate App Password:
  - Google Account → Security → App Passwords
  - Select "Mail" and "Other"
- Use generated password in `SMTP_PASSWORD`

#### 5. JWT Secrets
Generate strong random strings:
```bash
# Generate random strings
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Project Structure

### Backend Structure

```
backend/
├── app.js                      # Express app configuration
├── index.js                    # Server entry point
├── package.json                # Dependencies
├── .env                        # Environment variables (not in git)
├── .env.example                # Environment template
│
├── controllers/                # Business logic
│   ├── userController.js       # User & auth operations
│   ├── adminController.js      # Admin operations
│   └── paymentController.js    # Payment processing
│
├── models/                     # MongoDB schemas
│   ├── userModel.js            # User schema
│   ├── orderModel.js           # Order schema
│   ├── categoryModel.js        # Category schema
│   └── foodItemModel.js        # Food item schema
│
├── routes/                     # API routes
│   ├── userRouter.js           # User routes
│   └── paymentRouter.js        # Payment routes
│
├── middlewares/                # Custom middleware
│   ├── auth.js                 # Authentication & authorization
│   └── rateLimiter.js          # Rate limiting configurations
│
├── helpers/                    # Utility functions
│   ├── responseHandler.js      # API response formatting
│   ├── cookies.js              # Cookie operations
│   ├── createJWT.js            # JWT token generation
│   └── emailWithNodemailer.js  # Email sending
│
├── validators/                 # Input validation
│   ├── condition.js            # Validation rules
│   └── validation.js           # Validation middleware
│
└── secret.js                   # Environment variable exports
```

### Frontend Structure

```
frontend/
├── src/
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   │
│   ├── Components/             # Reusable components
│   │   ├── Navbar/             # Navigation bar
│   │   ├── Footer/             # Footer
│   │   ├── Cards/              # Food item cards
│   │   ├── CardDetails/        # Single food item
│   │   ├── Categories/         # Category listing
│   │   ├── Hero/               # Hero section
│   │   ├── Login/              # Login form
│   │   ├── signup/             # Signup form
│   │   ├── ForgetPassword/     # Password reset request
│   │   ├── ResetPassword/      # Password reset form
│   │   ├── Private/            # Route guards
│   │   │   ├── PrivateRoute.jsx    # User auth guard
│   │   │   └── AdminRoute.jsx      # Admin auth guard
│   │   │
│   │   └── admin/              # Admin components
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminOrders.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminUsers.jsx
│   │       ├── AdminCategories.jsx
│   │       └── AdminSettings.jsx
│   │
│   ├── screens/                # Page components
│   │   ├── Home.jsx            # Homepage
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Contact.jsx         # Contact page
│   │   ├── Profile.jsx         # User profile
│   │   ├── Settings.jsx        # User settings
│   │   ├── PaymentSuccess.jsx  # Payment success
│   │   ├── PaymentFailed.jsx   # Payment failure
│   │   └── NotFound.jsx        # 404 page
│   │
│   ├── redux/                  # State management
│   │   ├── store.js            # Redux store
│   │   ├── reducers/           # Reducers
│   │   └── actions/            # Actions
│   │
│   ├── layout/                 # Layout components
│   │   ├── MainLayout.jsx      # Main app layout
│   │   └── AdminLayout.jsx     # Admin layout
│   │
│   ├── helpers/                # Utility functions
│   │   └── authHelper.js       # Auth utilities
│   │
│   └── assets/                 # Static assets
│
├── public/                     # Public assets
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── .env                        # Environment variables
```

---

## API Documentation

### Base URL
- Development: `http://localhost:3333`
- Production: `https://your-api-domain.com`

### Authentication

All authenticated routes require JWT token in cookies or Authorization header.

### User & Auth Routes

#### 1. Sign Up
```http
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User Created Successfully",
  "payload": "jwt_access_token"
}
```

#### 2. Login
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Successfully login",
  "payload": {
    "accessToken": "jwt_token",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### 3. Google Login
```http
POST /google-login
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "googleId": "google_user_id",
  "picture": "profile_image_url"
}

Response:
{
  "success": true,
  "message": "User Created Successfully" | "User Exist with this email",
  "payload": "jwt_access_token"
}
```

#### 4. Logout
```http
POST /logout

Response:
{
  "success": true,
  "message": "Successfully logged out"
}
```

#### 5. Forget Password
```http
POST /forget-password
Content-Type: application/json

{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Message sent your gmail"
}
```

#### 6. Reset Password
```http
POST /reset-password
Content-Type: application/json

{
  "id": "user_id",
  "newPass": "newpassword123",
  "confirmPass": "newpassword123"
}

Response:
{
  "success": true,
  "message": "Successfully updated password"
}
```

#### 7. Get Food Items
```http
GET /food

Response:
{
  "success": true,
  "message": "Data successfully fetched",
  "payload": [
    [
      { "_id": "cat_id", "CategoryName": "Pizza" },
      { "_id": "cat_id", "CategoryName": "Biryani" }
    ],
    [
      {
        "_id": "food_id",
        "CategoryName": "Pizza",
        "name": "Margherita Pizza",
        "img": "image_url",
        "options": [{ "regular": "100", "medium": "200", "large": "300" }],
        "description": "Classic cheese pizza"
      }
    ]
  ]
}
```

### Admin Routes

#### 8. Admin Dashboard
```http
GET /admin/dashboard
Headers: Authorization: Bearer <jwt_token>

Response:
{
  "success": true,
  "message": "Admin dashboard data",
  "payload": {
    "stats": { ... },
    "recentOrders": [ ... ]
  }
}
```

### Payment Routes

#### 9. Create Checkout Session
```http
POST /api/payment/create-checkout-session
Headers: Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "items": [
    {
      "name": "Pizza",
      "price": 299,
      "quantity": 2,
      "img": "image_url"
    }
  ],
  "customer": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}

Response:
{
  "success": true,
  "sessionId": "stripe_session_id",
  "url": "stripe_checkout_url"
}
```

### Rate Limiting

- **Global Rate Limit**: 100 requests per 15 minutes per IP
- **Auth Routes** (login, signup, google-login, forget-password): 5 attempts per 15 minutes per IP
- Returns 429 status when limit exceeded

### Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Server Error

---

## Database Schema

### User Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  googleId: String (optional),
  role: String (enum: ["user", "admin", "moderator"], default: "user"),
  isActive: Boolean (default: true),
  picture: String (optional),
  tokens: [{ token: String }]
}
```

### Order Schema

```javascript
{
  orderId: String (required, unique, indexed),
  user: ObjectId (ref: User, required, indexed),
  customer: String (required),
  customerEmail: String (required),
  phone: String,
  status: String (enum: ["Pending", "Confirmed", "Preparing", "Ready",
                         "Out for Delivery", "Delivered", "Cancelled"],
                  default: "Pending", indexed),
  items: [
    {
      foodItemId: ObjectId (ref: FoodItems),
      name: String (required),
      category: String,
      size: String,
      quantity: Number (required, min: 1),
      price: Number (required, min: 0),
      img: String
    }
  ],
  subtotal: Number (required, min: 0),
  shippingCost: Number (default: 0, min: 0),
  tax: Number (default: 0, min: 0),
  total: Number (required, min: 0),
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String (default: "Bangladesh"),
    fullAddress: String
  },
  paymentMethod: String (enum: ["Cash", "Card", "UPI", "Stripe"], default: "Cash"),
  paymentStatus: String (enum: ["Pending", "Paid", "Failed", "Refunded"],
                         default: "Pending"),
  paymentDetails: {
    stripeSessionId: String,
    stripePaymentIntentId: String,
    transactionId: String,
    paidAt: Date
  },
  notes: String,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  cancelledAt: Date,
  cancelReason: String,
  statusHistory: [
    {
      status: String,
      timestamp: Date (default: Date.now),
      updatedBy: ObjectId (ref: User),
      note: String
    }
  ],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Category Schema

```javascript
{
  CategoryName: String (required, unique)
}
```

### Food Item Schema

```javascript
{
  CategoryName: String (required),
  name: String (required),
  img: String,
  options: [Object], // e.g., [{ "half": "150", "full": "260" }]
  description: String
}
```

---

## Security Features

### 1. Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: Bcrypt with 10 salt rounds
- **Role-Based Access**: User, Admin, Moderator roles
- **Protected Routes**: Middleware guards for sensitive endpoints

### 2. Rate Limiting
- **Global Limit**: 100 requests per 15 minutes
- **Auth Routes**: 5 attempts per 15 minutes
- **Prevents**: Brute force attacks, DDoS

### 3. Data Sanitization
- **NoSQL Injection Prevention**: mongo-sanitize middleware
- **Input Validation**: express-validator for all inputs
- **XSS Protection**: Sanitizes user inputs

### 4. Security Headers
- **Helmet.js**: Sets secure HTTP headers
- **CORS**: Configured for specific origins only
- **CSP**: Content Security Policy (configurable)

### 5. Environment Security
- **No Hardcoded Secrets**: All credentials in .env
- **.gitignore**: Excludes .env files
- **.env.example**: Template without real credentials

### 6. Cookie Security
- **httpOnly**: Prevents XSS attacks
- **secure**: HTTPS only in production
- **sameSite**: CSRF protection

### 7. Password Reset
- **Time-Limited Tokens**: 1-day expiration
- **Email Verification**: Reset link sent to email
- **Token-Based**: Secure password reset flow

### 8. Express 5 Compatibility
- **Read-Only Query**: Prevents query pollution
- **Custom Sanitization**: Body and params only
- **Upgraded Security**: Latest Express features

### Security Best Practices
1. Rotate all credentials regularly
2. Use HTTPS in production
3. Keep dependencies updated
4. Monitor for security vulnerabilities
5. Implement proper logging
6. Use environment-specific configs
7. Regular security audits

---

## Frontend Details

### State Management

#### Redux Store
- **User State**: Authentication, profile data
- **Cart State**: Shopping cart items
- **App State**: Loading, errors, notifications

#### React Query
- **Server State**: Food items, orders, categories
- **Caching**: Automatic data caching
- **Refetching**: Background data updates

### Routing Structure

```
Public Routes:
├── /login                  # Login page
├── /signup                 # Signup page
├── /forget-password        # Password reset request
└── /reset-password         # Password reset form

User Routes (Auth Required):
├── /                       # Homepage
├── /cardDetails/:id        # Food item details
├── /cart                   # Shopping cart
├── /contact                # Contact page
├── /profile                # User profile
├── /settings               # User settings
├── /category/:id           # Category page
├── /payment/success        # Payment success
└── /payment/failed         # Payment failed

Admin Routes (Admin Role Required):
├── /admin/dashboard        # Admin dashboard
├── /admin/products         # Product management
├── /admin/orders           # Order management
├── /admin/users            # User management
├── /admin/categories       # Category management
└── /admin/settings         # Admin settings
```

### Key Components

#### Authentication Components
- **LoginForm**: Email/password + Google OAuth
- **SignupForm**: User registration
- **ForgetPassword**: Password reset request
- **ResetPassword**: Password reset with token

#### Shopping Components
- **Cards**: Food item grid display
- **CardDetails**: Single food item details
- **Cart**: Shopping cart with checkout
- **Categories**: Category browsing

#### Admin Components
- **AdminDashboard**: Statistics and charts
- **AdminOrders**: Order management table
- **AdminProducts**: Product CRUD operations
- **AdminUsers**: User management
- **AdminCategories**: Category management

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable UI components
- **Theme**: Customizable color scheme

---

## Backend Details

### Middleware Stack

The middleware is applied in this order:

1. **Helmet** - Security headers
2. **Cookie Parser** - Parse cookies
3. **Morgan** - Request logging (dev only)
4. **CORS** - Cross-origin configuration
5. **Rate Limiter** - Global rate limiting
6. **Body Parser** - JSON and URL-encoded
7. **Custom Sanitization** - NoSQL injection prevention

### Controllers

#### User Controller
- `signupPostController` - User registration
- `loginPostController` - Email/password login
- `googleLoginController` - Google OAuth login
- `logoutController` - User logout
- `forgetPassController` - Password reset request
- `resetPassController` - Password reset
- `foodController` - Get food items and categories

#### Admin Controller
- `adminDashboardController` - Dashboard statistics

#### Payment Controller
- `processPayment` - Create Stripe checkout session

### Authentication Middleware

```javascript
// protect - Verify JWT token
// authorize(role) - Check user role
```

Usage:
```javascript
router.get('/admin/dashboard', protect, authorize('admin'), adminDashboardController);
```

### Error Handling

Centralized error handling:
- **404 Handler**: Catches undefined routes
- **Global Error Handler**: Catches all errors
- **Async Error Wrapper**: Handles async errors
- **Custom Error Responses**: Standardized error format

---

## Payment Integration

### Stripe Integration

#### Setup
1. Create Stripe account
2. Get API keys (test mode)
3. Add keys to environment variables
4. Install Stripe libraries

#### Payment Flow

1. **User adds items to cart**
2. **User proceeds to checkout**
3. **Frontend calls** `/api/payment/create-checkout-session`
4. **Backend creates Stripe session**
5. **User redirected to Stripe checkout**
6. **User completes payment**
7. **Stripe redirects to success/failure page**
8. **Webhook updates order status** (optional)

#### Testing

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future date for expiry
- Use any 3-digit CVC

---

## Email Service

### Nodemailer Configuration

Used for:
- Password reset emails
- Order confirmations
- Welcome emails

### Setup Gmail SMTP

1. Enable 2FA on Gmail
2. Generate App Password
3. Add to `.env`:
```env
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Email Templates

Password Reset Email:
```html
<h2>Reset Your Password</h2>
<p>Click the link below to reset your password:</p>
<a href="http://localhost:5173/reset-password?token={token}&id={userId}">
  Reset Password
</a>
<p>This link expires in 24 hours.</p>
```

---

## Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for Production**
```bash
# Set NODE_ENV
NODE_ENV=production

# Update FRONTEND_URL
FRONTEND_URL=https://your-frontend-domain.com
```

2. **Deploy to Render**
- Connect GitHub repository
- Set environment variables
- Deploy from main branch
- Configure build command: `npm install`
- Configure start command: `npm start`

3. **Deploy to Railway**
```bash
npm install -g railway
railway login
railway init
railway up
```

### Frontend Deployment (Vercel/Netlify)

1. **Prepare for Production**
```bash
# Update environment variables
VITE_SERVER_URL=https://your-backend-domain.com
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel login
vercel --prod
```

Or connect GitHub:
- Import project
- Set environment variables
- Deploy

3. **Deploy to Netlify**
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production

Backend:
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
MONGO_URL=mongodb+srv://...
# All other production credentials
```

Frontend:
```env
VITE_SERVER_URL=https://your-backend.onrender.com
VITE_STRIPE_PUBLIC_KEY=pk_live_...
# All other production credentials
```

### Post-Deployment Checklist

- [ ] Update CORS origins in backend
- [ ] Test all API endpoints
- [ ] Test payment flow with real cards
- [ ] Test email sending
- [ ] Verify OAuth redirects
- [ ] Check security headers
- [ ] Enable HTTPS
- [ ] Monitor error logs
- [ ] Set up database backups
- [ ] Configure CDN for static assets

---

## Troubleshooting

### Common Issues

#### 1. Circular Dependency Error
```
ReferenceError: Cannot access 'authLimiter' before initialization
```
**Solution**: Rate limiters moved to separate file (`middlewares/rateLimiter.js`)

#### 2. Express 5 Query Error
```
Cannot set property query of #<IncomingMessage> which has only a getter
```
**Solution**: Custom sanitization middleware that only sanitizes body and params

#### 3. MongoDB Connection Failed
```
MongoServerError: Authentication failed
```
**Solutions**:
- Check MONGO_URL is correct
- Verify database user credentials
- Whitelist IP address in MongoDB Atlas
- Check network connectivity

#### 4. CORS Error
```
Access to fetch at 'http://localhost:3333' blocked by CORS policy
```
**Solutions**:
- Add frontend URL to CORS origins in `app.js`
- Verify FRONTEND_URL in backend `.env`
- Check credentials: true in CORS config

#### 5. JWT Token Invalid
```
JsonWebTokenError: invalid token
```
**Solutions**:
- Check JWT secrets match in .env
- Verify token expiration
- Clear cookies and login again
- Check token format in Authorization header

#### 6. Stripe Payment Failed
```
No such checkout session
```
**Solutions**:
- Verify Stripe API keys
- Check environment (test vs. live)
- Ensure success/cancel URLs are correct
- Review Stripe dashboard for errors

#### 7. Email Not Sending
```
Error: Invalid login
```
**Solutions**:
- Verify Gmail App Password (not regular password)
- Enable "Less secure app access" if needed
- Check SMTP credentials in .env
- Test with different email provider

#### 8. Admin Route Access Denied
**Solutions**:
- Verify user role is "admin" in database
- Check JWT token contains correct user data
- Clear cache and re-login
- Check AdminRoute component logic

### Debug Mode

Enable debug logging:
```env
# Backend .env
DEBUG=express:*
NODE_ENV=development

# Run with logs
npm run dev
```

---

## Contributing

### Development Workflow

1. **Fork Repository**
2. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make Changes**
4. **Test Thoroughly**
5. **Commit with Descriptive Message**
```bash
git commit -m "feat: add user profile editing"
```

6. **Push to Branch**
```bash
git push origin feature/your-feature-name
```

7. **Create Pull Request**

### Coding Standards

#### JavaScript/React
- Use ES6+ syntax
- Follow Airbnb style guide
- Use meaningful variable names
- Add comments for complex logic
- Use async/await over promises

#### Git Commits
Follow Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

---

## License

This project is licensed under the MIT License.

---

## Support

For issues and questions:
- Create an issue on GitHub
- Email: support@dinehub.com

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- User authentication with JWT
- Google OAuth integration
- Food browsing and ordering
- Stripe payment integration
- Admin dashboard
- Order management
- Security fixes applied

### Security Fixes Applied
- Environment variables protection
- AdminRoute authentication bypass fixed
- Logout controller bug fixed
- Rate limiting implemented
- NoSQL injection prevention
- XSS protection
- Secure cookies implementation
- Express 5 compatibility fixes

---

## Acknowledgments

- MongoDB for database
- Stripe for payment processing
- Google for OAuth services
- All contributors and developers

---

## Contact

- **Developer**: Rizwan
- **Portfolio**: [Your Portfolio]
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn]

---

**Built with MERN Stack**
