import React, { useEffect } from 'react'

import { Navbar } from './Navbar'
import { CarouselContainer } from './CarouselContainer';
import { DestinationBanner } from './Header/DestinationBanner';
import {Slider} from './Slider/Slider'
import Footer from './Footer/Footer';
import Slider1 from './Slider/Slider1';
import { useDispatch} from 'react-redux';
import { fetchLocation } from '../redux/slice/locationSlice';
import { fetchPlace } from '../redux/slice/PlaceSlice';



export const HomePage = ()=>{
const dispatch =  useDispatch();
useEffect(()=>{
dispatch(fetchLocation())
dispatch(fetchPlace());
},[dispatch])

  return<>
    <Navbar/>
    <CarouselContainer/>
    <DestinationBanner/>
    <Slider/>
    <Slider1/>
    <Footer/>
    
   
   
  </>
}

