# Onyx & Aura - Luxury Watches E-Commerce

## Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## Introduction

**Onyx & Aura** is a sophisticated luxury watches e-commerce platform that combines elegant design with robust functionality. The application features a seamless shopping experience, comprehensive product management, and a secure admin dashboard for inventory control.

Built with the MERN stack (MongoDB, Express, React, Node.js), this project demonstrates modern full-stack development practices, including RESTful API design, JWT authentication, responsive UI/UX, and real-time state management.

---

## Features

### Customer Features
- **Product Catalog**: Browse curated collections of luxury timepieces
- **Product Details**: Comprehensive product pages with specifications and reviews
- **Shopping Cart**: Persistent cart with quantity management
- **Search Functionality**: Real-time product search with filtering
- **Responsive Design**: Seamless experience across all devices
- **Smooth Animations**: Framer Motion powered transitions and effects
- **Custom Cursor**: Elegant custom cursor for desktop experience

### Admin Features
- **Secure Authentication**: JWT-based admin login system
- **Role-Based Access**: Admin and demo accounts with different permissions
- **Product Management**: Full CRUD operations for products
- **Dashboard Analytics**: Product count and management overview
- **Image Management**: Support for product images and galleries
- **Category Management**: Organize products by Spotlight and Collection

### UI/UX Features
- **Modern Design**: Clean, minimalist luxury aesthetic
- **Smooth Scrolling**: Parallax effects and scroll animations
- **Loading States**: Professional loading indicators
- **Toast Notifications**: User-friendly success/error messages
- **Modal Dialogs**: Quick view and product details modals
- **Mobile Optimized**: Touch-friendly interface for mobile devices

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI framework |
| **Vite** | 7.2.4 | Build tool & dev server |
| **Framer Motion** | 12.29.2 | Animation library |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS |
| **React Router DOM** | 7.13.0 | Client-side routing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18.2 | Web framework |
| **MongoDB** | - | Database |
| **Mongoose** | 8.0.3 | ODM for MongoDB |
| **JWT** | 9.0.2 | Authentication |
| **bcryptjs** | 2.4.3 | Password hashing |

### Development Tools
- **ESLint**: Code linting
- **Nodemon**: Auto-restart for development
- **dotenv**: Environment variable management

---

## Project Structure

```
Luxury_Watches/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Admin/       # Admin dashboard components
│   │   │   ├── BrandStory.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── Collection.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── QuickViewModal.jsx
│   │   │   ├── SearchDrawer.jsx
│   │   │   ├── Spotlight.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/         # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Admin/
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── services/       # API service layers
│   │   │   ├── productService.js
│   │   │   └── reviewService.js
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/            # Static assets
│   ├── index.html
│   └── package.json
│
└── server/                # Node.js backend API
    ├── controllers/      # Route controllers
    │   ├── authController.js
    │   ├── productController.js
    │   └── reviewController.js
    ├── models/           # Mongoose schemas
    │   ├── Product.js
    │   ├── Review.js
    │   └── User.js
    ├── routes/           # API routes
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   └── reviewRoutes.js
    ├── middleware/       # Custom middleware
    │   └── auth.js
    ├── utils/           # Utility scripts
    │   └── seedDatabase.js
    ├── server.js        # Entry point
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** Atlas account or local MongoDB instance
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxury-watches.git
   cd luxury-watches
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set Up Environment Variables**

   Create `.env` file in `server/` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ADMIN_EMAIL=admin@onyxaura.com
   ADMIN_PASSWORD=your_admin_password
   ```

   Create `.env` file in `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Seed the Database** (Optional)
   ```bash
   cd server
   node utils/seedDatabase.js
   ```
   This will create sample products and admin/demo users.

6. **Run the Application**

   **Start Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

   **Start Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `PORT` | Server port number | No | 5000 |
| `FRONTEND_URL` | Frontend application URL | No | http://localhost:5173 |
| `ADMIN_EMAIL` | Admin user email | No | admin@onyxaura.com |
| `ADMIN_PASSWORD` | Admin user password | No | admin123 |
| `NODE_ENV` | Environment mode | No | development |

### Frontend (`frontend/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | No | http://localhost:5000/api |

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (development only)
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Reviews
- `GET /api/reviews/product/:productId` - Get reviews for a product
- `POST /api/reviews` - Create a review

### Health Check
- `GET /api/health` - API health status

---

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting platform

3. Set environment variable:
   - `VITE_API_URL`: Your backend API URL

### Backend Deployment (Render/Railway/Heroku)

1. Set up your MongoDB Atlas cluster

2. Configure environment variables in your hosting platform

3. Deploy the `server/` folder

4. Ensure your hosting platform runs:
   ```bash
   npm start
   ```

### Demo Accounts

After seeding the database, you can use:

- **Admin Account**: `admin@onyxaura.com` / `Admin@321@` (Full access)
- **Demo Account**: `demo@onyxaura.com` / `demo123` (Read-only)

---

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

**Your Name**
- Portfolio: [yourportfolio.com](#)
- LinkedIn: [linkedin.com/in/yourprofile](#)
- Email: your.email@example.com

---

## Acknowledgments

- Design inspiration from luxury watch brands
- Icons and assets from various open-source libraries
- Community support and feedback

---

**Made with love for luxury watch enthusiasts**

Star this repo if you find it helpful!
