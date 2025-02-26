import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log("Received Token:", token);
    
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }
    
        token = token.split(" ")[1]; // Extract token from "Bearer TOKEN"
        console.log("Extracted Token:", token);
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Check token details
    
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    
};

export default protect;
