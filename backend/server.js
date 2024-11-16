import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

const __dirname = path.resolve(); // this is to fix the path issue when using es modules


app.use(express.json()); // allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

// This is to serve the frontend in production

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
    
}
app.listen(PORT, () => {
    connectDB();
    console.log('Server Started at http://localhost:'+ PORT);
});

