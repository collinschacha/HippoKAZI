import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
export const dynamic = "force-dynamic";
let cached = (global as any).mongoose || { conn: null, promise: null };
export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "hippokazi",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
