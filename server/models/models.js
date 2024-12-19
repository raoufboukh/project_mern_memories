import mongoose from "mongoose";

const schema = new mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tags: String,
  like: Number,
  image: String,
});

const memories = mongoose.model("memories", schema);

export default memories;
