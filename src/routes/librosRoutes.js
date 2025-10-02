import express from "express";
import { getLibros, getLibroById, createLibro, deleteLibro } from "../controllers/librosControllers.js";

const router = express.Router();

router.get("/", getLibros);
router.get("/:id", getLibroById);
router.post("/", createLibro);
router.delete("/:id", deleteLibro);

export default router;
