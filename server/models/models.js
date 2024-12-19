import mongoose from "mongoose";

const schema = new mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tags: String,
  like: {
    type: [String],
    default: 0,
  },
  image: String,
});

const memories = mongoose.model("memories", schema);

export default memories;
