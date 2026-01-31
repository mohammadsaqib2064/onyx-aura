# Deployment Checklist - Onyx & Aura

## Pre-Deployment Checklist

### Backend (Server)

- [x] **Environment Variables**
  - [x] `.env` file is in `.gitignore`
  - [x] `env-template.txt` has all required variables
  - [x] Admin password updated to `Admin@321@`
  - [ ] Set `MONGODB_URI` (MongoDB Atlas connection string)
  - [ ] Set `JWT_SECRET` (strong random string)
  - [ ] Set `FRONTEND_URL` (production frontend URL)
  - [ ] Set `NODE_ENV=production`
  - [ ] Set `PORT` (or use hosting platform default)

- [x] **Security**
  - [x] JWT authentication implemented
  - [x] Password hashing with bcrypt
  - [x] CORS configured (uses FRONTEND_URL from env)
  - [x] Protected routes have authentication middleware
  - [x] Admin routes protected with `isAdmin` middleware

- [x] **Code Quality**
  - [x] No AI-generated comments
  - [x] Console.logs only for essential server info
  - [x] Error handling in place
  - [x] Environment-based error messages (dev vs prod)

- [x] **Database**
  - [x] Seed script ready (`server/utils/seedDatabase.js`)
  - [x] Connection retry logic implemented
  - [x] Models properly defined

### Frontend

- [x] **Environment Variables**
  - [x] `.env` file is in `.gitignore`
  - [ ] Set `VITE_API_URL` (production backend API URL)

- [x] **Build Configuration**
  - [x] `vite.config.js` configured
  - [x] Build script: `npm run build`
  - [x] Output folder: `dist/`

- [x] **Code Quality**
  - [x] No AI-generated comments
  - [x] No console.logs in production code
  - [x] Error handling implemented
  - [x] Loading states added
  - [x] Responsive design implemented

- [x] **API Integration**
  - [x] Uses environment variable for API URL
  - [x] Fallback to localhost only in development
  - [x] Proper error handling

### Deployment Steps

#### Backend Deployment (Render/Railway/Heroku)

1. **Create MongoDB Atlas Cluster**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get connection string
   - Add your IP to whitelist (or 0.0.0.0/0 for all)

2. **Deploy Backend**
   - Push `server/` folder to GitHub
   - Connect to hosting platform
   - Set environment variables:
     ```
     MONGODB_URI=your_atlas_connection_string
     JWT_SECRET=your_strong_random_secret
     FRONTEND_URL=https://your-frontend-domain.com
     NODE_ENV=production
     ADMIN_EMAIL=admin@onyxaura.com
     ADMIN_PASSWORD=Admin@321@
     PORT=5000 (or platform default)
     ```
   - Set build command: (none needed, direct deploy)
   - Set start command: `npm start`

3. **Seed Database**
   - After deployment, run seed script:
   ```bash
   node utils/seedDatabase.js
   ```
   - Or use MongoDB Atlas interface to run script

#### Frontend Deployment (Vercel/Netlify)

1. **Build Locally (Optional)**
   ```bash
   cd frontend
   npm run build
   ```
   - Test build locally: `npm run preview`

2. **Deploy Frontend**
   - Push `frontend/` folder to GitHub
   - Connect to hosting platform
   - Set environment variable:
     ```
     VITE_API_URL=https://your-backend-api.com/api
     ```
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

### Post-Deployment

- [ ] Test admin login: `admin@onyxaura.com` / `Admin@321@`
- [ ] Test demo login: `demo@onyxaura.com` / `demo123`
- [ ] Verify products load correctly
- [ ] Test product CRUD operations (admin only)
- [ ] Verify demo user cannot make changes
- [ ] Test cart functionality
- [ ] Test checkout flow
- [ ] Verify responsive design on mobile
- [ ] Check CORS errors in browser console
- [ ] Verify API health endpoint: `/api/health`

### Important Notes

1. **CORS**: Backend `FRONTEND_URL` must match exact frontend domain
2. **MongoDB Atlas**: Whitelist hosting platform IPs or use 0.0.0.0/0
3. **Environment Variables**: Never commit `.env` files
4. **JWT Secret**: Use strong random string in production
5. **Admin Password**: Change from default in production

### Troubleshooting

- **CORS Errors**: Check `FRONTEND_URL` matches frontend domain exactly
- **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
- **401 Unauthorized**: Check JWT_SECRET is set correctly
- **Build Fails**: Check Node.js version (18+) matches hosting platform
