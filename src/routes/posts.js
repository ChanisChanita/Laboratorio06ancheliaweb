import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

// Listar todos los posts
router.get("/", async (req, res) => {
    const posts = await Post.find().populate('user');
    res.render("posts/list", { posts });
});

// Formulario para nuevo post
router.get("/new", async (req, res) => {
    const users = await User.find();
    res.render("posts/new", { users });
});

// Crear nuevo post
router.post("/", async (req, res) => {
    const { title, content, hashtags, imageUrl, user } = req.body;
    await Post.create({
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(h => h.trim()) : [],
        imageUrl,
        user
    });
    res.redirect("/posts");
});

// Formulario para editar post
router.get("/:id/edit", async (req, res) => {
    const post = await Post.findById(req.params.id);
    const users = await User.find();
    res.render("posts/edit", { post, users });
});

// Actualizar post
router.post("/:id", async (req, res) => {
    const { title, content, hashtags, imageUrl, user } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {
        title,
        content,
        hashtags: hashtags ? hashtags.split(",").map(h => h.trim()) : [],
        imageUrl,
        user,
        updatedAt: new Date()
    });
    res.redirect("/posts");
});

// Eliminar post
router.post("/:id/delete", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
});

export default router;
