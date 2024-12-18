import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const db =
  "mongodb+srv://raoufbouk:raoufking7@cluster0.0q4iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use("/", (req, res) => {
  res.send("Hello World");
});
app.use(cors());

mongoose.connect(db).then(() => {
  console.log("db connected");
  app.listen(3000, () => {
    console.log("server is running at port 3000");
  });
});