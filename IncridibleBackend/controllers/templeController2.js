import { Temple1 } from "../models/ModelTemple1.js";
import fs from "fs";
import path from "path";
// import slugify from "slugify";

export const getTemples = async (req, res) => {
  try {
    const temples = await Temple1.find();
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getTempleById = async (req, res) => {
//   try {
//     const temple = await Temple1.findById(req.params.cityId);
//     if (!temple) return res.status(404).json({ message: "Temple not found" });
//     res.status(200).json(temple);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getTemplesByCityId = async (req, res) => {
  try {
    const temples = await Temple1.find({ cityId: req.params.cityId });
    if (temples.length === 0)
      return res
        .status(404)
        .json({ message: "No temples found for this city" });
    res.status(200).json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTemple = async (req, res) => {
  const {
    id,
    stateId,
    cityId,
    city,
    title,
    location,
    day,
    Time,
    description1,
    description2,
    nearTemple,
    state,
  } = req.body;
  const basePath = "http://localhost:3001/public/assets/";
  const pictureName = req.file ? basePath.concat(req.file.filename) : "";
  try {
    const slug = slugify(title, { lower: true });
    const newTemple = new Temple1({
      id,
      stateId,
      cityId,
      city,
      title,
      location,
      day,
      Time,
      url: pictureName,
      description1,
      description2,
      nearTemple,
      state,
      slug,
    });

    const newData = await newTemple.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("error while uploading temples");
    res.status(500).send(error);
  }
};

export const updateTemple = async (req, res) => {
  const { id } = req.params;

  try {
    const temple = await Temple1.findOne({ _id: id });
    const basePath = "http://localhost:3001/public/assets/";

    if (!temple) {
      return res.status(404).send({ message: "Temple not found" });
    }

    temple.stateId = req.body.stateId || temple.stateId;
    temple.cityId = req.body.cityId || temple.cityId;
    temple.city = req.body.city || temple.city;
    temple.title = req.body.title || temple.title;
    temple.location = req.body.location || temple.location;
    temple.day = req.body.day || temple.day;
    // temple.Time = req.body.Time || temple.Time;
    temple.endTime = req.body.endTime || temple.endTime;
    temple.startTime = req.body.startTime || temple.startTime;
    temple.url = req.body.url || temple.url;
    temple.description = req.body.description || temple.description;
    // temple.description1 = req.body.description1 || temple.description1;
    // temple.description2 = req.body.description2 || temple.description2;
    temple.nearTemple = req.body.nearTemple || temple.nearTemple;

    if (req.file) {
      temple.url = basePath.concat(req.file.filename);
    }

    await temple.save();
    res.status(200).send(temple);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteTemple = async (req, res) => {
  const { id } = req.params;

  try {
    const temple = await Temple1.findOneAndDelete({ _id: id });

    if (!temple) {
      return res.status(404).send({ message: "Temple not found" });
    }

    if (temple.url) {
      const imagePath = path.join(process.cwd(), temple.url);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting the image:", err);
        }
      });
    }

    res.status(200).send({ message: "Temple deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
