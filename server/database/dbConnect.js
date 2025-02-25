import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

const dbConnect = async(req,res)=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("ecommerce database is now connected  ")
        
    } catch (error) {
        console.log("error now", error.message)
        
    }
  
 
}

export default dbConnect;