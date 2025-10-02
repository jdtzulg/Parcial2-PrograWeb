import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Ruta al archivo JSON
const filePath = join(__dirname, "../data/libros.json");

export async function readLibros() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function writeLibros(libros) {
  await fs.writeFile(filePath, JSON.stringify(libros, null, 2));
}