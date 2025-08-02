import mongoose from 'mongoose';

/**
 * Database connection configuration with enhanced error handling
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Check if MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      console.warn('⚠️  MONGODB_URI not found in environment variables');
      console.warn('📝 Please create a .env file with your MongoDB connection string');
      console.warn('📋 Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database');
      console.warn('🔄 Falling back to local MongoDB...');
    }

    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pnb-metlife';
    
    console.log('🔌 Attempting to connect to MongoDB...');
    console.log(`📍 URI: ${mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`); // Hide credentials in logs
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🛑 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during graceful shutdown:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Provide specific guidance based on error type
    if (error.code === 8000) {
      console.error('🔐 Authentication failed. Please check your MongoDB credentials.');
      console.error('📝 Verify your username, password, and database name in MONGODB_URI');
    } else if (error.code === 'ENOTFOUND') {
      console.error('🌐 Network error. Please check your internet connection and MongoDB Atlas cluster URL.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🚫 Connection refused. Please check if MongoDB is running locally.');
    }
    
    console.log('⚠️  Server will start without database connection');
    console.log('💡 To fix this issue:');
    console.log('   1. Create a .env file in the project root');
    console.log('   2. Add your MongoDB connection string: MONGODB_URI=your_connection_string');
    console.log('   3. Restart the server');
    
    // Don't exit process, just log the error
  }
};

export default connectDB; 