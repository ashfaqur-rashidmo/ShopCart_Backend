import Product from '../models/product.js';
import Category from '../models/Category.js';
import slugify from "slugify";


// // Get All Products (with category info)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryID", "title slug");
    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Products by Category Slug
export const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ categoryID: category._id }); // categoryID দিয়ে filter
    res.json({ category, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


 // Add Products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      categoryID,
      brand,
      stock,
      description,
      images,
      status,
      slug,
      brandslug
    } = req.body;

    if (!name || !price || !categoryID) {
      return res.status(400).json({ message: "Name, price, and categoryID are required" });
    }

    const category = await Category.findById(categoryID);
    if (!category) {
      return res.status(400).json({ message: "Invalid categoryID" });
    }

    const allowedStatus = ["hot", "new", "sale"];

const finalStatus = allowedStatus.includes(status) ? status : "new";

const product = new Product({
  name,
  price,
  categoryID,
  brand,
  stock,
  description,
  images,
  status, 
  slug,
  brandslug: brandslug || slugify(brand || "unknown", { lower: true }),
});


    await product.save();
    return res.status(201).json(product);
  } catch (err) {
    console.error("Product creation error:", err);
    return res.status(500).json({ message: err.message });
  }
};



// GET product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug })
      .populate("categoryID", "title slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllProducts = async (req, res) => {
  try {
    const { brand, category, minPrice, maxPrice } = req.query;

    let filter = {};

    // ✅ BRAND filter (string match)
    if (brand) {
      filter.brandSlug = brand; 
      
      
    }

    
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        filter.categoryID = cat._id;
      }
    }

    //  PRICE
    if (minPrice && maxPrice) {
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    const products = await Product.find(filter)
      .populate('categoryID', 'title slug');

    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET HOT PRODUCTS
export const getHotProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "hot" })
      .populate("categoryID", "title slug")
      .sort({ createdAt: -1 });

    res.json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

