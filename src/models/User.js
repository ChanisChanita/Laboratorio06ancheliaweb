import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: { type: String, unique: true },
    age: { type: Number, min: 18, required: true },
    phoneNumber: { type: String },
    password: { type: String, minlength: 8, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;
