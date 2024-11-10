# Authentication App

This project is an authentication app with user registration, login, and profile management features. It uses **React** for the frontend, **Node.js/Express.js** for the backend, and **MongoDB** for database management.

## Features

- User sign up and login
- JWT-based authentication
- User profile management (update username and email)
- Protected routes for authenticated users
- Secure password storage with hashing

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/)
- **npm** or **yarn**: (Comes with Node.js)
- **MongoDB**: [Download here](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/authentication-app.git
   cd authentication-app
   ```

2. Install dependencies for both frontend and backend:

   **For frontend:**

   ```bash
   cd client
   npm install
   ```

   **For backend:**

   ```bash
   cd server
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the `server` folder with the following details:
   ```bash
   MONGO_URI="your-mongodb-connection-string"
   JWT_SECRET="your-secret-key"
   ```

### Starting the Project

**Frontend (React):**

```bash
cd client
npm start
```

**Backend (Node.js/Express.js):**

```bash
cd server
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- **`POST /api/auth/signup`** - Create a new user.
- **`POST /api/auth/login`** - Log in an existing user.
- **`GET /api/user/profile`** - Get the authenticated user’s profile.
- **`PUT /api/user/update`** - Update user profile information.

## Folder Structure

```bash
.
├── client/               # React frontend
├── server/               # Node.js backend
│   ├── controllers/      # API controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── app.js            # Express app setup
└── README.md             # Project documentation
```

## Contributing

Feel free to open issues or submit pull requests for new features or bug fixes.

---

### Commands for starting the project:

- **Frontend**: `npm start` (in the `client` directory)
- **Backend**: `npm run dev` (in the `server` directory)

```bash
# Start Frontend
cd client
npm start

# Start Backend
cd server
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
