import mongoose from "mongoose";
import { envConfig } from "./config.js";
const dataBaseUrl = envConfig.dataBaseUrl;
const connectToDb = async () => {
  try {
    await mongoose.connect(dataBaseUrl);
    console.log("dataBase connected successfully");
  } catch (error) {
    console.log("databse Connection failed");
    throw new Error(`database connection failed ${error}`);
  }
};

export { connectToDb };
