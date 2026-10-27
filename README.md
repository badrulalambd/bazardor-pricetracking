## 1. 🛒 Project Title : বাজার দর (BazarDor)
### Daily Market Prices at a Glance

## 2. 📝 Project Short Description
বাজার দর (BazarDor) is a responsive web application that helps users explore daily prices of essential products across different markets in Bangladesh. Users can browse products by category, compare market prices, view minimum, maximum, and average prices, and track daily price changes through a clean and user-friendly Bengali interface.

## 3. 🛠️ Technologies Used
- **Next.js 16:**	Building the application UI and rendering pages

- **Next.js App Router:**	Managing navigation, dynamic routes, layouts, and loading states

- **Tailwind CSS:**	Styling and responsive design

- **DaisyUI:**	Reusable UI components and theme-based styling

- **TypeScript:**	Type safety and maintainable code

- **Better Auth:**	Handling user authentication, sign-up, sign-in, and account management

 - **MongoDB:**	Storing user accounts and authentication-related data

- **Google OAuth:**	Enabling social sign-in with Google

- **GitHub OAuth:**	Enabling social sign-in with GitHub

- **React Hot Toast**	Success and error notifications

- **React Icons**	Icons throughout the application

## 4. ✨ 5 Key Features
**📊 Daily Product Prices** — View current available prices and daily price changes for essential products.

**🏪 Market-Wise Price Comparison** — Compare minimum, maximum, and average prices across different markets.

**🔎 Category-Based Browsing** — Explore products by category with an organized and responsive product grid.

**↕️ Interactive Price Sorting** — Sort products by price from low to high or high to low.

**🔐 Secure User Authentication** — Sign up, sign in, and authenticate using Better Auth, with Google and GitHub login options.

## 💻 5. How to Run the Project Locally

Follow these steps to run BazarDor on your local machine.

### Prerequisites

Make sure you have installed:

Node.js (a compatible version for your Next.js setup)

npm (included with Node.js) or another package manager

Git

A MongoDB database, either locally or through MongoDB Atlas

### Step 1: Clone the Repository

Open your terminal and run:

```
git clone https://github.com/badrulalambd/bazardor-pricetracking.git
```

### Step 2: Navigate to the Project Directory

cd bazardor-pricetracking

### Step 3: Install Dependencies

If the project uses npm:

npm install

### Step 4: Configure Environment Variables

Create a .env.local file in the root directory of the project and add the environment variables required by your application.

For example:

BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URL=your_mongodb_connection_string

Replace the example values with your actual configuration.

Important:

Configure your MongoDB connection string and Better Auth settings according to your implementation.

Set up Google OAuth and GitHub OAuth credentials in their respective developer consoles.

Add the OAuth client IDs and secrets using the exact environment variable names expected by your application.

Never commit .env.local or expose your authentication secrets in a public repository.

### Step 5: Start the Development Server

Run the following command:

npm run dev

### Step 6: Open the Application

Open your browser and visit:

http://localhost:3000
