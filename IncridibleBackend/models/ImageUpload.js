import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    rating: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    location: String,
  },
  {
    timestamps: true,
  }
);
export const ImageUpload = mongoose.model("ImageUpload", UserSchema);
