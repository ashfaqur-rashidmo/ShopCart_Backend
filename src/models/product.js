// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     category: { type: String },
//     categoryID: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",  
//       required: true,
//     },
//     price: { type: Number, required: true },
//     brand: { type: String },
//     stock: { type: Number },
//     description: { type: String },
//     images: [{ type: String }],
//     status: { type: String, default: "new" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", productSchema);


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: { type: Number, required: true },
    brand: String,
    stock: Number,
    description: String,
    images: [String],

    status: {
      type: String,
      enum: ["hot", "new", "sale"],
      default: "new",
    },

    slug: { type: String, unique: true },
    brandslug: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);


