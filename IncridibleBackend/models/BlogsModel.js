import mongoose from "mongoose";

// const descriptionSchema = new mongoose.Schema({
//   descriptionTitle: { type: String, required: false },
//   descriptionContent: { type: String, required: false }
// });

const blogSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  url: { type: String, required: true },
  titleContent: { type: String, required: true },
  description: { type: String, required: true },
});

export const Blog = mongoose.model("Blog", blogSchema);

