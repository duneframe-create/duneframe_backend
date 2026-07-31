const mongoose = require('mongoose');

let connecting = null;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studio-site';

  // Reuse connection across Vercel warm invocations
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connecting) {
    connecting = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log('MongoDB connected');
        return conn;
      })
      .catch((err) => {
        connecting = null;
        throw err;
      });
  }

  return connecting;
}

module.exports = connectDB;
