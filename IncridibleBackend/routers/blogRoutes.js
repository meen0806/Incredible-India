import express from 'express'
import {createBlog, deleteBlog, fetchBlogs, updateBlog} from '../controllers/blogController.js';
import { upload } from "../middlewares/upload.js";

export const blogRouter = express.Router()

blogRouter.get('/blogs',fetchBlogs)
blogRouter.post('/blogs', upload.single("url"),createBlog)
blogRouter.put('/blogs/:id', upload.single("url"),updateBlog)
blogRouter.delete('/blogs/:id',deleteBlog)