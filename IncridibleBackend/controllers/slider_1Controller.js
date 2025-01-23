import { Slider1 } from "../models/SliderModel.js";

export const getAllSlider1Data = async (req, res) => {
  try {
    const temples = await Slider1.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSlider1DataById = async (req, res) => {
  try {
    const temple = await Slider1.findById(req.params.id);
    if (temple) {
      res.json(temple);
    } else {
      res.status(404).json({ message: "Temple not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AddSlider1Data = async (req, res) => {
  const { title, city, state, url, description } = req.body;
  const basePath = "http://localhost:3001/public/assets/";
  let imageUrlArray;
  imageUrlArray = req.file ? basePath.concat(req.file.filename) : "";
  if (url && typeof url === "string") {
    imageUrlArray = imageUrlArray.concat(url);
  }
  const temple = new Slider1({
    title,
    city,
    state,
    url: imageUrlArray,
    description,
  });
  try {
    const newTemple = await temple.save();
    res.status(201).json(newTemple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSlider1Data = async (req, res) => {
  const { id } = req.params;
  try {
    const temple = await Slider1.findOne({ _id: id });
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

export const deleteSlider1Data = async (req, res) => {
  const { id } = req.params;
  try {
    const temple = await Slider1.findByIdAndDelete({ _id: id });
    if (temple) {
      res.json({ message: "Temple deleted successfully" });
    } else {
      res.status(404).json({ message: "Temple not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
