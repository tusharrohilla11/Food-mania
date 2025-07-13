<div align="center">
    <h1 style="color: tomato;">FoodMania</h1>

FoodMania - A full-stack food delivery application built with MERN stack by Tushar Rohilla.



</div>

## Introduction

FoodMania is a full-stack web application that enables users to browse through a variety of dishes, place orders, track their order in real time and get food delivered to their doorstep efficiently. The application leverages the power of the MERN stack (MongoDB, Express.js, React.js, Node.js) to ensure a seamless user experience and robust performance.

## 🚀 How This Project Was Built

This project was developed as a comprehensive full-stack food delivery application using modern web technologies. Here's the development journey:

### 📋 Project Architecture & Structure

```
FoodMania/
├── frontend/          # React.js customer interface
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── context/       # State management
│   │   └── assets/        # Images and static files
├── admin/             # React.js admin dashboard
│   ├── src/
│   │   ├── components/    # Admin UI components
│   │   └── pages/         # Admin management pages
├── backend/           # Node.js server
│   ├── controllers/       # Business logic
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Authentication & validation
│   └── uploads/          # File storage
└── .env               # Environment configuration
```

### 🛠️ Development Process

1. **Backend Development First**: Started with building the API server using Node.js and Express
2. **Database Design**: Created MongoDB schemas for users, foods, orders, and cart functionality
3. **Authentication System**: Implemented JWT-based authentication with bcrypt password hashing
4. **File Upload System**: Built image upload functionality using Multer for food images
5. **Payment Integration**: Integrated Stripe for secure payment processing
6. **Frontend Development**: Built responsive React interfaces for both customer and admin sides
7. **State Management**: Used React Context API for global state management
8. **Admin Dashboard**: Created a separate admin panel for food and order management
9. **Real-time Features**: Implemented order tracking and status updates

### 💻 Technology Decisions & Why

**Frontend (React.js)**:
- **Vite**: Chosen for faster development and build times compared to Create React App
- **React Router**: For client-side routing and navigation
- **Context API**: For state management (lighter alternative to Redux for this project size)
- **Axios**: For API calls and HTTP requests
- **CSS Modules**: For component-scoped styling

**Backend (Node.js)**:
- **Express.js**: Lightweight and flexible web framework
- **MongoDB**: NoSQL database for flexible schema and easy scaling
- **Mongoose**: ODM for MongoDB with schema validation
- **JWT**: Stateless authentication for better scalability
- **Multer**: File upload middleware for handling food images
- **Bcrypt**: Secure password hashing

**Additional Tools**:
- **Stripe**: Industry-standard payment processing
- **CORS**: Cross-origin resource sharing for frontend-backend communication
- **Dotenv**: Environment variable management for security

### 🔧 Key Features Implemented

**User Management**:
- JWT-based authentication system
- Password encryption using bcrypt
- Automatic admin role assignment for specific email addresses
- User registration and login functionality

**Food Management**:
- Dynamic food categorization
- Image upload and storage system
- CRUD operations for food items
- Search and filter functionality

**Order System**:
- Shopping cart with local storage
- Order placement with user details
- Stripe payment integration
- Order status tracking (Pending → Preparing → Delivered)

**Admin Features**:
- Separate admin dashboard
- Food inventory management
- Order management with status updates
- User management capabilities

### 📈 Development Challenges Solved

1. **State Management**: Implemented Context API for global state management across components
2. **File Uploads**: Created robust image upload system with validation and storage
3. **Payment Integration**: Integrated Stripe with proper error handling and success callbacks
4. **Authentication**: Built secure JWT-based authentication with middleware protection
5. **Responsive Design**: Ensured seamless experience across different screen sizes
6. **API Design**: Created RESTful APIs with proper error handling and validation

## 🖥️ Tech Stack

**Frontend:**

![React](https://img.shields.io/badge/react_js-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)&nbsp;
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)&nbsp;

**Backend:**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)&nbsp;

**Database:**

![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=black)&nbsp;

**Payment Gateway:**

![Stripe](https://img.shields.io/badge/Stripe-%23008CDD?style=for-the-badge&logo=stripe&logoColor=black)&nbsp;

**Tools & Libraries:**

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)&nbsp;
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)&nbsp;
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)&nbsp;

## Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Browse Menu**: Easily browse through categorized food items with search functionality
- **Shopping Cart**: Add/remove items with quantity management
- **Order Placement**: Simple and intuitive checkout process
- **Payment Integration**: Secure payment processing via Stripe
- **Order Tracking**: Real-time order status updates from preparation to delivery
- **Admin Dashboard**: Comprehensive admin interface for:
  - Food item management (add, edit, delete)
  - Order management and status updates
  - User management
- **Responsive Design**: Fully responsive design optimized for all devices
- **Image Upload**: Admin can upload food images with preview functionality
- **Auto-Admin Setup**: Automatic admin privileges for specified email addresses

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/tusharrohilla11/Food-mania.git
   cd Food-mania
   ```

2. **Install dependencies in admin, backend and frontend**:

   ```sh
   cd admin
   npm install

   cd backend
   npm install

   cd frontend
   npm install
   ```

3. **Set up environment `.env` variables**:

   ```dotenv
   # Database Configuration
   MONGODB_URI=your_mongodb_connection_string

   # JWT Secret for authentication
   JWT_SECRET=your_jwt_secret_key

   # Stripe Configuration (for payments)
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # Frontend URL (for CORS and redirects)
   FRONTEND_URL=http://localhost:5173

   # Server Port
   PORT=8000
   ```

4. **Run the application**:
   In the `admin` directory, start the React app:
   ```sh
   npm run dev
   ```
   In the `backend` directory, start the server:
   ```sh
   npm run server
   ```
   In the `frontend` directory, start the React app:
   ```sh
   npm run dev
   ```

## API Endpoints

Here are listed all available API endpoints along with a brief description of each.

- `POST /api/user/register`: creating new user
- `POST /api/user/login`: user logged in
- `POST /api/cart/add`: add foods from user's cart
- `POST /api/cart/remove`: remove foods from user's cart
- `POST /api/cart/get`: fetch foods from user's cart

- `POST /api/food/add`: add food's image and its detail from admin pannel
- `GET /api/food/list`: get list of all foods in admin pannel
- `POST /api/food/remove`: remove foods from list from admin pannel

- `POST /api/order/place`: place an order
- `POST /api/order/verify`: verifying the order payment (success/failed)
- `POST /api/order/userorders`: all orders of particular user
- `GET /api/order/list`: get orders of all users in admin pannel
- `POST /api/order/status`: update status of all orders

## Admin Pannel Preview

<<<<<<< HEAD
=======


>>>>>>> 87b35c250d6269f488f5d145e9a1c9f28768aaa6
## 👤 Developer

[Tushar Rohilla](https://github.com/tusharrohilla11)

## 📬 Contact

If you want to contact me, you can reach me through below handles.

<a href="https://www.linkedin.com/in/tusharrohilla11/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

<a href="mailto:tusharrohilla1121@gmail.com"><img  alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>

## Contribution:

Feel free to contribute to the project by opening issues or creating pull requests. Your feedback and suggestions are highly appreciated.

### Show your support by Star 🌟 this repo!
