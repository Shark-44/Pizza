# Pizza Project - Fast Food Ordering Kiosk

This project involves creating an ordering kiosk inspired by fast-food restaurants. The customer can browse the menu, add products to their cart, and place an order. The administrator will be able to add a product, display it on the map and modify the prices. This last option will affect the persistence of historical data. The frontend is built with React, and the backend with Node.js, available on GitHub.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- Node.js (v16.x or higher)
- npm or yarn
- Git

## Project Structure

- Frontend: developed in React with Vite for development and building.
- Backend: developed in Node.js with Express, managing the API for orders and menus.

## Installation

### Clone the repositories

Clone the frontend:
```bash
git clone https://github.com/[YourUsername]/pizza-frontend.git
cd pizza-frontend
```

Clone the backend:
```bash
git clone https://github.com/Shark-44/backend_pizza.git
cd backend_pizza
```

### Frontend

Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```

To add Axios (if not installed) for API communication:
```bash
npm install axios
```
or
```bash
yarn add axios
```

Configure the backend URL in your services or API files. Example in a services/api.js file:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Link to your backend
});

export default api;
```

### Backend

Follow the instructions provided in the backend repository: backend_pizza.

## Scripts

### Frontend

Development: to launch the application in development mode.
```bash
npm run dev
```
or
```bash
yarn dev
```

Build: to compile the application for production.
```bash
npm run build
```
or
```bash
yarn build
```

Lint: to check for code style errors with ESLint.
```bash
npm run lint
```
or
```bash
yarn lint
```

Preview: to launch a preview of the production build.
```bash
npm run preview
```
or
```bash
yarn preview
```

### Backend

Refer to the instructions in the backend repository to start the server and API.

## Features

- Display of the menu with products (pizzas, drinks, etc.)
- Adding products to the cart
- Order validation
- Communication with the backend for product and order management

## Technologies Used

### Frontend

- React: JavaScript library for building user interfaces.
- React Router DOM: for navigation between pages.
- Axios: for API calls to the backend.
- TypeScript: static typing for more robustness.
- Vite: rapid development tool for React.

### Backend

The backend manages orders and the menu through a RESTful API. More details in the backend repository.