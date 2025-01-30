import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./Slider.css";

export const Slider = () => {
  const { locations } = useSelector((state) => state.locations);
  const [currentIndex, setCurrentIndex] = useState(0);


  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + locations.length) % locations.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const visibleSlides = (index) => {
    const total = locations.length;
    return [
      locations[(index - 1 + total) % total],
      locations[index % total],
      locations[(index + 1) % total],
    ];
  };

  return (
    <>
    
    <Box className="slider-wrapper">

      <Typography variant="h4" className="slider-title" 
      sx={{fontFamily:"Helvetica",fontWeight:"700", marginTop:"20px"}}>
        ATTRACTIONS
      </Typography>
      <Typography variant="body1" className="slider-subtitle">
        worth a thousand stories
      </Typography>

      <Box className="slider-container">
        <Button onClick={handlePrev} className="slider-button prev-button">
          <FaArrowLeft />
        </Button>

        <Box className="slider">
          {visibleSlides(currentIndex).map((image, index) => (
            <Box
              key={index}
              className={`slider-item ${index === 1 ? "center-image" : ""}`}
            >
              <img
                src={image?.picture}
                alt={image?.name}
                className="slider-image"
              />
              {index === 1 && (
                <Typography variant="h6" className="slider-caption">
                  {image?.name}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        <Button onClick={handleNext} className="slider-button next-button">
          <FaArrowRight />
        </Button>
      </Box>
   <Button color="error" variant="contained" sx={{margin:"30px"}} >discoverMore</Button>
    </Box>
    </>
  );
};
