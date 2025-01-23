import { Experiences } from "../models/ExperiencesModel.js";
import fs from "fs";
import path from "path";

export const getAllExperiences = async (req, res) => {
  try {
    const { page, limit } = req.query; // Get page and limit from query parameters, defaulting to page 1 and limit 10

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const experiences = await Experiences.find({})
      .skip((options.page - 1) * options.limit) // Skip the previous pages
      .limit(options.limit); // Limit the number of results returned

    const totalExperiences = await Experiences.countDocuments(); // Total count of Experiences

    res.status(200).json({
      experiences,
      currentPage: options.page,
      totalPages: Math.ceil(totalExperiences / options.limit),
      totalExperiences,
    });
  } catch (error) {
    console.error("Error while fetching Experiences", error);
    res.status(500).send("Server Error");
  }
};

export const getExperiencesByCategoryId = async (req, res) => {
  const { categoryID } = req.params;
  const { page, limit } = req.query; // Get page and limit from query parameters, defaulting to page 1 and limit 10

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  try {
    const categories = await Experiences.find({ categoryID })
      .skip((options.page - 1) * options.limit) // Skip the previous pages
      .limit(options.limit); // Limit the number of results returned

    const totalExperiences = await Experiences.countDocuments({ categoryID }); // Total count of destinations
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No Experiences found for this category" });
    }

    res.status(200).json({
      categories,
      currentPage: options.page,
      totalPages: Math.ceil(totalExperiences / options.limit),
      totalExperiences,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExperiences = async (req, res) => {
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
    const newExperiences = new Experiences({
      name,
      description,
      imageUrl: imageUrlArray,
      state,
      bestTimeToVisit,
      idealDuration,
      category,
      categoryID,
    });

    const newData = await newExperiences.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading Experiences", error);
    res.status(500).send(error);
  }
};

export const updateExperiences = async (req, res) => {
  const { id } = req.params;

  try {
    const experiences = await Experiences.findOne({ _id: id });

    if (!experiences) {
      return res.status(404).send({ message: "Experiences not found" });
    }

    experiences.name = req.body.name || experiences.name;
    experiences.description = req.body.description || experiences.description;
    experiences.state = req.body.state || experiences.state;
    experiences.bestTimeToVisit =
      req.body.bestTimeToVisit || experiences.bestTimeToVisit;
    experiences.idealDuration =
      req.body.idealDuration || experiences.idealDuration;
    experiences.category = req.body.category || experiences.category;
    experiences.categoryID = req.body.categoryID || experiences.categoryID;
    experiences.howToReach = req.body.howToReach || experiences.howToReach;

    const basePath = "http://localhost:3001/public/assets/";

    let imageUrlArray = req.files
      ? req.files.map((file) => basePath.concat(file.filename))
      : [];

    if (imageUrlArray.length > 0) {
      experiences.imageUrl = imageUrlArray;
      experiences.imageUrl = imageUrlArray;
    }

    await experiences.save();
    res.status(200).send(experiences);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteExperiences = async (req, res) => {
  const { _id } = req.params;

  try {
    const experiences = await Experiences.findOneAndDelete({ _id });

    if (!experiences) {
      return res.status(404).send({ message: "Experiences not found" });
    }

    if (experiences.imageUrl) {
      experiences.imageUrl.forEach((url) => {
        const imagePath = path.join(process.cwd(), url);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting the experiences images:", err);
          }
        });
      });
    }

    res.status(200).send({ message: "Experiences deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
