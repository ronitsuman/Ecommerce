import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        token = token.split("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JkMDkwODViOTIxODkzMTc0ZWMwZTkiLCJpYXQiOjE3NDA0NDQ4MDgsImV4cCI6MTc0MTA0OTYwOH0.5JiNuCVzx8OrT98tI8p6q8k-xUA5yWFedR1WIhv5d_w")[1]; // Extract token from "Bearer TOKEN"

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password"); // Remove password from response
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};

export default protect;
