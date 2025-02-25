import express from "express";
import dotenv from "dotenv";
import dbConnect from "./database/dbConnect.js";
import cors from "cors";
import { router } from "./Routes/user.route.js";
import {router as productRoutes} from "./Routes/product.route.js";


dotenv.config(); // to use .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/users', router);  // Routes setup
app.use("/api/products", productRoutes);



// Database connection and server start
(async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error in connection:`, error.message);
    }
})();
