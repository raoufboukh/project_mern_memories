import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "https://project-mern-memories-orpin.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/", router);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error("DB connection error:", error.message));

export default app;
