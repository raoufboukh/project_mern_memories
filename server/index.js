import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", router);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("DB connection error:", error.message));

export default app;
