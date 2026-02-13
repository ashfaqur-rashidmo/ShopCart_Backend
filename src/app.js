import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import brandRoutes from "./routes/brandRoute.js";
import blogRoutes from "./routes/blogRoute.js";

const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));

const allowedOrigins = [
  "http://localhost:3000", 
  "https://shop-cart-frontend-eedd-oct0yxnah-ashfaqur-rashids-projects.vercel.app" 
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/blogs', blogRoutes);

export default app;

