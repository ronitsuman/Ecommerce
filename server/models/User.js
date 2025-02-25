import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" }
}, { timestamps: true });

// ✅ Fix: Prevent Double Hashing in Middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  // ✅ Prevent re-hashing
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("User", userSchema);
