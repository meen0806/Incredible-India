import express from "express";
import { searchAll,searchByname,searchById,searchTest,searchBySlug}from "../controllers/searchController.js"

export const searchRoute = express.Router();

searchRoute.get('/searchall',searchAll);
searchRoute.get('/search',searchByname);
searchRoute.get('/searchbyid',searchById);
searchRoute.get('/searchtest',searchTest);
// searchRoute.get('/searchurl',searchBySlug);
searchRoute.get('/searchslug/*', searchBySlug);


