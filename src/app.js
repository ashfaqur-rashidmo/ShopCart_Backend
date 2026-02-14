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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      origin === "http://localhost:3000" ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));


app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/blogs', blogRoutes);

export default app;

