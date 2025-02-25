import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    if (!userId) {
        throw new Error("User ID is required for JWT token generation");
    }
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default generateToken;
