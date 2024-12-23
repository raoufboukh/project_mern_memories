import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/router.js";
import dotenv from "dotenv";
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use("/", router);
mongoose.connect(process.env.CONNECTION_URL).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("server is running at port 3000");
  });
});
