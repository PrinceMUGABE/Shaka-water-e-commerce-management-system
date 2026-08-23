# Shaka Water E-Commerce Management System - Frontend

A modern, responsive React web application for water supply e-commerce. Built with Vite and Tailwind CSS, providing product browsing, shopping cart, order management, and customer support features.

## 🎯 Overview

Shaka Water Frontend is a user-friendly React application for water supply e-commerce operations. Provides interfaces for product browsing, shopping, order tracking, delivery management, and customer service.

**Live Demo**: [Coming Soon]
**Backend API**: https://github.com/PrinceMUGABE/shaka-backend

## ✨ Features

### Product Browsing
- **Product Catalog**: Browse water products
- **Product Search**: Search and filter products
- **Product Details**: View comprehensive product info
- **Product Reviews**: Read customer reviews
- **Price Comparison**: Compare pricing
- **Promotional Offers**: View special offers

### Shopping Experience
- **Shopping Cart**: Add/remove products
- **Cart Management**: Update quantities
- **Wishlist**: Save favorite products
- **Coupon Codes**: Apply discounts
- **Checkout Process**: Easy payment flow
- **Payment Methods**: Multiple payment options

### Order Management
- **Order History**: View all orders
- **Order Details**: Complete order information
- **Order Status**: Real-time order tracking
- **Order Confirmation**: Email confirmations
- **Invoice Download**: Download invoices
- **Return Request**: Request returns

### Delivery Tracking
- **Delivery Status**: Track delivery progress
- **Estimated Delivery**: See delivery dates
- **GPS Tracking**: Real-time location tracking
- **Delivery Notifications**: Receive updates
- **Delivery Proof**: Confirm delivery
- **Delivery Feedback**: Rate delivery

### Customer Account
- **User Dashboard**: Personal overview
- **Profile Management**: Update profile
- **Address Book**: Manage addresses
- **Payment Methods**: Store payment info
- **Notification Settings**: Customize alerts
- **Account Security**: Security settings

### Customer Support
- **Help Center**: FAQs and guides
- **Live Chat**: Customer support chat
- **Contact Form**: Send inquiries
- **Ticket System**: Track support tickets
- **Knowledge Base**: Access articles
- **Video Tutorials**: Learn how to use platform

### Analytics & Insights
- **Purchase History**: View spending
- **Favorite Products**: Track preferences
- **Personalized Recommendations**: Get suggestions
- **Account Activity**: See account activity
- **Loyalty Points**: Track rewards

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19.0+ |
| **Build Tool** | Vite 5.0+ |
| **Styling** | Tailwind CSS 3.3+ |
| **State Management** | React Context + Redux |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **Payment** | Stripe Integration |
| **Maps** | Leaflet (Delivery tracking) |
| **Charts** | Recharts |
| **Date/Time** | date-fns |

## 📋 Prerequisites

- **Node.js 16.0+**
- **npm 8.0+**
- **Git**
- **Backend API running**

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/PrinceMUGABE/Shaka-water-e-commerce-management-system.git
cd Shaka-water-e-commerce-management-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_APP_NAME=Shaka Water
VITE_ENVIRONMENT=development
VITE_GOOGLE_MAPS_API_KEY=your_maps_key
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

Access at: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 📁 User Flows

### Customer Shopping Flow
1. Browse products
2. View product details
3. Add to cart
4. Apply coupon
5. Checkout
6. Make payment
7. Track order
8. Receive delivery
9. Leave review

### Order Tracking Flow
1. View order history
2. Select order
3. Track delivery
4. Receive notifications
5. Confirm delivery
6. Rate delivery

## 💳 Payment Features

### Secure Payments
- Multiple payment methods
- Stripe integration
- Mobile money support
- Invoice payment
- Payment confirmation

## 🗺️ Delivery Tracking

### Real-time Tracking
- GPS location tracking
- Estimated arrival time
- Driver contact info
- Delivery photos
- Proof of delivery

## 🚀 Deployment

### Vercel
```bash
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Production Environment
Update `.env.production.local`:
```env
VITE_API_BASE_URL=https://your-api.com/api
VITE_STRIPE_PUBLIC_KEY=your_prod_stripe_key
VITE_ENVIRONMENT=production
```

## 📧 Contact

- **Email**: princemugabe567@gmail.com
- **GitHub**: https://github.com/PrinceMUGABE

## 📄 License

MIT License

---

**Version**: 1.0.0
**Last Updated**: January 2025
**Status**: ✅ Production Ready