import express from "express";
import librosRoutes from "./routes/librosRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const prefix = "/api";
app.use(prefix + "/libros", librosRoutes);

// Middleware de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
