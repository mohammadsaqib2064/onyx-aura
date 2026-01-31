# Onyx & Aura Backend API

Backend server for Onyx & Aura Luxury Watches e-commerce platform.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file with your actual values:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A random secret key for JWT tokens
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `FRONTEND_URL` - Your frontend URL

### 3. Database Setup

#### Option A: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use default `MONGODB_URI` in `.env`

### 4. Seed Database (Optional)

To populate database with sample data:

```bash
node utils/seedDatabase.js
```

### 5. Start Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (for initial setup)
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Query Parameters
- `?category=Collection` - Filter by category
- `?search=midnight` - Search products

## 🔐 Authentication

All admin routes require JWT token in header:
```
Authorization: Bearer <token>
```

## 📁 Project Structure

```
server/
├── controllers/     # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── .env            # Environment variables
├── server.js       # Entry point
└── package.json    # Dependencies
```

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📝 Notes

- Server runs in fallback mode if MongoDB connection fails
- All admin routes are protected
- CORS is configured for frontend URL
- Environment variables are required for production
