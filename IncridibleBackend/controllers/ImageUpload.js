import { ImageUpload } from "../models/ImageUpload.js";

export const register = async (req, res) => {
  try {
    const { name, email, rating, location } = req.body;

    const pictureName = req.file ? req.file.filename : "";
    const newUser = new ImageUpload({
      name,
      email,
      rating,
      picture: pictureName,
      location,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error while uploading images:", error);
    res.status(500).json({ error: error.message });
  }
};
