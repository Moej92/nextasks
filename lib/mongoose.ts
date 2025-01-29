import mongoose from 'mongoose';

let connectToDB: (() => Promise<void>) | null = null;

// Check if we are not in Edge runtime
if (process.env.NEXT_RUNTIME !== 'edge') {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is missing in environment variables');
  }

  let isConnected = false;

  connectToDB = async () => {
    if (isConnected) {
      console.log('MongoDB is already connected');
      return;
    }

    try {
      await mongoose.connect(uri, {
        dbName: 'nextasks',
      });
      isConnected = true;
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('MongoDB connection error');
    }
  };
}

export { connectToDB };

// async function connectToDB() {
//     if(cached.conn) {
//         return cached.conn;
//     }

//     if(!cached.promise) {
//         const options = {
//             bufferCommands: false
//         }

//         cached.promise = mongoose.connect(process.env.MONGO_URI, {
//             dbName: "nextasks"
//         }).then((mongoose) => mongoose);
//     }

//     cached.conn = await cached.promise;
//     return cached.conn
// }


