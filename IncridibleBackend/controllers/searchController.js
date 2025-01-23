import { Search } from "../models/SearchModel.js";
export const  searchAll = async (req, res) => {
  try {
    const cities = await Search.find()
    

    res.status(200).json({
        status : 200,
        success : true,
        data : cities,
        message : " ALL states Data Fetched sucessfully.."
    });
  } catch (error) {
    await handleServerError(error,"Error While Fetching Cities",res);
  }
};



export const searchByname = async (req, res) => {
  const { query } = req.query; 

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const searchResults = [];

    const searches = await Search.find({ 
      $or: [
        { stateName: new RegExp(query, 'i') }, 
        { "cities.cityName": new RegExp(query, 'i') },
        { "cities.placesToVisit.placeName": new RegExp(query, 'i') },
        { "cities.historicalPlaces.placeName": new RegExp(query, 'i') }
      ]
    }); 
  searches.forEach(search => {
      
      if (search.stateName.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          id: search.stateId,
          name: search.stateName,
          type: "State",
          stateName: search.stateName
        });
      }

      
      search.cities.forEach(city => {
        
        if (city.cityName.toLowerCase().includes(query.toLowerCase())) {
          searchResults.push({
            id: city.cityId,
            name: city.cityName,
            type: "City",
            cityName: city.cityName,
            stateName: search.stateName
          });
        }

        
        city.placesToVisit.forEach(place => {
          if (place.placeName.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
              id: place.placeId,
              name: place.placeName,
              type: "Place",
              cityName: city.cityName,
              stateName: search.stateName
            });
          }
        });

        
        city.historicalPlaces.forEach(place => {
          if (place.placeName.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
              id: place.placeId,
              name: place.placeName,
              type: "Place",
              cityName:city.cityName,
              stateName: search.stateName
            });
          }
        });
      });
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error while searching:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const searchById = async (req, res) => {
  try {
    

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Please provide an ID to search" });
    }

    
    const state = await Search.findOne({ stateId: id });
    if (state) {
      return res.status(200).json({ type: "state", data: state });
    }

    
    const stateWithCity = await Search.findOne({ "cities.cityId": id }, { "cities.$": 1 });
    if (stateWithCity && stateWithCity.cities.length > 0) {
      return res.status(200).json({ type: "city", data: stateWithCity.cities[0], status:200});
    }

    
    const placeMatch = await Search.findOne({
      $or: [
        { "cities.placesToVisit.placeId": id },
        { "cities.historicalPlaces.placeId": id },
      ],
    });

    if (placeMatch) {
      let matchedPlace = null;
      for (const city of placeMatch.cities) {
        matchedPlace =
          city.placesToVisit.find((place) => place.placeId === id) ||
          city.historicalPlaces.find((place) => place.placeId === id);
        if (matchedPlace) break;
      }

      if (matchedPlace) {
        return res.status(200).json({ type: "place", data: matchedPlace });
      }
    }

    
    return res.status(404).json({ message: "ID not found" });

  } catch (error) {
    console.error("Error in searchById:", error);
    return res.status(500).json({ error: "Internal Server Error" });
    
  }
};


export const searchTest = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Please provide an ID to search" });
    }

    
    const state = await Search.findOne({ stateId: id });
    if (state) {
      const exploreMoreStates = await Search.find({ stateId: { $ne: id } })
        .select("stateName stateId imageUrls stateDescription cities");

      const updatedExploreMoreStates = exploreMoreStates.map((stateItem) => {
        let selectedCity = null;
        let selectedImage = null;
        let selectedDestination = null;

        if (stateItem.cities && stateItem.cities.length > 0) {
          const popularCity = stateItem.cities.find(city => city.popularCity === "true");

          if (popularCity){
            selectedCity = popularCity;

            const popularDestination = popularCity.placesToVisit?.find(
              place => place.popularDestination === "true"
            );

            if (popularDestination && popularDestination.imageUrls?.length > 0) {
              selectedImage = popularDestination.imageUrls[0];
              selectedDestination = popularDestination.placeName;
            } else if (popularCity.placesToVisit?.[0]?.imageUrls?.length > 0) {
              selectedImage = popularCity.placesToVisit[0].imageUrls[0];
              selectedDestination = popularCity.placesToVisit[0].placeName;
            }
          }
        }

        if (!selectedImage && stateItem.imageUrls?.length > 0) {
          selectedImage = stateItem.imageUrls[0];
        }

        return {
          stateId: stateItem.stateId,
          stateName: stateItem.stateName,
          stateDescription: stateItem.stateDescription,
          selectedCityName: selectedCity?.cityName || null,
          selectedDestinationName: selectedDestination || null,
          selectedImage: selectedImage || null,
        };
      });

      return res.status(200).json({
        type: "state",
        data: state,
        exploreMoreStates: updatedExploreMoreStates,
      });
    }

    // Check if the ID matches a city
    const stateWithCity = await Search.findOne(
      { "cities.cityId": id },
      { "cities.$": 1 }
    );

    if (stateWithCity && stateWithCity.cities.length > 0) {
      const stateId = stateWithCity._id;

      const sameStateCities = await Search.findOne(
        { _id: stateId },
        { cities: 1 }
      );

      const exploreMoreCities = sameStateCities.cities.filter(city => city.cityId !== id);

      return res.status(200).json({
        type: "city",
        data: stateWithCity.cities[0],
        exploreMoreCities,
      });
    }

  
    const placeMatch = await Search.findOne({
      $or: [
        { "cities.placesToVisit.placeId": id },
        { "cities.historicalPlaces.placeId": id },
      ],
    });

    if (placeMatch) {
      let matchedPlace = null;
      let cityWithPlaces = null;

      for (const city of placeMatch.cities) {
        matchedPlace =
          city.placesToVisit.find((place) => place.placeId === id) ||
          city.historicalPlaces.find((place) => place.placeId === id);

        if (matchedPlace) {
          cityWithPlaces = city;
          break;
        }
      }

      if (matchedPlace && cityWithPlaces) {
        const exploreMorePlaces = [
          ...cityWithPlaces.placesToVisit.filter((place) => place.placeId !== id),
          ...cityWithPlaces.historicalPlaces.filter((place) => place.placeId !== id),
        ];

        // console.log(cityWithPlaces.cityName);
        // console.log(cityWithPlaces.cityName);

        return res.status(200).json({
          type: "place",
          data: matchedPlace,
          exploreMorePlaces,
          cityName: cityWithPlaces.cityName,
          stateName: placeMatch.stateName,
          
        });
      }
    }
    return res.status(404).json({ message: "ID not found" });

  } catch (error) {
    console.error("Error in searchTest:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





// export const searchBySlug = async (req, res) => {
//   try {
//     const  slug  = req.params[0]; 
//     console.log("slug received", slug);
//     const slugParts = slug.split('/');

//     let result;

//     if (slugParts.length === 1) {
//       // Search by state
//       const state = await Search.findOne({ stateName: new RegExp(slugParts[0], 'i') });
//       if (state) {
//         result = { type: "state", data: state };
//       }
//     } else if (slugParts.length === 2) {
//       // Search by city in a specific state
//       const [stateName, cityName] = slugParts;
//       const state = await Search.findOne(
//         { 
//           stateName: new RegExp(stateName, 'i'),
//           "cities.cityName": new RegExp(cityName, 'i')
//         },
//         { "cities.$": 1 }
//       );

//       if (state && state.cities.length > 0) {
//         result = { type: "city", data: state.cities[0], stateName: state.stateName };
//       }
//     } else if (slugParts.length === 3) {
//       // Search by place in a specific city and state
//       const [stateName, cityName, placeName] = slugParts;
//       const state = await Search.findOne(
//         { 
//           stateName: new RegExp(stateName, 'i'),
//           "cities.cityName": new RegExp(cityName, 'i')
//         }
//       );

//       if (state) {
//         const city = state.cities.find(city => city.cityName.toLowerCase() === cityName.toLowerCase());
//         if (city) {
//           const place = [
//             ...city.placesToVisit,
//             ...city.historicalPlaces
//           ].find(place => place.placeName.toLowerCase() === placeName.toLowerCase());

//           if (place) {
//             result = {
//               type: "place",
//               data: place,
//               cityName: city.cityName,
//               stateName: state.stateName
//             };
//           }
//         }
//       }
//     }

//     if (result) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(404).json({ error: 'No matching data found for the provided slug' });
//     }
//   } catch (error) {
//     console.error("Error in searchBySlug:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };





export const searchBySlug = async (req, res) => {
  try {
    const slug = req.params[0]; // Captures the entire slug after /searchslug/
    const slugParts = slug.split('/');

    if (slugParts.length === 0) {
      return res.status(400).json({ error: 'Invalid slug structure' });
    }

    let result;

    if (slugParts.length === 1) {
      // Search for exact state name
      const state = await Search.findOne({ stateName: slugParts[0] });
      if (state) {
        result = { type: "state", data: state };
      }
    } else if (slugParts.length === 2) {
      // Search for exact city in the exact state
      const [stateName, cityName] = slugParts;
      const state = await Search.findOne(
        { 
          stateName: stateName, 
          "cities.cityName": cityName 
        },
        { "cities.$": 1 } // Return only the matched city
      );

      if (state && state.cities.length > 0) {
        result = { type: "city", data: state.cities[0], stateName: state.stateName };
      }
    } else if (slugParts.length === 3) {
      // Search for exact place in the exact city and state
      const [stateName, cityName, placeName] = slugParts;
      const state = await Search.findOne(
        { 
          stateName: stateName, 
          "cities.cityName": cityName 
        }
      );

      if (state) {
        const city = state.cities.find(city => city.cityName === cityName);
        if (city) {
          const place = [
            ...city.placesToVisit,
            ...city.historicalPlaces
          ].find(place => place.placeName === placeName);

          if (place) {
            result = {
              type: "place",
              data: place,
              cityName: city.cityName,
              stateName: state.stateName
            };
          }
        }
      }
    }

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ error: 'No matching data found for the provided slug' });
    }
  } catch (error) {
    console.error("Error in searchBySlug:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
