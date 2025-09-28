import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Formulario para nuevo usuario
router.get("/new", (req, res) => {
    res.render("users/new");
});

// Crear usuario
router.post("/", async (req, res) => {
    const { name, lastName, email, age, phoneNumber, password } = req.body;
    try {
        await User.create({ name, lastName, email, age, phoneNumber, password });
        res.render("users/new", { success: true });
    } catch (err) {
        res.render("users/new", { error: err.message });
    }
});

export default router;
