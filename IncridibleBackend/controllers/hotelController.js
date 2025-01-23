import { Hotel } from "../models/HotelModel.js";
import fs from "fs";
import path from "path";

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHotelByCityId = async (req, res) => {
  try {
    const hotels = await Hotel.find({ cityId: req.params.cityId });
    if (hotels.length === 0)
      return res.status(404).json({ message: "No Hotels found for this city" });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHotel = async (req, res) => {
  const {
    name,
    cityId,
    city,
    location,
    description,
    website,
    rating,
  } = req.body;
  const basePath = "http://localhost:3001/public/assets/";

  const urls = req.files
    ? req.files.map((file) => basePath.concat(file.filename))
    : [];

  try {
    const newHotel = new Hotel({
      name,
      cityId,
      city,
      location,
      description,
      url: urls,
      website,
      rating,
    });
    const newData = await newHotel.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading Hotels", error);
    res.status(500).send(error);
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ id });
    const basePath = "http://localhost:3001/public/assets/";

    if (!hotel) {
      return res.status(404).send({ message: "Hotels not found" });
    }

    hotel.name = req.body.name || hotel.name;
    hotel.cityId = req.body.cityId || hotel.cityId;
    hotel.city = req.body.city || hotel.city;
    hotel.location = req.body.location || hotel.location;
    hotel.description = req.body.description || hotel.description;
    hotel.state = req.body.state || hotel.state;
    hotel.website = req.body.website || hotel.website;
    hotel.rating = req.body.rating || hotel.rating;

    if (req.file) {
      hotel.imageUrl = basePath.concat(req.file.filename);
    }

    await hotel.save();
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOneAndDelete({ id });

    if (!hotel) {
      return res.status(404).send({ message: "Hotels not found" });
    }

    if (hotel.imageUrl) {
      const imagePath = path.join(process.cwd(), hotel.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting the hotels:", err);
        }
      });
    }

    res.status(200).send({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
