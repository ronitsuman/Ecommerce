import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../services/generateToken.js";

// 🔹 Register User API

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ❌ DO NOT HASH PASSWORD HERE, LET THE MODEL HANDLE IT
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        console.log("🔍 Plain Password Before Saving:", password);

        // ✅ Save User to Database (Password will be hashed in `User.js`)
        const user = await User.create({ name, email, password });

        console.log("🟢 New User Created:", user);

        // ✅ Generate JWT Token
        const token = generateToken(user._id);
        

          return res.status(201).json({
              message: "User created successfully",
              token,  // ✅ Include Token in Response
              user
          });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
// 🔹 Login User API
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // ✅ Validate Password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Stored Hashed Password:", user.password);
        console.log("🔍 User Entered Password:", password);
        console.log("✅ bcrypt.compare() Result:", isMatch);


        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ✅ Fix: Ensure `user._id` exists before generating JWT
        if (!user._id) {
            return res.status(500).json({ message: "User ID missing" });
        }

        // ✅ Generate JWT Token
        const token = generateToken(user._id);

        return res.json({ message: "Login successful", token, user });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        return res.json(req.user);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export { registerUser, loginUser, getUserProfile };