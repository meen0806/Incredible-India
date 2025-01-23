import { Travels } from "../models/TravelsModel.js";
import fs from "fs";
import path from "path";

export const getAllTravels = async (req, res) => {
  try {
    const { page, limit } = req.query; // Get page and limit from query parameters, defaulting to page 1 and limit 10

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const travels = await Travels.find({})
      .skip((options.page - 1) * options.limit) // Skip the previous pages
      .limit(options.limit); // Limit the number of results returned

    const totalTravels = await Travels.countDocuments(); // Total count of Travels

    res.status(200).json({
      travels,
      currentPage: options.page,
      totalPages: Math.ceil(totalTravels / options.limit),
      totalTravels,
    });
  } catch (error) {
    console.error("Error while fetching Travels", error);
    res.status(500).send("Server Error");
  }
};

export const getTravelsByCategoryId = async (req, res) => {
  const { categoryID } = req.params;
  const { page, limit } = req.query; // Get page and limit from query parameters, defaulting to page 1 and limit 10

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  try {
    const categories = await Travels.find({ categoryID })
      .skip((options.page - 1) * options.limit) // Skip the previous pages
      .limit(options.limit); // Limit the number of results returned

    const totalTravels = await Travels.countDocuments({ categoryID }); // Total count of destinations
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No Travels found for this category" });
    }

    res.status(200).json({
      categories,
      currentPage: options.page,
      totalPages: Math.ceil(totalTravels / options.limit),
      totalTravels,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTravel = async (req, res) => {
  const {
    name,
    description,
    state,
    bestTimeToVisit,
    idealDuration,
    category,
    categoryID,
    imageUrl,
  } = req.body;

  const basePath = "http://localhost:3001/public/assets/";

  let imageUrlArray = req.files
    ? req.files.map((file) => basePath.concat(file.filename))
    : [];

  if (imageUrl && typeof url === "string") {
    imageUrlArray = imageUrlArray.concat(url);
  }
  try {
    const newTravels = new Travels({
      name,
      description,
      imageUrl: imageUrlArray,
      state,
      bestTimeToVisit,
      idealDuration,
      category,
      categoryID,
    });

    const newData = await newTravels.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading Travels", error);
    res.status(500).send(error);
  }
};

export const updateTravels = async (req, res) => {
  const { id } = req.params;

  try {
    const travels = await Travels.findOne({ _id: id });

    if (!travels) {
      return res.status(404).send({ message: "Travels not found" });
    }

    travels.name = req.body.name || travels.name;
    travels.description = req.body.description || travels.description;
    travels.state = req.body.state || travels.state;
    travels.bestTimeToVisit =
      req.body.bestTimeToVisit || travels.bestTimeToVisit;
    travels.idealDuration = req.body.idealDuration || travels.idealDuration;
    travels.category = req.body.category || travels.category;
    travels.categoryID = req.body.categoryID || travels.categoryID;

    const basePath = "http://localhost:3001/public/assets/";

    let imageUrlArray = req.files
      ? req.files.map((file) => basePath.concat(file.filename))
      : [];

    if (imageUrlArray.length > 0) {
      experiences.imageUrl = imageUrlArray;
      experiences.imageUrl = imageUrlArray;
    }

    await travels.save();
    res.status(200).send(travels);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTravels = async (req, res) => {
  const { _id } = req.params;

  try {
    const travels = await Travels.findOneAndDelete({ _id });

    if (!travels) {
      return res.status(404).send({ message: "Travels not found" });
    }

    if (travels.imageUrl) {
      travels.imageUrl.forEach((url) => {
        const imagePath = path.join(process.cwd(), url);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting the Travels images:", err);
          }
        });
      });
    }

    res.status(200).send({ message: "Travels deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
