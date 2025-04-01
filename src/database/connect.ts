import mongoose from "mongoose";

import dotenv from "dotenv";
import { databaseEnv } from "../config";
dotenv.config();

const dbURI = databaseEnv.DB_URL;

export const connectDb = async () => {
    try {
        await mongoose.connect(dbURI);

        console.log("Database is connected");
    } catch (err) {
        console.log(err);
    }
};
