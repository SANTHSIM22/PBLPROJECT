# Artisan Connect

A full-stack platform connecting artisans with customers. Built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd PBL_PROJECT
```

2. **Setup Server**

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed  # Create admin user
npm run dev
```

3. **Setup Client**

```bash
cd client
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📚 Documentation

For detailed setup, deployment, and production configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🏗️ Tech Stack

### Frontend

- React 19.2.0
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Security & Performance

- Helmet (Security headers)
- CORS
- Rate Limiting
- Compression
- Morgan (Logging)

## 📁 Project Structure

```
PBL_PROJECT/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context (Auth)
│   │   ├── services/    # API services
│   │   └── utils/       # Utilities (axios config)
│   └── public/
├── server/              # Express backend
│   └── src/
│       ├── controllers/ # Route controllers
│       ├── models/      # MongoDB models
│       ├── routes/      # API routes
│       ├── middleware/  # Custom middleware
│       └── utils/       # Utilities
└── DEPLOYMENT.md        # Deployment guide
```

## 🎯 Features

### For Customers

- Browse artisan products
- Add to cart and wishlist
- Place orders
- Track order status
- Review products

### For Artisans

- Create and manage products
- View and manage orders
- Track sales
- Update profile

### For Admins

- Manage users (customers and artisans)
- Approve artisan registrations
- View all orders and products
- Platform analytics

## 🔑 Default Credentials

After running `npm run seed` in the server directory:

**Admin:**

- Email: admin@test.com (development) or from .env (production)
- Password: admin123 (development) or from .env (production)

⚠️ **Important:** Change default credentials after first login in production!

## 🛠️ Available Scripts

### Server

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed admin user

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Artisan only)
- `PUT /api/products/:id` - Update product (Artisan only)
- `DELETE /api/products/:id` - Delete product (Artisan only)

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Artisan/Admin)

### Wishlist

- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:id` - Remove from wishlist

### Reviews

- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Admin

- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/approve` - Approve artisan
- `GET /api/admin/stats` - Get platform statistics

## 🔒 Environment Variables

### Server (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/artisan-connect
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=admin123
ADMIN_NAME=Admin
```

### Client (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Artisan Connect
VITE_APP_DESCRIPTION=Connect with Local Artisans
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Production environment setup
- Deploying to Render, Railway, or Vercel
- Self-hosted VPS deployment
- Security checklist
- Troubleshooting guide

## 🔧 Production Readiness Features

✅ Environment-based configuration  
✅ Security headers (Helmet)  
✅ Rate limiting  
✅ CORS protection  
✅ Request compression  
✅ Logging (Morgan)  
✅ Health check endpoint  
✅ Error handling  
✅ JWT authentication  
✅ Password hashing  
✅ Input validation

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For issues and questions, please contact the development team.
