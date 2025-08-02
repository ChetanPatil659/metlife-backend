# PNB MetLife Backend

A Node.js Express server with MongoDB database for the PNB MetLife application.

## Features

- Express.js REST API
- MongoDB with Mongoose ODM
- JWT Authentication
- Input validation
- Error handling
- CORS support
- Environment configuration

## Project Structure

```
pnb-metlife-backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── authController.js    # Authentication business logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── validation.js       # Request validation
├── models/
│   └── User.js             # User model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   └── api.js              # General API routes
├── utils/
│   └── logger.js           # Logging utility
├── index.js                # Main server file
├── package.json
└── env.example             # Environment variables example
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp env.example .env
   ```

4. Configure environment variables in `.env` file

## Running the Server

### Development
```bash
npm start
```

### Production
```bash
NODE_ENV=production npm start
```

## API Endpoints

### Authentication
- `GET /api/auth/login` - Login page
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### API Info
- `GET /api` - API information
- `GET /api/status` - API status
- `GET /api/config` - API configuration
- `GET /health` - Health check

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `CORS_ORIGIN` - CORS allowed origin

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `.env` file
3. The database will be created automatically on first connection

## Development

### Adding New Routes
1. Create route file in `routes/` directory
2. Import in `index.js`
3. Add middleware if needed

### Adding New Models
1. Create model file in `models/` directory
2. Follow Mongoose schema pattern
3. Add validation and indexes as needed

### Adding New Controllers
1. Create controller file in `controllers/` directory
2. Implement business logic
3. Import in route files

## TODO

- [ ] Implement actual authentication with JWT
- [ ] Add password hashing with bcrypt
- [ ] Set up database connection
- [ ] Add more comprehensive error handling
- [ ] Add request rate limiting
- [ ] Add API documentation with Swagger
- [ ] Add unit tests
- [ ] Add integration tests

## License

ISC 