export default function errorHandler(err, req, res, next) {
  console.error("Error inesperado:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
}
