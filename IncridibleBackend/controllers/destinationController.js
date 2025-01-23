import { Destination } from "../models/DestinationModel.js";
import fs from "fs";
import path from "path";

export const getAllDestinations = async (req, res) => {
  try {
    const { page, limit } = req.query; 

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
  const destinations = await Destination.find({})
      .skip((options.page - 1) * options.limit) 
      .limit(options.limit); 

    const totalDestinations = await Destination.countDocuments(); 

    res.status(200).json({
      destinations,
      currentPage: options.page,
      totalPages: Math.ceil(totalDestinations / options.limit),
      totalDestinations,
    });

  } catch (error) {
    console.error("Error while fetching destinations", error);
    res.status(500).send("Server Error");
  }
};

export const getDestinationsByCategoryId = async (req, res) => {
  const { categoryID } = req.params;
  const { page, limit } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  try {
    const categories = await Destination.find({ categoryID })
      .skip((options.page - 1) * options.limit) 
      .limit(options.limit); 

    const totalDestinations = await Destination.countDocuments({ categoryID }); 
    if (categories.length === 0) {
      return res
        .status(404)
        .json({ message: "No Destinations found for this category" });
    }

    res.status(200).json({
      categories,
      currentPage: options.page,
      totalPages: Math.ceil(totalDestinations / options.limit),
      totalDestinations,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDestination = async (req, res) => {
  const {
    name,
    categoryID,
    category,
    bestTimeToVisit,
    idealDuration,
    state,
    description,
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
    const newDestination = new Destination({
      name,
      description,
      imageUrl: imageUrlArray,
      state,
      bestTimeToVisit,
      idealDuration,
      category,
      categoryID,
    });

    const newData = await newDestination.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading Destination", error);
    res.status(500).send(error);
  }
};

export const updateDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await Destination.findOne({ _id: id });

    if (!destination) {
      return res.status(404).send({ message: "Destination not found" });
    }

    destination.name = req.body.name || destination.name;
    destination.description = req.body.description || destination.description;
    destination.state = req.body.state || destination.state;
    destination.bestTimeToVisit =
    req.body.bestTimeToVisit || destination.bestTimeToVisit;
    destination.idealDuration =
    req.body.idealDuration || destination.idealDuration;
    destination.category = req.body.category || destination.category;
    destination.categoryID = req.body.categoryID || destination.categoryID;
    destination.howToReach = req.body.howToReach || destination.howToReach;

    const basePath = "http://localhost:3001/public/assets/";

    let imageUrlArray = req.files
      ? req.files.map((file) => basePath.concat(file.filename))
      : [];

    if (imageUrlArray.length > 0) {
      destination.imageUrl = imageUrlArray;
      destination.imageUrl = imageUrlArray;
    }

    await destination.save();
    res.status(200).send(destination);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteDestination = async (req, res) => {
  const { _id } = req.params;

  try {
    const destination = await Destination.findOneAndDelete({ _id });

    if (!destination) {
      return res.status(404).send({ message: "Destination not found" });
    }

    if (destination.imageUrl) {
      destination.imageUrl.forEach((url) => {
        const imagePath = path.join(process.cwd(), url);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting the destination images:", err);
          }
        });
      });
    }

    res.status(200).send({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
