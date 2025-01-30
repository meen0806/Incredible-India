import { Box, Stack, Typography,Button } from '@mui/material'
import React, { useEffect } from 'react'
import "../Header/DestinationBanner.css"
// import { fetchLocation } from '../../redux/slice/locationSlice'
import { useDispatch, useSelector } from 'react-redux'

// import "../User/nav.css";'


export const  DestinationBanner=()=>{
  // const dispatch = useDispatch();
  const {locations} = useSelector((state)=>state.locations);

  // useEffect(()=>{
  // dispatch(fetchLocation());
  // },[]);


  return<>
  <Box className="DestinationBanner">
  <Box className="destination-top">
  <Stack direction="row" justifyContent="space-evenly" gap={83}>
  <Box>
  <Typography className='Des-heading' variant="h4" sx={{fontWeight:700}}  >Destination</Typography>
   <Typography varient="body1" paragraph>for every bucket list </Typography>
 
   </Box>
    
   <Box>
    <Button className="discoverMore-btn" color="error" variant="contained" >Discover More</Button>
  </Box>
  </Stack>
  </Box>



<Box className="desOuterDiv">
  {locations
    .filter((location) => location.parent_id !== null) 
    .slice(0, 6) 
    .map((location, index) => {
      return (
        <Box key={index} className="desDiv" position="relative">
          <Box width="310px" height="279px">
         
            <img
              
              className="desImg"
              src={location.picture}
              alt="img"
              width="100%"
              height="100%"
            />
            <Box className="overlayText">
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                fontWeight: "bold",
                  }}
            >
              {location.name}
            </Typography>
            </Box>
          </Box>
        </Box>
      );
    })}
</Box>
</Box>
 </>

}