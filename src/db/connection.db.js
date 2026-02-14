import mongoose from "mongoose";
import { envVars } from "../../config/index.js";
import { UserModel, OtpModel } from "./index.js";

export default async function authenticateDB() {
  try {
    await mongoose.connect(envVars.dbUrl);
    console.log("Connected successfully to DB 🟢");

    await UserModel.syncIndexes();
    await OtpModel.syncIndexes();
  } catch (error) {
    console.error("DB error ❌ : ", error.message);
  }
}
