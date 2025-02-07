import mongoose, { Mongoose } from 'mongoose';

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const cached: Cached = {
  conn: null,
  promise: null,
};

async function connectToDB() {

  if (cached.conn) {
    // If the connection already exists, reuse it
    console.log('Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    // If no connection, create a new connection
    const options = {
      bufferCommands: false, // Disable buffer commands to avoid retries on failure
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI as string, {
      dbName: 'nextasks',
      ...options,
    }).then((mongooseInstance) => {
      console.log('Connected to MongoDB successfully');
      return mongooseInstance;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('MongoDB connection error');
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDB;


