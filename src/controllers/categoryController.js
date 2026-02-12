// src/controllers/categoryController.js
import Category from '../models/Category.js';
import Product from '../models/product.js';

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { title, slug, description, range, image } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ message: "Title and slug are required" });
    }

    // check duplicate slug
    // const exist = await Category.findOne({ slug });
    // if (exist) {
    //   return res.status(409).json({ message: "Category slug already exists!" });
    // }

    const category = await Category.create({
      title,
      slug,
      description,
      range,
      image,
    });

    res.status(201).json( category );

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    // ডাটা না থাকলেও যেন খালি অ্যারে পাঠায়, HTML নয়
    return res.status(200).json(categories); 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// GET CATEGORY BY SLUG (MULTIPLE ALLOWED)
// export const getCategoryBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const categories = await Category.find({ slug });

//     if (!categories || categories.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No categories found for this slug",
//       });
//     }

//     res.status(200).json(categories);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


export const getProductsByCategoriesSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1️⃣ slug দিয়ে category বের করো
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(200).json({ category: null, products: [] });
    }

    // 2️⃣ category._id দিয়ে product বের করো
    const products = await Product.find({
      categoryID: category._id
    });

    res.status(200).json({
      category,
      products
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


