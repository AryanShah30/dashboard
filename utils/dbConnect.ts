import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

const connect = async () => { // Change function declaration
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in environment variables");
  }

  if (cachedConnection && cachedConnection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return cachedConnection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGO_URI).then((connection) => {
      cachedConnection = connection.connection;
      console.log("MongoDB connected successfully");
      return cachedConnection;
    });

    cachedPromise.catch((err) => {
      console.error("MongoDB connection error: ", err);
      process.exit(1);
    });
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
};

export default connect; // Ensure it's a default export
