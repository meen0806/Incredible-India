import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  detail: { type: String, required: true },
});

const ExploreMoreSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  images: {
    type: [ImageSchema],
  },
  // description: { type: String, required: true },
});

export const ExploreMore = mongoose.model("ExploreMore", ExploreMoreSchema);
