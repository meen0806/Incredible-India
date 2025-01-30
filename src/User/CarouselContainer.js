import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export const CarouselContainer = () => {
  const destinations = [
    'https://map.sahapedia.org/admin/assets/images/2021033013400727799_Banner.jpg?__imr__=bannerMuseum',
    'https://img.freepik.com/free-photo/river-surrounded-by-forests-cloudy-sky-thuringia-germany-great-natural-concepts_181624-22631.jpg',
    'https://static.toiimg.com/thumb/msid-82304823,width-748,height-499,resizemode=4,imgsize-647878/.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        // width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {destinations.map((destination, index) => {
        let slideStyle = {
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.9s ease in', 
        };

        
        if (index === currentIndex) {
          slideStyle = { ...slideStyle, transform: 'translateX(0)', opacity: 1 };
        } else if (index === (currentIndex - 1 + destinations.length) % destinations.length) {
          slideStyle = { ...slideStyle, transform: 'translateX(-100%)', opacity: 0 };
        } else if (index === (currentIndex + 1) % destinations.length) {
          slideStyle = { ...slideStyle, transform: 'translateX(100%)', opacity: 0 };
        } else {
          slideStyle = { ...slideStyle, opacity: 0 };
        }

        return (
          <img
            key={index}
            src={destination}
            alt={`Destination ${index + 1}`}
            style={slideStyle}
          />
        );
      })}

      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          left: '10px',
          bottom: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          left: '50px',
          bottom: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};
