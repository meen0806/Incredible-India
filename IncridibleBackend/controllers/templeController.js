import { Temple } from "../models/TempleModel.js";
import fs from "fs";
import path from "path";
import { Temple1 } from "../models/ModelTemple1.js";

export const getAllTemples = async (req, res) => {
  // const { page = 1, limit = 10, cityId, stateId } = req.query;

  // const options = {
  //   page: parseInt(page),
  //   limit: parseInt(limit),
  // };
  const { cityId, stateId } = req.query;
  try {
    let query = {};
    if (stateId && cityId) {
      query = { stateId, cityId };
    } else if (stateId) {
      query = { stateId };
    }

    const temples = await Temple.find(query)
      // .skip((options.page - 1) * options.limit) 
      // .limit(options.limit);

    // const totalTemple = await Temple.countDocuments(query);

    // if (temples.length === 0 && totalTemple > 0) {
    //   return res.status(404).json({
    //     message: `No Temples found on page ${options.page}. Please try a previous page.`,
    //   });
    // }

    if (temples.length === 0) {
      return res
        .status(404)
        .json({ message: "No Temples found for the selected filters." });
    }

    res.status(200).json({
      temples,
      // currentPage: options.page,
      // totalPages: Math.ceil(totalTemple / options.limit),
      // totalTemple,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

export const createTemple = async (req, res) => {
  const {  stateId,cityId,city,state,title,location,day,startTime,endTime,description,nearTemple,isTime } =
  req.body;
  const basePath = "http://localhost:3001/public/assets/";
  const pictureName = req.file ? basePath.concat(req.file.filename) : "";

  try {
    let newTemple ={}
    if(isTime){
       newTemple = new Temple1({
        stateId,
        cityId,
        city,
        state,
        title,
        location,
        day,
        startTime,
        endTime,
        url: pictureName,
        description,
        nearTemple,
      });
    }else{
       newTemple = new Temple({
        stateId,
        cityId,
        city,
        title,
        location,
        url: pictureName,
        description,
      });
    }
    const newData = await newTemple.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading temple:", error);
    res.status(500).send({ message: "Error while uploading temple", error });
  }
};

export const updateTemple = async (req, res) => {
  const { id } = req.params;
  try {
    const temple = await Temple.findOne({ _id :id });
    const basePath = "http://localhost:3001/public/assets/";

    if (!temple) {
      return res.status(404).send({ message: "Temple not found" });
    }
    temple.stateId = req.body.stateId || temple.stateId;
    temple.cityId = req.body.cityId || temple.cityId;
    temple.title = req.body.title || temple.title;
    temple.location = req.body.location || temple.location;
    temple.state = req.body.state || temple.state;
    temple.description = req.body.description || temple.description;

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
    const temple = await Temple.findOneAndDelete({ _id : id });

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
