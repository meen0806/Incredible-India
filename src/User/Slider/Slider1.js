import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';


import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../Slider/Slider1.css"

const Slider1 = () => {
  const { places } = useSelector((state) => state.places); 
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      if (places.length <= 3) {
       
        return (prevIndex + 1) % places.length;
      } else {
        return (prevIndex + 1) % places.length;
      }
    });
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      return (prevIndex - 1 + places.length) % places.length;
    });

  };

  return (
    <>
    <Box className="Slider1-Outer">
    <Box>
      <Stack gap={1} sx={{marginLeft:"150px", width:"600px"}} >
    <Typography variant='h4' sx={{color:"#89874D", fontWeight:"700"}}>TOP SPIRITUAL PLACES</Typography>
    <Typography variant='body1' sx={{color:"#89874D"}}>Discover the essence of India.</Typography>
    <Box>
    <Button sx={{color:"black"}} color="inherit" variant='contained'>Discover More</Button>
    </Box>
    </Stack>
    </Box>
    {/* -------------------------------------------------------------------------------------- */}
    <div className="custom-slider-container">
      <div className="custom-slider-wrapper">
        {places.slice(activeIndex, activeIndex + 3).map((image, index) => (
          <div
          key={image.id}
          className={`custom-slider-image ${index === 2 ? 'custom-slider-image-large' : 'custom-slider-image-small'}`}
        >
          <div className="img-div">
            <img src={image.pictures} alt={image.name} />
          </div>
          <div className="custom-slider-image-content">
            <Typography className="custom-slider-title">{image.name}</Typography>
            <Typography className="custom-slider-description">{image.description}</Typography>
            <div className="custom-slider-footer">
                <LocationOnIcon className="custom-slider-location-icon" />
              <div className="custom-slider-location">
                <Typography variant="body2">{image.location_id.name}</Typography>
              </div>
              <div className="custom-slider-action">
                <ArrowForwardIosIcon className="custom-slider-action-icon" />
              </div>
            </div>
          </div>
        </div>
        
          // <div
          //   key={image.id}
          //   className={`custom-slider-image ${index === 2 ? 'custom-slider-image-large' : 'custom-slider-image-small'}`}
          // >
          //   <div className='img-div'>
          //   <img
          //     src={image.picture}
          //     alt={image.name}
          //     style={{
          //       width: '100%',
          //       height: '100%',
          //       objectFit: 'cover',
          //     }}
          //   />
          //   </div>
          //     {image.name}
              
          // </div>
        
        ))}
      </div>
    {/* -------------------------------------------------------------------------------------------- */}
    </div>
      <div className="custom-navigation-buttons">
        <IconButton onClick={handlePrev}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </Box>
      </>
  );
};

export default Slider1;
