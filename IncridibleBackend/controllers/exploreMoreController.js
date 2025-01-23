import { ExploreMore } from "../models/ExploreMoreModel.js";

// export const createExploreMore = async (req, res) => {
//   const { title, city, state, image } = req.body;

//   const basePath = "http://localhost:3001/public/assets/";

//   // Initialize the images array
//   let formattedImages = [];

//   // Handle file upload
//   let imageUrlArray = req.file ? basePath.concat(req.file.filename) : "";

//   // Process the image from the request body
//   if (image) {
//     formattedImages.push({
//       url: imageUrlArray || image?.url, // Prefer uploaded file if exists, otherwise take from the request body
//       name: image?.name || "Default Name", // Ensure a default name exists if name is missing
//       detail: image?.detail || "Default Detail", // Ensure a default detail exists if detail is missing
//     });
//   }

//   // Create a new ExploreMore instance
//   const newExploreMore = new ExploreMore({
//     title,
//     city,
//     state,
//     images: formattedImages, // Assign the formatted image array to images
//   });

//   try {
//     const savedExploreMore = await newExploreMore.save();
//     res.status(201).json(savedExploreMore); // Successfully created
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const createExploreMore = async (req, res) => {
  const { id } = req.params;
  const image = JSON.parse(req.body.image);

  const basePath = "http://localhost:3001/public/assets/";

  let imageUrlArray = req.file ? basePath.concat(req.file.filename) : "";

  try {
    const exploreMore = await ExploreMore.findById({ _id: id });

    if (!exploreMore) {
      return res.status(404).json({ message: "Data not found" });
    }

    const newImage = {
      url: imageUrlArray || image?.url,
      name: image?.name,
      detail: image?.detail,
    };

    exploreMore.images.push(newImage);

    await exploreMore.save();

    res.status(200).json(exploreMore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getExploreMore = async (req, res) => {
  try {
    const exploreMoreEntries = await ExploreMore.find();
    res.status(200).json(exploreMoreEntries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExploreMoreById = async (req, res) => {
  try {
    const exploreMoreEntry = await ExploreMore.findById(req.params.id);
    if (!exploreMoreEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(200).json(exploreMoreEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// if (imageId && image) {
//   const imageToUpdate = data?.images?.find((img) => img._id.toString() === imageId);
//   if (imageToUpdate) {
//     imageToUpdate.url = image.url || imageToUpdate.url;
//     imageToUpdate.name = image.name || imageToUpdate.name;
//     imageToUpdate.detail = image.detail || imageToUpdate.detail;
//   } else {
//     return res.status(404).send({ message: "Image not found" });
//   }
//   const imageIndex = data.images.findIndex((img) => img._id.toString() === imageId);

//   data.images[imageIndex] = imageToUpdate;

//   } else {
//     return res.status(404).send({ message: "Image not found" });
//   }
export const updateExploreMore = async (req, res) => {
  const { id } = req.params; // Entry ID
  const image = JSON.parse(req.body.image);
  const { title, city, state, imageId } = req.body;

  const basePath = "http://localhost:3001/public/assets/";

  try {
    const data = await ExploreMore.findById({ _id: id });

    if (!data) {
      return res.status(404).send({ message: "Data not found" });
    }

    data.title = title || data.title;
    data.city = city || data.city;
    data.state = state || data.state;

    if (imageId && image) {
      const imageIndex = data?.images?.findIndex(
        (img) => img._id.toString() === imageId
      );

      if (imageIndex !== -1) {
        data.images[imageIndex] = {
          url: typeof image?.url === "string" ? image.url : data.images[imageIndex].url,
          name: image?.name || data?.images[imageIndex].name,
          detail: image?.detail || data?.images[imageIndex].detail,
        };
      } else {
        return res.status(404).send({ message: "Image not found" });
      }
    }

    if (req.file) {
      const imageUrl = basePath.concat(req.file.filename);
      if (data.images.length > 0) {
        data.images[0].url = imageUrl; // Update first image
      }
    }

    await data.save();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteExploreMore = async (req, res) => {
  const { id } = req.params;
  try {
    const exploreMoreEntry = await ExploreMore.findByIdAndDelete({ _id: id });
    if (!exploreMoreEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInnerExploreMoreData = async (req, res) => {
  const { id } = req.params;
  const { imageName } = req.body;

  try {
    const exploreMoreEntry = await ExploreMore.findByIdAndUpdate(
      id,
      { $pull: { images: { name: imageName } } },
      { new: true }
    );

    if (!exploreMoreEntry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.status(200).json(exploreMoreEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
