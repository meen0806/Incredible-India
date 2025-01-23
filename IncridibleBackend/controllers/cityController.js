import { City } from "../models/city.js";
// import { handleServerError, handleValidationError } from "../utills/utills.js";

export const fetchCities = async (req, res) => {
  try {
    const cities = await City.find()
    // .populate('touristSpots')
    // .populate('state');

    res.status(200).json({
        status : 200,
        success : true,
        data : cities,
        message : "Cities Fetched!"
    });
  } catch (error) {
    await handleServerError(error,"Error While Fetching Cities!",res);
  }
};

export const fetchCityById = async (req, res) => {
    try {

      const { id } = req.params;
      if(!id){
        return res.status(400).json({
            status : 400,
            success : false,
            message : "City Id is required!"
        })
      }
      const cities = await City.findById({ _id : id })
      .populate('touristSpots')
      .populate('state');  
  
      res.status(200).json({
          status : 200,
          success : true,
          data : cities,
          message : "Cities Fetched!"
      });
    } catch (error) {
      await handleServerError(error,"Error While Fetching city By ID!",res);
    }
  };
  

export const createCity = async (req,res) =>{
    try {

      await handleValidationError(req, res);

       const { name, description, imageUrl, touristSpots, state, bestTimeToVisit } = req.body;

       const newCity = await City({
        name,
        description,
        imageUrl,
        touristSpots,
        state,
        bestTimeToVisit
       });

       await newCity.save();

       res.status(200).json({
          ststua : 200,
          success : true,
          data : newCity,
          message : "City Created Successfully!"
       });
    } catch (error) {
        console.log("error :",error)
        await handleServerError(error,"Error While Creating City!",res);
    }
}
