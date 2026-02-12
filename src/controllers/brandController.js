import Brand from "../models/Brand.js";

// GET all brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ data: brands });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// GET single brand by ID
export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(200).json({ data: brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// CREATE new brand
export const createBrand = async (req, res) => {
  const { name, image, description,slug } = req.body;
  try {
    const existing = await Brand.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Brand already exists" });
    }

    const brand = new Brand({ name, image, description,slug });
    await brand.save();
    res.status(201).json({ data: brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// UPDATE brand
export const updateBrand = async (req, res) => {
  const { name, image, description,slug } = req.body;
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name, image, description,slug },
      { new: true, runValidators: true }
    );
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(200).json({ data: brand });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE brand
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
