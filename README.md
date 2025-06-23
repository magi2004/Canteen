# 🍽️ Canteen Management System

A full-stack web application for managing a canteen/food service with separate interfaces for customers and administrators. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

### 👥 Customer Features
- **User Authentication**: Register and login with secure JWT authentication
- **Menu Browsing**: View available food items with images and descriptions
- **Shopping Cart**: Add/remove items and manage quantities
- **Order Management**: Place orders and track order history
- **Profile Management**: Update personal information
- **Dark Mode**: Toggle between light and dark themes

### 🔧 Admin Features
- **Dashboard**: Overview of orders, revenue, and system statistics
- **Food Management**: Add, edit, and delete menu items with image uploads
- **Order Management**: View and update order statuses
- **User Management**: Manage customer accounts and view user data
- **Real-time Updates**: Monitor system activity in real-time

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Canteen
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Create Admin User
```bash
cd ../backend
npm run create-admin
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the frontend development server:**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Start the backend in production:**
```bash
cd backend
npm start
```

## 📁 Project Structure

```
Canteen/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Food.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── foods.js
│   │   └── orders.js
│   ├── createAdmin.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── customer/
│   │   │   └── shared/
│   │   ├── contexts/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── customer/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Food Management
- `GET /api/foods` - Get all food items
- `POST /api/foods` - Add new food item (admin only)
- `PUT /api/foods/:id` - Update food item (admin only)
- `DELETE /api/foods/:id` - Delete food item (admin only)

### Order Management
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (admin only)

### Admin Routes
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user role

## 🎨 Features in Detail

### Authentication System
- Secure JWT-based authentication
- Role-based access control (customer/admin)
- Protected routes for different user types
- Password hashing with bcrypt

### Food Management
- CRUD operations for menu items
- Image upload functionality
- Category-based organization
- Price and availability management

### Order System
- Shopping cart functionality
- Order status tracking
- Order history for customers
- Real-time order updates for admins

### User Interface
- Responsive design with Tailwind CSS
- Dark/light mode toggle
- Modern and intuitive UI
- Loading states and error handling

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/canteen
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

### Database Setup

The application uses MongoDB. You can either:
- Use a local MongoDB installation
- Use MongoDB Atlas (cloud service)

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB team for the database solution
- All contributors and maintainers

---

**Happy coding! 🎉** 