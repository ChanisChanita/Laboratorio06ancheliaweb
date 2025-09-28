import express from "express";
import connectDB from "./src/db/database.js";
import postsRouter from "./src/routes/posts.js";
import usersRouter from "./src/routes/users.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
await connectDB();

app.use(express.urlencoded({ extended: true }));

// Configuración de EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Rutas
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => {
    res.render("home");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
app.use(express.static(path.join(__dirname,"src", "public"))); // Archivos estáticos (css, js, imgs)

// Rutas
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

connectDB(); //Conexión a la base de datos
