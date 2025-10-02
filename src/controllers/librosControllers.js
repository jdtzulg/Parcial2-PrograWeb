import { readLibros, writeLibros } from "../utils/leerArchivo.js";
import { v4 as uuidv4 } from "uuid";

// GET /api/libros
export async function getLibros(req, res) {
  try {
    const libros = await readLibros();
    res.status(200).json(libros);
  } catch (err) {
    res.status(500).json({ error: "Error al leer datos" });
  }
}

// GET /api/libros/:id
export async function getLibroById(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Id inválido" });

  try {
    const libros = await readLibros();
    const libro = libros.find(l => l.id === id);

    if (!libro) return res.status(404).json({ error: "Libro no existe" });

    res.status(200).json(libro);
  } catch (err) {
    res.status(500).json({ error: "Error al leer datos" });
  }
}

// POST /api/libros
export async function createLibro(req, res) {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const libros = await readLibros();
    // Validar duplicados (título + año)
    const existe = libros.find(l => l.title === title && l.year === year);
    if (existe) return res.status(409).json({ error: "El libro ya existe" });

    const nuevoLibro = {
      id: uuidv4(),
      title,
      author,
      year: year || null,
    };

    libros.push(nuevoLibro);
    await writeLibros(libros);

    res.status(201).json(nuevoLibro);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar el libro" });
  }
}

// DELETE /api/libros/:id
export async function deleteLibro(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Id inválido" });

  try {
    let libros = await readLibros();
    const libroIndex = libros.findIndex(l => l.id === id);

    if (libroIndex === -1) return res.status(404).json({ error: "Libro no existe" });

    const eliminado = libros.splice(libroIndex, 1);
    await writeLibros(libros);

    res.status(200).json({ message: "Libro eliminado", libro: eliminado[0] });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar libro" });
  }
}
