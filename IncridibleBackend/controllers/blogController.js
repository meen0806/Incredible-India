import {Blog} from '../models/BlogsModel.js'

export const fetchBlogs=async(req,res)=>{
   try {
    const { page = 1, limit = 10 } = req.query; // Get page and limit from query parameters, defaulting to page 1 and limit 10

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const blogs = await Blog.find({})
      .skip((options.page - 1) * options.limit) // Skip the previous pages
      .limit(options.limit); // Limit the number of results returned

    const totalBlogs = await Blog.countDocuments(); // Total count of Blogs

    res.status(200).json({
      blogs,
      currentPage: options.page,
      totalPages: Math.ceil(totalBlogs / options.limit),
      totalBlogs,
    });
  } catch (error) {
    console.error("Error while fetching Blogs", error);
    res.status(500).send("Server Error");
  }
}

export const createBlog = async (req, res) => {
  const {
    title,
    titleContent,
    description,
    url,
  } = req.body;

  const basePath = "http://localhost:3001/public/assets/";
  let imageUrlArray = req.file ? basePath.concat(url) : ""; 
  if (url && typeof url === 'string') {
    imageUrlArray = imageUrlArray.concat(url);
  }
  try {
    const newBlog = new Blog({
      title,
      titleContent,
      description,
      url : imageUrlArray,
    });

    const newData = await newBlog.save();
    res.status(201).send(newData);
  } catch (error) {
    console.error("Error while uploading Blog", error);
    res.status(500).send(error);
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({ _id: id });
    const basePath = "http://localhost:3001/public/assets/";

    if (!blog) {
      return res.status(404).send({ message: "blog not found" });
    }

    blog.title = req.body.title || blog.title;
    blog.titleContent = req.body.titleContent || blog.titleContent;
    blog.description = req.body.description || blog.description;

    if (req.file) {
      blog.url = basePath.concat(req.file.filename);
    }
    await blog.save();
    res.status(200).send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete({ _id: id });
    if (blog) {
      res.json({ message: "blog deleted successfully" });
    } else {
      res.status(404).json({ message: "blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
