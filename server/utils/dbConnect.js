import mongoose from "mongoose";
import config from "config";

async function connect() {
  try {
    let dbURL = config.get("DB_URL");
    let connection = await mongoose.connect(dbURL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
connect();
